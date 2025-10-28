import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { getContractAddresses, formatUSDC, parseUSDC, USDC_ABI, PRESALE_MANAGER_ABI } from '@/lib/contracts'
import { useState, useEffect, useRef } from 'react'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

export function usePresaleManager() {
  const { address, chainId } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const [transactionStatus, setTransactionStatus] = useState<{
    type: 'create' | 'contribute' | 'approve' | 'graduate' | 'cancel' | null
    status: 'pending' | 'confirming' | 'success' | 'error'
    message: string
  }>({ type: null, status: 'pending', message: '' })

  const lastConfirmedHash = useRef<string | null>(null)
  const contracts = getContractAddresses(chainId)

  // Check if user is whitelisted
  const canCreatePresaleABI = [{
    "inputs": [{"internalType": "address", "name": "_address", "type": "address"}],
    "name": "canCreatePresale",
    "outputs": [
      {"internalType": "bool", "name": "canCreate", "type": "bool"},
      {"internalType": "string", "name": "reason", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }]
  
  const { data: canCreateData } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: canCreatePresaleABI as any,
    functionName: 'canCreatePresale',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const isWhitelisted = canCreateData?.[0] && (canCreateData[1] === "Owner" || canCreateData[1] === "Whitelisted")

  // Create presale
  const createPresale = async (question: string, targetAmount: string, deadline: string) => {
    try {
      setTransactionStatus({ type: 'create', status: 'pending', message: 'Creating presale...' })
      
      // Check USDC balance and allowance first (1 USDT fee required) - but only if not whitelisted
      const CREATION_FEE_USDT = 1
      const requiredAllowance = BigInt(CREATION_FEE_USDT * 10 ** 18) // 1 USDT = 1 * 10^18 wei
      
      console.log('=== WHITELIST CHECK ===')
      console.log('isWhitelisted:', isWhitelisted)
      console.log('canCreateData:', canCreateData)
      console.log('Will skip balance/allowance check?', isWhitelisted)
      
      console.log('Checking USDC requirements:', {
        isWhitelisted,
        canCreateData,
        balance: balance?.toString(),
        allowance: allowance?.toString(),
        required: requiredAllowance.toString(),
        creationFeeUSDT: CREATION_FEE_USDT
      })

      // Only check balance and allowance if user is NOT whitelisted
      if (!isWhitelisted) {
        if (!balance || balance < requiredAllowance) {
          throw new Error(`Insufficient USDC balance. Need ${CREATION_FEE_USDT} USDT for creation fee, have ${parseUSDC(balance)} USDT`)
        }

        if (!allowance || allowance < requiredAllowance) {
          throw new Error(`Insufficient USDC allowance. Please approve at least ${CREATION_FEE_USDT} USDT`)
        }
      }
      
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000)
      
      // Validate that deadlineTimestamp fits in uint32 (max value: 4294967295)
      const MAX_UINT32 = 4294967295
      if (deadlineTimestamp > MAX_UINT32 || deadlineTimestamp < 0) {
        throw new Error(`Deadline timestamp ${deadlineTimestamp} is out of uint32 range`)
      }
      
      const targetAmountWei = formatUSDC(targetAmount)
      const minBondWei = BigInt(1) // Minimum bond required by smart contract
      
      console.log('Creating presale with args:', {
        question,
        targetAmountWei: targetAmountWei.toString(),
        deadlineTimestamp,
        minBondWei: minBondWei.toString()
      })

      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'createPresale',
        args: [question, targetAmountWei, deadlineTimestamp, minBondWei],
      })

      setTransactionStatus({ type: 'create', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.createPresale', err, { question, targetAmount, deadline })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.CREATION_FAILED)
      setTransactionStatus({ 
        type: 'create', 
        status: 'error', 
        message: errorMessage
      })
      throw err
    }
  }

  // Contribute to presale
  const contributeToPresale = async (presaleId: string, amount: string) => {
    try {
      setTransactionStatus({ type: 'contribute', status: 'pending', message: 'Contributing to presale...' })
      
      const amountWei = formatUSDC(amount)

      console.log('💰 Contributing to presale:', {
        presaleId,
        amount,
        amountWei: amountWei.toString(),
        contract: contracts.PRESALE_MANAGER,
      })

      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'contributeToPresale',
        args: [presaleId as `0x${string}`, amountWei],
      })

      console.log('✅ Contribution transaction sent')
      setTransactionStatus({ type: 'contribute', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.contributeToPresale', err, { presaleId, amount })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.CONTRIBUTION_FAILED)
      setTransactionStatus({ 
        type: 'contribute', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Approve USDC spending (approves unlimited amount for one-time approval)
  const approveUSDC = async (amount?: string) => {
    try {
      setTransactionStatus({ type: 'approve', status: 'pending', message: 'Approving USDC spending...' })
      
      // Approve max uint256 for unlimited spending (one-time approval)
      const maxAmount = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.USDC as `0x${string}`,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [contracts.PRESALE_MANAGER as `0x${string}`, maxAmount],
      })

      setTransactionStatus({ type: 'approve', status: 'confirming', message: 'Confirming approval...' })
    } catch (err) {
      logError('usePresaleManager.approveUSDC', err, { amount })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.CONTRACT.APPROVAL_FAILED)
      setTransactionStatus({ 
        type: 'approve', 
        status: 'error', 
        message: errorMessage
      })
      throw err
    }
  }

  // Check USDC allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: contracts.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: address ? [address, contracts.PRESALE_MANAGER as `0x${string}`] : undefined,
  })

  // Check USDC balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contracts.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Get presale details
  const getPresale = (presaleId: string) => {
    return useReadContract({
      address: contracts.PRESALE_MANAGER as `0x${string}`,
      abi: PRESALE_MANAGER_ABI,
      functionName: 'getPresale',
      args: [presaleId as `0x${string}`],
    })
  }

  // Graduate presale (owner only)
  const graduatePresale = async (presaleId: string, yesOdds: number, noOdds: number) => {
    try {
      setTransactionStatus({ type: 'graduate', status: 'pending', message: 'Graduating presale...' })
      
      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'graduatePresale',
        args: [presaleId as `0x${string}`, BigInt(yesOdds), BigInt(noOdds)],
      })

      setTransactionStatus({ type: 'graduate', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.graduatePresale', err, { presaleId, yesOdds, noOdds })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.GRADUATION_FAILED)
      setTransactionStatus({ 
        type: 'graduate', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Cancel presale (owner only)
  const cancelPresale = async (presaleId: string) => {
    try {
      setTransactionStatus({ type: 'cancel', status: 'pending', message: 'Cancelling presale...' })
      
      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'cancelPresale',
        args: [presaleId as `0x${string}`],
      })

      setTransactionStatus({ type: 'cancel', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.cancelPresale', err, { presaleId })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.CANCELLATION_FAILED)
      setTransactionStatus({ 
        type: 'cancel', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Resolve presale via Reality.eth
  const resolvePresale = async (presaleId: string) => {
    try {
      setTransactionStatus({ type: 'cancel', status: 'pending', message: 'Resolving presale...' })
      
      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'resolvePresale',
        args: [presaleId as `0x${string}`],
      })

      setTransactionStatus({ type: 'cancel', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.resolvePresale', err, { presaleId })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.RESOLUTION_FAILED)
      setTransactionStatus({ 
        type: 'cancel', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Force resolve presale (owner only)
  const forceResolvePresale = async (presaleId: string, answer: number) => {
    try {
      setTransactionStatus({ type: 'cancel', status: 'pending', message: 'Force resolving presale...' })
      
      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'forceResolvePresale',
        args: [presaleId as `0x${string}`, BigInt(answer)],
      })

      setTransactionStatus({ type: 'cancel', status: 'confirming', message: 'Confirming transaction...' })
    } catch (err) {
      logError('usePresaleManager.forceResolvePresale', err, { presaleId, answer })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.PRESALE.RESOLUTION_FAILED)
      setTransactionStatus({ 
        type: 'cancel', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Get all presales
  const { data: allPresales } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: PRESALE_MANAGER_ABI,
    functionName: 'getAllPresales',
  })

  // Get pending presales
  const { data: pendingPresales } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: PRESALE_MANAGER_ABI,
    functionName: 'getPendingPresales',
  })

  // Update transaction status based on confirmation (in useEffect to avoid re-render loops)
  useEffect(() => {
    if (isConfirmed && hash && hash !== lastConfirmedHash.current && transactionStatus.status === 'confirming') {
      lastConfirmedHash.current = hash
      setTransactionStatus(prev => ({ ...prev, status: 'success', message: 'Transaction confirmed!' }))
      
      // If it was an approval, refetch allowance
      if (transactionStatus.type === 'approve') {
        setTimeout(() => refetchAllowance(), 1000)
      }
      
      // If it was a contribution, refetch balance
      if (transactionStatus.type === 'contribute') {
        setTimeout(() => refetchBalance(), 1000)
      }
    }
  }, [isConfirmed, hash, transactionStatus.status, transactionStatus.type, refetchAllowance, refetchBalance])

  useEffect(() => {
    if (error && transactionStatus.status !== 'error') {
      logError('usePresaleManager.transactionError', error, { chainId, transactionStatus })
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.CONTRACT.CALL_FAILED)
      setTransactionStatus(prev => ({ ...prev, status: 'error', message: errorMessage }))
    }
  }, [error, transactionStatus.status])

  /**
   * Redeem LP shares for USDC after presale is resolved
   */
  const redeemPresale = async (presaleId: string) => {
    try {
      // @ts-expect-error - wagmi v2 type issue
      writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'redeemPresale',
        args: [presaleId as `0x${string}`],
      })
      
      // Return a promise that resolves when hash is available
      return new Promise<string>((resolve) => {
        const checkHash = setInterval(() => {
          if (hash) {
            clearInterval(checkHash)
            resolve(hash)
          }
        }, 100)
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkHash)
          resolve('')
        }, 10000)
      })
    } catch (error: any) {
      logError('usePresaleManager.redeemPresale', error, { presaleId })
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.PRESALE.REDEEM_FAILED)
      throw new Error(errorMessage)
    }
  }

  /**
   * Claim accumulated trading fees for a presale
   */
  const claimFees = async (presaleId: string) => {
    try {
      setTransactionStatus({ type: 'contribute', status: 'pending', message: 'Claiming fees...' })
      
      console.log('💰 Claiming fees for presale:', presaleId)

      // @ts-expect-error - wagmi v2 type issue
      await writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'claimFees',
        args: [presaleId as `0x${string}`],
      })

      console.log('✅ Claim fees transaction sent')
      setTransactionStatus({ type: 'contribute', status: 'confirming', message: 'Confirming transaction...' })
      return hash
    } catch (error: any) {
      logError('usePresaleManager.claimFees', error, { presaleId })
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.PRESALE.CLAIM_FEES_FAILED)
      setTransactionStatus({ 
        type: 'contribute', 
        status: 'error', 
        message: errorMessage
      })
      throw new Error(errorMessage)
    }
  }

  /**
   * Claim presaler share (for presale contributors)
   */
  const claimPresalerShare = async (presaleId: string) => {
    try {
      // @ts-expect-error - wagmi v2 type issue
      writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'claimPresalerShare',
        args: [presaleId as `0x${string}`],
      })
      
      // Return a promise that resolves when hash is available
      return new Promise<string>((resolve) => {
        const checkHash = setInterval(() => {
          if (hash) {
            clearInterval(checkHash)
            resolve(hash)
          }
        }, 100)
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkHash)
          resolve('')
        }, 10000)
      })
    } catch (error: any) {
      logError('usePresaleManager.claimPresalerShare', error, { presaleId })
      const errorMessage = formatErrorMessage(error, 'Failed to claim presaler share')
      throw new Error(errorMessage)
    }
  }

  return {
    // Actions
    createPresale,
    contributeToPresale,
    approveUSDC,
    graduatePresale,
    cancelPresale,
    resolvePresale,
    forceResolvePresale,
    redeemPresale,
    claimFees,
    claimPresalerShare,
    
    // Data
    allowance: allowance ? parseUSDC(allowance) : 0,
    balance: balance ? parseUSDC(balance) : 0,
    getPresale,
    allPresales,
    pendingPresales,
    refetchBalance,
    refetchAllowance,
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    transactionStatus,
    
    // Contract addresses
    contracts,
  }
}

