import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useWallet } from './useWallet'
import { supabase } from '@/lib/supabase'
import { logError } from '@/lib/errorMessages'

export function useEmailSync() {
  const { user, authenticated } = usePrivy()
  const { address } = useWallet()

  useEffect(() => {
    if (!address || !authenticated || !user?.email) return

    const syncEmail = async () => {
      try {
        const email = user.email.address
        
        // 1. Check if user exists in user_points (wallet_address is primary key)
        const { data: existingUser, error: fetchError } = await supabase
          .from('user_points')
          .select('email')
          .eq('wallet_address', address.toLowerCase())
          .single()

        if (fetchError) {
          logError('useEmailSync.fetchUser', fetchError, { address, email })
          return
        }

        // If user doesn't exist, do nothing (should be created by useAutoRegisterUser)
        if (!existingUser) {
          console.log(`User not found for wallet ${address}, skipping email sync`)
          return
        }

        // 2. If user doesn't have email yet, proceed with synchronization
        if (!existingUser.email) {
          // 3. Check if email exists in waitlist
          const { data: waitlistUser, error: waitlistError } = await supabase
            .from('waitlist')
            .select('email, own_referral_code, referral_code')
            .eq('email', email.toLowerCase())
            .single()

          if (waitlistError) {
            logError('useEmailSync.checkWaitlist', waitlistError, { email })
            return
          }

          // 4. Only sync if user is part of waitlist
          if (waitlistUser) {
            console.log(`User found in waitlist: ${email}`)

            // 5. Update email in user_points
            const { error: updateError } = await supabase
              .from('user_points')
              .update({ 
                email: email.toLowerCase(),
                // If email is in waitlist, update referral info
                referral_code: waitlistUser.own_referral_code,
                referred_by: waitlistUser.referral_code
              })
              .eq('wallet_address', address.toLowerCase())

            if (updateError) {
              logError('useEmailSync.updateEmail', updateError, { address, email })
            } else {
              console.log(`✅ Synced email for user: ${address} -> ${email}`)
            }
          } else {
            console.log(`User email ${email} not found in waitlist - skipping sync`)
          }
        }
      } catch (error) {
        logError('useEmailSync.syncEmail', error, { address, userEmail: user?.email?.address })
      }
    }

    void syncEmail()
  }, [address, authenticated, user?.email])
}
