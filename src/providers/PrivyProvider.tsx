import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider as PrivyWagmiProvider } from '@privy-io/wagmi'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { wagmiConfig, privyConfig, isPrivyEnv } from '@/lib/privy'
import { useAutoRegisterUser } from '@/hooks/useAutoRegisterUser'
import { useEmailSync } from '@/hooks/useEmailSync'

interface PrivyProviderWrapperProps {
  children: ReactNode
}

// Composant interne qui utilise les hooks Wagmi
function WagmiHooksWrapper({ children }: { children: ReactNode }) {
  useAutoRegisterUser()
  useEmailSync()
  return <>{children}</>
}

export function PrivyProviderWrapper({ children }: PrivyProviderWrapperProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  // Vérifier si Privy est configuré correctement
  const isPrivyConfigured = isPrivyEnv && privyConfig.appId

  // En environnement non-Privy ou si Privy n'est pas configuré, utiliser seulement Wagmi standard
  if (!isPrivyConfigured) {
    console.log('Using standard Wagmi provider - Privy not configured or not in Privy environment')
    return (
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <WagmiHooksWrapper>
            {children}
          </WagmiHooksWrapper>
        </WagmiProvider>
      </QueryClientProvider>
    )
  }

  // En environnement Privy (HTTPS ou localhost), utiliser Privy
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={privyConfig.appId}
        config={privyConfig.config}
      >
        <PrivyWagmiProvider config={wagmiConfig}>
          <WagmiHooksWrapper>
            {children}
          </WagmiHooksWrapper>
        </PrivyWagmiProvider>
      </PrivyProvider>
    </QueryClientProvider>
  )
}
