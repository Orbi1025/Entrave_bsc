import { useReadContract } from 'wagmi'
import { getContractAddresses, PRESALE_MANAGER_ABI } from '@/lib/contracts'

export function usePresaleDetails(presaleId: string | undefined) {
  const contracts = getContractAddresses()

  const { data, isLoading, refetch } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: PRESALE_MANAGER_ABI,
    functionName: 'getPresale',
    args: presaleId ? [presaleId as `0x${string}`] : undefined,
    query: {
      enabled: !!presaleId,
    }
  })

  const presaleDetails = data ? {
    question: (data as any).question || '',
    targetAmount: (data as any).targetAmount?.toString() || '0',
    raisedAmount: (data as any).raisedAmount?.toString() || '0',
    deadline: (data as any).deadline?.toString() || '0',
    creator: (data as any).creator || '',
    questionId: (data as any).questionId || '',
    yesToken: (data as any).yesToken || '',
    noToken: (data as any).noToken || '',
    tokensCreated: (data as any).tokensCreated || false,
    lpCreated: (data as any).lpCreated || false,
    resolved: (data as any).resolved || false,
    minBond: (data as any).minBond?.toString() || '0',
    reserveAmount: (data as any).reserveAmount?.toString() || '0',
    lpWithdrawn: (data as any).lpWithdrawn?.toString() || '0',
    state: (data as any).state || 0,
    yesOdds: (data as any).yesOdds?.toString() || '0',
    noOdds: (data as any).noOdds?.toString() || '0',
  } : null

  return {
    presaleDetails,
    isLoading,
    refetch
  }
}

