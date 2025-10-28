import { Presale, Market } from '@/types'

/**
 * Converts a BigInt timestamp to a readable date string
 */
export function formatDeadline(deadline: string): string {
  try {
    const timestamp = parseInt(deadline) * 1000
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'N/A'
  }
}

/**
 * Converts a USDT amount from subgraph to number
 * Subgraph stores amounts in USDT wei (18 decimals)
 * Ex: "1000000000000000000000" (1000 * 10^18) = 1000 USDT
 */
export function parseUSDCAmount(amount: string): number {
  try {
    // Convert string to BigInt to handle very large numbers
    const amountBigInt = BigInt(amount)
    
    // USDT amounts have 18 decimals
    // Divide by 1e18 to get the amount in USDT
    return Number(amountBigInt) / 1e18
  } catch (error) {
    console.error('Error parsing USDT amount:', amount, error)
    return 0
  }
}

/**
 * Formate un montant en K ou M
 */
export function formatAmount(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(0)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`
  }
  return `$${amount.toFixed(0)}`
}

/**
 * Formate un montant en nombre entier avec séparateurs de milliers
 * Ex: 1234.56 -> "$1,235" (arrondi)
 */
export function formatIntegerAmount(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`
}

/**
 * Détermine la catégorie basée sur la question
 */
export function determineCategory(question: string): string {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('bitcoin') || lowerQuestion.includes('ethereum') || lowerQuestion.includes('crypto')) {
    return 'crypto'
  }
  if (lowerQuestion.includes('trump') || lowerQuestion.includes('election') || lowerQuestion.includes('president')) {
    return 'politics'
  }
  if (lowerQuestion.includes('defi') || lowerQuestion.includes('tvl') || lowerQuestion.includes('stablecoin')) {
    return 'finance'
  }
  if (lowerQuestion.includes('gpt') || lowerQuestion.includes('ai') || lowerQuestion.includes('openai') || lowerQuestion.includes('apple') || lowerQuestion.includes('iphone')) {
    return 'tech'
  }
  if (lowerQuestion.includes('world cup') || lowerQuestion.includes('sport') || lowerQuestion.includes('fifa')) {
    return 'sports'
  }
  if (lowerQuestion.includes('china') || lowerQuestion.includes('chinese') || lowerQuestion.includes('beijing') || lowerQuestion.includes('shanghai') || lowerQuestion.includes('ccp') || lowerQuestion.includes('xi jinping') || lowerQuestion.includes('taiwan') || lowerQuestion.includes('hong kong')) {
    return 'china'
  }
  if (lowerQuestion.includes('geopolitics') || lowerQuestion.includes('international relations') || lowerQuestion.includes('diplomacy') || lowerQuestion.includes('war') || lowerQuestion.includes('peace') || lowerQuestion.includes('alliance') || lowerQuestion.includes('sanctions') || lowerQuestion.includes('trade war') || lowerQuestion.includes('conflict')) {
    return 'geopolitics'
  }
  if (lowerQuestion.includes('gdp') || lowerQuestion.includes('economy')) {
    return 'global'
  }
  if (lowerQuestion.includes('tesla') || lowerQuestion.includes('stock') || lowerQuestion.includes('business')) {
    return 'business'
  }
  if (lowerQuestion.includes('grammy') || lowerQuestion.includes('music') || lowerQuestion.includes('culture')) {
    return 'culture'
  }
  if (lowerQuestion.includes('social media') || lowerQuestion.includes('twitter') || lowerQuestion.includes('facebook')) {
    return 'social'
  }
  
  return 'trending'
}

/**
 * Generates a default image based on category
 */
export function getCategoryImage(category: string): string {
  const images: Record<string, string> = {
    crypto: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop',
    politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&h=200&fit=crop',
    finance: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
    tech: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop',
    sports: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop',
    global: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&h=200&fit=crop',
    business: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    culture: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
    china: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200&h=200&fit=crop',
    geopolitics: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=200&h=200&fit=crop',
  }
  return images[category] || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop'
}

