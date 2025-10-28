import { useEffect, useState } from 'react'
import { supabase, UserPoints } from '@/lib/supabase'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

export function useUserPoints(walletAddress: string | undefined) {
  const [points, setPoints] = useState<UserPoints | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!walletAddress) {
      setPoints(null)
      return
    }

    const fetchPoints = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Use single() since wallet_address is now primary key
        const { data, error: fetchError } = await supabase
          .from('user_points')
          .select('*')
          .eq('wallet_address', walletAddress.toLowerCase())
          .single()

        if (fetchError) {
          // If user doesn't exist, create them
          if (fetchError.code === 'PGRST116') {
            await createUserPoints(walletAddress)
            // Fetch again after creation
            const { data: newData } = await supabase
              .from('user_points')
              .select('*')
              .eq('wallet_address', walletAddress.toLowerCase())
              .single()
            
            if (newData) {
              setPoints(newData)
            }
          } else {
            logError('useUserPoints.fetchPoints', fetchError, { walletAddress })
            throw fetchError
          }
        } else if (data) {
          setPoints(data)
        }
      } catch (err) {
        logError('useUserPoints.fetchPoints', err, { walletAddress })
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPoints()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`user_points:${walletAddress}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_points',
          filter: `wallet_address=eq.${walletAddress.toLowerCase()}`
        },
        (payload) => {
          if (payload.new) {
            setPoints(payload.new as UserPoints)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [walletAddress])

  return { points, isLoading, error, refetch: () => {} }
}

async function createUserPoints(walletAddress: string) {
  const referralCode = generateReferralCode(walletAddress)
  
  const { error } = await supabase
    .from('user_points')
    .insert({
      wallet_address: walletAddress.toLowerCase(),
      email: null,
      total_points: 100, // Points de bienvenue
      rank: 0, // Sera mis à jour automatiquement
      multiplier: 1.0,
      referral_code: referralCode,
      referred_by: null,
      is_beta_tester: false
    })

  if (error) {
    // If it's a duplicate key error, user already exists
    if (error.code === '23505') {
      console.log(`✅ User already exists (duplicate key): ${walletAddress}`)
    } else {
      logError('useUserPoints.createUserPoints', error, { walletAddress })
      throw error
    }
  } else {
    console.log(`✅ Created user points for: ${walletAddress} with 100 welcome points`)
  }
}

function generateReferralCode(walletAddress: string): string {
  // Generate a 12-character hex code (like: 90fd790378e1, d2292164470d, 3c56d915437f)
  // This should match the database function generate_referral_code()
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

