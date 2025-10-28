import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownUp, Info, Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { usePancakeSwapV4Trading } from "@/hooks/usePancakeSwapV4Trading";
import { usePresaleDetails } from "@/hooks/usePresaleDetails";
import { usePresales } from "@/hooks/usePresales";
import { usePointsTracking } from "@/hooks/usePointsTracking";
import { useRealTimeOdds } from "@/hooks/useRealTimeOdds";
import { ERROR_MESSAGES, formatErrorMessage, logError } from "@/lib/errorMessages";

interface TradeWidgetProps {
  market: {
    id: string;
    yesPrice: number;
    noPrice: number;
  };
  onOutcomeChange?: (outcome: "YES" | "NO") => void;
}

const TradeWidget = ({ market, onOutcomeChange }: TradeWidgetProps) => {
  const [amount, setAmount] = useState("");
  const [outcome, setOutcome] = useState<"YES" | "NO">("YES");
  const [isTrading, setIsTrading] = useState(false);
  const [tradeEstimate, setTradeEstimate] = useState<any>(null);
  const [poolExists, setPoolExists] = useState(false);
  const [presaleStatus, setPresaleStatus] = useState<{
    isGraduated: boolean
    poolsCreated: boolean
    canTrade: boolean
    message: string
  } | null>(null);
  const statusCheckedRef = useRef<string | null>(null);
  const estimateCache = useRef<Map<string, { estimate: any; timestamp: number }>>(new Map());
  const CACHE_DURATION = 5000; // Cache for 5 seconds
  const [yesBalance, setYesBalance] = useState(0);
  const [noBalance, setNoBalance] = useState(0);
  const [tradeError, setTradeError] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  const { isConnected, connect, address } = useWallet();
  const { balance: usdcBalance, contracts } = usePresaleManager();

  // Get presale details for pool key
  const { presaleDetails: contractPresaleDetails } = usePresaleDetails(market.id);

  // Get real-time odds from pool positions
  const {
    yesPrice: liveYesPrice,
    noPrice: liveNoPrice,
    isLoading: oddsLoading,
    error: oddsError
  } = useRealTimeOdds(market.id);

  // Use live prices if available, fallback to market prices
  const currentYesPrice = liveYesPrice || market.yesPrice;
  const currentNoPrice = liveNoPrice || market.noPrice;

  const {
    getTradeEstimate,
    executeTrade,
    executeSell,
    getTokenBalance,
    checkPCSV4Pool,
    checkPresaleStatus,
    clearBalanceCache,
    isPending: isTradePending,
    isConfirming: isTradeConfirming,
    isConfirmed: isTradeConfirmed,
    error: pcsTradeError,
    hash,
  } = usePancakeSwapV4Trading(undefined, market.id);

  const { trackTradePoints } = usePointsTracking();

  const { data: subgraphPresales } = usePresales();

  // Use subgraph data for resolved markets, contract data for others
  const subgraphPresale = subgraphPresales?.find(p => p.id === market.id);
  const presaleDetails = (subgraphPresale || contractPresaleDetails) as any;

  // Debug: Log which data source is being used
  useEffect(() => {
    if (presaleDetails) {
      //console.log('📊 PresaleDetails source:', subgraphPresale ? 'SUBGRAPH' : 'CONTRACT', {
        /*id: presaleDetails.id,
        yesToken: presaleDetails.yesToken,
        noToken: presaleDetails.noToken,
        tokensCreated: presaleDetails.tokensCreated
      });*/
    }
  }, [presaleDetails, subgraphPresale]);

  // Notify parent when outcome changes
  useEffect(() => {
    onOutcomeChange?.(outcome);
  }, [outcome, onOutcomeChange]);

  // Check presale status when presale details change
  useEffect(() => {
    const checkStatus = async () => {
      if (presaleDetails?.id && statusCheckedRef.current !== presaleDetails.id) {
        try {
          console.log('🔍 Checking presale status for:', presaleDetails.id);
          statusCheckedRef.current = presaleDetails.id;
          const status = await checkPresaleStatus(presaleDetails.id);
          console.log('📊 Presale status result:', status);
          console.log('📊 canTrade:', status.canTrade);
          console.log('📊 message:', status.message);
          setPresaleStatus(status);
        } catch (error) {
          //console.error('❌ Error checking presale status:', error);
          setPresaleStatus({
            isGraduated: false,
            poolsCreated: false,
            canTrade: false,
            message: 'Error checking presale status'
          });
        }
      }
    };

    checkStatus();
  }, [presaleDetails?.id, checkPresaleStatus]);

  // Check approval status on component mount
  useEffect(() => {
    const checkApprovalStatus = () => {
      if (typeof window !== 'undefined' && contracts) {
        const cacheKey = `${contracts.USDC}-${contracts.PRESALE_MANAGER}`
        const localStorageKey = `approval_${cacheKey}`
        const cachedApproval = localStorage.getItem(localStorageKey)

        if (cachedApproval) {
          const { approved, timestamp } = JSON.parse(cachedApproval)
          const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 heures

          if (Date.now() - timestamp < CACHE_DURATION && approved) {
            setIsApproved(true)
          }
        }
      }
    }

    checkApprovalStatus()
  }, [contracts])

  // Manual balance refresh function with enhanced debounce
  const refreshBalances = async () => {
    if (!presaleDetails || !address || !presaleDetails.tokensCreated) return;

    try {
      // Reduced debounce: attendre 500ms avant de faire les appels
      await new Promise(resolve => setTimeout(resolve, 500));

      //console.log('🔍 Refreshing balances with token addresses:', {
        /*yesToken: presaleDetails.yesToken,
        noToken: presaleDetails.noToken,
        userAddress: address
      });*/

       // Use token addresses from poolKey (correct location in subgraph)
       const yesTokenAddress = presaleDetails.poolKey?.yesToken || presaleDetails.yesToken;
       const noTokenAddress = presaleDetails.poolKey?.noToken || presaleDetails.noToken;

       // Check if tokens are still valid before making calls
       if (yesTokenAddress && yesTokenAddress !== '0x0000000000000000000000000000000000000000') {
         const yesBal = await getTokenBalance(yesTokenAddress, address);
         //console.log('✅ YES token balance:', yesBal, 'for token:', yesTokenAddress);
         setYesBalance(yesBal);

         // Add small delay between calls
         await new Promise(resolve => setTimeout(resolve, 200));
       }

       if (noTokenAddress && noTokenAddress !== '0x0000000000000000000000000000000000000000') {
         const noBal = await getTokenBalance(noTokenAddress, address);
         //console.log('✅ NO token balance:', noBal, 'for token:', noTokenAddress);
         setNoBalance(noBal);
       }
    } catch (error) {
      //console.warn('Failed to refresh balances:', error);
      // Set balances to 0 on error to avoid stale data
      setYesBalance(0);
      setNoBalance(0);
    }
  };

  // Get token balances (only if tokens are created) - Auto refresh enabled
  useEffect(() => {
    if (presaleDetails && presaleDetails.tokensCreated && address) {
      refreshBalances();
    } else {
      setYesBalance(0);
      setNoBalance(0);
    }
  }, [presaleDetails, address]);

  // Track points when trade succeeds
  useEffect(() => {
    if (isTradeConfirmed && hash && amount) {
      const amountNum = parseFloat(amount);
      if (amountNum > 0) {
        trackTradePoints(amountNum, hash);
        // Clear balance cache and refresh balances after successful trade
        setTimeout(() => {
          if (address) {
            clearBalanceCache(address);
          }
          refreshBalances();
        }, 2000); // Wait 2 seconds for transaction to be confirmed
      }
    }
  }, [isTradeConfirmed, hash, amount, trackTradePoints, refreshBalances, clearBalanceCache, address]);

  // Track which tab is active (buy or sell)
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

   useEffect(() => {
     // Reduced debounce for better responsiveness
     const timeoutId = setTimeout(async () => {
       //console.log('🔄 Trade estimate effect triggered', {
         //amount,
         //presaleDetails: !!presaleDetails,
         //tokensCreated: presaleDetails?.tokensCreated,
         //outcome,
         //activeTab
       //});

       if (amount && parseFloat(amount) > 0 && presaleDetails && presaleDetails.tokensCreated) {
         // Use token addresses from poolKey (correct location in subgraph)
         const tokenAddress = outcome === "YES" 
           ? presaleDetails.poolKey?.yesToken || presaleDetails.yesToken 
           : presaleDetails.poolKey?.noToken || presaleDetails.noToken;

         //console.log('🔍 Token address for estimate:', tokenAddress);

         if (tokenAddress && tokenAddress !== '0x0000000000000000000000000000000000000000') {
           try {
             // Get trade estimate for UI display with real-time prices
             const marketWithLivePrices = {
               ...market,
               yesPrice: currentYesPrice,
               noPrice: currentNoPrice
             };
             
             // Invert tokenIn and tokenOut for sell orders
             const tokenIn = activeTab === "sell" ? tokenAddress : contracts.USDC;
             const tokenOut = activeTab === "sell" ? contracts.USDC : tokenAddress;
             
            // Check cache first
            const cacheKey = `${tokenIn}-${tokenOut}-${amount}-${outcome}-${activeTab}`;
            const cached = estimateCache.current.get(cacheKey);
            
            if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
              console.log('✅ Using cached estimate');
              setTradeEstimate(cached.estimate);
              setPoolExists(true);
              return;
            }
            
            console.log('📊 Calling getTradeEstimate with:', {
              activeTab,
              tokenIn,
              tokenOut,
              amount,
              outcome,
              yesPrice: marketWithLivePrices.yesPrice,
              noPrice: marketWithLivePrices.noPrice,
              tokenAddress
            });
            
            const estimate = await getTradeEstimate(
              tokenIn,
              tokenOut,
              amount,
              0.5,
              marketWithLivePrices, // Pass market data with real-time prices
              outcome // Pass the outcome explicitly
            );

            console.log('✅ Trade estimate result:', estimate);
            
            // Cache the result
            if (estimate) {
              estimateCache.current.set(cacheKey, {
                estimate,
                timestamp: Date.now()
              });
            }

             if (estimate) {
               setTradeEstimate(estimate);
               setPoolExists(true);
             } else {
               console.log('⚠️ No trade estimate returned');
               setTradeEstimate(null);
               setPoolExists(false);
             }
           } catch (error: any) {
             console.error('❌ Error getting trade estimate:', error);
             setTradeEstimate(null);
             setPoolExists(false);
           }
         } else {
           //console.error('❌ Invalid token address:', tokenAddress);
           setTradeEstimate(null);
           setPoolExists(false);
         }
       } else {
         //console.log('⚠️ Conditions not met for trade estimate');
         setTradeEstimate(null);
         setPoolExists(false);
       }
     }, 1000); // Increased debounce to reduce frequent calls

     return () => clearTimeout(timeoutId);
   }, [amount, outcome, presaleDetails, getTradeEstimate, contracts.USDC, currentYesPrice, currentNoPrice, activeTab]);

  const handleTrade = async (type: "buy" | "sell") => {
    if (!isConnected) {
      toast.error(ERROR_MESSAGES.WALLET.NOT_CONNECTED);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error(ERROR_MESSAGES.GENERAL.INVALID_INPUT);
      return;
    }

    if (!presaleDetails || !presaleDetails.tokensCreated) {
      toast.error(ERROR_MESSAGES.TRADING.TOKENS_NOT_CREATED);
      return;
    }

    //console.log('🔍 Trade attempt - tradeEstimate:', tradeEstimate);
    //console.log('🔍 Trade attempt - presaleStatus:', presaleStatus);
    //console.log('🔍 Trade attempt - poolExists:', poolExists);

    if (!tradeEstimate) {
      //console.error('❌ No trade estimate available');
      toast.error(ERROR_MESSAGES.TRADING.NO_LIQUIDITY);
      return;
    }

     const amountNum = parseFloat(amount);
     // Use token addresses from poolKey (correct location in subgraph)
     const tokenAddress = outcome === "YES" 
       ? presaleDetails.poolKey?.yesToken || presaleDetails.yesToken 
       : presaleDetails.poolKey?.noToken || presaleDetails.noToken;

     if (!tokenAddress || tokenAddress === '0x0000000000000000000000000000000000000000') {
       toast.error(ERROR_MESSAGES.TRADING.INVALID_OUTCOME);
       return;
     }

    try {
      setIsTrading(true);
      setTradeError(null);

      if (type === "buy") {
        // Check USDC balance
        if (amountNum > usdcBalance) {
          toast.error(`${ERROR_MESSAGES.TRADING.INSUFFICIENT_USDT}. You have $${usdcBalance.toFixed(2)}`);
          setIsTrading(false);
          return;
        }

        // Execute trade via PresaleManager
        toast.info(`Buying ${outcome} tokens...`);

        const marketWithLivePrices = {
          ...market,
          yesPrice: currentYesPrice,
          noPrice: currentNoPrice
        };

        await executeTrade(
          contracts.USDC,
          tokenAddress,
          amount,
          0.5,
          marketWithLivePrices,
          outcome
        );

        toast.success(`Successfully swapped $${amount} USDT for ${tradeEstimate.amountOutFormatted.toFixed(2)} ${outcome} tokens!`);

        // Refresh balances after successful trade
        setTimeout(() => {
          refreshBalances();
        }, 2000);
      } else {
        // For selling: reverse the token flow (sell YES/NO for USDC)
        const tokenBalance = outcome === "YES" ? yesBalance : noBalance;

        if (amountNum > tokenBalance) {
          toast.error(`${ERROR_MESSAGES.TRADING.INSUFFICIENT_TOKENS}. You have ${tokenBalance.toFixed(2)} ${outcome} tokens`);
          setIsTrading(false);
          return;
        }

        // Execute sell trade via PancakeSwap V4 (router)
        toast.info(`Selling ${amount} ${outcome} tokens for USDT via PancakeSwap Infinity...`);
        
        const marketWithLivePrices = {
          ...market,
          yesPrice: currentYesPrice,
          noPrice: currentNoPrice
        };
        
        await executeSell(tokenAddress, amount, 0.5, marketWithLivePrices, outcome);

        toast.success(`Successfully sold ${amount} ${outcome} tokens for $${tradeEstimate.amountOutFormatted.toFixed(2)} USDT!`);

        // Refresh balances
        setTimeout(() => {
          refreshBalances();
        }, 2000);
      }
    } catch (error: any) {
      //console.error("Transaction error:", error);
      setTradeError(error.message);
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.TRADING.TRADE_FAILED);
      toast.error(errorMessage);
    } finally {
      setIsTrading(false);
    }
  };

   // Convert percentage to decimal for calculation (66% -> 0.66)
   const priceDecimal = (() => {
     const currentPrice = outcome === "YES" ? currentYesPrice : currentNoPrice;
     if (typeof currentPrice === 'string') {
       return parseFloat((currentPrice as string).replace('%', '')) / 100;
     }
     return (currentPrice as number) / 100;
   })();

   // Use real estimate if available, otherwise use simple calculation
   const shares = tradeEstimate
     ? tradeEstimate.amountOutFormatted.toFixed(2)
     : (amount ? (parseFloat(amount) / priceDecimal).toFixed(2) : "0.00");

   const minimumReceived = tradeEstimate
     ? tradeEstimate.minimumReceived.toFixed(2)
     : (amount ? ((parseFloat(amount) / priceDecimal) * 0.995).toFixed(2) : "0.00");

  const priceImpact = tradeEstimate
    ? tradeEstimate.priceImpact.toFixed(2)
    : "0.00";

   // Check if market is ready for trading
   // Market is ready if tokens are created (for both Graduated and Resolved states)
   const yesTokenAddress = presaleDetails?.poolKey?.yesToken || presaleDetails?.yesToken;
   const noTokenAddress = presaleDetails?.poolKey?.noToken || presaleDetails?.noToken;
   
   const isMarketReady = presaleDetails && (
     presaleDetails.tokensCreated &&
     yesTokenAddress !== '0x0000000000000000000000000000000000000000' &&
     noTokenAddress !== '0x0000000000000000000000000000000000000000' &&
     (presaleDetails.state === 'Graduated' || presaleDetails.state === 'Resolved') // Allow trading after graduation or resolution
   );

  // Check if presale exists but is not graduated yet
  const isPresalePending = presaleDetails && presaleDetails.state === 'Pending';

  return (
    <Card className="p-6 bg-card border-border sticky top-24">
      <h3 className="text-xl font-bold mb-4 text-foreground">Trade</h3>

      {/* Approval Info */}
      {isConnected && (
        <div className="p-3 rounded-lg mb-4 flex items-center gap-2 bg-blue-500/10 border border-blue-500/20">
          <Info className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-blue-500">Approval Info</p>
            <p className="text-xs text-blue-500/80">First trade will require USDT approval (~$0.01)</p>
          </div>
        </div>
      )}

      {/* Market Not Ready */}
      {!isMarketReady && presaleDetails && (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
          <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-orange-500 mb-1">
            {presaleDetails.state === 'Resolved' ? "Market Resolved" :
              presaleDetails.state === 'Pending' ? "Presale Not Graduated" :
                "Market Not Yet Active"}
          </p>
          <p className="text-xs text-orange-500/80">
            {presaleDetails.state === 'Active' ? "Presale is still in funding phase" :
              presaleDetails.state === 'Pending' ? "Pool not created yet - presale needs to be graduated first to create PancakeSwap Infinity pools" :
                presaleDetails.state === 'Graduated' && !presaleDetails.tokensCreated ? "Tokens are being created" :
                  presaleDetails.state === 'Resolved' ? "Market resolved - trading via PancakeSwap Infinity pools" :
                    "Market is not ready for trading"}
          </p>
        </div>
      )}

      {/* Wallet Status */}
      {!isConnected && isMarketReady ? (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border text-center">
          <Wallet className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-3">Connect your wallet to trade</p>
          <Button onClick={connect} className="w-full">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      ) : isMarketReady ? (
        <div className="mb-4 space-y-2">
          <div className="p-3 bg-muted/30 rounded-lg border border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">USDT Balance</span>
              <span className="font-medium text-foreground">${usdcBalance.toFixed(2)}</span>
            </div>
          </div>
          {presaleDetails && presaleDetails.tokensCreated && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Token Balances</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-success/5 rounded border border-success/20">
                  <div className="text-xs text-muted-foreground">YES Balance</div>
                  <div className="text-sm font-medium text-foreground">{yesBalance.toFixed(2)}</div>
                </div>
                <div className="p-2 bg-destructive/5 rounded border border-destructive/20">
                  <div className="text-xs text-muted-foreground">NO Balance</div>
                  <div className="text-sm font-medium text-foreground">{noBalance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}



      {/* Transaction Status */}
      {isMarketReady && (isTradePending || isTradeConfirming || isTradeConfirmed || pcsTradeError) && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${isTradeConfirmed ? 'bg-success/10 border border-success/20' :
          pcsTradeError ? 'bg-destructive/10 border border-destructive/20' :
            'bg-primary/10 border border-primary/20'
          }`}>
          {isTradeConfirmed ? (
            <CheckCircle className="w-4 h-4 text-success" />
          ) : pcsTradeError ? (
            <AlertCircle className="w-4 h-4 text-destructive" />
          ) : (
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          )}
        </div>
      )}

      {isMarketReady && isConnected && (
        <Tabs defaultValue="buy" onValueChange={(value) => setActiveTab(value as "buy" | "sell")} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            {/* Outcome Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Outcome</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={outcome === "YES" ? "default" : "outline"}
                  onClick={() => setOutcome("YES")}
                  className={outcome === "YES" ? "bg-success hover:bg-success/90" : ""}
                >
                   YES {(currentYesPrice).toFixed(0)}%
                   {liveYesPrice && (
                     <span className={`text-xs ml-1 ${outcome === "YES" ? "text-white" : "text-green-600"}`}>● Live</span>
                   )}
                </Button>
                <Button
                  variant={outcome === "NO" ? "default" : "outline"}
                  onClick={() => setOutcome("NO")}
                  className={outcome === "NO" ? "bg-destructive hover:bg-destructive/90" : ""}
                >
                   NO {(currentNoPrice).toFixed(0)}%
                   {liveNoPrice && (
                     <span className={`text-xs ml-1 ${outcome === "NO" ? "text-white" : "text-green-600"}`}>● Live</span>
                   )}
                </Button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount (USDT)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow positive integers
                  if (value === '' || /^\d+$/.test(value)) {
                    setAmount(value);
                  }
                }}
                className="text-lg"
                min="1"
                step="1"
              />
            </div>

            {/* Trade Details - Real-time estimate from Uniswap */}
            {amount && parseFloat(amount) > 0 && (
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You receive (estimated)</span>
                  <span className="font-medium text-foreground">
                    {tradeEstimate ? (
                      <>{shares} {outcome} <span className="text-xs text-success">✓ Live</span></>
                    ) : (
                      <>{shares} {outcome} <span className="text-xs text-muted-foreground">~Calc</span></>
                    )}
                  </span>
                </div>
                {tradeEstimate && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Minimum received</span>
                      <span className="font-medium text-foreground">{minimumReceived} {outcome}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price impact</span>
                      <span className={`font-medium ${parseFloat(priceImpact) > 5 ? 'text-destructive' :
                        parseFloat(priceImpact) > 2 ? 'text-orange-500' :
                          'text-foreground'
                        }`}>
                        {priceImpact}%
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slippage tolerance</span>
                  <span className="font-medium text-foreground">0.5%</span>
                </div>
              </div>
            )}

            {/* Impact Warning */}
            {amount && parseFloat(amount) > 5000 && (
              <div className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <Info className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <p className="text-xs text-orange-500">
                  Large trade detected. Price impact may be significant.
                </p>
              </div>
            )}

            {/* Price Impact Warning */}
            {tradeEstimate && parseFloat(priceImpact) > 5 && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-destructive">High Price Impact!</p>
                  <p className="text-xs text-destructive/80">
                    This trade will significantly move the market price
                  </p>
                </div>
              </div>
            )}

            {/* Points Info */}
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-primary">
                {amount && parseFloat(amount) > 0 ? (
                  <>You'll earn <strong>{(parseFloat(amount) * 10).toLocaleString()} points</strong></>
                ) : (
                  <>Earn 10 points per $1 traded</>
                )}
              </p>
            </div>


            {/* Action Button */}
            <Button
              onClick={() => handleTrade("buy")}
              className="w-full"
              size="lg"
              disabled={!isConnected || isTrading || isTradePending || isTradeConfirming || !amount || parseFloat(amount) < 1 || !presaleStatus?.canTrade}
            >
              {isTrading || isTradePending || isTradeConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isTradePending ? "Approving..." : isTradeConfirming ? "Confirming..." : "Processing..."}
                </>
              ) : !presaleStatus?.canTrade && amount && parseFloat(amount) > 0 ? (
                presaleStatus?.message || "No PancakeSwap Infinity Liquidity Available"
              ) : (
                `Buy ${outcome}`
              )}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            {/* Outcome Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Outcome</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={outcome === "YES" ? "default" : "outline"}
                  onClick={() => setOutcome("YES")}
                  className={outcome === "YES" ? "bg-success hover:bg-success/90" : ""}
                >
                   YES {(currentYesPrice).toFixed(0)}%
                   {liveYesPrice && (
                     <span className={`text-xs ml-1 ${outcome === "YES" ? "text-white" : "text-green-600"}`}>● Live</span>
                   )}
                </Button>
                <Button
                  variant={outcome === "NO" ? "default" : "outline"}
                  onClick={() => setOutcome("NO")}
                  className={outcome === "NO" ? "bg-destructive hover:bg-destructive/90" : ""}
                >
                   NO {(currentNoPrice).toFixed(0)}%
                   {liveNoPrice && (
                     <span className={`text-xs ml-1 ${outcome === "NO" ? "text-white" : "text-green-600"}`}>● Live</span>
                   )}
                </Button>
              </div>
            </div>

            {/* Shares Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Shares to sell</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Available: {outcome === "YES" ? yesBalance.toFixed(2) : noBalance.toFixed(2)} {outcome} shares
              </p>
            </div>

            {/* Trade Details - Selling tokens for USDC */}
            {amount && parseFloat(amount) > 0 && (
              <div className="space-y-2 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You receive (estimated)</span>
                  <span className="font-medium text-foreground">
                     {tradeEstimate ? (
                       <>${tradeEstimate.amountOutFormatted.toFixed(2)} USDT <span className="text-xs text-success">✓ Live</span></>
                     ) : (
                       <>${(parseFloat(amount) * priceDecimal).toFixed(2)} USDT <span className="text-xs text-muted-foreground">~Calc</span></>
                     )}
                  </span>
                </div>
                {tradeEstimate && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Minimum received</span>
                      <span className="font-medium text-foreground">${tradeEstimate.minimumReceived.toFixed(2)} USDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price impact</span>
                      <span className={`font-medium ${parseFloat(priceImpact) > 5 ? 'text-destructive' :
                        parseFloat(priceImpact) > 2 ? 'text-orange-500' :
                          'text-foreground'
                        }`}>
                        {priceImpact}%
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slippage tolerance</span>
                  <span className="font-medium text-foreground">0.5%</span>
                </div>
              </div>
            )}

            {/* Points Info */}
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-primary">
                {amount && parseFloat(amount) > 0 ? (
                   <>You'll earn <strong>{(parseFloat(amount) * 10).toLocaleString()} points</strong></>
                ) : (
                  <>Earn 10 points per $1 traded</>
                )}
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => handleTrade("sell")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              size="lg"
              disabled={!isConnected || isTrading || isTradePending || isTradeConfirming || !amount || parseFloat(amount) < 1 || !presaleStatus?.canTrade}
            >
              {isTrading || isTradePending || isTradeConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isTradePending ? "Approving..." : isTradeConfirming ? "Confirming..." : "Processing..."}
                </>
              ) : !presaleStatus?.canTrade && amount && parseFloat(amount) > 0 ? (
                presaleStatus?.message || "No PancakeSwap Infinity Liquidity Available"
              ) : (
                `Sell ${outcome}`
              )}
            </Button>
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};

export default TradeWidget;
