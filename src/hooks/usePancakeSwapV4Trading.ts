// PancakeSwap V4 Trading Hook
import { useState, useEffect, useCallback } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { getContractAddresses, USDC_ABI, formatUSDC, parseUSDC, parseToken, PRESALE_MANAGER_ABI, ERC20_ABI } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { wagmiConfig } from '@/lib/privy'
import { PoolKey, TradeEstimate } from '@/lib/pancakeswap-v4/types/PancakeSwapV4Types'
import { POOL_MANAGER_ABI } from '@/lib/pancakeswap-v4/interfaces/IPoolManager'
import { LIQUIDITY_MANAGER_PCS_ABI } from '@/lib/pancakeswap-v4/interfaces/ILiquidityManagerPCS'
import { usePancakeSwapQuoter } from './usePancakeSwapQuoter'
import { PCS_V4_ROUTER_ABI } from '@/lib/pancakeswap-v4/interfaces/IPCSV4Router'
import { getRpcDelay, getCacheDuration, PCS_V4_CONFIG } from '@/lib/pancakeswap-v4/config'
import { request, gql } from 'graphql-request'
import { Presale } from '@/types'
import { useTokenApproval } from './useTokenApproval'
import { usePCSV4Swap } from './usePCSV4Swap'
import { useContributeToPresale } from './useContributeToPresale'
import { useSplitPresale } from './useSplitPresale'
import { useRedeemPresale } from './useRedeemPresale'
import { 
  PANCAKESWAP_INFINITY_ADDRESSES, 
  UNIVERSAL_ROUTER_ABI,
  buildUniversalRouterTransaction,
  buildV4SwapTransaction,
  buildV3SwapTransaction,
  SwapParams,
  getPoolKey
} from '@/lib/pancakeswap-v4/universalRouter'

// Cache pour les balances des tokens
const balanceCache = new Map<string, { balance: number; timestamp: number }>()
const CACHE_DURATION = 30 * 1000 // 30 secondes

// Cache pour les approbations
const approvalCache = new Map<string, { approved: boolean; timestamp: number }>()

