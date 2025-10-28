import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'Accept': 'application/json' },
  },
})

// Types pour les tables Supabase
export interface Waitlist {
  id: string
  email: string
  created_at: string
  referral_code: string | null
  own_referral_code: string | null
  is_verified: boolean
  verification_token: string | null
}

export interface UserPoints {
  wallet_address: string
  email: string | null
  total_points: number
  rank: number
  multiplier: number
  referral_code: string
  referred_by: string | null
  is_beta_tester: boolean
  created_at: string
  updated_at: string
}

export interface PointsHistory {
  id: string
  wallet_address: string
  action_type: 'trade' | 'launchpad' | 'market_creation' | 'referral'
  points: number
  description: string
  transaction_hash: string | null
  metadata: Record<string, any> | null
  created_at: string
}

export interface Referral {
  id: string
  referrer_address: string
  referred_address: string
  points_earned: number
  created_at: string
}

// Database types
export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: Waitlist
        Insert: Omit<Waitlist, 'id' | 'created_at'>
        Update: Partial<Omit<Waitlist, 'id' | 'created_at'>>
      }
      user_points: {
        Row: UserPoints
        Insert: Omit<UserPoints, 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserPoints, 'wallet_address' | 'created_at'>>
      }
      points_history: {
        Row: PointsHistory
        Insert: Omit<PointsHistory, 'id' | 'created_at'>
        Update: Partial<Omit<PointsHistory, 'id' | 'created_at'>>
      }
      referrals: {
        Row: Referral
        Insert: Omit<Referral, 'id' | 'created_at'>
        Update: Partial<Omit<Referral, 'id' | 'created_at'>>
      }
    }
  }
}

