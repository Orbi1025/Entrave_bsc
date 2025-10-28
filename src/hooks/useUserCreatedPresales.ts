import { useQuery } from '@tanstack/react-query'
import { fetchUserCreatedPresales } from '@/lib/subgraph'

export function useUserCreatedPresales(creatorAddress?: string) {
  return useQuery({
    queryKey: ['userCreatedPresales', creatorAddress],
    queryFn: () => fetchUserCreatedPresales(creatorAddress!),
    enabled: !!creatorAddress,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  })
}