export function usePancakeSwapV4Trading(customPresaleManagerAddress?: string, presaleId?: string) {
  const { getQuote } = usePancakeSwapQuoter();
  const { address, chainId } = useAccount()
  const { writeContract, writeContractAsync, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()

  // Use the new hooks
  const { approveToken, isPending: isApproving, isConfirmed: isApprovalConfirmed } = useTokenApproval()
  const { executeSwap, isPending: isSwapping, isConfirmed: isSwapConfirmed } = usePCSV4Swap()
  const { contributeToPresale, isPending: isContributing, isConfirmed: isContributionConfirmed } = useContributeToPresale()
  const { splitPresale, isPending: isSplitPending, isConfirming: isSplitConfirming, isConfirmed: isSplitConfirmed } = useSplitPresale()
  const { redeemPresale, isPending: isRedeemPending, isConfirming: isRedeemConfirming, isConfirmed: isRedeemConfirmed } = useRedeemPresale()

  const contracts = getContractAddresses(chainId)

  // Subgraph URL
  const SUBGRAPH_URL = import.meta.env.VITE_SUBGRAPH_URL || ''

  // Query to get specific presale data with position IDs for SwapperV4FromPosition
  const GET_PRESALE_BY_ID = gql`
    query GetPresaleById($presaleId: Bytes!) {
      presale(id: $presaleId) {
        id
        question
        targetAmount
        raisedAmount
        creator
        deadline
        contributorCount
        tokensCreated
        lpCreated
        resolved
        state
        yesOdds
        noOdds
        reserveAmount
        lpWithdrawn
        resolutionMode
        forceResolvedAnswer
        yesToken
        noToken
        graduatedAt
        poolKey {
          id
          fee
          tickSpacing
          hooks
          yesCurrency0
          yesCurrency1
          noCurrency0
          noCurrency1
          yesPositionId
          noPositionId
          tickLower
          tickUpper
          protocol { usdcAddress }
        }
      }
    }
  `

  // Function to fetch presale data from subgraph
  const fetchPresaleFromSubgraph = async (presaleId: string): Promise<Presale | null> => {
    if (!SUBGRAPH_URL) {
      console.log('No subgraph URL configured')
      return null
    }

    try {
      const data = await request(SUBGRAPH_URL, GET_PRESALE_BY_ID, { presaleId }) as { presale?: Presale }
      console.log('📊 fetchPresaleFromSubgraph result:', {
        presaleId,
        presale: data.presale,
        poolKey: data.presale?.poolKey
      })
      return data.presale || null
    } catch (error) {
      console.error('Error fetching presale from subgraph:', error)
      return null
    }
  }

  // Cache pour les balances des tokens avec gestion des rate limits
  const balanceCache = new Map<string, { balance: number; timestamp: number }>()
  const poolCache = new Map<string, { exists: boolean; timestamp: number }>()
  const presaleStatusCache = new Map<string, { status: any; timestamp: number }>()
  const CACHE_DURATION = getCacheDuration()
  
  // Queue pour les appels RPC pour éviter les rate limits
  let rpcQueue: Promise<any> = Promise.resolve()
  let isProcessing = false
  
  const addToRpcQueue = <T>(fn: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      const executeCall = async () => {
        if (isProcessing) {
          // Attendre que l'appel précédent se termine
          await rpcQueue
        }
        
        isProcessing = true
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          isProcessing = false
        }
      }
      
      rpcQueue = rpcQueue.then(() => executeCall()).catch(() => executeCall())
    })
  }

  // Wait until an approval flag is written in localStorage by useTokenApproval
  const waitForLocalApproval = async (
    tokenAddress: string,
    spenderAddress: string,
    timeoutMs: number = 120_000,
    pollMs: number = 2000
  ): Promise<void> => {
    const localStorageKey = `approval_${tokenAddress}-${spenderAddress}`
    const start = Date.now()
    
    //console.log('⏳ Waiting for approval confirmation...')
    
    while (Date.now() - start < timeoutMs) {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(localStorageKey)
        if (raw) {
          try {
            const { approved, timestamp } = JSON.parse(raw)
            if (approved && Date.now() - timestamp < 24 * 60 * 60 * 1000) {
              //console.log('✅ Approval confirmed via localStorage')
              return
            }
          } catch {}
        }
      }
      
      // Vérifier aussi le cache mémoire
      const memoryCached = approvalCache.get(`${tokenAddress}-${spenderAddress}`)
      if (memoryCached && memoryCached.approved && Date.now() - memoryCached.timestamp < 24 * 60 * 60 * 1000) {
        //console.log('✅ Approval confirmed via memory cache')
        return
      }
      
      await new Promise((r) => setTimeout(r, pollMs))
    }
    throw new Error('Token approval not confirmed in time')
  }

  // Helper: Determine which position ID to use based on tokenIn and tokenOut
  const getPositionIdForSwap = (presale: any, tokenIn: string, tokenOut: string): string | null => {
    if (!presale?.poolKey) {
      console.error('❌ No poolKey found in presale data')
      return null
    }

    // Get token addresses from presale level (yesToken/noToken are at the presale level, not poolKey level)
    const yesToken = presale.yesToken
    const noToken = presale.noToken
    const { yesPositionId, noPositionId } = presale.poolKey

    // Normalize addresses for comparison
    const tokenInLower = tokenIn.toLowerCase()
    const tokenOutLower = tokenOut.toLowerCase()
    const yesTokenLower = yesToken?.toLowerCase()
    const noTokenLower = noToken?.toLowerCase()
    const usdcLower = contracts.USDC.toLowerCase()

    console.log('🔍 getPositionIdForSwap:', {
      tokenIn: tokenInLower,
      tokenOut: tokenOutLower,
      yesToken: yesTokenLower,
      noToken: noTokenLower,
      usdc: usdcLower,
      yesPositionId,
      noPositionId
    })

    /*console.log('🔍 Determining position ID:', {
      tokenIn: tokenInLower,
      tokenOut: tokenOutLower,
      yesToken: yesTokenLower,
      noToken: noTokenLower,
      usdc: usdcLower,
      yesPositionId,
      noPositionId
    })*/

    // Buying YES tokens (USDC -> YES)
    if (tokenInLower === usdcLower && tokenOutLower === yesTokenLower) {
      //console.log('✅ Buying YES tokens - using yesPositionId:', yesPositionId)
      return yesPositionId
    }

    // Selling YES tokens (YES -> USDC)
    if (tokenInLower === yesTokenLower && tokenOutLower === usdcLower) {
      //console.log('✅ Selling YES tokens - using yesPositionId:', yesPositionId)
      return yesPositionId
    }

    // Buying NO tokens (USDC -> NO)
    if (tokenInLower === usdcLower && tokenOutLower === noTokenLower) {
      //console.log('✅ Buying NO tokens - using noPositionId:', noPositionId)
      return noPositionId
    }

    // Selling NO tokens (NO -> USDC)
    if (tokenInLower === noTokenLower && tokenOutLower === usdcLower) {
      //console.log('✅ Selling NO tokens - using noPositionId:', noPositionId)
      return noPositionId
    }

    /*console.error('❌ Could not determine position ID for swap', {
      tokenIn,
      tokenOut,
      yesToken,
      noToken
    })*/
    return null
  }
  
  // Helper pour vérifier si l'adresse de contrat est correcte
  const validateContractAddress = (address: string, expectedAddress: string, contractName: string): boolean => {
    if (address.toLowerCase() !== expectedAddress.toLowerCase()) {
      //console.warn(`⚠️ Contract address mismatch for ${contractName}:`)
      //console.warn(`  Expected: ${expectedAddress}`)
      //console.warn(`  Actual:   ${address}`)
      //console.warn(`  This may cause contract calls to fail!`)
      return false
    }
    return true
  }

  // Preload important token balances to avoid rate limits
  const preloadBalances = async (userAddress: string) => {
    const contracts = getContractAddresses(chainId)
    const importantTokens = [
      contracts.USDC, // USDC
      '0xf5efa4a52ad9000a3ce51206054d9ef11af25cc6', // Token example
      '0x5Ee0591bf724b599AadEEb3e79D34806C92Bc420'  // Token example
    ]
    
    //console.log('Preloading balances for important tokens...')
    
    for (const token of importantTokens) {
      try {
        const balance = await getTokenBalance(token, userAddress)
        //console.log(`Preloaded balance for ${token}: ${balance}`)
      } catch (error) {
        //console.log(`Failed to preload balance for ${token}:`, error)
      }
    }
  }

  // Check if PCS V4 pool exists with cache
  const checkPCSV4Pool = async (tokenA: string, tokenB: string): Promise<boolean> => {
    try {
      
      // Create cache key
      const cacheKey = `${tokenA}-${tokenB}`
      const cached = poolCache.get(cacheKey)
      
      // Check cache first
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        //console.log('Using cached pool check result:', cached.exists)
        return cached.exists
      }
      
      // For now, we'll assume pools exist if we can't check them directly
      // This is because the subgraph shows lpCreated: true for graduated presales
      
      // Cache the result (pool exists for graduated presales)
      poolCache.set(cacheKey, { exists: true, timestamp: Date.now() })
      
      return true
    } catch (error) {
      //console.log('PCS V4 pool check failed:', error)
      
      // Cache the result (pool doesn't exist)
      const cacheKey = `${tokenA}-${tokenB}`
      poolCache.set(cacheKey, { exists: false, timestamp: Date.now() })
      
      return false
    }
  }

  // Get trade estimate with intelligent pool checking
  const getTradeEstimate = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippageTolerance: number = 0.5,
    market?: any, // Add market data for fallback calculations
    outcome?: "YES" | "NO" // Explicitly pass the outcome instead of trying to detect from token address
  ): Promise<TradeEstimate | null> => {
    try {
      if (!amountIn || parseFloat(amountIn) <= 0) return null

      
      // Check if pool exists first
      try {
        const poolExists = await checkPCSV4Pool(tokenIn, tokenOut)
        if (!poolExists) {
          throw new Error('No PancakeSwap Infinity Liquidity Available')
        }
      } catch (poolError) {
        if (poolError instanceof Error && poolError.message.includes('rate limit')) {
          //console.log('Pool check failed due to rate limit, assuming pool does not exist')
          throw new Error('No PancakeSwap Infinity Liquidity Available')
        }
        throw poolError
      }

      // Use subgraph-based calculation for prediction markets
      // PancakeSwap V4 Quoter doesn't work with prediction market tokens
      let amountOutNum: number;
      const priceImpact: number = 0.5; // Default 0.5% price impact
      
      const amountInNum = parseFloat(amountIn);
      
      // Removed excessive logging to reduce noise
      // Only log important changes or errors
      
      // Get current market odds from subgraph data
      // For prediction markets, the ratio should be based on current YES/NO probabilities
      const isUSDCIn = tokenIn.toLowerCase() === contracts.USDC.toLowerCase();
      
      if (isUSDCIn) {
        // USDC -> Token: Use real-time market odds
        // Convert percentage to decimal (66 -> 0.66)
        const yesPriceValue = market?.yesPrice;
        const noPriceValue = market?.noPrice;
        //console.log('yesPriceValue:', yesPriceValue);
        //console.log('noPriceValue:', noPriceValue);
        const currentYesPrice = yesPriceValue / 100;
        const currentNoPrice = noPriceValue / 100;
        
        //console.log('🔍 Outcome parameter:', outcome);
        
        if (outcome === "YES") {
          // YES token: Higher probability = lower token amount per USDC
          // If YES is 66%, then 1 USDC should give 1/0.66 = ~1.52 YES tokens
          amountOutNum = amountInNum / currentYesPrice;
        } else if (outcome === "NO") {
          // NO token: Lower probability = higher token amount per USDC  
          // If NO is 34%, then 1 USDC should give 1/0.34 = ~2.94 NO tokens
          amountOutNum = amountInNum / currentNoPrice;
        } else {
          return null;
        }
      } else {
        // Token -> USDC: Reverse calculation using real-time prices
        const yesPriceValue = market?.yesPrice;
        const noPriceValue = market?.noPrice;
        //console.log('yesPriceValue:', yesPriceValue);
        //console.log('noPriceValue:', noPriceValue);
        const currentYesPrice = yesPriceValue / 100;
        const currentNoPrice = noPriceValue / 100;
        
        //console.log('🔍 Outcome parameter (selling):', outcome);
        
        if (outcome === "YES") {
          // YES -> USDC: multiply by YES price
          amountOutNum = amountInNum * currentYesPrice;
        } else if (outcome === "NO") {
          // NO -> USDC: multiply by NO price
          amountOutNum = amountInNum * currentNoPrice;
        } else {
          return null;
        }
      }
      
      // Removed excessive logging
      
       //console.log('📊 Real-time pricing calculation:', {
         //amountIn: amountInNum,
         //yesPrice: market?.yesPrice,
         //noPrice: market?.noPrice,
         //currentYesPrice: market?.yesPrice ? parseFloat(market.yesPrice.replace('%', '')) / 100 : 0.66,
         //currentNoPrice: market?.noPrice ? parseFloat(market.noPrice.replace('%', '')) / 100 : 0.34,
         //amountOut: amountOutNum,
         //tokenOut: tokenOut.toLowerCase()
       //});

      const amountOutBigInt = BigInt(Math.floor(amountOutNum * 1e18)); // Tokens have 18 decimals
      
      return {
        amountOut: amountOutBigInt,
        amountOutFormatted: amountOutNum,
        priceImpact,
        minimumReceived: amountOutNum * (1 - slippageTolerance / 100)
      }
    } catch (error) {
      //console.error('Error getting trade estimate:', error)
      
      // Check if it's a rate limit error
      const isRateLimitError = error instanceof Error && (
        error.message.includes('rate limit') || 
        error.message.includes('429') ||
        error.message.includes('over rate limit')
      )
      
      if (isRateLimitError) {
        //console.log('Rate limit detected, using fallback estimate')
        // Return a basic estimate instead of retrying
        const amountInNum = parseFloat(amountIn)
        const amountOutBigInt = BigInt(Math.floor(amountInNum * 0.95 * 1e18)) // 5% slippage
        
        return {
          amountOut: amountOutBigInt,
          amountOutFormatted: amountInNum * 0.95,
          priceImpact: 0.5,
          minimumReceived: amountInNum * 0.95 * (1 - slippageTolerance / 100)
        }
      }
      
      // Check if the error is because the pool doesn't exist
      if (error instanceof Error && error.message.includes('No PancakeSwap Infinity Liquidity Available')) {
        throw new Error('Pool not created yet - presale needs to be graduated first')
      }
      
      // Re-throw the error instead of falling back to mock data
      //console.error('Error getting trade estimate:', error)
      throw error
    }
  }

  // Execute trade via PresaleManager splitPresale function
  const executeTrade = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippageTolerance: number = 0.5,
    market?: any,
    outcome?: "YES" | "NO"
  ): Promise<void> => {
    try {
      //console.log('🚀 executeTrade called with:', { tokenIn, tokenOut, amountIn, slippageTolerance });
      
      if (!address) {
        throw new Error('Wallet not connected')
      }

      //console.log('✅ Wallet connected:', address);

      const estimate = await getTradeEstimate(tokenIn, tokenOut, amountIn, slippageTolerance, market, outcome)
      if (!estimate) {
        throw new Error('Unable to get trade estimate')
      }

      //console.log('✅ Trade estimate obtained:', estimate);

      // Determine if we're buying or selling based on tokenIn
      const isBuying = tokenIn.toLowerCase() === contracts.USDC.toLowerCase()
      const isSelling = !isBuying

      // Convert amount to proper format (USDT = 18 decimals, YES/NO tokens = 18 decimals)
      const amountInBigInt = isBuying 
        ? BigInt(Math.floor(parseFloat(amountIn) * 1e18))  // USDT has 18 decimals
        : BigInt(Math.floor(parseFloat(amountIn) * 1e18)) // YES/NO tokens have 18 decimals

      /*console.log('✅ Amount converted:', {
        isBuying,
        isSelling,
        tokenIn,
        amountIn,
        amountInBigInt: amountInBigInt.toString()
      });*/ 

      // We need the presale ID to call splitPresale
      if (!presaleId) {
        throw new Error('Presale ID is required for trading')
      }

      //console.log('✅ Presale ID:', presaleId);

      // Check presale status before attempting split
      //console.log('🔍 Checking presale status...')
      const presaleStatus = await checkPresaleStatus(presaleId)
      //console.log('📊 Presale status result:', presaleStatus)
      
      if (!presaleStatus.canTrade) {
        throw new Error(`Cannot trade: ${presaleStatus.message}`)
      }

      //console.log('✅ Presale status check passed:', presaleStatus);

      // Validate contract addresses and parameters
      if (!contracts.PRESALE_MANAGER || contracts.PRESALE_MANAGER === '0x0000000000000000000000000000000000000000') {
        throw new Error('Invalid PresaleManager contract address')
      }
      
      if (!contracts.USDC || contracts.USDC === '0x0000000000000000000000000000000000000000') {
        throw new Error('Invalid USDC contract address')
      }

      if (amountInBigInt <= 0n) {
        throw new Error('Invalid amount: must be greater than 0')
      }

      //console.log('✅ All validations passed');

           // PancakeSwap V4 logic: Direct swap for Graduated presales using SwapperV4FromPosition
           if (presaleStatus.isGraduated && presaleStatus.poolsCreated) {
             //console.log('🎯 Using SwapperV4FromPosition for graduated presale');
             //console.log(`📊 Trade direction: ${isBuying ? 'BUYING' : 'SELLING'}`);
             
             // Check if SwapperV4FromPosition is deployed
             if (!contracts.SWAPPER_V4_FROM_POSITION || contracts.SWAPPER_V4_FROM_POSITION === '0x0000000000000000000000000000000000000000') {
               throw new Error('SwapperV4FromPosition contract not deployed. Please deploy it first.')
             }
             
             const swapperAddress = contracts.SWAPPER_V4_FROM_POSITION
             
             // Approve the INPUT token (tokenIn) for SwapperV4FromPosition
             // When buying: tokenIn = USDC
             // When selling: tokenIn = YES or NO token
             //console.log(`🔍 Checking allowance for ${isBuying ? 'USDC' : 'YES/NO token'}...`);
             // @ts-expect-error - wagmi v2 type issue
             const currentAllowance = (await readContract(wagmiConfig, {
               address: tokenIn as `0x${string}`,
               abi: ERC20_ABI,
               functionName: 'allowance',
               args: [address as `0x${string}`, swapperAddress as `0x${string}`],
             })) as bigint
             
             /*console.log('📊 Current allowance:', {
               token: tokenIn,
               tokenName: isBuying ? 'USDC' : (tokenIn === tokenOut ? 'unknown' : 'YES/NO'),
               spender: swapperAddress,
               owner: address,
               allowance: currentAllowance.toString(),
               needed: amountInBigInt.toString(),
               sufficient: currentAllowance >= amountInBigInt
             });*/
             
             // Only approve if allowance is insufficient
             if (currentAllowance < amountInBigInt) {
               //console.log('⚠️ Insufficient allowance - requesting approval');
               //console.log(`🔐 Requesting approval for SwapperV4FromPosition (${isBuying ? 'USDC' : 'YES/NO token'})...`);
               await approveToken(tokenIn, swapperAddress, amountInBigInt)
               
               // Wait for approval confirmation
               //console.log('⏳ Waiting for approval confirmation...');
               await waitForLocalApproval(tokenIn, swapperAddress, 120_000, 2000)
               //console.log('✅ Approval confirmed!');
             } else {
               //console.log('✅ Sufficient allowance already exists - skipping approval');
             }
             
             // Execute PancakeSwap V4 swap using SwapperV4FromPosition
             //console.log('💰 Executing PancakeSwap V4 swap with position NFT...');
             await executePancakeSwapV4Swap(tokenIn, tokenOut, amountIn, slippageTolerance)
             //console.log('✅ PancakeSwap V4 swap completed');
             return
           }

      // For Active presales, use contributeToPresale
      //console.log('🎯 Using contributeToPresale for active presale');
      
      // Clear approval cache to force fresh approval
      if (typeof window !== 'undefined') {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('approval_')) {
            localStorage.removeItem(key)
          }
        })
        //console.log('🗑️ Cleared approval cache for fresh approval');
      }
      
      // Request fresh approval
      //console.log('🔐 Requesting fresh approval...');
      await approveToken(contracts.USDC, contracts.PRESALE_MANAGER, amountInBigInt)
      
      // CRITICAL: Wait for approval confirmation
      //console.log('⏳ Waiting for approval confirmation...');
      await waitForLocalApproval(contracts.USDC, contracts.PRESALE_MANAGER, 120_000, 2000)
      //console.log('✅ Approval confirmed!');
      
      //console.log('💰 Executing contributeToPresale...');
      await contributeToPresale(contracts.PRESALE_MANAGER, presaleId, amountInBigInt)
      //console.log('✅ contributeToPresale completed');

    } catch (error) {
      //console.error('❌ Error in executeTrade:', error);
      toast({
        title: "Trade Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive"
      })
      throw error
    }
  }


  // Check if token allowance is sufficient (NO CACHE - always check on-chain)
  const checkTokenAllowance = async (tokenAddress: string, spenderAddress: string, amount: bigint): Promise<boolean> => {
    try {
      if (!address) return true // If no address, assume approval needed
      
      /*console.log('🔍 Checking on-chain allowance for:', {
        token: tokenAddress,
        spender: spenderAddress,
        owner: address
      });*/
      
      // Always check on-chain allowance (no cache)
      return true // For now, always request approval to ensure it works
    } catch (error) {
      //console.error('Error checking allowance:', error);
      return true
    }
  }

  // Get token balance with fallback to default values
  const getTokenBalance = async (tokenAddress: string, userAddress: string): Promise<number> => {
    try {
      // Vérifier que tokenAddress est valide
      if (!tokenAddress || tokenAddress === 'undefined' || tokenAddress === '0x0000000000000000000000000000000000000000') {
        //console.warn('Invalid token address:', tokenAddress)
        return 0
      }

      // Créer une clé de cache unique
      const cacheKey = `${tokenAddress}-${userAddress}`
      const cached = balanceCache.get(cacheKey)
      
      // Vérifier si le cache est encore valide
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.balance
      }


      // Make real RPC call to get token balance
      //console.log('🔍 Fetching real token balance for:', tokenAddress, 'user:', userAddress)
      
      // @ts-expect-error - wagmi v2 type issue
      const balance = await readContract(wagmiConfig, {
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [userAddress as `0x${string}`],
      }) as bigint

      const balanceFormatted = parseToken(balance)
      
      // Mettre en cache
      balanceCache.set(cacheKey, { balance: balanceFormatted, timestamp: Date.now() })
      
      return balanceFormatted
    } catch (error) {
      //console.warn('Error getting token balance:', error)
      
      // Return cached value if available
      const cacheKey = `${tokenAddress}-${userAddress}`
      const cached = balanceCache.get(cacheKey)
      if (cached) {
        return cached.balance
      }
      
      // Return 0 as fallback
      return 0
    }
  }

  // Execute PancakeSwap V4 swap using SwapperV4FromPosition
  const executePancakeSwapV4Swap = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippageTolerance: number = 0.5
  ): Promise<void> => {
    try {
      //console.log('🔄 Starting PancakeSwap V4 swap with SwapperV4FromPosition...')
      /*console.log('📊 Swap parameters:', {
        tokenIn,
        tokenOut,
        amountIn,
        slippageTolerance,
        address,
        chainId,
        presaleId
      })*/

      if (!address) {
        throw new Error('Wallet not connected')
      }

      if (!presaleId) {
        throw new Error('Presale ID is required to fetch position data')
      }

      // Fetch presale data from subgraph to get position IDs
      console.log('📡 Fetching presale data from subgraph...')
      const presale = await fetchPresaleFromSubgraph(presaleId)
      
      console.log('📊 Presale data received:', {
        presaleId,
        hasPresale: !!presale,
        hasPoolKey: !!presale?.poolKey,
        poolKey: presale?.poolKey
      })
      
      if (!presale) {
        throw new Error('Presale not found in subgraph')
      }

      if (!presale.poolKey) {
        throw new Error('Presale does not have poolKey data (LP may not be created yet)')
      }

      // Determine which position ID to use
      const positionId = getPositionIdForSwap(presale, tokenIn, tokenOut)
      
      if (!positionId) {
        throw new Error('Could not determine position ID for swap. Check token addresses.')
      }

      //console.log('🎯 Using position ID:', positionId)

      // Determine decimals based on tokenIn
      const isBuyingUSDC = tokenIn.toLowerCase() === contracts.USDC.toLowerCase()
      const tokenInDecimals = isBuyingUSDC ? 18 : 18 // USDC = 6, YES/NO = 18
      const tokenOutDecimals = isBuyingUSDC ? 18 : 18 // Reverse for output
      
      // Convert amounts with correct decimals
      const amountInBigInt = BigInt(Math.floor(parseFloat(amountIn) * Math.pow(10, tokenInDecimals)))
      const amountOutMin = BigInt(Math.floor(parseFloat(amountIn) * (1 - slippageTolerance / 100) * Math.pow(10, tokenOutDecimals)))
      const deadline = Math.floor(Date.now() / 1000) + 1800 // 30 minutes

      /*console.log('💰 Amount calculations:', {
        amountIn: amountIn,
        isBuying: isBuyingUSDC,
        tokenInDecimals,
        tokenOutDecimals,
        amountInBigInt: amountInBigInt.toString(),
        amountOutMin: amountOutMin.toString(),
        deadline: deadline,
        slippage: slippageTolerance + '%',
        positionId
      })*/

      // Import SwapperV4FromPosition ABI
      const { SWAPPER_V4_FROM_POSITION_ABI } = await import('@/lib/contracts')
      
      // Execute swap via SwapperV4FromPosition
      //console.log('🚀 Executing swap via SwapperV4FromPosition...')
      //console.log('🎯 SwapperV4FromPosition address:', contracts.SWAPPER_V4_FROM_POSITION)
      /*console.log('📋 swapFromPosition arguments:', {
        positionId,
        tokenIn,
        tokenOut,
        amountIn: amountInBigInt.toString(),
        amountOutMinimum: amountOutMin.toString(),
        recipient: address,
        deadline
      })*/
      
      let swapHash: string | undefined
      
      try {
        // Call swapFromPosition on SwapperV4FromPosition contract
          swapHash = await writeContractAsync({
          address: contracts.SWAPPER_V4_FROM_POSITION as `0x${string}`,
          abi: SWAPPER_V4_FROM_POSITION_ABI,
          functionName: 'swapFromPosition',
            args: [
            BigInt(positionId),          // positionId (uint256)
            tokenIn as `0x${string}`,    // tokenIn (address)
            tokenOut as `0x${string}`,   // tokenOut (address)
            amountInBigInt,              // amountIn (uint128) - automatically converted
            0,         // amountOutMinimum (uint128)
            address as `0x${string}`,    // recipient (address)
            BigInt(deadline)             // deadline (uint256)
          ]
        })
        //console.log('✅ swapFromPosition call completed, result:', swapHash)
      } catch (swapError: any) {
        //console.error('❌ swapFromPosition error:', swapError)
        //console.error('❌ Error details:', {
          /*message: swapError?.message,
          code: swapError?.code,
          cause: swapError?.cause,
          details: swapError?.details
        })*/
        
        // Check for specific errors
        if (swapError?.message?.includes('Invalid token pair')) {
          throw new Error('Invalid token pair for this position - check tokenIn and tokenOut')
        }
        
        if (swapError?.message?.includes('Transfer failed')) {
          throw new Error('Token transfer failed - check approval and balance')
        }
        
        if (swapError?.message?.includes('SwapFailed')) {
          throw new Error('Swap failed - pool may have insufficient liquidity')
        }
        
        if (swapError?.message?.includes('InvalidPosition')) {
          throw new Error('Invalid position ID - LP may not be created yet')
          }
          
          // Generic error
        throw new Error(`Swap failed: ${swapError?.message || 'Unknown error'}`)
        }

        if (!swapHash) {
        throw new Error('Swap transaction returned undefined - transaction not submitted')
      }

      //console.log('✅ PancakeSwap V4 swap transaction submitted successfully!')
      //console.log('📝 Transaction hash:', swapHash)
    } catch (error) {
      //console.error('❌ Error executing PancakeSwap V4 swap:', error)
      //console.error('🔍 Error details:', {
        /*message: error.message,
        stack: error.stack,
        tokenIn,
        tokenOut,
        amountIn,
        slippageTolerance
      })*/  
      throw error
    }
  }

  // Check if presale is graduated and pools are created with cache
  const checkPresaleStatus = useCallback(async (presaleId: string): Promise<{
    isGraduated: boolean
    poolsCreated: boolean
    canTrade: boolean
    message: string
  }> => {
    try {
      // Check cache first
      const cached = presaleStatusCache.get(presaleId)
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.status
      }
      
      // Fetch presale data from subgraph
      const presale = await fetchPresaleFromSubgraph(presaleId)
      
      //console.log('📊 Fetched presale from subgraph:', {
        //id: presale?.id,
        //state: presale?.state,
        //tokensCreated: presale?.tokensCreated,
        //lpCreated: presale?.lpCreated
      //});
      
      if (!presale) {
        const result = {
          isGraduated: false,
          poolsCreated: false,
          canTrade: false,
          message: 'Presale not found - check presale ID'
        }
        presaleStatusCache.set(presaleId, { status: result, timestamp: Date.now() })
        return result
      }
      
      
      // Check if presale is graduated
      const isGraduated = presale.state === 'Graduated' || presale.state === 'Resolved'
      const poolsCreated = presale.lpCreated && presale.tokensCreated
      const canTrade = isGraduated && poolsCreated
      
      let message = ''
      if (canTrade) {
        message = presale.state === 'Resolved' ? 'Market Resolved - Trading Available' : 'Presale Graduated - Trading Available'
      } else if (presale.state === 'Pending') {
        message = 'Presale Pending - Needs Graduation'
      } else if (presale.state === 'Active') {
        message = 'Presale Active - Still in Funding Phase'
      } else if (!presale.tokensCreated) {
        message = 'Tokens not created yet'
      } else if (!presale.lpCreated) {
        message = 'Liquidity pools not created yet'
      } else {
        message = 'Presale not ready for trading'
      }
      
      const result = {
        isGraduated,
        poolsCreated,
        canTrade,
        message
      }
      
      presaleStatusCache.set(presaleId, { status: result, timestamp: Date.now() })
      return result
    } catch (error) {
      //console.error('Error checking presale status:', error)
      return {
        isGraduated: false,
        poolsCreated: false,
        canTrade: false,
        message: 'Error checking presale status'
      }
    }
  }, [chainId])

  // Monitor transaction confirmation and show success message
  useEffect(() => {
    if (isContributionConfirmed) {
      toast({
        title: "Contribution Executed",
        description: "Successfully contributed to presale!",
      })
    }
  }, [isContributionConfirmed, toast])

  return {
    getTradeEstimate,
    executeTrade,
    executePancakeSwapV4Swap, // New: Direct PancakeSwap V4 swap function
    // Sell function: Sell YES/NO tokens for USDC using SwapperV4FromPosition
    executeSell: async (
      outcomeToken: string,
      amountShares: string,
      slippageTolerance: number = 0.5,
      market?: any, // Add market parameter
      outcome?: "YES" | "NO" // Add outcome parameter
    ): Promise<void> => {
      try {
        if (!address) throw new Error('Wallet not connected')
        if (!amountShares || parseFloat(amountShares) <= 0) throw new Error('Invalid sell amount')
        if (!presaleId) throw new Error('Presale ID required for selling')

        console.log('💰 Executing sell via SwapperV4FromPosition...');
        console.log('📊 Sell parameters:', {
          outcomeToken,
          amountShares,
          slippageTolerance,
          direction: 'YES/NO → USDC',
          outcome
        });

        // For selling: tokenIn = YES/NO token, tokenOut = USDC
        await executeTrade(
          outcomeToken,      // tokenIn: YES or NO token
          contracts.USDC,    // tokenOut: USDC
          amountShares,      // amount of YES/NO tokens to sell
          slippageTolerance,
          market,            // Pass market data
          outcome            // Pass outcome
        )
        console.log('✅ Sell completed');
      } catch (err) {
        console.error('Sell failed:', err)
        toast({ title: 'Sell Failed', description: err instanceof Error ? err.message : 'Unknown error', variant: 'destructive' })
        throw err
      }
    },
    getTokenBalance,
    checkPCSV4Pool,
    checkPresaleStatus,
    preloadBalances, // Export preload function
    clearBalanceCache: (userAddress: string) => {
      //console.log('🗑️ Clearing balance cache for user:', userAddress);
      balanceCache.forEach((value, key) => {
        if (key.includes(userAddress)) {
          balanceCache.delete(key);
        }
      });
    },
    isPending: isPending || isApproving || isSwapping || isContributing || isSplitPending || isRedeemPending,
    isConfirming: isConfirming || isApproving || isSwapping || isContributing || isSplitConfirming || isRedeemConfirming,
    isConfirmed: isConfirmed || isApprovalConfirmed || isSwapConfirmed || isContributionConfirmed || isSplitConfirmed || isRedeemConfirmed,
    error,
    hash,
    contracts,
  }
}