/**
 * Converts odds from subgraph (BigInt) to percentage
 * Odds are stored on 100 (0-100)
 */
export function parseOdds(odds: number): number {
  // If odds is 0, the presale has not graduated
  // Return 50% by default
  if (odds === 0 || odds === null || odds === undefined) {
    return 50
  }
  // Odds can be stored from 0 to 100
  return Math.min(100, Math.max(0, odds))
}

/**
 * Transforms a Presale from subgraph to MarketCard format (Active Markets)
 * Note: Volume will be calculated separately using useMarketVolume hook
 */
export function transformPresaleToMarket(presale: Presale, metadata?: any) {
  const raisedAmount = parseUSDCAmount(presale.raisedAmount)
  const targetAmount = parseUSDCAmount(presale.targetAmount)
  
  // Use totalSwapVolume if available (for graduated markets), otherwise use raisedAmount
  const totalSwapVolume = (presale as any).totalSwapVolume ? parseUSDCAmount((presale as any).totalSwapVolume) : null;
  const volume = totalSwapVolume !== null ? totalSwapVolume : raisedAmount;
  
  // Use metadata category if available, otherwise fallback to determined category
  const category = metadata?.category || determineCategory(presale.question)
  
  // If market is resolved, set odds to 100% for winning token and 0% for losing token
  let yesPrice = parseOdds(presale.yesOdds);
  
  // Convert forceResolvedAnswer to number if it's a string (from subgraph)
  let forceResolvedAnswerNum: number | undefined;
  if (presale.forceResolvedAnswer !== undefined) {
    forceResolvedAnswerNum = typeof presale.forceResolvedAnswer === 'string' 
      ? parseInt(presale.forceResolvedAnswer, 10) 
      : presale.forceResolvedAnswer;
    
    if (presale.resolved && forceResolvedAnswerNum !== undefined && !isNaN(forceResolvedAnswerNum)) {
      // forceResolvedAnswer: 1 = YES won, 0 = NO won
      yesPrice = forceResolvedAnswerNum === 1 ? 100 : 0;
    }
  }
  
  // Determine status based on resolved and tokensCreated
  let status: 'launchpad' | 'open' | 'resolved';
  if (presale.resolved) {
    status = 'resolved';
  } else if (presale.tokensCreated) {
    status = 'open';
  } else {
    status = 'launchpad';
  }
  
  return {
    id: presale.id,
    question: metadata?.title || presale.question,
    category,
    yesPrice: yesPrice,
    volume: formatIntegerAmount(volume), // Use totalSwapVolume for real trading volume (integer format)
    liquidity: formatAmount(targetAmount),
    endDate: formatDeadline(presale.deadline),
    status,
    marketIcon: metadata?.market_icon || (metadata === null ? getCategoryImage(category) : undefined),
    creatorName: presale.creator ? `${presale.creator.slice(0, 6)}...${presale.creator.slice(-4)}` : undefined,
    yesToken: presale.yesToken,
    noToken: presale.noToken,
    resolved: presale.resolved,
    forceResolvedAnswer: forceResolvedAnswerNum,
  }
}

/**
 * Transforme une Presale du subgraph en format LaunchpadMarketCard (Launchpad)
 */
export function transformPresaleToLaunchpad(presale: Presale, metadata?: any) {
  const raisedAmount = parseUSDCAmount(presale.raisedAmount)
  const targetAmount = parseUSDCAmount(presale.targetAmount)
  // Use metadata category if available, otherwise fallback to determined category
  const category = metadata?.category || determineCategory(presale.question)
  
  return {
    id: presale.id,
    question: metadata?.title || presale.question,
    category,
    currentLiquidity: raisedAmount,
    targetLiquidity: targetAmount,
    contributors: parseInt(presale.contributorCount) || 0,
    endDate: formatDeadline(presale.deadline),
    marketIcon: metadata?.market_icon || (metadata === null ? getCategoryImage(category) : undefined),
  }
}

