import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { USDC_ABI, getContractAddresses } from '@/lib/contracts'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'

// Cache pour stocker les approbations déjà faites
const approvalCache = new Map<string, { approved: boolean; timestamp: number }>()
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 heures

export function useTokenApproval() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  const { toast } = useToast()
  const [isApproved, setIsApproved] = useState(false)
  const [lastApprovalKey, setLastApprovalKey] = useState<string | null>(null)

  const approveToken = async (
    tokenAddress: string,
    spenderAddress: string,
    amount: bigint
  ) => {
    try {
      // Créer une clé de cache pour cette approbation
      const cacheKey = `${tokenAddress}-${spenderAddress}`
      
      console.log('🔍 Requesting fresh approval for:', cacheKey);

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [spenderAddress as `0x${string}`, amount]
        // Let MetaMask estimate gas automatically for better accuracy
      })

      // Mémoriser la clé pour persister l'approbation à la confirmation
      setLastApprovalKey(cacheKey)

      toast({
        title: "Token Approval",
        description: "Please confirm the token approval transaction in your wallet",
      })

    } catch (error) {
      toast({
        title: "Approval Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive"
      })
      throw error
    }
  }

  // Monitor transaction confirmation
  useEffect(() => {
    if (isConfirmed && lastApprovalKey) {
      setIsApproved(true)
      // Mettre en cache l'approbation réussie dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`approval_${lastApprovalKey}`, JSON.stringify({
          approved: true,
          timestamp: Date.now()
        }))
      }
      
      // Mettre aussi en cache en mémoire
      approvalCache.set(lastApprovalKey, { approved: true, timestamp: Date.now() })
      setLastApprovalKey(null) // Reset after confirmation
      
      console.log('✅ Approval confirmed and cached:', lastApprovalKey)
    }
  }, [isConfirmed, lastApprovalKey])

  return {
    approveToken,
    isPending,
    isConfirming,
    isConfirmed,
    isApproved,
    error,
    hash
  }
}
