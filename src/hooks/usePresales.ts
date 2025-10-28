import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPresales } from '@/lib/subgraph'
import { Presale, PresaleWithMetadata } from '@/types'
import { useAllPresaleMetadata } from './usePresaleMetadata'
import { combinePresaleWithMetadata } from '@/lib/presaleMetadataHelpers'

export function usePresales() {
  const queryClient = useQueryClient()
  const { metadata: allMetadata, isLoading: metadataLoading } = useAllPresaleMetadata()
  
  const query = useQuery<Presale[]>({
    queryKey: ['presales'],
    queryFn: fetchPresales,
    staleTime: 120000, // 2 minutes - increased to reduce subgraph calls
    refetchInterval: false, // Disable auto-refetch to avoid rate limiting
  })

  // Combine presales with metadata
  const presalesWithMetadata: PresaleWithMetadata[] = query.data?.map(presale => {
    const metadata = allMetadata.find(m => m.market_id === presale.id)
    return combinePresaleWithMetadata(presale, metadata)
  }) || []

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['presales'] })
    queryClient.invalidateQueries({ queryKey: ['pendingPresales'] })
    return query.refetch()
  }

  return {
    ...query,
    data: presalesWithMetadata, // Return combined data
    isLoading: query.isLoading || metadataLoading, // Include metadata loading state
    refetch
  }
}

