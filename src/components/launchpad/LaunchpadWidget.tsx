import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, CheckCircle, AlertTriangle, XCircle, Wallet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { usePointsTracking } from "@/hooks/usePointsTracking";
import { ERROR_MESSAGES, formatErrorMessage, logError } from "@/lib/errorMessages";

interface LaunchpadWidgetProps {
  marketId: string;
  currentLiquidity?: number;
  targetLiquidity?: number;
  onContributionSuccess?: () => void;
}

const LaunchpadWidget = ({ marketId, currentLiquidity = 0, targetLiquidity = 0, onContributionSuccess }: LaunchpadWidgetProps) => {
  const [amount, setAmount] = useState("");
  const [isContributing, setIsContributing] = useState(false);
  const hasHandledSuccess = useRef(false);
  const contributionAmountRef = useRef<string>("");

  const { isConnected, connect } = useWallet();
  const { 
    contributeToPresale, 
    approveUSDC, 
    allowance, 
    balance, 
    transactionStatus, 
    isPending, 
    isConfirming,
    hash
  } = usePresaleManager();
  
  const { trackLaunchpadPoints } = usePointsTracking();

  // Monitor contribution success
  useEffect(() => {
    if (transactionStatus.type === 'contribute' && transactionStatus.status === 'success' && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      const contributionAmount = contributionAmountRef.current;
      setAmount("");
      setIsContributing(false);
      toast.success("Contribution successful!");
      
      // Track points for launchpad contribution
      if (contributionAmount && hash) {
        const amountNum = parseFloat(contributionAmount);
        if (amountNum > 0) {
          trackLaunchpadPoints(amountNum, marketId, hash);
        }
      }
      
      setTimeout(() => {
        if (onContributionSuccess) {
          onContributionSuccess();
        }
      }, 5000);
    }
    
    if (transactionStatus.type === 'contribute' && transactionStatus.status === 'error') {
      setIsContributing(false);
      hasHandledSuccess.current = false;
    }
  }, [transactionStatus, onContributionSuccess, marketId, hash, trackLaunchpadPoints]);

  // Monitor approval success and auto-contribute
  useEffect(() => {
    if (transactionStatus.type === 'approve' && transactionStatus.status === 'success' && amount) {
      toast.success("Approval successful! Contributing now...");
      contributionAmountRef.current = amount; // Save for points tracking
      // After approval, automatically contribute
      contributeToPresale(marketId, amount).catch((error) => {
        console.error('Error contributing after approval:', error);
        toast.error(ERROR_MESSAGES.PRESALE.CONTRIBUTION_FAILED);
        setIsContributing(false);
        hasHandledSuccess.current = false;
      });
    }
    
    if (transactionStatus.type === 'approve' && transactionStatus.status === 'error') {
      setIsContributing(false);
      hasHandledSuccess.current = false;
    }
  }, [transactionStatus, amount, marketId, contributeToPresale]);

  const handleContribute = async () => {
    if (!isConnected) {
      toast.error(ERROR_MESSAGES.WALLET.NOT_CONNECTED);
      return;
    }

    const amountNum = parseFloat(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      toast.error(ERROR_MESSAGES.GENERAL.INVALID_INPUT);
      return;
    }

    // Minimum contribution is $1
    if (amountNum < 1) {
      toast.error("Minimum contribution is $1");
      return;
    }

    if (amountNum > balance) {
      toast.error(`${ERROR_MESSAGES.PRESALE.INSUFFICIENT_USDT}. You have $${balance.toFixed(2)}`);
      return;
    }

    setIsContributing(true);
    hasHandledSuccess.current = false; // Reset for new contribution
    contributionAmountRef.current = amount; // Save amount for points tracking

    try {
      // Check if approval is needed (allowance less than contribution amount)
      if (allowance < amountNum) {
        toast.info("Approving USDT spending (one-time only)...");
        await approveUSDC();
        // After approval succeeds, the useEffect will auto-trigger contribution
        return;
      }

      // If already approved, contribute directly
      await contributeToPresale(marketId, amount);

    } catch (error) {
      console.error('Error contributing to presale:', error);
      const errorMessage = formatErrorMessage(error, ERROR_MESSAGES.PRESALE.CONTRIBUTION_FAILED);
      toast.error(errorMessage);
      setIsContributing(false);
      hasHandledSuccess.current = false;
    }
  };


  return (
    <Card className="p-6 bg-card border-border sticky top-24">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Provide Liquidity</h3>
          <p className="text-sm text-muted-foreground">
            Contribute to the market pool and earn trading fees + bonus points
          </p>
        </div>

        {/* Wallet Status */}
        {!isConnected ? (
          <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
            <Wallet className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">Connect your wallet to contribute</p>
            <Button onClick={connect} className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            {/* Balance Display */}
            <div className="p-3 bg-muted/30 rounded-lg border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">USDT Balance</span>
                <span className="font-medium text-foreground">${balance.toFixed(2)}</span>
              </div>
            </div>


            {/* Transaction Status */}
            {transactionStatus.message && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                transactionStatus.status === 'success' ? 'bg-success/10 border border-success/20' :
                transactionStatus.status === 'error' ? 'bg-destructive/10 border border-destructive/20' :
                'bg-primary/10 border border-primary/20'
              }`}>
                {transactionStatus.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : transactionStatus.status === 'error' ? (
                  <XCircle className="w-4 h-4 text-destructive" />
                ) : (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                )}
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount (USDT)</label>
              <Input
                type="number"
                placeholder="0"
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

            {/* Info Box */}
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-primary">
                {amount && parseFloat(amount) > 0 ? (
                  <>You'll earn <strong>{(parseFloat(amount) * 100).toLocaleString()} points</strong></>
                ) : (
                  <>Earn 100 points per $1 contributed</>
                )}
              </p>
            </div>

            {/* Progress to Goal */}
            {amount && parseFloat(amount) > 0 && targetLiquidity > 0 && (
              <div className="p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">After your contribution</span>
                  <span className="font-medium text-foreground">
                    {((currentLiquidity + parseFloat(amount)) / targetLiquidity * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(currentLiquidity + parseFloat(amount)).toLocaleString()} / ${targetLiquidity.toLocaleString()}
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button 
              onClick={handleContribute}
              className="w-full"
              size="lg"
              disabled={!isConnected || isContributing || isPending || isConfirming || !amount || parseFloat(amount) < 1}
            >
              {isContributing || isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? "Approving..." : isConfirming ? "Confirming..." : "Processing..."}
                </>
              ) : (
                "Provide Liquidity"
              )}
            </Button>
          </>
        )}

        {/* Approval Status */}
        {isConnected && (
          <div className="pt-2">
            {allowance > 0 ? (
              <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-success">USDT Approved</p>
                  <p className="text-xs text-success/80">
                    You can contribute without additional approval
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-blue-500">First time approval</p>
                  <p className="text-xs text-blue-500/80">
                    Approve once, contribute unlimited times
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Important Information */}
        <div className="pt-4 border-t border-border space-y-3">
          {/* Market Validation */}
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Market Validation</p>
              <p className="text-xs text-muted-foreground">
                Market launches only if target liquidity is reached by deadline.
              </p>
            </div>
          </div>

          {/* Exit Strategy */}
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Automatic Refund</p>
              <p className="text-xs text-muted-foreground">
                Full refund if target liquidity is not reached by deadline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaunchpadWidget;
