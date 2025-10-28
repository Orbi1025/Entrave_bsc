import { useState, useEffect } from 'react';

interface Swap {
  id: string;
  swapper: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  isYesToNo: boolean;
  isNoToYes: boolean;
  pointsEarned: string;
  timestamp: string;
  transactionHash: string;
}

interface MarketVolumeResult {
  totalVolume: number;
  totalSwaps: number;
  uniqueSwappers: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to calculate total trading volume for a specific market/presale
 * This fetches swaps and calculates the real trading volume in USDT
 */
export function useMarketVolume(presaleId: string | undefined): MarketVolumeResult {
  const [data, setData] = useState<MarketVolumeResult>({
    totalVolume: 0,
    totalSwaps: 0,
    uniqueSwappers: 0,
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (!presaleId) {
      setData({
        totalVolume: 0,
        totalSwaps: 0,
        uniqueSwappers: 0,
        isLoading: false,
        error: 'Missing presale ID'
      });
      return;
    }

    fetchMarketVolume(presaleId);
  }, [presaleId]);

  const fetchMarketVolume = async (presaleId: string) => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const SUBGRAPH_URL = (import.meta as any).env?.VITE_SUBGRAPH_URL;
      if (!SUBGRAPH_URL) {
        throw new Error('Subgraph URL not configured');
      }

      // Query presales to get totalSwaps, totalSwapVolume, and unique swappers
      const presalesQuery = `
        query GetPresale($id: Bytes!) {
          presale(id: $id) {
            id
            totalSwaps
            totalSwapVolume
            poolKey {
              swaps {
                swapper
              }
            }
          }
        }
      `;

      const response = await fetch(SUBGRAPH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: presalesQuery,
          variables: { id: presaleId }
        })
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      const presale = data.data?.presale;
      
      if (!presale) {
        // If presale not found, return 0 values
        setData({
          totalVolume: 0,
          totalSwaps: 0,
          uniqueSwappers: 0,
          isLoading: false,
          error: null
        });
        return;
      }

      // Convert totalSwapVolume from wei to USDT (18 decimals)
      const totalVolume = presale.totalSwapVolume ? parseFloat(presale.totalSwapVolume) / 1e18 : 0;
      const totalSwaps = presale.totalSwaps ? parseInt(presale.totalSwaps) : 0;

      // Calculate unique swappers from swaps data
      const uniqueSwappers = presale.poolKey?.swaps ? 
        new Set(presale.poolKey.swaps.map((swap: any) => swap.swapper)).size : 0;

      setData({
        totalVolume,
        totalSwaps,
        uniqueSwappers,
        isLoading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching market volume:', error);
      
      // Fallback: return 0 volume if subgraph fails
      setData({
        totalVolume: 0,
        totalSwaps: 0,
        uniqueSwappers: 0,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch market volume'
      });
    }
  };

  return data;
}

/**
 * Format volume amount for display
 */
export function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(0)}K`;
  } else if (volume > 0) {
    return `$${volume.toFixed(0)}`;
  }
  return '$0';
}