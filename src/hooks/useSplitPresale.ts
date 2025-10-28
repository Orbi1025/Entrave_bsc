import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { PRESALE_MANAGER_ABI } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

export function useSplitPresale() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()

  const splitPresale = async (
    presaleManagerAddress: string,
    presaleId: string,
    usdcAmount: bigint
  ) => {
    try {
      console.log('🔍 Attempting splitPresale with:', {
        presaleManagerAddress,
        presaleId,
        usdcAmount: usdcAmount.toString()
      });

      // Always use Wagmi for transactions since users connect via MetaMask
      console.log('🎯 Using Wagmi writeContract (users connect via MetaMask)');
      
      await writeContract({
        address: presaleManagerAddress as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'splitPresale',
        args: [presaleId as `0x${string}`, usdcAmount]
      })
      console.log('✅ Wagmi splitPresale transaction sent');

    } catch (error) {
      console.error('❌ splitPresale error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Presale does not exist')) {
          throw new Error('Presale does not exist')
        } else if (error.message.includes('Presale not graduated yet')) {
          throw new Error('Presale not graduated yet')
        } else if (error.message.includes('Tokens not created yet')) {
          throw new Error('Tokens not created yet')
        } else if (error.message.includes('Transaction does not have a transaction hash')) {
          throw new Error('Transaction failed - please try again')
        } else {
          throw new Error(`Split failed: ${error.message}`)
        }
      }
      
      throw error
    }
  }

  // Monitor transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      console.log('✅ splitPresale transaction confirmed');
    }
  }, [isConfirmed])

  return {
    splitPresale,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  }
}