import { useState, useEffect } from 'react';
import { SwapData } from '@/types';

interface SwapVolumeData {
  id: string;
  token: string;
  isYesToken: boolean;
  totalVolume: string;
  totalSwaps: string;
  uniqueSwappers: string;
  averagePrice: string;
  highestPrice: string;
  lowestPrice: string;
  firstSwapAt: string;
  lastSwapAt: string;
}

interface SwapDataResult {
  swaps: SwapData[];
  volume: SwapVolumeData[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to fetch swap data for a specific presale/market
 */
export function useSwapData(presaleId: string | undefined): SwapDataResult {
  const [data, setData] = useState<SwapDataResult>({
    swaps: [],
    volume: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (!presaleId) {
      setData({
        swaps: [],
        volume: [],
        isLoading: false,
        error: 'Missing presale ID'
      });
      return;
    }

    fetchSwapData(presaleId);
  }, [presaleId]);

  const fetchSwapData = async (presaleId: string) => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const SUBGRAPH_URL = (import.meta as any).env?.VITE_SUBGRAPH_URL;
      if (!SUBGRAPH_URL) {
        throw new Error('Subgraph URL not configured');
      }

      // Query for swaps - for now, we'll get all swaps since we don't have presale linking yet
      const swapsQuery = `
        query GetSwaps($first: Int = 100) {
          swaps(orderBy: timestamp, orderDirection: desc, first: $first) {
            id
            swapper
            tokenIn
            tokenOut
            amountIn
            amountOut
            isYesToNo
            isNoToYes
            pointsEarned
            timestamp
            transactionHash
          }
        }
      `;

      // Query for volume data - for now, get all volumes since we don't have presale linking yet
      const volumeQuery = `
        query GetVolumes($first: Int = 100) {
          swapVolumes(first: $first) {
            id
            token
            isYesToken
            totalVolume
            totalSwaps
            uniqueSwappers
            averagePrice
            highestPrice
            lowestPrice
            firstSwapAt
            lastSwapAt
          }
        }
      `;

      const [swapsResponse, volumeResponse] = await Promise.all([
        fetch(SUBGRAPH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: swapsQuery,
            variables: { first: 100 }
          })
        }),
        fetch(SUBGRAPH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: volumeQuery,
            variables: { first: 100 }
          })
        })
      ]);

      const swapsData = await swapsResponse.json();
      const volumeData = await volumeResponse.json();

      if (swapsData.errors || volumeData.errors) {
        throw new Error(swapsData.errors?.[0]?.message || volumeData.errors?.[0]?.message || 'GraphQL error');
      }

      setData({
        swaps: swapsData.data?.swaps || [],
        volume: volumeData.data?.swapVolumes || [],
        isLoading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching swap data:', error);
      setData({
        swaps: [],
        volume: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch swap data'
      });
    }
  };

  return data;
}

/**
 * Hook to get swap statistics for a presale
 */
export function useSwapStats(presaleId: string | undefined) {
  const { swaps, volume, isLoading, error } = useSwapData(presaleId);

  const stats = {
    totalSwaps: swaps.length,
    totalVolume: volume.reduce((sum, v) => sum + parseFloat(v.totalVolume) / 1e18, 0),
    uniqueSwappers: volume.reduce((sum, v) => sum + parseInt(v.uniqueSwappers), 0),
    yesTokenVolume: volume.find(v => v.isYesToken)?.totalVolume || "0",
    noTokenVolume: volume.find(v => !v.isYesToken)?.totalVolume || "0",
    averagePrice: volume.find(v => v.isYesToken)?.averagePrice || "0",
    highestPrice: volume.find(v => v.isYesToken)?.highestPrice || "0",
    lowestPrice: volume.find(v => v.isYesToken)?.lowestPrice || "0",
    lastSwapAt: swaps[0]?.timestamp || null,
    firstSwapAt: swaps[swaps.length - 1]?.timestamp || null
  };

  return {
    stats,
    swaps,
    volume,
    isLoading,
    error
  };
}

/**
 * Hook to get user's swap history across all presales
 * This fetches all swaps for a specific user address
 */
export function useUserSwapHistory(presaleId: string | undefined, userAddress: string | undefined) {
  const [swaps, setSwaps] = useState<SwapData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userAddress) {
      setSwaps([]);
      setIsLoading(false);
      return;
    }

    fetchUserSwaps(userAddress);
  }, [userAddress]);

  const fetchUserSwaps = async (userAddress: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const SUBGRAPH_URL = (import.meta as any).env?.VITE_SUBGRAPH_URL;
      if (!SUBGRAPH_URL) {
        throw new Error('Subgraph URL not configured');
      }

      // Query for all swaps by user address, including presale info
      const userSwapsQuery = `
        query GetUserSwaps($swapper: Bytes!) {
          swaps(
            where: { swapper: $swapper }
            orderBy: timestamp
            orderDirection: desc
            first: 1000
          ) {
            id
            swapper
            tokenIn
            tokenOut
            amountIn
            amountOut
            isYesToNo
            isNoToYes
            isLiquidityProviding
            pointsEarned
            timestamp
            transactionHash
            presale {
              id
              question
              state
              resolved
              yesOdds
              noOdds
              forceResolvedAnswer
              yesToken
              noToken
              poolKey {
                yesToken
                noToken
              }
            }
          }
        }
      `;

      const response = await fetch(SUBGRAPH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userSwapsQuery,
          variables: { swapper: userAddress.toLowerCase() }
        })
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setSwaps(data.data?.swaps || []);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching user swaps:', err);
      setSwaps([]);
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to fetch user swaps');
    }
  };

  // Calculate stats from swaps
  const userStats = {
    totalSwaps: swaps.length,
    totalVolume: swaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0),
    totalPoints: swaps.reduce((sum, swap) => sum + parseInt(swap.pointsEarned || '0'), 0),
    yesToNoSwaps: swaps.filter(swap => swap.isYesToNo).length,
    noToYesSwaps: swaps.filter(swap => swap.isNoToYes).length,
    lastSwapAt: swaps[0]?.timestamp || null,
    firstSwapAt: swaps[swaps.length - 1]?.timestamp || null
  };

  return {
    swaps,
    stats: userStats,
    isLoading,
    error
  };
}
