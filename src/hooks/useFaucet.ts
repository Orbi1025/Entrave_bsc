import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { getContractAddresses, USDC_ABI } from '@/lib/contracts'
import { useState, useEffect } from 'react'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

export function useFaucet() {
  const { address, chainId } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const [transactionStatus, setTransactionStatus] = useState<{
    type: 'faucet' | null
    status: 'pending' | 'confirming' | 'success' | 'error'
    message: string
  }>({ type: null, status: 'pending', message: '' })

  const contracts = getContractAddresses(chainId)

  // Mint test USDC from faucet
  const mintTestUSDC = async () => {
    try {
      setTransactionStatus({ type: 'faucet', status: 'pending', message: 'Requesting test USDC...' })
      
      console.log('🚰 Faucet: Calling TestUSDC contract')
      console.log('📡 TestUSDC Address:', contracts.USDC)
      console.log('🌐 Network Chain ID:', chainId)
      
      // Vérifier qu'on est sur BSC Mainnet
      if (chainId !== 56) {
        throw new Error(ERROR_MESSAGES.NETWORK.WRONG_NETWORK)
      }
      
      // Use TestUSDC contract directly
      writeContract({
        address: contracts.USDC as `0x${string}`, // This is the TestUSDC address
        abi: USDC_ABI,
        functionName: 'faucet',
      } as any)
    } catch (err) {
      logError('useFaucet.mintTestUSDC', err, { chainId, address: contracts.USDC })
      const errorMessage = formatErrorMessage(err, ERROR_MESSAGES.FAUCET.MINT_FAILED)
      setTransactionStatus({ 
        type: 'faucet', 
        status: 'error', 
        message: errorMessage
      })
    }
  }

  // Update transaction status when hash is received
  useEffect(() => {
    if (hash && transactionStatus.type === 'faucet') {
      console.log('📡 Transaction hash received:', hash)
      setTransactionStatus(prev => ({ ...prev, status: 'confirming', message: 'Confirming transaction...' }))
    }
  }, [hash, transactionStatus.type])

  // Update transaction status based on confirmation
  useEffect(() => {
    if (isConfirmed && transactionStatus.type === 'faucet') {
      console.log('✅ Faucet transaction confirmed!')
      setTransactionStatus(prev => ({ ...prev, status: 'success', message: 'Test USDT minted successfully! Your balance will update shortly.' }))
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setTransactionStatus({ type: null, status: 'pending', message: '' })
      }, 5000)
    }
  }, [isConfirmed, transactionStatus.type])

  // Update transaction status on error
  useEffect(() => {
    if (error && transactionStatus.type === 'faucet') {
      logError('useFaucet.transactionError', error, { chainId, address: contracts.USDC })
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.FAUCET.MINT_FAILED)
      setTransactionStatus(prev => ({ 
        ...prev, 
        status: 'error', 
        message: errorMessage
      }))
    }
  }, [error, transactionStatus.type])

  return {
    // Actions
    mintTestUSDC,
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    error,
    transactionStatus,
    
    // Contract addresses
    contracts,
  }
}

