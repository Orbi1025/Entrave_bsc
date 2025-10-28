import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { subgraphCache } from '@/lib/subgraphCache';
import { goldskyMonitor } from '@/lib/goldskyMonitor';

interface PoolPrice {
  yesPrice: number;
  noPrice: number;
  lastUpdated: number;
}

interface RealTimeOddsResult {
  yesPrice: number;
  noPrice: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number;
}

/**
 * Hook to fetch real-time odds from PancakeSwap V4 pool positions
 * Replaces random odds with actual pool prices
 */
export function useRealTimeOdds(presaleId: string | undefined): RealTimeOddsResult {
  const [odds, setOdds] = useState<PoolPrice>({
    yesPrice: 50,
    noPrice: 50,
    lastUpdated: Date.now() // Initialize with current time, not 0
  });
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  const fetchPoolPrices = useCallback(async () => {
    if (!presaleId) {
      setError('Missing presale ID');
      return;
    }

    // Add random delay between 0-200ms to stagger requests and avoid overwhelming the subgraph
    const delay = Math.random() * 200;
    await new Promise(resolve => setTimeout(resolve, delay));

    setIsLoading(true);
    setError(null);

    try {
      // First, get the pool information from the subgraph
      const poolInfo = await fetchPoolInfoFromSubgraph(presaleId);
      if (!poolInfo) {
        throw new Error('Pool information not found');
      }
      
      // Fetch pool prices from PancakeSwap V4 using position IDs
      const prices = await fetchPoolPricesFromPCSV4(poolInfo);
      
      setOdds({
        yesPrice: prices.yesPrice,
        noPrice: prices.noPrice,
        lastUpdated: Date.now()
      });
    } catch (err) {
      console.error('Error fetching real-time odds:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch odds');
      
      // Fallback to subgraph odds if available
      try {
        const fallbackOdds = await fetchFallbackOdds(presaleId);
        if (fallbackOdds) {
          setOdds({
            yesPrice: fallbackOdds.yesPrice,
            noPrice: fallbackOdds.noPrice,
            lastUpdated: Date.now()
          });
        }
      } catch (fallbackErr) {
        console.error('Fallback odds fetch failed:', fallbackErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [presaleId]);

  // Fetch prices on mount only (no polling to avoid rate limits)
  useEffect(() => {
    fetchPoolPrices();
    
    // Disabled polling to avoid hitting rate limits
    // If real-time updates are needed, implement a more sophisticated approach
    // with batching or WebSocket connections
    
    // const interval = setInterval(fetchPoolPrices, 120000); // 2 minutes
    // return () => clearInterval(interval);
  }, [fetchPoolPrices]);

  return {
    yesPrice: odds.yesPrice,
    noPrice: odds.noPrice,
    isLoading,
    error,
    lastUpdated: odds.lastUpdated
  };
}

/**
 * Fetch pool information from subgraph
 */
async function fetchPoolInfoFromSubgraph(presaleId: string): Promise<{
  yesPositionId: string;
  noPositionId: string;
  yesToken: string;
  noToken: string;
} | null> {
  const startTime = Date.now();
  const query = 'GetPresalePoolInfo';
  
  try {
    const SUBGRAPH_URL = (import.meta as any).env?.VITE_SUBGRAPH_URL;
    if (!SUBGRAPH_URL) {
      throw new Error('Subgraph URL not configured');
    }

    const queryBody = `
      query GetPresalePoolInfo($presaleId: Bytes!) {
        presale(id: $presaleId) {
          id
          yesToken
          noToken
          poolKey {
            yesPositionId
            noPositionId
          }
        }
      }
    `;

    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: queryBody,
        variables: { presaleId }
      })
    });

    const duration = Date.now() - startTime;
    const data = await response.json();
    
    if (data.errors) {
      const errorMessage = data.errors[0].message;
      goldskyMonitor.logCall(query, false, duration, errorMessage);
      throw new Error(errorMessage);
    }

    goldskyMonitor.logCall(query, true, duration);
    const presale = data.data?.presale;
    if (!presale || !presale.poolKey) {
      return null;
    }

    return {
      yesPositionId: presale.poolKey.yesPositionId,
      noPositionId: presale.poolKey.noPositionId,
      yesToken: presale.yesToken,
      noToken: presale.noToken
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    goldskyMonitor.logCall(query, false, duration, errorMessage);
    console.error('Error fetching pool info from subgraph:', error);
    return null;
  }
}

/**
 * Fetch actual pool prices from SwapperV4FromPosition contract
 */
async function fetchPoolPricesFromPCSV4(poolInfo: {
  yesPositionId: string;
  noPositionId: string;
  yesToken: string;
  noToken: string;
}): Promise<{ yesPrice: number; noPrice: number }> {
  try {
    // Import the contract ABI and address
    const { SWAPPER_V4_FROM_POSITION_ADDRESS, SWAPPER_V4_FROM_POSITION_ABI } = await import('@/lib/contracts');
    
    // Use the singleton public client to reuse connections and enable batching
    const { getPublicClient } = await import('@/lib/infuraBatchCall');
    const publicClient = getPublicClient();
    
    // First, get the actual pool currencies from the position (like in test script)
    const poolKey = await publicClient.readContract({
      address: SWAPPER_V4_FROM_POSITION_ADDRESS as `0x${string}`,
      abi: SWAPPER_V4_FROM_POSITION_ABI,
      functionName: 'getPoolKeyFromPosition',
      args: [BigInt(poolInfo.yesPositionId)]
    });
    
    const actualCurrency0 = poolKey.currency0;
    const actualCurrency1 = poolKey.currency1;
    
    // Determine which currency is YES vs NO based on the subgraph data
    // We need to match the subgraph tokens to the actual pool currencies
    let yesCurrency: string;
    let noCurrency: string;
    
    if (poolInfo.yesToken.toLowerCase() === actualCurrency0.toLowerCase()) {
      // YES token matches currency0
      yesCurrency = actualCurrency0;
      noCurrency = actualCurrency1;
    } else if (poolInfo.yesToken.toLowerCase() === actualCurrency1.toLowerCase()) {
      // YES token matches currency1
      yesCurrency = actualCurrency1;
      noCurrency = actualCurrency0;
    } else {
      // Fallback: assume currency1 is YES (common pattern)
      yesCurrency = actualCurrency1;
      noCurrency = actualCurrency0;
    }
    
    // Get detailed market pricing using correctly mapped currencies
    const [yesPrice, noPrice, priceRatio, sqrtPriceX96] = await publicClient.readContract({
      address: SWAPPER_V4_FROM_POSITION_ADDRESS as `0x${string}`,
      abi: SWAPPER_V4_FROM_POSITION_ABI,
      functionName: 'getMarketPricing',
      args: [
        BigInt(poolInfo.yesPositionId), // Use YES position ID
        yesCurrency as `0x${string}`,    // Correctly mapped YES currency
        noCurrency as `0x${string}`      // Correctly mapped NO currency
      ]
    });
    
    // Convert from probability format (0-1e18) to percentage (0-100)
    const yesPricePercent = Number(yesPrice) / 1e16; // Convert from 1e18 to percentage
    const noPricePercent = Number(noPrice) / 1e16;   // Convert from 1e18 to percentage
    
    const priceRatioValue = Number(priceRatio) / 1e18;
    
    return {
      yesPrice: Math.round(yesPricePercent * 100) / 100, // Round to 2 decimal places
      noPrice: Math.round(noPricePercent * 100) / 100    // Round to 2 decimal places
    };
  } catch (error) {
    console.error('Error fetching pool prices from SwapperV4FromPosition:', error);
    throw error;
  }
}

/**
 * Fallback to subgraph odds if real-time fetch fails
 */
async function fetchFallbackOdds(presaleId: string): Promise<{ yesPrice: number; noPrice: number } | null> {
  const startTime = Date.now();
  const query = 'GetPresaleOdds';
  
  try {
    const SUBGRAPH_URL = (import.meta as any).env?.VITE_SUBGRAPH_URL || '';
    if (!SUBGRAPH_URL) {
      throw new Error('Subgraph URL not configured');
    }

    const queryBody = `
      query GetPresaleOdds($id: String!) {
        presale(id: $id) {
          yesOdds
          noOdds
        }
      }
    `;

    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryBody,
        variables: { id: presaleId }
      })
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      goldskyMonitor.logCall(query, false, duration, errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (data.errors) {
      const errorMessage = data.errors[0].message;
      goldskyMonitor.logCall(query, false, duration, errorMessage);
      throw new Error(errorMessage);
    }

    goldskyMonitor.logCall(query, true, duration);
    const presale = data.data?.presale;
    
    if (presale && presale.yesOdds && presale.noOdds) {
      return {
        yesPrice: parseInt(presale.yesOdds),
        noPrice: parseInt(presale.noOdds)
      };
    }

    return null;
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    goldskyMonitor.logCall(query, false, duration, errorMessage);
    console.error('Error fetching fallback odds:', error);
    return null;
  }
}

/**
 * Hook for charging widget with real-time odds
 */
export function useChargingWidget(presaleId: string | undefined) {
  const { yesPrice, noPrice, isLoading, error, lastUpdated } = useRealTimeOdds(presaleId);
  
  const isCharging = isLoading;
  const chargingProgress = isLoading ? Math.min(100, (Date.now() - lastUpdated) / 1000 * 10) : 100;
  
  return {
    yesPrice,
    noPrice,
    isCharging,
    chargingProgress,
    error,
    lastUpdated
  };
}
