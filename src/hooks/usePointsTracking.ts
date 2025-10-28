import { useEffect, useRef } from 'react'
import { useWallet } from './useWallet'
import { trackTrade, trackLaunchpadContribution, trackMarketCreation } from '@/lib/pointsTracker'

export function usePointsTracking() {
  const { address } = useWallet()
  const hasTrackedRef = useRef<Set<string>>(new Set())

  const trackTradePoints = async (amountUSD: number, txHash: string) => {
    if (!address || !txHash) return
    
    const key = `trade-${txHash}`
    if (hasTrackedRef.current.has(key)) return
    
    try {
      await trackTrade(address, amountUSD, txHash)
      hasTrackedRef.current.add(key)
      console.log(`✅ Tracked trade: ${amountUSD} USDC → ${amountUSD * 10} points`)
    } catch (error) {
      console.error('Error tracking trade points:', error)
    }
  }

  const trackLaunchpadPoints = async (amountUSD: number, presaleId: string, txHash: string) => {
    if (!address || !txHash) return
    
    const key = `launchpad-${txHash}`
    if (hasTrackedRef.current.has(key)) return
    
    try {
      await trackLaunchpadContribution(address, amountUSD, presaleId, txHash)
      hasTrackedRef.current.add(key)
      console.log(`✅ Tracked launchpad: ${amountUSD} USDC → ${amountUSD * 100} points`)
    } catch (error) {
      console.error('Error tracking launchpad points:', error)
    }
  }

  const trackMarketCreationPoints = async (marketId: string, txHash: string) => {
    if (!address || !txHash) return
    
    const key = `market-${txHash}`
    if (hasTrackedRef.current.has(key)) return
    
    try {
      await trackMarketCreation(address, marketId, txHash)
      hasTrackedRef.current.add(key)
      console.log(`✅ Tracked market creation: 500 points`)
    } catch (error) {
      console.error('Error tracking market creation points:', error)
    }
  }

  return {
    trackTradePoints,
    trackLaunchpadPoints,
    trackMarketCreationPoints
  }
}

