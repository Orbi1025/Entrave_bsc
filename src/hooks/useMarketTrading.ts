import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { getContractAddresses, PRESALE_MANAGER_ABI, USDC_ABI, formatUSDC, parseUSDC, parseToken, formatToken } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { wagmiConfig } from '@/lib/privy'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

// Uniswap V2 Router ABI (minimal)
const UNISWAP_V2_ROUTER_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "amountIn", "type": "uint256"},
      {"internalType": "address[]", "name": "path", "type": "address[]"}
    ],
    "name": "getAmountsOut",
    "outputs": [{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "amountIn", "type": "uint256"},
      {"internalType": "uint256", "name": "amountOutMin", "type": "uint256"},
      {"internalType": "address[]", "name": "path", "type": "address[]"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "name": "swapExactTokensForTokens",
    "outputs": [{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// Uniswap V2 Factory ABI (minimal)
const UNISWAP_V2_FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "tokenA", "type": "address"},
      {"internalType": "address", "name": "tokenB", "type": "address"}
    ],
    "name": "getPair",
    "outputs": [{"internalType": "address", "name": "pair", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// ERC20 ABI (minimal)
const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export interface TradeEstimate {
  amountOut: bigint
  amountOutFormatted: number
  priceImpact: number
  minimumReceived: number
}

export function useMarketTrading() {
  const { address, isConnected, chainId } = useAccount()
  const { toast } = useToast()
  const contracts = getContractAddresses(chainId)

  // Transaction state
  const [isTrading, setIsTrading] = useState(false)
  const [isTradePending, setIsTradePending] = useState(false)
  const [isTradeConfirming, setIsTradeConfirming] = useState(false)
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'approving' | 'trading' | 'confirming' | 'success' | 'error'>('idle')
  const [tradeHash, setTradeHash] = useState<string | null>(null)
  const [tradeError, setTradeError] = useState<string | null>(null)

  // Contract write functions
  const { writeContractAsync: writeAsync } = useWriteContract()

  // Transaction receipt monitoring
  const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed, isError: isReceiptError } = useWaitForTransactionReceipt({
    hash: tradeHash as `0x${string}`,
    query: {
      enabled: !!tradeHash,
    }
  })

  // Monitor transaction status
  useEffect(() => {
    if (isConfirming) {
      setIsTradeConfirming(true)
      setTradeStatus('confirming')
    } else if (isConfirmed && receipt) {
      setIsTradeConfirming(false)
      setIsTrading(false)
      setIsTradePending(false)
      setTradeStatus('success')
      toast({
        title: "Trade successful!",
        description: "Your tokens have been received.",
      })
      setTradeHash(null)
    } else if (isReceiptError) {
      setIsTradeConfirming(false)
      setIsTrading(false)
      setIsTradePending(false)
      setTradeStatus('error')
      toast({
        title: "Trade failed",
        description: "Transaction was reverted.",
        variant: "destructive"
      })
      setTradeHash(null)
    }
  }, [isConfirming, isConfirmed, isReceiptError, receipt, toast])

  /**
   * Check if Uniswap pool exists for a token pair
   */
  const checkUniswapPool = async (tokenA: string, tokenB: string): Promise<string | null> => {
    // Check if Uniswap factory address is configured
    if (!contracts.UNISWAP_FACTORY || contracts.UNISWAP_FACTORY === '0x0000000000000000000000000000000000000000') {
      console.warn('Uniswap Factory address not configured')
      return null
    }

    try {
      // @ts-expect-error - wagmi v2 type issue
      const pairAddress = await readContract(wagmiConfig, {
        address: contracts.UNISWAP_FACTORY as `0x${string}`,
        abi: UNISWAP_V2_FACTORY_ABI,
        functionName: 'getPair',
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      }) as string

      if (pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000') {
        return pairAddress
      }
      return null
    } catch (error: any) {
      // Silently handle rate limits and factory issues
      if (error?.message?.includes('rate limit') || error?.status === 429) {
        // Ne pas logger les rate limits pour ne pas spammer la console
        return null
      }
      if (!error?.message?.includes('returned no data')) {
        console.warn('Error checking Uniswap pool:', error)
      }
      return null
    }
  }

  /**
   * Get trade estimate via Uniswap V2
   */
  const getTradeEstimate = async (
    amountIn: string,
    presaleId: string,
    tokenIn: string,
    tokenOut: string,
    presaleState: string
  ): Promise<TradeEstimate | null> => {
    if (!amountIn || parseFloat(amountIn) <= 0) {
      return null
    }

    try {
      // Determine if we're selling tokens (tokenIn is YES/NO) or buying (tokenIn is USDC)
      const isSellingTokens = tokenIn.toLowerCase() !== contracts.USDC.toLowerCase()
      const amountInWei = isSellingTokens ? formatToken(amountIn) : formatUSDC(amountIn)
      
      // Check if Uniswap pool exists
      const poolExists = await checkUniswapPool(tokenIn, tokenOut)
      
      if (!poolExists) {
        console.warn('No Uniswap pool found for this token pair')
        return null
      }
      
      // Get Uniswap estimate
      try {
        // @ts-expect-error - wagmi v2 type issue
        const amounts = await readContract(wagmiConfig, {
          address: contracts.UNISWAP_ROUTER as `0x${string}`,
          abi: UNISWAP_V2_ROUTER_ABI,
          functionName: 'getAmountsOut',
          args: [amountInWei, [tokenIn as `0x${string}`, tokenOut as `0x${string}`]],
        }) as bigint[]

        if (amounts && amounts.length >= 2) {
          const amountOut = amounts[1]
          
          // Determine if we're buying tokens (tokenOut is YES/NO) or selling (tokenOut is USDC)
          const isBuyingTokens = tokenOut.toLowerCase() !== contracts.USDC.toLowerCase()
          const amountOutFormatted = isBuyingTokens ? parseToken(amountOut) : parseUSDC(amountOut)
          
          // Calculate price impact
          const expectedPrice = parseFloat(amountIn)
          const actualValue = amountOutFormatted
          const priceImpact = Math.abs(((expectedPrice - actualValue) / expectedPrice) * 100)
          
          // Minimum received with 0.5% slippage tolerance
          const minimumReceived = amountOutFormatted * 0.995

          return {
            amountOut,
            amountOutFormatted,
            priceImpact,
            minimumReceived
          }
        }
      } catch (uniswapError: any) {
        // Ne pas logger les rate limits
        if (!uniswapError?.message?.includes('rate limit') && uniswapError?.status !== 429) {
          console.warn('Uniswap estimate failed:', uniswapError.message || uniswapError)
        }
        return null
      }

      return null
    } catch (error: any) {
      // Ne pas logger les rate limits
      if (!error?.message?.includes('rate limit') && error?.status !== 429) {
        logError('useMarketTrading.getTradeEstimate', error, { tokenIn, tokenOut, amountIn })
      }
      return null
    }
  }

  /**
   * Execute trade via Uniswap V2
   */
  const executeTrade = async (
    presaleId: string,
    amount: string,
    tokenIn: string,
    tokenOut: string,
    estimate: TradeEstimate,
    presaleState: string
  ): Promise<boolean> => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      })
      return false
    }

    try {
      setIsTrading(true)
      setTradeStatus('approving')
      setTradeError(null)

      const amountWei = formatUSDC(amount)
      const minAmountOut = formatUSDC(estimate.minimumReceived.toString())

      // Step 1: Approve token spending for Uniswap Router
      toast({
        title: `Approving ${tokenIn === contracts.USDC ? 'USDC' : 'tokens'}`,
        description: "Please confirm the approval transaction in your wallet.",
      })

      // @ts-expect-error - wagmi v2 type issue
      const approveHash = await writeAsync({
        address: tokenIn as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [
          contracts.UNISWAP_ROUTER as `0x${string}`,
          amountWei
        ],
      })

      if (!approveHash) {
        const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.SWAP.APPROVAL_FAILED)
        throw new Error(errorMessage)
      }

      setTradeStatus('trading')
      setIsTradePending(true)
      setTradeHash(approveHash)

      toast({
        title: "Approval submitted",
        description: "Waiting for confirmation...",
      })

      // Wait for approval confirmation
      await new Promise((resolve, reject) => {
        const checkApproval = async () => {
          try {
            // @ts-expect-error - wagmi v2 type issue
            const allowance = await readContract(wagmiConfig, {
              address: tokenIn as `0x${string}`,
              abi: ERC20_ABI,
              functionName: 'allowance',
              args: [
                address as `0x${string}`,
                contracts.UNISWAP_ROUTER as `0x${string}`
              ],
            }) as bigint

            if (allowance >= amountWei) {
              resolve(true)
            } else {
              setTimeout(checkApproval, 1000)
            }
          } catch (error) {
            reject(error)
          }
        }
        checkApproval()
      })

      toast({
        title: "Approval confirmed",
        description: "Now executing swap via Uniswap V2...",
      })

      // Step 2: Execute Uniswap V2 swap
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes

      // @ts-expect-error - wagmi v2 type issue
      const tradeHash = await writeAsync({
        address: contracts.UNISWAP_ROUTER as `0x${string}`,
        abi: UNISWAP_V2_ROUTER_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [
          amountWei,
          minAmountOut,
          [tokenIn as `0x${string}`, tokenOut as `0x${string}`],
          address as `0x${string}`,
          BigInt(deadline)
        ],
      })

      if (!tradeHash) {
        const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.SWAP.SWAP_FAILED)
        throw new Error(errorMessage)
      }

      setTradeHash(tradeHash)
      setIsTradePending(true)
      setTradeStatus('confirming')

      toast({
        title: "Swap submitted",
        description: "Waiting for confirmation...",
      })

      return true

    } catch (error: any) {
      logError('useMarketTrading.executeTrade', error, { tokenIn, tokenOut, amountIn, isApproval })
      setIsTrading(false)
      setIsTradePending(false)
      setIsTradeConfirming(false)
      setTradeStatus('error')
      setTradeError(error.message)
      
      toast({
        title: "Trade failed",
        description: error.message,
        variant: "destructive"
      })
      
      return false
    }
  }

  /**
   * Get token balance
   */
  const getTokenBalance = async (tokenAddress: string): Promise<number> => {
    if (!address || !tokenAddress || tokenAddress === '0x0000000000000000000000000000000000000000') {
      return 0
    }

    try {
      // @ts-expect-error - wagmi v2 type issue
      const balance = await readContract(wagmiConfig, {
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      }) as bigint

      return parseToken(balance)
    } catch (error: any) {
      if (!error?.message?.includes('over rate limit') && error?.status !== 429) {
        logError('useMarketTrading.getTokenBalance', error, { tokenAddress, userAddress })
      }
      return 0
    }
  }

  return {
    // State
    isTrading,
    isTradePending,
    isTradeConfirming,
    tradeStatus,
    tradeHash,
    tradeError,
    
    // Functions
    getTradeEstimate,
    executeTrade,
    getTokenBalance,
    checkUniswapPool,
  }
}

