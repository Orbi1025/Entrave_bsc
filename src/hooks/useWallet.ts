import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { useReadContract as useReadContractWagmi } from 'wagmi'
import { formatUnits } from 'viem'
import { useState, useEffect } from 'react'
import { getContractAddresses } from '@/lib/contracts'
import { USDC_ABI } from '@/lib/contracts'
import { bsc } from 'wagmi/chains'
import { isPrivyEnv } from '@/lib/privy'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ERROR_MESSAGES, formatErrorMessage, logError } from '@/lib/errorMessages'

// Hook conditionnel pour Privy
function usePrivyConditional() {
  if (!isPrivyEnv) {
    // En HTTP, retourner des valeurs par défaut
    return {
      ready: true,
      authenticated: false,
      user: null,
      login: async () => {},
      logout: async () => {},
      linkWallet: async () => {},
      unlinkWallet: async () => {},
      exportWallet: async () => {},
    }
  }
  
  // En environnement Privy (HTTPS ou localhost), utiliser Privy
  try {
    const privyHook = usePrivy()
    return privyHook
  } catch (error) {
    logError('useWallet.usePrivyConditional', error)
    return {
      ready: true,
      authenticated: false,
      user: null,
      login: async () => {},
      logout: async () => {},
      linkWallet: async () => {},
      unlinkWallet: async () => {},
      exportWallet: async () => {},
    }
  }
}

function useWalletsConditional() {
  if (!isPrivyEnv) {
    return { wallets: [] }
  }
  
  try {
    const walletsHook = useWallets()
    return walletsHook
  } catch {
    return { wallets: [] }
  }
}

