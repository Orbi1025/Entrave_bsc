import { useState, useEffect } from 'react';
import { createPublicClient, http, parseAbi } from 'viem';
import { bsc } from 'viem/chains';

// PancakeSwap V4 Quoter ABI (simplified for quoteExactInputSingle)
const QUOTER_ABI = parseAbi([
  'function quoteExactInputSingle((address tokenIn, address tokenOut, uint256 amountIn, uint160 sqrtPriceLimitX96, uint24 fee)) external view returns (uint256 amountOut)',
  'function quoteExactOutputSingle((address tokenIn, address tokenOut, uint256 amountOut, uint160 sqrtPriceLimitX96, uint24 fee)) external view returns (uint256 amountIn)'
]);

// PancakeSwap Infinity contract addresses on BSC Mainnet
// Source: https://developer.pancakeswap.finance/contracts/infinity/resources/addresses
const PANCAKESWAP_INFINITY_ADDRESSES = {
  CLQUOTER: '0xd0737C9762912dD34c3271197E362Aa736Df0926', // Concentrated Liquidity Quoter
  BINQUOTER: '0xC631f4B0Fc2Dd68AD45f74B2942628db117dD359', // Bin Quoter
  MIXEDQUOTER: '0x2dCbF7B985c8C5C931818e4E107bAe8aaC8dAB7C', // Mixed Quoter (recommended)
  CLPOOLMANAGER: '0xa0FfB9c1CE1Fe56963B0321B32E7A0302114058b', // Pool Manager
  UNIVERSALROUTER: '0xd9c500dff816a1da21a48a732d3498bf09dc9aeb' // Universal Router
};

interface QuoteParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  fee?: number; // Pool fee tier (500, 3000, 10000)
}

interface QuoteResult {
  amountOut: string;
  isLoading: boolean;
  error: string | null;
}

export function usePancakeSwapQuoter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create public client for BSC
  const publicClient = createPublicClient({
    chain: bsc,
    transport: http()
  });

  const getQuote = async (params: QuoteParams): Promise<QuoteResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { tokenIn, tokenOut, amountIn, fee = 3000 } = params;

      // Convert amount to BigInt (assuming 18 decimals for most tokens)
      const amountInBigInt = BigInt(parseFloat(amountIn) * 1e18);

      // Call quoteExactInputSingle
      const quoteParams = {
        tokenIn: tokenIn as `0x${string}`,
        tokenOut: tokenOut as `0x${string}`,
        amountIn: amountInBigInt,
        sqrtPriceLimitX96: BigInt(0), // No price limit
        fee: fee
      };

      // Try different quoters in order of preference
      let amountOut: bigint;
      
      try {
        // Try MixedQuoter first (most flexible)
        amountOut = await publicClient.readContract({
          address: PANCAKESWAP_INFINITY_ADDRESSES.MIXEDQUOTER as `0x${string}`,
          abi: QUOTER_ABI,
          functionName: 'quoteExactInputSingle',
          args: [quoteParams],
          authorizationList: []
        });
        console.log('✅ MixedQuoter success');
      } catch (mixedError) {
        console.log('⚠️ MixedQuoter failed, trying BinQuoter:', mixedError);
        
        try {
          // Try BinQuoter as fallback
          amountOut = await publicClient.readContract({
            address: PANCAKESWAP_INFINITY_ADDRESSES.BINQUOTER as `0x${string}`,
            abi: QUOTER_ABI,
            functionName: 'quoteExactInputSingle',
            args: [quoteParams],
            authorizationList: []
          });
          console.log('✅ BinQuoter success');
        } catch (binError) {
          console.log('⚠️ BinQuoter failed, trying CLQuoter:', binError);
          
          // Try CLQuoter as last resort
          amountOut = await publicClient.readContract({
            address: PANCAKESWAP_INFINITY_ADDRESSES.CLQUOTER as `0x${string}`,
            abi: QUOTER_ABI,
            functionName: 'quoteExactInputSingle',
            args: [quoteParams],
            authorizationList: []
          });
          console.log('✅ CLQuoter success');
        }
      }

      // Convert amountOut back to number
      const amountOutNumber = Number(amountOut) / 1e18;

      return {
        amountOut: amountOutNumber.toString(),
        isLoading: false,
        error: null
      };

    } catch (err) {
      console.error('Error getting quote:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get quote';
      
      return {
        amountOut: '0',
        isLoading: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };


  return {
    getQuote,
    isLoading,
    error
  };
}

// Hook for getting swap estimates with caching
export function useSwapEstimate(tokenIn: string, tokenOut: string, amountIn: string) {
  const [estimate, setEstimate] = useState<QuoteResult | null>(null);
  const { getQuote, isLoading, error } = usePancakeSwapQuoter();

  useEffect(() => {
    if (!tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
      setEstimate(null);
      return;
    }

    const fetchEstimate = async () => {
      const result = await getQuote({
        tokenIn,
        tokenOut,
        amountIn
      });
      setEstimate(result);
    };

    // Debounce the quote request
    const timeoutId = setTimeout(fetchEstimate, 300);
    return () => clearTimeout(timeoutId);
  }, [tokenIn, tokenOut, amountIn, getQuote]);

  return {
    estimate,
    isLoading,
    error
  };
}
