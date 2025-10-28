import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, CheckCircle2, Trophy, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClaimableWinnings } from "@/hooks/useClaimableWinnings";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useMarketTrading } from "@/hooks/useMarketTrading";
import { useUserSwapHistory } from "@/hooks/useSwapData";
import { getContractAddresses, PRESALE_MANAGER_ABI } from "@/lib/contracts";
import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";
import { ERROR_MESSAGES, formatErrorMessage, logError } from "@/lib/errorMessages";
import { usePancakeSwapV4Trading } from "@/hooks/usePancakeSwapV4Trading";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUSDC } from "@/lib/contracts";
import { usePresales } from "@/hooks/usePresales";

// Component to display a position card with real-time odds and claim button for resolved markets
const PositionCard = ({ position, presaleId, pnl }: { 
  position: any, 
  presaleId: string,
  pnl: number
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address } = useWallet();
  const contracts = getContractAddresses();
  
  // Check if market is resolved
  const { data: presales } = usePresales();
  const presale = presales?.find(p => p.id === presaleId);
  const isResolved = presale?.resolved || false;
  const forceResolvedAnswer = presale?.forceResolvedAnswer;
  
  // Determine if user has winning tokens
  const winningOutcome = forceResolvedAnswer === 1 ? 'YES' : forceResolvedAnswer === 0 ? 'NO' : null;
  const hasWinningTokens = isResolved && winningOutcome === position.outcome;
  
  // Get token balances
  const { data: yesTokenBalance } = useReadContract({
    address: presale?.yesToken as `0x${string}`,
    abi: [{ inputs: [{ name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!presale?.yesToken && isResolved }
  });
  
  const { data: noTokenBalance } = useReadContract({
    address: presale?.noToken as `0x${string}`,
    abi: [{ inputs: [{ name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!presale?.noToken && isResolved }
  });
  
  const winningTokenBalance = winningOutcome === 'YES' ? yesTokenBalance : winningOutcome === 'NO' ? noTokenBalance : 0n;
  const winningBalanceFormatted = winningTokenBalance ? parseUSDC(winningTokenBalance as bigint) : 0;
  
  // State for claiming
  const [isApproving, setIsApproving] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>(undefined);
  const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } = useWaitForTransactionReceipt({ hash: approvalHash });
  
  // Handle claim
  const handleClaim = async () => {
    try {
      if (!address || !presaleId || !presale?.yesToken || !presale?.noToken || !winningTokenBalance) {
        sonnerToast.error('Missing required information for claiming');
        return;
      }
      
      setIsClaiming(true);
      setIsApproving(true);
      
      const winningTokenAddress = winningOutcome === 'YES' ? presale.yesToken : presale.noToken;
      
      // Approve first
      writeContract({
        address: winningTokenAddress as `0x${string}`,
        abi: [{ inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }],
        functionName: 'approve',
        args: [contracts.PRESALE_MANAGER as `0x${string}`, winningTokenBalance as bigint],
      } as any);
      
      sonnerToast.info('Waiting for approval...');
    } catch (error) {
      console.error('Error starting claim:', error);
      sonnerToast.error('Failed to start claim');
      setIsClaiming(false);
      setIsApproving(false);
    }
  };
  
  // Handle approval confirmation and auto-redeem
  useEffect(() => {
    if (isApprovalConfirmed && isApproving) {
      setIsApproving(false);
      sonnerToast.success('Approval confirmed! Claiming tokens...');
      
      if (address && presaleId && winningTokenBalance) {
        const yesAmount = winningOutcome === 'YES' ? winningTokenBalance as bigint : BigInt(0);
        const noAmount = winningOutcome === 'NO' ? winningTokenBalance as bigint : BigInt(0);
        
        writeContract({
          address: contracts.PRESALE_MANAGER as `0x${string}`,
          abi: PRESALE_MANAGER_ABI,
          functionName: 'redeemTokens',
          args: [presaleId as `0x${string}`, yesAmount, noAmount],
        } as any);
      }
    }
  }, [isApprovalConfirmed, isApproving, address, presaleId, winningTokenBalance, winningOutcome, contracts.PRESALE_MANAGER, writeContract]);
  
  // Handle successful claim
  useEffect(() => {
    if (isConfirmed && isClaiming) {
      sonnerToast.success('Winnings claimed successfully!');
      setIsClaiming(false);
      // Refresh page to update positions
      window.location.reload();
    }
  }, [isConfirmed, isClaiming]);
  
  // Use the provided current price (no real-time updates in profile to avoid performance issues)
  const currentPrice = parseFloat(position.currentPrice);
  const value = parseFloat(position.shares) * currentPrice;
  
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {position.question}
          </h3>
          <div className="flex gap-2">
            <Badge className={position.outcome === "YES" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>
              {position.outcome}
            </Badge>
            <Badge variant="outline">{position.shares} shares</Badge>
            {isResolved && hasWinningTokens && (
              <Badge className="bg-success/20 text-success border-success/30">
                <Trophy className="w-3 h-3 mr-1" />
                Won - Claimable
              </Badge>
            )}
          </div>
        </div>
        {isResolved && hasWinningTokens && winningBalanceFormatted > 0 ? (
          <Button 
            onClick={handleClaim}
            disabled={isApproving || isClaiming || isPending || isConfirming}
            size="sm"
            className="bg-success hover:bg-success/90"
          >
            {isApproving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Approving...
              </>
            ) : isClaiming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Claiming...
              </>
            ) : (
              `Claim $${winningBalanceFormatted.toFixed(2)}`
            )}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/market/${position.presaleId}`)}
          >
            Trade
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        {/* Avg Price - Commented out */}
        {/* <div>
          <p className="text-muted-foreground mb-1">Avg Price</p>
          <p className="font-medium text-foreground">${position.avgPrice}</p>
        </div> */}
        <div>
          <p className="text-muted-foreground mb-1">Current Price</p>
          <p className="font-medium text-foreground">${currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Value</p>
          <p className="font-medium text-foreground">${value.toFixed(2)}</p>
        </div>
        {/* P&L - Commented out */}
        {/* <div>
          <p className="text-muted-foreground mb-1">P&L</p>
          <div className="flex items-center gap-1">
            <p className={`font-bold ${realTimePnl >= 0 ? "text-success" : "text-destructive"}`}>
              {realTimePnl >= 0 ? "+" : ""}${realTimePnl.toFixed(2)}
            </p>
            {realTimePnl >= 0 ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
          </div>
        </div> */}
      </div>
    </Card>
  );
};

const TradingPositions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address } = useWallet();
  const { claimablePositions, totalClaimable, isLoading, hasClaimable } = useClaimableWinnings();
  const { executeTrade, getTradeEstimate, checkUniswapPool } = useMarketTrading();
  const [claimingPosition, setClaimingPosition] = useState<string | null>(null);
  const [historyPage, setHistoryPage] = useState(1);
  const [openPositionsPage, setOpenPositionsPage] = useState(1);
  const contracts = getContractAddresses();

  // Hook to get token balances
  const { getTokenBalance } = usePancakeSwapV4Trading();
  
  // State to store token balances per position
  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>({});
  const [isFetchingBalances, setIsFetchingBalances] = useState(false);
  
  // Get user's trading history
  const { swaps: userSwaps, isLoading: historyLoading } = useUserSwapHistory(undefined, address);
  
  // State to store market prices per presaleId
  const [marketPrices, setMarketPrices] = useState<Record<string, { yesPrice: number; noPrice: number }>>({});

  // Fetch token balances for all open positions
  useEffect(() => {
    const fetchBalances = async () => {
      if (!address || !userSwaps || userSwaps.length === 0) {
        setIsFetchingBalances(false);
        return;
      }

      setIsFetchingBalances(true);
      
      try {
        const balances: Record<string, number> = {};
        
        // Group swaps by presaleId
        const swapsByPresale = new Map<string, typeof userSwaps>();
        userSwaps.forEach(swap => {
          if (swap.presale?.id) {
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
            const yesBalance = await getTokenBalance(poolKey.yesToken, address);
            const noBalance = await getTokenBalance(poolKey.noToken, address);
            
            balances[`${presaleId}-YES`] = yesBalance;
            balances[`${presaleId}-NO`] = noBalance;
          }
        }
        setTokenBalances(balances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setIsFetchingBalances(false);
      }
    };
    
    fetchBalances();
  }, [userSwaps, address]);
  
  // Fetch market prices for each unique presaleId (with real-time odds in the calculation)
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
      
      // For now, use subgraph odds as base
      // Real-time odds will be fetched later via useRealTimeOdds per position
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

  // Filter swaps for open positions (graduated markets, not resolved)
  const openSwaps = userSwaps.filter(swap => 
    swap.presale && 
    swap.presale.state === 'Graduated' && 
    !swap.presale.resolved
  );

  // Group open swaps by presaleId and outcome (YES/NO)
  const openPositionsMap = new Map<string, {
    presaleId: string;
    question: string;
    outcome: string;
    swaps: typeof openSwaps;
  }>();

  openSwaps.forEach(swap => {
    if (!swap.presale) return;
    
    // Determine outcome based on tokenOut address
    // If tokenOut matches YES token, this is a YES buy
    // If tokenOut matches NO token, this is a NO buy
    const poolKey = swap.presale.poolKey;
    let outcome: "YES" | "NO";
    
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
    
    if (!openPositionsMap.has(key)) {
      openPositionsMap.set(key, {
        presaleId: swap.presale.id,
        question: swap.presale.question,
        outcome,
        swaps: []
      });
    }
    
    openPositionsMap.get(key)!.swaps.push(swap);
  });

  // Convert to array and calculate aggregated values
  const openPositions = Array.from(openPositionsMap.values()).map(position => {
    const swaps = position.swaps;
    const contracts = getContractAddresses();
    const usdcAddress = contracts.USDC.toLowerCase();
    
    // Separate BUY swaps (USDC -> Token) and SELL swaps (Token -> USDC)
    const buySwaps = swaps.filter(swap => swap.tokenIn?.toLowerCase() === usdcAddress);
    const sellSwaps = swaps.filter(swap => swap.tokenOut?.toLowerCase() === usdcAddress);
    
    // Get the actual token balance from the blockchain
    const positionKey = `${position.presaleId}-${position.outcome}`;
    const shares = tokenBalances[positionKey] || 0;
    
    // Calculate total invested (sum of USDC spent on buys)
    const totalInvested = buySwaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0);
    
    // Calculate total tokens sold (to subtract from current shares)
    const totalTokensSold = sellSwaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0);
    
    // Calculate total USD received from sells
    const totalUSDReceived = sellSwaps.reduce((sum, swap) => sum + parseFloat(swap.amountOut) / 1e18, 0);
    
    // The average price should be calculated based on the tokens that were actually bought
    // We can't use shares directly because it includes all current holdings
    // We need to estimate based on the current price and the invested amount
    // For now, we'll use a simple approximation: avgPrice = average of buy prices
    // But since we don't have per-trade amounts, we'll use the current price as a proxy
    
    // Calculate average price as weighted average of buy prices
    // This is an approximation since we don't have per-trade pricing
    const avgPrice = totalInvested > 0 ? Math.min(totalInvested / (shares + totalTokensSold), 0.99) : 0;
    

    
    // Calculate current price based on market prices
    // For YES tokens: use market yes price
    // For NO tokens: use market no price
    const marketPriceData = marketPrices[position.presaleId];
    let currentPrice = 0;
    if (marketPriceData) {
      currentPrice = position.outcome === "YES" ? marketPriceData.yesPrice : marketPriceData.noPrice;
    } else {
      // Fallback: use avgPrice if market prices are not available
      currentPrice = avgPrice;
    }
    
    // Calculate value (current shares * current price)
    // For open positions, this is the estimated current value based on current price
    const value = shares * currentPrice;

    // Calculate P&L (value - cost basis)
    // Cost basis = avgPrice * shares (current holdings)
    const pnl = value - avgPrice * shares;
    
    return {
      id: `${position.presaleId}-${position.outcome}`,
      presaleId: position.presaleId,
      question: position.question,
      outcome: position.outcome,
      shares: Math.max(0, shares).toFixed(2),
      avgPrice: avgPrice.toFixed(2),
      currentPrice: currentPrice.toFixed(2),
      value: value.toFixed(2),
      pnl: pnl.toFixed(2),
      invested: totalInvested.toFixed(2),
      returned: shares.toFixed(2)
    };
  });

  // Filter positions into open (not yet redeemable) and history (already claimed/redeemable)
  const positions = claimablePositions;

  // Filter positions to show only those with shares > 0
  const openPositionsFiltered = openPositions.filter(position => parseFloat(position.shares) > 0);
  
  // Count unique open positions (presaleId + outcome combinations with shares > 0)
  const openPositionsCount = openPositionsFiltered.length;
  
  // Paginate open positions
  const OPEN_ITEMS_PER_PAGE = 10;
  const totalOpenPages = Math.ceil(openPositionsFiltered.length / OPEN_ITEMS_PER_PAGE);
  const openPositionsPaginated = openPositionsFiltered.slice(
    (openPositionsPage - 1) * OPEN_ITEMS_PER_PAGE,
    openPositionsPage * OPEN_ITEMS_PER_PAGE
  );
  
  // Transform history: group resolved swaps by presaleId + outcome
  const resolvedSwaps = userSwaps.filter(swap => swap.presale && swap.presale.resolved);
  
  // Group swaps by presaleId + outcome
  const historyMap = new Map<string, typeof resolvedSwaps>();
  
  resolvedSwaps.forEach((swap) => {
    const presale = swap.presale!;
    
    // Determine outcome (YES or NO) based on tokenOut address
    let outcome: "YES" | "NO" = "YES";
    if (presale.poolKey?.yesToken && presale.poolKey?.noToken) {
      const tokenOutLower = swap.tokenOut?.toLowerCase() || '';
      const yesTokenLower = presale.poolKey.yesToken.toLowerCase();
      const noTokenLower = presale.poolKey.noToken.toLowerCase();
      
      if (tokenOutLower === yesTokenLower) {
        outcome = "YES";
      } else if (tokenOutLower === noTokenLower) {
        outcome = "NO";
      }
    }
    
    const key = `${presale.id}-${outcome}`;
    
    if (!historyMap.has(key)) {
      historyMap.set(key, []);
    }
    historyMap.get(key)!.push(swap);
  });
  
  // Calculate aggregated values for each position
  const allHistory = Array.from(historyMap.entries()).map(([key, swaps]) => {
    const firstSwap = swaps[0];
    const presale = firstSwap.presale!;
    
    // Determine outcome
    let outcome: "YES" | "NO" = "YES";
    if (presale.poolKey?.yesToken && presale.poolKey?.noToken) {
      const tokenOutLower = firstSwap.tokenOut?.toLowerCase() || '';
      const yesTokenLower = presale.poolKey.yesToken.toLowerCase();
      const noTokenLower = presale.poolKey.noToken.toLowerCase();
      
      if (tokenOutLower === yesTokenLower) {
        outcome = "YES";
      } else if (tokenOutLower === noTokenLower) {
        outcome = "NO";
      }
    }
    
    // Determine if this was a winning position
    const forceResolvedAnswer = typeof presale.forceResolvedAnswer === 'string' 
      ? parseInt(presale.forceResolvedAnswer, 10) 
      : presale.forceResolvedAnswer;
    
    const winningOutcome = forceResolvedAnswer === 1 ? "YES" : forceResolvedAnswer === 0 ? "NO" : null;
    const result = winningOutcome && outcome === winningOutcome ? "won" : "lost";
    
    const contracts = getContractAddresses();
    const usdcAddress = contracts.USDC.toLowerCase();
    
    // Separate BUY swaps (USDC -> Token) and SELL swaps (Token -> USDC)
    const buySwaps = swaps.filter(swap => swap.tokenIn?.toLowerCase() === usdcAddress);
    const sellSwaps = swaps.filter(swap => swap.tokenOut?.toLowerCase() === usdcAddress);
    
    // Calculate total invested (sum of USDC spent on buys)
    const totalInvested = buySwaps.reduce((sum, swap) => sum + parseFloat(swap.amountIn) / 1e18, 0);
    
    // Since amountOut is 0 in subgraph, we need a different approach
    // For BUY swaps: USDC -> Token
    // - amountIn = USDC spent
    // - amountOut = tokens received (but is 0 in subgraph)
    // For SELL swaps: Token -> USDC
    // - amountIn = tokens sold
    // - amountOut = USDC received
    
    // We'll use a simple approximation: for resolved markets, shares = totalInvested
    // since tokens are worth approximately $1 each when bought
    const totalTokensBought = totalInvested; // Approximation: 1 USDC ≈ 1 token share
    const totalTokensSold = sellSwaps.reduce((sum, swap) => {
      // When selling: tokenIn is tokens sold, amountOut is USDC received
      // We can estimate tokens sold from USDC received
      return sum + parseFloat(swap.amountOut) / 1e18;
    }, 0);
    
    // Total shares held at resolution (tokens bought - tokens sold)
    const sharesAtResolution = Math.max(0, totalTokensBought - totalTokensSold);
    
    // Calculate total returned = USDC from sells during trading
    let totalReturned = sellSwaps.reduce((sum, swap) => sum + parseFloat(swap.amountOut) / 1e18, 0);
    
    // For winning positions, add the claimable value of winning tokens
    // The winning tokens were worth $1 each when claimed at resolution
    if (result === "won" && sharesAtResolution > 0) {
      // The user claimed sharesAtResolution worth of winning tokens
      totalReturned += sharesAtResolution; // Winning tokens are redeemed for $1 each
    }
    // For losing positions, remaining tokens are worth $0 (never redeemed)
    
    // Calculate P&L
    const pnl = totalReturned - totalInvested;
    
    return {
      id: key,
      question: presale.question,
      outcome,
      invested: totalInvested.toFixed(2),
      returned: totalReturned.toFixed(2),
      shares: sharesAtResolution.toFixed(2),
      pnl: pnl.toFixed(2),
      result
    };
  });

  // Paginate history
  const ITEMS_PER_PAGE = 10;
  const totalHistoryPages = Math.ceil(allHistory.length / ITEMS_PER_PAGE);
  const history = allHistory.slice((historyPage - 1) * ITEMS_PER_PAGE, historyPage * ITEMS_PER_PAGE);

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Trading Positions</h2>
      <Tabs defaultValue="open" className="space-y-6">
      <TabsList>
        <TabsTrigger value="open">Open Positions</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>

      {/* Claimable Winnings Summary */}
      {hasClaimable && (
        <Card className="p-6 bg-success/10 border-success/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Trophy className="w-12 h-12 text-success" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Claimable Winnings</p>
                <p className="text-3xl font-bold text-success">${totalClaimable.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">From {positions.length} winning position{positions.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-2">Trade your winning tokens on Uniswap</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                Browse Markets
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Open Positions */}
      <TabsContent value="open" className="space-y-4">
        {(historyLoading || isFetchingBalances) ? (
          <Card className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading positions...</p>
          </Card>
        ) : openPositionsFiltered.length === 0 ? (
          <Card className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Open Positions
            </h3>
            <p className="text-muted-foreground mb-6">
              You don't have any open trading positions yet.
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Browse Markets
            </Button>
          </Card>
        ) : (
          openPositionsPaginated.map((position) => {
            const pnl = parseFloat(position.pnl);
            
            return (
              <PositionCard
                key={position.id}
                position={position}
                presaleId={position.presaleId}
                pnl={pnl}
              />
            );
          })
        )}
        
        {/* Pagination for Open Positions */}
        {openPositionsFiltered.length > 0 && totalOpenPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenPositionsPage(p => Math.max(1, p - 1))}
              disabled={openPositionsPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {openPositionsPage} of {totalOpenPages}
            </span>
              <Button 
              variant="outline"
                size="sm"
              onClick={() => setOpenPositionsPage(p => Math.min(totalOpenPages, p + 1))}
              disabled={openPositionsPage === totalOpenPages}
            >
              Next
              </Button>
            </div>
        )}
      </TabsContent>

      {/* History */}
      <TabsContent value="history" className="space-y-4">
        {historyLoading ? (
          <Card className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Loading Trading History
            </h3>
            <p className="text-muted-foreground">
              Fetching your trading history...
            </p>
          </Card>
        ) : history.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Trading History
            </h3>
            <p className="text-muted-foreground">
              Your resolved positions will appear here.
            </p>
          </Card>
        ) : (
          history.map((item) => (
          <Card key={item.id} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.question}
                </h3>
                <div className="flex gap-2">
                  <Badge className={item.outcome === "YES" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>
                    {item.outcome}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                  <Badge className={item.result === "won" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}>
                    {item.result === "won" ? "Won" : "Lost"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Invested</p>
                <p className="font-medium text-foreground">${item.invested}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Returned</p>
                <p className="font-medium text-foreground">${item.returned}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Shares</p>
                <p className="font-medium text-foreground">{item.shares}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">P&L</p>
                <p className={`font-bold ${parseFloat(item.pnl) >= 0 ? "text-success" : "text-destructive"}`}>
                  {parseFloat(item.pnl) >= 0 ? "+" : ""}${item.pnl}
                </p>
              </div>
            </div>
          </Card>
        ))
        )}
        
        {/* Pagination */}
        {allHistory.length > 0 && totalHistoryPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
              disabled={historyPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {historyPage} of {totalHistoryPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryPage(p => Math.min(totalHistoryPages, p + 1))}
              disabled={historyPage === totalHistoryPages}
            >
              Next
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default TradingPositions;