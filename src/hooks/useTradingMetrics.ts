import { useMemo, useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { useUserSwapHistory } from './useSwapData';
import { useClaimableWinnings } from './useClaimableWinnings';
import { usePresales } from './usePresales';
import { usePancakeSwapV4Trading } from './usePancakeSwapV4Trading';
import { useRealTimeOdds } from './useRealTimeOdds';
import { getContractAddresses } from '@/lib/contracts';

export function useTradingMetrics(realTimeOddsParam?: Record<string, { yesPrice: number; noPrice: number }>) {
  const { address, usdcBalance } = useWallet();
  const { swaps: userSwaps, isLoading: swapsLoading } = useUserSwapHistory(undefined, address);
  const { claimablePositions, totalClaimable, isLoading: claimableLoading } = useClaimableWinnings();
  const { data: presales, isLoading: presalesLoading } = usePresales();
  const { getTokenBalance } = usePancakeSwapV4Trading();
  
  // State to store token balances per position
  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>({});
  
  // State to store market prices per presaleId (from subgraph)
  const [marketPrices, setMarketPrices] = useState<Record<string, { yesPrice: number; noPrice: number }>>({});
  
  // Use provided real-time odds or empty object
  const realTimeOdds = realTimeOddsParam || {};
  
  // Fetch market prices for each unique presaleId
  useEffect(() => {
    const fetchMarketPrices = async () => {
      if (!userSwaps) return;
      
      const prices: Record<string, { yesPrice: number; noPrice: number }> = {};
      
      // Get unique presaleIds
      const uniquePresaleIds = new Set<string>();
      userSwaps.forEach(swap => {
        if (swap.presale?.id && swap.presale.state === 'Graduated' && !swap.presale.resolved) {
          uniquePresaleIds.add(swap.presale.id);
        }
      });
      
      // Fetch prices for each presale
      for (const presaleId of uniquePresaleIds) {
        const firstSwap = userSwaps.find(swap => swap.presale?.id === presaleId);
        if (firstSwap?.presale?.yesOdds && firstSwap?.presale?.noOdds) {
          prices[presaleId] = {
            yesPrice: parseFloat(firstSwap.presale.yesOdds) / 100, // Convert to decimal (e.g., 66 -> 0.66)
            noPrice: parseFloat(firstSwap.presale.noOdds) / 100   // Convert to decimal (e.g., 34 -> 0.34)
          };
        }
      }
      setMarketPrices(prices);
    };
    
    fetchMarketPrices();
  }, [userSwaps]);
  
  // Fetch token balances for all open positions
  useEffect(() => {
    const fetchBalances = async () => {
      if (!address || !userSwaps) return;
      
      const balances: Record<string, number> = {};
      
      // Group swaps by presaleId
      const swapsByPresale = new Map<string, typeof userSwaps>();
      userSwaps.forEach(swap => {
        if (swap.presale?.id && swap.presale.state === 'Graduated' && !swap.presale.resolved) {
          const presaleId = swap.presale.id;
          if (!swapsByPresale.has(presaleId)) {
            swapsByPresale.set(presaleId, []);
          }
          swapsByPresale.get(presaleId)!.push(swap);
        }
      });
      
      // Fetch balances for each presale
      for (const [presaleId, swaps] of swapsByPresale) {
        const poolKey = swaps[0]?.presale?.poolKey;
        if (poolKey?.yesToken && poolKey?.noToken) {
          try {
            const yesBalance = await getTokenBalance(poolKey.yesToken, address);
            const noBalance = await getTokenBalance(poolKey.noToken, address);
            
            balances[`${presaleId}-YES`] = yesBalance;
            balances[`${presaleId}-NO`] = noBalance;
          } catch (error) {
            console.error('Error fetching token balances:', error);
          }
        }
      }
      
      setTokenBalances(balances);
    };
    
    fetchBalances();
  }, [userSwaps, address, getTokenBalance]);
  

  const metrics = useMemo(() => {
    if (!address) {
      return {
        usdcBalance: 0,
        portfolioValue: 0,
        totalPnL: 0,
        totalPnLPercent: 0,
        openPositions: 0,
        isLoading: false
      };
    }

    // Calculate USDC balance
    const usdc = parseFloat(usdcBalance) || 0;

    // Calculate portfolio value (claimable winnings + USDC balance)
    // TODO: Add current value of open positions from their current prices
    const portfolioValue = totalClaimable + usdc;

    // Calculate P&L from open positions (graduated, not resolved) and history (resolved)
    let totalPnL = 0;
    let totalInvested = 0;
    let openPositionsCount = 0;
    
    if (userSwaps && userSwaps.length > 0) {
      // First, calculate P&L from HISTORY (resolved markets)
      const historySwaps = userSwaps.filter(swap => swap.presale && swap.presale.resolved);
      historySwaps.forEach(swap => {
        const pnl = (parseFloat(swap.amountOut) - parseFloat(swap.amountIn)) / 1e18;
        const invested = parseFloat(swap.amountIn) / 1e18;
        totalPnL += pnl;
        totalInvested += invested;
      });
      
      // Then, calculate P&L from OPEN POSITIONS (graduated, not resolved)
      // Group swaps by presaleId and outcome
      const positionsMap = new Map<string, { swaps: typeof userSwaps; outcome: string; presaleId: string }>();
      
      userSwaps.forEach(swap => {
        if (swap.presale && 
            swap.presale.state === 'Graduated' && 
            !swap.presale.resolved) {
          
          // Determine outcome based on tokenOut address (same logic as TradingPositions.tsx)
          let outcome: "YES" | "NO";
          const poolKey = swap.presale.poolKey;
          
          if (poolKey?.yesToken && poolKey?.noToken) {
            const tokenOutLower = swap.tokenOut?.toLowerCase() || '';
            const yesTokenLower = poolKey.yesToken.toLowerCase();
            const noTokenLower = poolKey.noToken.toLowerCase();
            
            if (tokenOutLower === yesTokenLower) {
              outcome = "YES";
            } else if (tokenOutLower === noTokenLower) {
              outcome = "NO";
            } else {
              // Fallback to isYesToNo if token addresses don't match
              outcome = swap.isYesToNo ? "NO" : "YES";
            }
          } else {
            // Fallback to isYesToNo if poolKey is not available
            outcome = swap.isYesToNo ? "NO" : "YES";
          }
          
          const key = `${swap.presale.id}-${outcome}`;
          
          if (!positionsMap.has(key)) {
            positionsMap.set(key, {
              swaps: [],
              outcome,
              presaleId: swap.presale.id
            });
          }
          
          positionsMap.get(key)!.swaps.push(swap);
        }
      });
      
      // Calculate P&L for each position and count positions with shares > 0
      positionsMap.forEach(position => {
        const swaps = position.swaps;
        const contracts = getContractAddresses();
        const usdcAddress = contracts.USDC.toLowerCase();
        
        // Separate BUY swaps (USDC -> Token) and SELL swaps (Token -> USDC)
        const buySwaps = swaps.filter(swap => swap.tokenIn?.toLowerCase() === usdcAddress);
        const sellSwaps = swaps.filter(swap => swap.tokenOut?.toLowerCase() === usdcAddress);
        
        // Get the actual token balance from the blockchain
        const positionKey = `${position.presaleId}-${position.outcome}`;
        const shares = tokenBalances[positionKey] || 0;
        
        // Count this position if shares > 0
        if (shares > 0) {
          openPositionsCount++;
        }
        
        // Calculate total invested (sum of USDC spent on buys)
        const totalInvestedForPosition = buySwaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0);
        
        // Calculate total tokens sold (to subtract from current shares)
        const totalTokensSold = sellSwaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0);
        
        // The average price should be calculated based on the tokens that were actually bought
        // We can't use shares directly because it includes all current holdings
        // Calculate average price as weighted average of buy prices
        // This is an approximation since we don't have per-trade pricing
        const avgPrice = totalInvestedForPosition > 0 ? Math.min(totalInvestedForPosition / (shares + totalTokensSold), 0.99) : 0;
        
        // Calculate current price based on real-time odds (prefer) or market prices (fallback)
        // For YES tokens: use market yes price
        // For NO tokens: use market no price
        const realTimeData = realTimeOdds[position.presaleId];
        const marketPriceData = marketPrices[position.presaleId];
        
        let currentPrice = 0;
        if (realTimeData) {
          // Use real-time odds if available
          currentPrice = position.outcome === "YES" 
            ? realTimeData.yesPrice / 100 
            : realTimeData.noPrice / 100;
        } else if (marketPriceData) {
          // Fallback to subgraph prices
          currentPrice = position.outcome === "YES" ? marketPriceData.yesPrice : marketPriceData.noPrice;
        } else {
          // Fallback: use avgPrice if market prices are not available
          currentPrice = avgPrice;
        }
        
        // Calculate value (shares * current price)
        const value = shares * currentPrice;

        // Calculate P&L (value - avgPrice * shares) - same formula as TradingPositions
        const pnl = value - avgPrice * shares;
        
        totalPnL += pnl;
        totalInvested += totalInvestedForPosition;
      });
    }

    // Add claimable winnings to P&L
    totalPnL += totalClaimable;

    // Calculate P&L percentage
    const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    return {
      usdcBalance: usdc,
      portfolioValue: portfolioValue,
      totalPnL: totalPnL,
      totalPnLPercent: totalPnLPercent,
      openPositions: openPositionsCount,
      isLoading: swapsLoading || claimableLoading || presalesLoading
    };
  }, [address, usdcBalance, userSwaps, swapsLoading, claimablePositions, totalClaimable, claimableLoading, presalesLoading, tokenBalances, marketPrices, realTimeOddsParam]);

  return metrics;
}
