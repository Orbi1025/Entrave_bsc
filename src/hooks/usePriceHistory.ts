import { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { useRealTimeOdds } from './useRealTimeOdds'

interface PricePoint {
  date: string
  yes: number
  no: number
  timestamp: number
}

// Query to get contribution history for price evolution
const GET_CONTRIBUTION_HISTORY = gql`
  query GetContributionHistory($presaleId: Bytes!) {
    contributions(
      where: { presale: $presaleId }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      amount
      timestamp
      blockNumber
    }
    presale(id: $presaleId) {
      id
      yesOdds
      noOdds
      raisedAmount
      targetAmount
      graduatedAt
      createdAt
    }
  }
`

export function usePriceHistory(presaleId: string, isResolved: boolean = false, forceResolvedAnswer?: number) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Get real-time odds for current prices (only if not resolved)
  const { 
    yesPrice: liveYesPrice, 
    noPrice: liveNoPrice, 
    isLoading: oddsLoading,
    error: oddsError 
  } = useRealTimeOdds(isResolved ? undefined : presaleId)

  useEffect(() => {
    const fetchPriceHistory = async () => {
      const SUBGRAPH_URL = import.meta.env.VITE_SUBGRAPH_URL || ''
      
      if (!SUBGRAPH_URL || !presaleId) {
        // Generate fallback data if no subgraph
        const now = Date.now()
        const dayInMs = 24 * 60 * 60 * 1000
        const fallbackData: PricePoint[] = []
        
        for (let i = 30; i >= 0; i--) {
          fallbackData.push({
            date: new Date(now - i * dayInMs).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            yes: 50,
            no: 50,
            timestamp: now - i * dayInMs
          })
        }
        
        setPriceHistory(fallbackData)
        setIsLoading(false)
        return
      }

      try {
        const data = await request(SUBGRAPH_URL, GET_CONTRIBUTION_HISTORY, { presaleId }) as any
        
        if (!data.presale) {
          setPriceHistory([])
          setIsLoading(false)
          return
        }

        const presale = data.presale
        const contributions = data.contributions || []
        
        const now = Date.now()
        const createdAt = parseInt(presale.createdAt) * 1000
        const graduatedAt = presale.graduatedAt ? parseInt(presale.graduatedAt) * 1000 : null
        
        const history: PricePoint[] = []
        
        // Phase 1: Before graduation - prices evolve based on funding progress
        if (contributions.length > 0) {
          let cumulativeAmount = 0
          const targetAmount = parseInt(presale.targetAmount)
          
          contributions.forEach((contrib: any, index: number) => {
            cumulativeAmount += parseInt(contrib.amount)
            const timestamp = parseInt(contrib.timestamp) * 1000
            
            // Price evolution based on funding (more funding = higher confidence = price moves)
            const fundingRatio = cumulativeAmount / targetAmount
            // Slight random variation around 50% before graduation
            const basePrice = 50
            const variation = (fundingRatio - 0.5) * 10 // ±5% max variation
            const yesPrice = Math.max(40, Math.min(60, basePrice + variation))
            
            history.push({
              date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              yes: parseFloat(yesPrice.toFixed(1)),
              no: parseFloat((100 - yesPrice).toFixed(1)),
              timestamp
            })
          })
        }
        
        // Phase 2: After graduation - use actual odds from subgraph
        if (graduatedAt) {
          const yesOdds = parseInt(presale.yesOdds)
          const noOdds = parseInt(presale.noOdds)
          
          // Add graduation point with initial odds from subgraph
          history.push({
            date: new Date(graduatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            yes: yesOdds,
            no: noOdds,
            timestamp: graduatedAt
          })
          
          // Fill in days between graduation and now with stable prices (odds-based)
          const daysSinceGraduation = Math.floor((now - graduatedAt) / (24 * 60 * 60 * 1000))
          for (let i = 1; i <= Math.min(daysSinceGraduation, 30); i++) {
            const timestamp = graduatedAt + (i * 24 * 60 * 60 * 1000)
            // Use stable odds-based prices (no random variation)
            const yesPrice = yesOdds
            
            history.push({
              date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              yes: parseFloat(yesPrice.toFixed(1)),
              no: parseFloat((100 - yesPrice).toFixed(1)),
              timestamp
            })
          }
        }
        
        // If no data, create default 30-day history starting from creation
        if (history.length === 0) {
          const dayInMs = 24 * 60 * 60 * 1000
          for (let i = 30; i >= 0; i--) {
            const timestamp = now - i * dayInMs
            if (timestamp >= createdAt) {
              history.push({
                date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                yes: 50,
                no: 50,
                timestamp
              })
            }
          }
        }
        
        // Always add current point with real-time odds or final result if resolved
        let finalYesPrice: number
        let finalNoPrice: number
        
        if (isResolved && forceResolvedAnswer !== undefined) {
          // Market is resolved: YES won = 100/0, NO won = 0/100
          finalYesPrice = forceResolvedAnswer === 1 ? 100 : 0
          finalNoPrice = forceResolvedAnswer === 1 ? 0 : 100
        } else {
          // Market is not resolved: use live odds or fallback
          finalYesPrice = liveYesPrice || (presale.yesOdds ? parseInt(presale.yesOdds) : 50)
          finalNoPrice = liveNoPrice || (presale.noOdds ? parseInt(presale.noOdds) : 50)
        }
        
        // Add current point with live prices (if different from last point)
        const lastPoint = history[history.length - 1]
        if (lastPoint && (lastPoint.yes !== finalYesPrice || lastPoint.no !== finalNoPrice)) {
          // Add new point for current live prices
          history.push({
            date: new Date(now).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            yes: finalYesPrice,
            no: finalNoPrice,
            timestamp: now
          })
        } else if (history.length > 0) {
          // Update last point with live prices
          history[history.length - 1].yes = finalYesPrice
          history[history.length - 1].no = finalNoPrice
        }
        
        setPriceHistory(history)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching price history:', error)
        // Fallback to simple data
        const now = Date.now()
        const dayInMs = 24 * 60 * 60 * 1000
        const fallbackData: PricePoint[] = []
        
        for (let i = 30; i >= 0; i--) {
          fallbackData.push({
            date: new Date(now - i * dayInMs).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            yes: 50,
            no: 50,
            timestamp: now - i * dayInMs
          })
        }
        
        setPriceHistory(fallbackData)
        setIsLoading(false)
      }
    }

    fetchPriceHistory()
  }, [presaleId, liveYesPrice, liveNoPrice, isResolved, forceResolvedAnswer])

  return {
    priceHistory,
    isLoading: isLoading || (isResolved ? false : oddsLoading),
    liveYesPrice,
    liveNoPrice,
    hasLiveData: !isResolved && !oddsError && (liveYesPrice !== undefined || liveNoPrice !== undefined),
    oddsError: isResolved ? null : oddsError
  }
}

