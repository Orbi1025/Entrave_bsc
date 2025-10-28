import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains' //binance
import { injected, coinbaseWallet } from 'wagmi/connectors'

// RPC URL - utiliser un provider custom si disponible
const BASE_RPC_URL = import.meta.env.VITE_BASE_RPC_URL || 'https://bsc-mainnet.infura.io/v3/d2ea31ea15274181a6181dc2e99cd4d6'

// Configuration Wagmi pour Privy
export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Entrave' }),
  ],
  transports: {
    [bsc.id]: http(BASE_RPC_URL, {
      batch: {
        wait: 100,
      },
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
})

// Configuration Privy
const isBrowser = typeof window !== 'undefined'
const hostname = isBrowser ? window.location.hostname : ''
const isHttps = isBrowser && window.location.protocol === 'https:'
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname) || hostname === '0.0.0.0'
const isLan = /^192\.168\./.test(hostname) || hostname === '0.0.0.0'
// Privy autorisé en HTTPS et sur localhost uniquement (pas sur LAN en HTTP)
export const isPrivyEnv = isHttps || isLocalhost

// Configuration Privy avec gestion d'erreur améliorée
const getPrivyAppId = () => {
  const appId = import.meta.env.VITE_PRIVY_APP_ID
  
  // Validation basique de l'ID Privy
  if (!appId || appId.length < 10) {
    console.warn('Invalid Privy App ID detected:', appId)
    return null
  }
  
  return appId
}

export const privyConfig = {
  appId: getPrivyAppId(),
  config: {
        // Login methods - Wallet only
        loginMethods: ['wallet'] as ('email' | 'wallet' | 'sms' | 'google' | 'twitter')[],
    
    // Appearances
    appearance: {
      theme: 'light' as const,
      accentColor: '#676FFF' as const,
      logo: 'https://entrave.com/logo-entrave.png',
    },
    
    // Legal
    legal: {
      termsAndConditionsUrl: 'https://entrave.com/terms',
      privacyPolicyUrl: 'https://entrave.com/privacy',
    },
    
    // MFA
    mfa: {
      noPromptOnMfaRequired: false,
    },
    
    // Embedded wallets configuration
    ...(isHttps
      ? {
          embeddedWallets: {
            ethereum: {
              createOnLogin: 'users-without-wallets' as const,
            },
          },
        }
      : {
          embeddedWallets: {
            ethereum: {
              createOnLogin: 'off' as const,
            },
          },
        }),
    
      // Default chain configuration - Force BSC Mainnet
    defaultChain: bsc,
    
    // Supported chains - Only BSC Mainnet
    supportedChains: [bsc],
  },
}

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
