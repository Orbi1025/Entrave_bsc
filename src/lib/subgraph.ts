import { request, gql } from 'graphql-request'
import { Presale, Market, ProtocolStats } from '@/types'
import { goldskyMonitor } from './goldskyMonitor'

interface ContributorData {
  id: string;
  address: string;
  totalContributed: string;
  contributionCount: string;
  firstContributionAt: string;
  lastContributionAt: string;
  presalerShareClaimed: boolean;
  presale: {
    id: string;
    question: string;
    state: string;
    raisedAmount: string;
    targetAmount: string;
    deadline: string;
    tokensCreated: boolean;
    lpCreated: boolean;
    resolved: boolean;
    graduatedAt?: string;
    yesOdds: string;
    noOdds: string;
    forceResolvedAnswer?: string;
  };
  contributions: Array<{
    id: string;
    amount: string;
    timestamp: string;
    transactionHash: string;
  }>;
}

const SUBGRAPH_URL = import.meta.env.VITE_SUBGRAPH_URL || ''

// GraphQL queries - Updated to match the actual schema
export const GET_PRESALES = gql`
  query GetPresales {
    presales {
      id
      question
      targetAmount
      raisedAmount
      creator
      deadline
      contributorCount
      tokensCreated
      lpCreated
      resolved
      state
      yesOdds
      noOdds
      reserveAmount
      lpWithdrawn
      forceResolvedAnswer
      yesToken
      noToken
      totalSwapVolume
      creatorClaimed
    }
  }
`

export const GET_PENDING_PRESALES = gql`
  query GetPendingPresales {
    presales(where: { state: "Pending" }) {
      id
      question
      targetAmount
      raisedAmount
      creator
      deadline
      contributorCount
      tokensCreated
      lpCreated
      resolved
      state
      yesOdds
      noOdds
      reserveAmount
      lpWithdrawn
      forceResolvedAnswer
      yesToken
      noToken
    }
  }
`

export const GET_GRADUATED_PRESALES = gql`
  query GetGraduatedPresales {
    presales(where: { state: "Graduated" }) {
      id
      question
      targetAmount
      raisedAmount
      creator
      deadline
      contributorCount
      tokensCreated
      lpCreated
      resolved
      state
      yesOdds
      noOdds
      reserveAmount
      lpWithdrawn
      resolutionMode
      forceResolvedAnswer
      yesToken
      noToken
      creatorClaimed
    }
  }
`

export const GET_MARKETS = gql`
  query GetMarkets {
    presales(where: { tokensCreated: true }) {
      id
      question
      targetAmount
      raisedAmount
      creator
      deadline
      contributorCount
      tokensCreated
      lpCreated
      resolved
    }
  }
`

export const GET_PROTOCOL_STATS = gql`
  query GetProtocolStats {
    protocol(id: "presale-manager-protocol") {
      totalPresales
      totalVolumeUSD
      totalLiquidityCreated
    }
  }
`

export const GET_USER_CONTRIBUTIONS = gql`
  query GetUserContributions($userAddress: Bytes!) {
    contributors(where: { address: $userAddress }) {
      id
      address
      totalContributed
      contributionCount
      firstContributionAt
      lastContributionAt
      presalerShareClaimed
      presale {
        id
        question
        state
        raisedAmount
        targetAmount
        deadline
        tokensCreated
        lpCreated
        resolved
        graduatedAt
        yesOdds
        noOdds
        forceResolvedAnswer
      }
      contributions {
        id
        amount
        timestamp
        transactionHash
      }
    }
  }
`

export const GET_USER_CREATED_PRESALES = gql`
  query GetUserCreatedPresales($creatorAddress: Bytes!) {
    presales(where: { creator: $creatorAddress }) {
      id
      question
      targetAmount
      raisedAmount
      creator
      deadline
      contributorCount
      tokensCreated
      lpCreated
      resolved
      state
      createdAt
      forceResolvedAnswer
      yesToken
      noToken
    }
  }
`

// API functions
export async function fetchPresales(): Promise<Presale[]> {
  if (!SUBGRAPH_URL) {
    console.log('🔄 fetchPresales: No subgraph URL configured')
    return []
  }

  try {
    console.log('🔄 fetchPresales: Fetching presales from subgraph...')
    const startTime = Date.now()
    const data = await request(SUBGRAPH_URL, GET_PRESALES) as { presales?: Presale[] }
    const endTime = Date.now()
    const duration = endTime - startTime
    const presales = data.presales || []
    
    // Log to Goldsky monitor (success)
    goldskyMonitor.logCall('fetchPresales', true, duration)
    
    console.log(`✅ fetchPresales: Received ${presales.length} presales in ${duration}ms`)
    
    // Log volume data for graduated markets
    const graduatedMarkets = presales.filter(p => p.tokensCreated)
    if (graduatedMarkets.length > 0) {
      console.log('📊 Graduated markets with volumes:')
      graduatedMarkets.forEach(p => {
        const volume = (p as any).totalSwapVolume ? parseFloat((p as any).totalSwapVolume) / 1e18 : 0
        console.log(`  - ${p.question.substring(0, 40)}... : $${Math.round(volume)}`)
      })
    }
    
    return presales
  } catch (error) {
    const endTime = Date.now()
    const duration = endTime - Date.now()
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // Log to Goldsky monitor (failure)
    goldskyMonitor.logCall('fetchPresales', false, duration, errorMessage)
    
    console.error('❌ Subgraph error for presales:', error)
    return []
  }
}

export async function fetchPendingPresales(): Promise<Presale[]> {
  if (!SUBGRAPH_URL) {
    return []
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_PENDING_PRESALES) as { presales?: Presale[] }
    return data.presales || []
  } catch (error) {
    console.error('Subgraph error for pending presales:', error)
    return []
  }
}

export async function fetchGraduatedPresales(): Promise<Presale[]> {
  if (!SUBGRAPH_URL) {
    return []
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_GRADUATED_PRESALES) as { presales?: Presale[] }
    return data.presales || []
  } catch (error) {
    console.error('Subgraph error for graduated presales:', error)
    return []
  }
}

export async function fetchMarkets(): Promise<Market[]> {
  if (!SUBGRAPH_URL) {
    return []
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_MARKETS) as { presales?: Market[] }
    return (data.presales || []) as Market[]
  } catch (error) {
    console.error('Subgraph error for markets:', error)
    return []
  }
}

export async function fetchProtocolStats(): Promise<ProtocolStats | null> {
  if (!SUBGRAPH_URL) {
    return null
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_PROTOCOL_STATS) as { protocol?: ProtocolStats }
    return data.protocol || null
  } catch (error) {
    console.error('Subgraph error for protocol stats:', error)
    return null
  }
}

export async function fetchUserContributions(userAddress: string) {
  if (!SUBGRAPH_URL || !userAddress) {
    return []
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_USER_CONTRIBUTIONS, { 
      userAddress: userAddress.toLowerCase() 
    }) as { contributors?: ContributorData[] }
    return data.contributors || []
  } catch (error) {
    console.error('Subgraph error for user contributions:', error)
    return []
  }
}

export async function fetchUserCreatedPresales(creatorAddress: string) {
  if (!SUBGRAPH_URL || !creatorAddress) {
    return []
  }

  try {
    const data = await request(SUBGRAPH_URL, GET_USER_CREATED_PRESALES, { 
      creatorAddress: creatorAddress.toLowerCase() 
    }) as { presales?: Presale[] }
    return data.presales || []
  } catch (error) {
    console.error('Subgraph error for user created presales:', error)
    return []
  }
}

