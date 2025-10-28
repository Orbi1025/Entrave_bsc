import { useQuery } from '@tanstack/react-query'
import { fetchUserContributions } from '@/lib/subgraph'

export function useUserContributions(userAddress?: string) {
  return useQuery({
    queryKey: ['userContributions', userAddress],
    queryFn: () => fetchUserContributions(userAddress!),
    enabled: !!userAddress,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  })
}

