import { supabase } from './supabase'

// Règles de points - Selon la documentation /docs
export const POINTS_RULES = {
  TRADE_PER_DOLLAR: 10,        // 10 points par $1 tradé
  LAUNCHPAD_PER_DOLLAR: 100,   // 100 points par $1 contribué au launchpad
  MARKET_CREATION: 500,        // 500 points pour créer un marché
  REFERRAL_SIGNUP: 500,        // 500 points quand un référé trade pour la première fois
  REFERRAL_PERCENTAGE: 0.05,  // 5% des points du référé
}

interface AddPointsParams {
  walletAddress: string
  actionType: 'trade' | 'launchpad' | 'market_creation' | 'referral'
  amount?: number
  description: string
  transactionHash?: string
  metadata?: Record<string, any>
}

export async function addPoints({
  walletAddress,
  actionType,
  amount = 0,
  description,
  transactionHash,
  metadata
}: AddPointsParams) {
  try {
    // Calculer les points selon le type d'action
    let points = 0
    
    switch (actionType) {
      case 'trade':
        points = Math.floor(amount * POINTS_RULES.TRADE_PER_DOLLAR)
        break
      case 'launchpad':
        points = Math.floor(amount * POINTS_RULES.LAUNCHPAD_PER_DOLLAR)
        break
      case 'market_creation':
        points = POINTS_RULES.MARKET_CREATION
        break
      case 'referral':
        points = amount // Les points de referral sont déjà calculés
        break
    }

    if (points <= 0) return

    // Récupérer les informations de l'utilisateur pour appliquer le multiplicateur
    const { data: userData, error: userError } = await supabase
      .from('user_points')
      .select('multiplier, is_beta_tester')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single()

    if (userError) throw userError

    // Appliquer le multiplicateur (x2 pour les beta testers)
    const finalPoints = Math.floor(points * (userData?.multiplier || 1.0))

    // Ajouter l'entrée dans l'historique
    const { error: historyError } = await supabase
      .from('points_history')
      .insert({
        wallet_address: walletAddress.toLowerCase(),
        action_type: actionType,
        points: finalPoints,
        description: description + (userData?.is_beta_tester ? ' (Beta x2)' : ''),
        transaction_hash: transactionHash || null,
        metadata: { 
          ...metadata, 
          base_points: points,
          multiplier: userData?.multiplier || 1.0,
          is_beta_tester: userData?.is_beta_tester || false
        }
      })

    if (historyError) throw historyError

    // Mettre à jour le total des points
    const { data: currentPoints, error: fetchError } = await supabase
      .from('user_points')
      .select('total_points, referred_by')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single()

    if (fetchError) throw fetchError

    const newTotal = (currentPoints?.total_points || 0) + finalPoints

    const { error: updateError } = await supabase
      .from('user_points')
      .update({ 
        total_points: newTotal,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress.toLowerCase())

    if (updateError) throw updateError

    // Si l'utilisateur a été référé, donner 5% au référent
    if (currentPoints?.referred_by && actionType !== 'referral') {
      await giveReferralPoints(currentPoints.referred_by, finalPoints, walletAddress)
    }

    console.log(`✅ Added ${finalPoints} points to ${walletAddress}${userData?.is_beta_tester ? ' (Beta tester x2)' : ''}`)
    
    // Mettre à jour les rangs après l'ajout de points
    setTimeout(() => {
      updateUserRanks().catch(console.error)
    }, 1000)
    
    return finalPoints
  } catch (error) {
    console.error('Error adding points:', error)
    throw error
  }
}

async function giveReferralPoints(referrerAddress: string, basePoints: number, referredAddress: string) {
  const referralPoints = Math.floor(basePoints * POINTS_RULES.REFERRAL_PERCENTAGE)
  
  if (referralPoints <= 0) return

  try {
    // Ajouter les points au référent
    await addPoints({
      walletAddress: referrerAddress,
      actionType: 'referral',
      amount: referralPoints,
      description: `5% referral bonus from ${referredAddress.slice(0, 6)}...${referredAddress.slice(-4)}`,
      metadata: { referred_address: referredAddress }
    })

    // Mettre à jour le tableau des referrals
    const { error } = await supabase
      .from('referrals')
      .upsert({
        referrer_address: referrerAddress.toLowerCase(),
        referred_address: referredAddress.toLowerCase(),
        points_earned: referralPoints
      }, {
        onConflict: 'referrer_address,referred_address',
        ignoreDuplicates: false
      })

    if (error && error.code !== '23505') { // Ignorer les erreurs de duplication
      console.error('Error updating referrals:', error)
    }
  } catch (error) {
    console.error('Error giving referral points:', error)
  }
}

export async function trackTrade(walletAddress: string, amountUSD: number, transactionHash: string) {
  return addPoints({
    walletAddress,
    actionType: 'trade',
    amount: amountUSD,
    description: `Traded $${amountUSD.toFixed(2)} USDT`,
    transactionHash,
    metadata: { type: 'swap', amount: amountUSD }
  })
}

export async function trackLaunchpadContribution(walletAddress: string, amountUSD: number, presaleId: string, transactionHash: string) {
  return addPoints({
    walletAddress,
    actionType: 'launchpad',
    amount: amountUSD,
    description: `Contributed $${amountUSD.toFixed(2)} to launchpad`,
    transactionHash,
    metadata: { type: 'contribution', presale_id: presaleId, amount: amountUSD }
  })
}

export async function trackMarketCreation(walletAddress: string, marketId: string, transactionHash: string) {
  return addPoints({
    walletAddress,
    actionType: 'market_creation',
    description: 'Created a new market',
    transactionHash,
    metadata: { type: 'market_creation', market_id: marketId }
  })
}

export async function registerReferral(referrerCode: string, newUserAddress: string) {
  try {
    // Trouver le référent par son code
    const { data: referrer, error: referrerError } = await supabase
      .from('user_points')
      .select('wallet_address')
      .eq('referral_code', referrerCode.toUpperCase())
      .single()

    if (referrerError || !referrer) {
      console.log('Referrer not found')
      return false
    }

    // Mettre à jour le nouveau user avec le référent
    const { error: updateError } = await supabase
      .from('user_points')
      .update({ referred_by: referrer.wallet_address })
      .eq('wallet_address', newUserAddress.toLowerCase())

    if (updateError) throw updateError

    console.log(`✅ Registered referral: ${newUserAddress} referred by ${referrer.wallet_address}`)
    return true
  } catch (error) {
    console.error('Error registering referral:', error)
    return false
  }
}

export async function giveFirstTradeBonus(referrerAddress: string, newTraderAddress: string) {
  return addPoints({
    walletAddress: referrerAddress,
    actionType: 'referral',
    amount: POINTS_RULES.REFERRAL_SIGNUP,
    description: `Referral bonus: ${newTraderAddress.slice(0, 6)}...${newTraderAddress.slice(-4)} made first trade`,
    metadata: { type: 'first_trade_bonus', referred_address: newTraderAddress }
  })
}

// Fonction pour mettre à jour les rangs de tous les utilisateurs
export async function updateUserRanks() {
  try {
    // Récupérer tous les utilisateurs triés par points décroissants
    const { data: users, error: fetchError } = await supabase
      .from('user_points')
      .select('wallet_address, total_points')
      .order('total_points', { ascending: false })

    if (fetchError) throw fetchError

    // Mettre à jour les rangs
    const updates = users.map((user, index) => ({
      wallet_address: user.wallet_address,
      rank: index + 1
    }))

    for (const update of updates) {
      const { error: updateError } = await supabase
        .from('user_points')
        .update({ rank: update.rank })
        .eq('wallet_address', update.wallet_address)

      if (updateError) {
        console.error(`Error updating rank for ${update.wallet_address}:`, updateError)
      }
    }

    console.log(`✅ Updated ranks for ${users.length} users`)
  } catch (error) {
    console.error('Error updating user ranks:', error)
    throw error
  }
}

