import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { PRESALE_MANAGER_ABI } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

export function useRedeemPresale() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()

  const redeemPresale = async (
    presaleManagerAddress: string,
    presaleId: string
  ) => {
    try {
      console.log('🔍 Attempting redeemPresale with:', {
        presaleManagerAddress,
        presaleId
      });

      // Always use Wagmi for transactions since users connect via MetaMask
      console.log('🎯 Using Wagmi writeContract (users connect via MetaMask)');
      
      await writeContract({
        address: presaleManagerAddress as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'redeemPresale',
        args: [presaleId as `0x${string}`]
      })
      console.log('✅ Wagmi redeemPresale transaction sent');

    } catch (error) {
      console.error('❌ redeemPresale error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Presale does not exist')) {
          throw new Error('Presale does not exist')
        } else if (error.message.includes('Presale not yet resolved')) {
          throw new Error('Presale not yet resolved')
        } else if (error.message.includes('Transaction does not have a transaction hash')) {
          throw new Error('Transaction failed - please try again')
        } else {
          throw new Error(`Redeem failed: ${error.message}`)
        }
      }
      
      throw error
    }
  }

  // Monitor transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      console.log('✅ redeemPresale transaction confirmed');
    }
  }, [isConfirmed])

  return {
    redeemPresale,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  }
}
