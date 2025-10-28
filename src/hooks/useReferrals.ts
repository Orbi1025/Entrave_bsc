import { useEffect, useState } from 'react'
import { supabase, Referral } from '@/lib/supabase'

export function useReferrals(walletAddress: string | undefined) {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [totalReferrals, setTotalReferrals] = useState(0)
  const [totalPointsEarned, setTotalPointsEarned] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!walletAddress) {
      setReferrals([])
      setTotalReferrals(0)
      setTotalPointsEarned(0)
      return
    }

    const fetchReferrals = async () => {
      setIsLoading(true)

      try {
        const { data, error } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_address', walletAddress.toLowerCase())
          .order('created_at', { ascending: false })

        if (error) throw error

        const referralData = data || []
        setReferrals(referralData)
        setTotalReferrals(referralData.length)
        setTotalPointsEarned(referralData.reduce((sum, r) => sum + r.points_earned, 0))
      } catch (err) {
        console.error('Error fetching referrals:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferrals()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`referrals:${walletAddress}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'referrals',
          filter: `referrer_address=eq.${walletAddress.toLowerCase()}`
        },
        (payload) => {
          if (payload.new) {
            const newReferral = payload.new as Referral
            setReferrals((prev) => [newReferral, ...prev])
            setTotalReferrals((prev) => prev + 1)
            setTotalPointsEarned((prev) => prev + newReferral.points_earned)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [walletAddress])

  return { referrals, totalReferrals, totalPointsEarned, isLoading }
}

