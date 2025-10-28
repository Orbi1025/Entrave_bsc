import { useAccount } from 'wagmi'
import { useMemo } from 'react'
import { usePresales } from './usePresales'
import { getContractAddresses, parseUSDC } from '@/lib/contracts'

const ERC20_BALANCE_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

interface ClaimablePosition {
  presaleId: string
  question: string
  outcome: 'YES' | 'NO'
  tokenAddress: string
  balance: bigint
  balanceFormatted: number
  isWinning: boolean
  answer: number // 0 = NO won, 1 = YES won
}

export function useClaimableWinnings() {
  const { address } = useAccount()
  const { data: presales, isLoading: isLoadingPresales } = usePresales()
  const contracts = getContractAddresses()

  // Filter only resolved presales
  const resolvedPresales = useMemo(() => {
    if (!presales || !presales.length) return []
    return presales.filter(p => p.state === 'Resolved' && p.resolved)
  }, [presales])

  // Build contract read requests for YES and NO token balances
  const yesContractReads = useMemo(() => {
    if (!resolvedPresales.length || !address) return []
    
    return resolvedPresales
      .filter(p => p.yesToken && p.yesToken !== '0x0000000000000000000000000000000000000000')
      .map((presale, idx) => ({
        key: `yes-${presale.id}-${idx}`,
        address: presale.yesToken as `0x${string}`,
        abi: ERC20_BALANCE_ABI,
        functionName: 'balanceOf' as const,
        args: [address as `0x${string}`] as const
      }))
  }, [resolvedPresales, address])

  const noContractReads = useMemo(() => {
    if (!resolvedPresales.length || !address) return []
    
    return resolvedPresales
      .filter(p => p.noToken && p.noToken !== '0x0000000000000000000000000000000000000000')
      .map((presale, idx) => ({
        key: `no-${presale.id}-${idx}`,
        address: presale.noToken as `0x${string}`,
        abi: ERC20_BALANCE_ABI,
        functionName: 'balanceOf' as const,
        args: [address as `0x${string}`] as const
      }))
  }, [resolvedPresales, address])

  // For now, return empty arrays to avoid the hook issue
  // This will be implemented properly with a custom hook or multicall
  const yesBalances = useMemo(() => [], [])
  const noBalances = useMemo(() => [], [])

  // Combine and filter positions with non-zero balances
  const claimablePositions = useMemo(() => {
    if (!yesBalances || !noBalances || !yesBalances.length && !noBalances.length) return []
    
    const allPositions = [...(yesBalances || []), ...(noBalances || [])]
    
    return allPositions
      .filter(pos => pos && pos.balance > 0n)
      .map(pos => ({
        ...pos,
        balanceFormatted: parseUSDC(pos.balance),
        isWinning: (pos.outcome === 'YES' && pos.answer === 1) || (pos.outcome === 'NO' && pos.answer === 0)
      }))
      .filter(pos => pos.isWinning) // Only show winning positions
  }, [yesBalances, noBalances])

  // Calculate total claimable value
  const totalClaimable = useMemo(() => {
    return claimablePositions.reduce((sum, pos) => sum + pos.balanceFormatted, 0)
  }, [claimablePositions])

  return {
    claimablePositions,
    totalClaimable,
    isLoading: isLoadingPresales,
    hasClaimable: claimablePositions.length > 0
  }
}

