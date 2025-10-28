import { useEffect } from 'react'
import { useWallet } from './useWallet'
import { supabase } from '@/lib/supabase'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

export function useAutoRegisterUser() {
  const { address, isConnected } = useWallet()

  useEffect(() => {
    if (!address || !isConnected) return

    const registerUser = async () => {
      try {
        // Check if user already exists (wallet_address is now primary key)
        const { data: existingUser, error: fetchError } = await supabase
          .from('user_points')
          .select('wallet_address, email')
          .eq('wallet_address', address.toLowerCase())
          .single()

        // If user exists, do nothing
        if (existingUser) {
          console.log(`✅ User already exists: ${address}`)
          return
        }

        // If error is not "not found", log the error
        if (fetchError && fetchError.code !== 'PGRST116') {
          logError('useAutoRegisterUser.fetchUser', fetchError, { address })
          return
        }

        // User doesn't exist, create them
        const referralCode = generateReferralCode(address)
        
        // Check if there's a referral code in the URL
        const urlReferralCode = getReferralCodeFromUrl()
        let referredBy = null
        
        if (urlReferralCode) {
          // Verify the referral code exists in the database
          const { data: referrerData, error: referrerError } = await supabase
            .from('user_points')
            .select('wallet_address')
            .eq('referral_code', urlReferralCode)
            .single()
          
          if (referrerData && !referrerError) {
            // Additional check: prevent self-referral
            if (referrerData.wallet_address.toLowerCase() !== address.toLowerCase()) {
              referredBy = urlReferralCode
              console.log(`✅ User referred by: ${urlReferralCode}`)
            } else {
              console.log(`⚠️ Self-referral prevented: ${urlReferralCode}`)
            }
          } else {
            console.log(`⚠️ Invalid referral code: ${urlReferralCode}`)
          }
        }
        
        const { error: insertError } = await supabase
          .from('user_points')
          .insert({
            wallet_address: address.toLowerCase(),
            email: null, // Will be updated when email is linked
            total_points: 100, // Points de bienvenue
            rank: 0,
            multiplier: 1.0, // Will be updated automatically by trigger
            referral_code: referralCode,
            referred_by: referredBy, // Set from URL parameter
            is_beta_tester: false // Will be updated automatically by trigger
          })

        if (insertError) {
          // If it's a duplicate key error, user already exists
          if (insertError.code === '23505') {
            console.log(`✅ User already exists (duplicate key): ${address}`)
          } else {
            logError('useAutoRegisterUser.createUser', insertError, { address })
          }
        } else {
          console.log(`✅ Auto-registered user: ${address}`)
        }
      } catch (error) {
        logError('useAutoRegisterUser.registerUser', error, { address })
      }
    }

    registerUser()
  }, [address, isConnected])
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

function getReferralCodeFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('ref')
}
