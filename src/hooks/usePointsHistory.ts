import { useEffect, useState } from 'react'
import { supabase, PointsHistory } from '@/lib/supabase'

export function usePointsHistory(walletAddress: string | undefined, limit = 50) {
  const [history, setHistory] = useState<PointsHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!walletAddress) {
      setHistory([])
      return
    }

    const fetchHistory = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('points_history')
          .select('*')
          .eq('wallet_address', walletAddress.toLowerCase())
          .order('created_at', { ascending: false })
          .limit(limit)

        if (fetchError) throw fetchError

        setHistory(data || [])
      } catch (err) {
        console.error('Error fetching points history:', err)
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`points_history:${walletAddress}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'points_history',
          filter: `wallet_address=eq.${walletAddress.toLowerCase()}`
        },
        (payload) => {
          if (payload.new) {
            setHistory((prev) => [payload.new as PointsHistory, ...prev].slice(0, limit))
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [walletAddress, limit])

  return { history, isLoading, error }
}