export function useWallet() {
  
  // Hooks Privy (HTTPS ou localhost)
  const privyData = usePrivyConditional()
  const { wallets } = useWalletsConditional()
  
  // Hooks Wagmi (toujours disponibles)
  const { address, isConnected: wagmiConnected, chainId, chain } = useAccount()
  const { connect: wagmiConnect, connectors } = useConnect()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  
  const [usdcBalance, setUsdcBalance] = useState('0')
  const [isConnecting, setIsConnecting] = useState(false)

  // État de connexion combiné (Privy ou Wagmi)
  const isConnected = isPrivyEnv ? privyData.authenticated : wagmiConnected

  // Surveiller les changements de réseau et forcer BSC
  useEffect(() => {
    if (isConnected && chainId && chainId !== bsc.id) {
      console.log('Network changed to non-BSC chain:', chainId, 'switching to BSC')
      const switchToBSC = async () => {
        try {
          await switchChain({ chainId: bsc.id })
          console.log('✅ Automatically switched to BSC Mainnet')
        } catch (error) {
          logError('useWallet.autoSwitchToBSC', error, { currentChainId: chainId, targetChainId: bsc.id })
          console.warn('Failed to auto-switch to BSC, user may need to switch manually')
        }
      }
      // Délai pour éviter les conflits avec d'autres changements de réseau
      setTimeout(switchToBSC, 500)
    }
  }, [isConnected, chainId, switchChain])

  // Trouver le wallet principal (embedded ou externe)
  const primaryWallet = wallets.find(wallet => wallet.walletClientType === 'privy') || wallets[0]

  // Formater l'adresse pour l'affichage
  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

  // Lire le solde USDC
  const contracts = getContractAddresses()
  const { data: usdcBalanceData } = useReadContractWagmi({
    address: contracts.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  })

  useEffect(() => {
    if (usdcBalanceData) {
      setUsdcBalance(formatUnits(usdcBalanceData, 18)) // USDT has 18 decimals
    }
  }, [usdcBalanceData])

  const handleConnect = async () => {
    console.log('handleConnect called, isPrivyEnv:', isPrivyEnv)
    console.log('Privy data:', privyData)
    console.log('privyData.login function:', privyData.login)
    console.log('typeof privyData.login:', typeof privyData.login)
    setIsConnecting(true)
    try {
      if (isPrivyEnv && privyData.ready && privyData.login) {
        // Utiliser Privy si disponible et configuré
        console.log('Using Privy login')
        console.log('Privy ready:', privyData.ready)
        console.log('Privy authenticated:', privyData.authenticated)
        
        // Vérifier si l'utilisateur est déjà authentifié
        if (privyData.authenticated) {
          console.log('User already authenticated with Privy, skipping login')
          // Si l'utilisateur est authentifié mais n'a pas de wallet, essayer de connecter un wallet
          if (!address) {
            console.log('User authenticated but no wallet address, trying to connect wallet')
            try {
              // Utiliser linkWallet pour connecter un wallet externe
              await privyData.linkWallet()
              console.log('Wallet linked successfully')
            } catch (walletError) {
              console.log('Failed to link wallet:', walletError)
              // L'utilisateur est authentifié mais sans wallet, c'est OK
            }
          }
          return
        }
        
        console.log('About to call privyData.login()')
        
        try {
          // Essayer d'abord avec la méthode email
          await (privyData as any).login?.({ loginMethod: 'email' })
          console.log('Privy login with email method completed')
        } catch (e) {
          console.warn('Privy login with param failed, retrying default login', e)
          try {
            await privyData.login()
            console.log('Privy default login completed')
          } catch (privyError) {
            logError('useWallet.connectWithPrivy', privyError, { method: 'privy-login' })
            // Fallback vers Wagmi si Privy échoue
            console.log('Falling back to Wagmi connect')
            await connectWithWagmi()
          }
        }
        
        // Après connexion Privy réussie, forcer le changement vers BSC
        setTimeout(async () => {
          if (chainId && chainId !== bsc.id) {
            console.log('Privy connected, switching to BSC chain, current chainId:', chainId)
            try {
              await switchChain({ chainId: bsc.id })
              console.log('✅ Successfully switched to BSC Mainnet after Privy login')
            } catch (error) {
              logError('useWallet.switchToBSCAfterPrivy', error, { currentChainId: chainId, targetChainId: bsc.id })
              console.warn('Failed to switch to BSC after Privy login, user may need to switch manually')
            }
          }
        }, 1500)
      } else {
        // En HTTP ou si Privy n'est pas disponible, utiliser Wagmi standard
        console.log('Using Wagmi connect (Privy not available or not ready)')
        await connectWithWagmi()
      }
    } catch (error) {
      logError('useWallet.connect', error, { method: 'general-connect' })
    } finally {
      setIsConnecting(false)
    }
  }

  const connectWithWagmi = async () => {
    console.log('Using Wagmi connect, connectors:', connectors)
    const injectedConnector = connectors.find(connector => connector.id === 'injected')
    console.log('Found injected connector:', injectedConnector)
    
    if (injectedConnector) {
      await wagmiConnect({ connector: injectedConnector })
      
      // Après connexion, vérifier et changer vers BSC si nécessaire
      setTimeout(async () => {
        if (chainId && chainId !== bsc.id) {
          console.log('Switching to BSC chain, current chainId:', chainId)
          try {
            await switchChain({ chainId: bsc.id })
            console.log('✅ Successfully switched to BSC Mainnet')
          } catch (error) {
            logError('useWallet.switchToBSC', error, { currentChainId: chainId, targetChainId: bsc.id })
            // Afficher un message d'erreur à l'utilisateur
            alert('Please switch to BSC Mainnet manually in your wallet to use this application.')
          }
        }
      }, 1000)
    } else {
      logError('useWallet.connectWithWagmi', new Error('No injected connector found'), { connectors: connectors.length })
    }
  }

  const handleDisconnect = async () => {
    try {
      if (isPrivyEnv) {
        // Utiliser Privy
        await privyData.logout?.()
      } else {
        // En HTTP, utiliser Wagmi standard
        await wagmiDisconnect()
      }
    } catch (e) {
      logError('useWallet.handleDisconnect', e)
    }
  }

  return {
    // État de connexion
    ready: isPrivyEnv ? privyData.ready : true,
    authenticated: isPrivyEnv ? privyData.authenticated : isConnected,
    isConnected,
    address,
    user: isPrivyEnv ? privyData.user : null,
    isConnecting,
    
    // Actions
    login: privyData.login,
    logout: privyData.logout,
    linkWallet: privyData.linkWallet,
    unlinkWallet: privyData.unlinkWallet,
    exportWallet: privyData.exportWallet,
    connect: handleConnect,
    disconnect: handleDisconnect,
    
    // Wallets
    wallets,
    primaryWallet,
    
    // Balance et formatage
    usdcBalance,
    formattedAddress,
    chain,
  }
}

// Hook pour les contrats (compatible avec l'existant)
export function useContract() {
  const { writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt()

  return {
    writeContract,
    isPending,
    isConfirming,
    error,
    waitForTransactionReceipt: () => {},
  }
}

// Hook pour lire les contrats
export function useContractRead() {
  return useReadContractWagmi
}