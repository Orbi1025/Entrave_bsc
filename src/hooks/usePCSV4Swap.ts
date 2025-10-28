import { useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi'
import { PCS_V4_ROUTER_ABI } from '@/lib/pancakeswap-v4/interfaces/IPCSV4Router'
import { useToast } from '@/hooks/use-toast'

export function usePCSV4Swap() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()
  const publicClient = usePublicClient()

  const executeSwap = async (
    routerAddress: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: bigint,
    amountOutMinimum: bigint,
    recipient: string,
    deadline: bigint,
    fee: number,
    tickSpacing: number
  ) => {
    try {
      console.log('🔄 Executing PCS V4 swap:', {
        router: routerAddress,
        tokenIn,
        tokenOut,
        amountIn: amountIn.toString(),
        amountOutMinimum: amountOutMinimum.toString(),
        recipient,
        deadline: deadline.toString(),
        fee,
        tickSpacing
      })

      // 1) Simulate to catch reverts and get precise gas estimate
      let simRequest: any | null = null
      try {
        const sim = await publicClient?.simulateContract({
          address: routerAddress as `0x${string}`,
          abi: PCS_V4_ROUTER_ABI,
          functionName: 'swapExactInputSingle',
          args: [
            tokenIn as `0x${string}`,
            tokenOut as `0x${string}`,
            amountIn,
            amountOutMinimum,
            recipient as `0x${string}`,
            deadline,
            fee,
            tickSpacing
          ],
          account: recipient as `0x${string}`,
          value: 0n,
        })
        // Use the simulation's request (includes gas params)
        // @ts-ignore
        simRequest = sim?.request
      } catch (simErr) {
        console.error('❌ PCS V4 swap simulation failed:', simErr)
        throw new Error('Swap simulation failed. Check liquidity, allowance and parameters.')
      }

      // 2) Send the real tx with the simulated request (lower, accurate gas)
      if (simRequest) {
        await writeContract(simRequest as any)
      } else {
        // Fallback if simulate wasn't available
        await writeContract({
          address: routerAddress as `0x${string}`,
          abi: PCS_V4_ROUTER_ABI,
          functionName: 'swapExactInputSingle',
          args: [
            tokenIn as `0x${string}`,
            tokenOut as `0x${string}`,
            amountIn,
            amountOutMinimum,
            recipient as `0x${string}`,
            deadline,
            fee,
            tickSpacing
          ],
          value: 0n
        })
      }

      toast({
        title: "Swap Transaction Submitted",
        description: "Please confirm the swap transaction in your wallet",
      })

    } catch (error) {
      console.error('Error executing swap:', error)
      toast({
        title: "Swap Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive"
      })
      throw error
    }
  }

  return {
    executeSwap,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  }
}
