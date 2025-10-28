import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { PRESALE_MANAGER_ABI } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

export function useContributeToPresale() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()

  const contributeToPresale = async (
    presaleManagerAddress: string,
    presaleId: string,
    usdcAmount: bigint
  ) => {
    try {
      console.log('🔍 Attempting contributeToPresale with:', {
        presaleManagerAddress,
        presaleId,
        usdcAmount: usdcAmount.toString()
      });

      await writeContract({
        address: presaleManagerAddress as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'contributeToPresale',
        args: [presaleId as `0x${string}`, usdcAmount]
        // Let MetaMask estimate gas automatically for better accuracy
      })

      console.log('✅ contributeToPresale transaction submitted successfully');

      toast({
        title: "Contribution Transaction Submitted",
        description: "Please confirm the contribution transaction in your wallet",
      })

    } catch (error) {
      console.error('❌ Error executing contributeToPresale:', error)
      
      // Check for specific error types
      let errorMessage = 'Unknown error occurred'
      
      if (error instanceof Error) {
        if (error.message.includes('Presale does not exist')) {
          errorMessage = 'This presale does not exist on the contract'
        } else if (error.message.includes('Presale not active')) {
          errorMessage = 'This presale is not active for contributions'
        } else if (error.message.includes('Insufficient funds')) {
          errorMessage = 'Insufficient USDT balance'
        } else if (error.message.includes('Transaction does not have a transaction hash')) {
          errorMessage = 'Transaction failed - contract may not exist or function may not be available'
        } else if (error.message.includes('execution reverted')) {
          errorMessage = 'Transaction reverted - check if presale exists and is active'
        } else if (error.message.includes('insufficient funds')) {
          errorMessage = 'Insufficient funds for gas fees'
        } else {
          errorMessage = error.message
        }
      }
      
      toast({
        title: "Contribution Failed",
        description: errorMessage,
        variant: "destructive"
      })
      throw error
    }
  }

  // Monitor transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
    }
  }, [isConfirmed])

  return {
    contributeToPresale,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  }
}
