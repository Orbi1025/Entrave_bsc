import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, Trophy, DollarSign, Coins } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { useUserContributions } from "@/hooks/useUserContributions";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { getContractAddresses, PRESALE_MANAGER_ABI, parseUSDC, ERC20_ABI } from "@/lib/contracts";

interface ClaimWidgetProps {
  market: {
    id: string;
    question: string;
    creator: string;
    resolved: boolean;
    forceResolvedAnswer?: number; // 1 = YES won, 0 = NO won
    yesToken?: string;
    noToken?: string;
    creatorClaimed?: boolean; // Whether creator has claimed fees
  };
}

const ClaimWidget = ({ market }: ClaimWidgetProps) => {
  const { address, isConnected, connect, chain } = useWallet();
  const { claimFees } = usePresaleManager();
  const { data: userContributions } = useUserContributions(address);
  const contracts = getContractAddresses(chain?.id);
  
  const [claimingType, setClaimingType] = useState<'fees' | 'lp' | 'winnings' | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  
  // Track write errors
  useEffect(() => {
    if (writeError) {
      toast.error(`Transaction failed: ${writeError.message}`);
      setClaimingType(null);
    }
  }, [writeError]);
  
  // Separate hook for approval transaction
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | undefined>(undefined);
  const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });

  // Check if user is the creator
  const isCreator = address?.toLowerCase() === market.creator?.toLowerCase();
  
  // Get claimable fees (for creator)
  const { data: claimableFees } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: PRESALE_MANAGER_ABI,
    functionName: 'getClaimableFees',
    args: [market.id as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: isConnected && isCreator && !!market.id && !!address,
    }
  });

  // Get LP shares (for liquidity providers)
  const { data: lpShares } = useReadContract({
    address: contracts.PRESALE_MANAGER as `0x${string}`,
    abi: PRESALE_MANAGER_ABI,
    functionName: 'contributorLPShares',
    args: [market.id as `0x${string}`, address as `0x${string}`],
    query: {
      enabled: isConnected && !!address && !!market.id,
    }
  });

  // Determine winning token and user balance
  // Convert forceResolvedAnswer to number if it's a string
  const forceResolvedAnswerNum = typeof market.forceResolvedAnswer === 'string' 
    ? parseInt(market.forceResolvedAnswer, 10) 
    : market.forceResolvedAnswer;
  
  const winningOutcome = forceResolvedAnswerNum === 1 ? 'YES' : forceResolvedAnswerNum === 0 ? 'NO' : null;
  
  // Get user's YES and NO token balances
  const { data: yesTokenBalance } = useReadContract({
    address: market.yesToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!market.yesToken && !!address,
    }
  });
  
  const { data: noTokenBalance } = useReadContract({
    address: market.noToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!market.noToken && !!address,
    }
  });
  
  // Track if user has claimed winnings
  const [winningsClaimed, setWinningsClaimed] = useState(false);
  
  // Track if user has claimed LP shares
  const [lpClaimed, setLpClaimed] = useState(false);
  
  // Get presalerShareClaimed status from subgraph
  const contributorData = userContributions?.find((c: any) => c.presale?.id === market.id);
  const presalerShareClaimed = contributorData?.presalerShareClaimed || false;
  
  // Update lpClaimed based on subgraph data
  useEffect(() => {
    if (presalerShareClaimed) {
      setLpClaimed(true);
    }
  }, [presalerShareClaimed]);
  
  // Calculate winning token balance (only tokens that match the winning outcome)
  const winningTokenBalance = winningOutcome === 'YES' ? yesTokenBalance : winningOutcome === 'NO' ? noTokenBalance : 0n;
  const winningBalanceFormatted = winningTokenBalance ? parseUSDC(winningTokenBalance as bigint) : 0;
  
  // Mark winnings as claimed when balance reaches zero
  useEffect(() => {
    if (winningTokenBalance === 0n && winningBalanceFormatted === 0) {
      setWinningsClaimed(true);
    }
  }, [winningTokenBalance, winningBalanceFormatted]);
  

  
  // Determine winning token address
  const winningTokenAddress = winningOutcome === 'YES' 
    ? market.yesToken
    : winningOutcome === 'NO' 
      ? market.noToken
      : null;

  // Handle claim fees (creator only)
  const handleClaimFees = async () => {
    if (!isCreator || !market.id) return;
    
    try {
      setClaimingType('fees');
      await claimFees(market.id);
      toast.success('Creator fees claimed successfully!');
    } catch (error) {
      console.error('Error claiming fees:', error);
      toast.error('Failed to claim fees');
    } finally {
      setClaimingType(null);
    }
  };

  // Handle claim presaler share (for presale contributors)
  const handleClaimPresalerShare = async () => {
    try {
      setClaimingType('lp');
      
      writeContract({
        address: contracts.PRESALE_MANAGER as `0x${string}`,
        abi: PRESALE_MANAGER_ABI,
        functionName: 'claimPresalerShare',
        args: [market.id as `0x${string}`],
      } as any);
    } catch (error) {
      console.error('Error claiming presaler share:', error);
      toast.error('Failed to claim presaler share');
      setClaimingType(null);
    }
  };

  // Handle claim winnings (token holders) - requires approval first
  const handleClaimWinnings = async () => {
    try {
      if (!address || !market.id || !winningTokenAddress || !winningTokenBalance) {
        toast.error('Missing required information for claiming');
        return;
      }

      setClaimingType('winnings');
      setIsApproving(true);
      
      // First, approve the PresaleManager to spend the winning tokens
      writeContract({
        address: winningTokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [contracts.PRESALE_MANAGER as `0x${string}`, winningTokenBalance as bigint],
        gas: BigInt(100000), // Set explicit gas limit
      } as any);
      
      toast.info('Waiting for approval confirmation...');
    } catch (error) {
      console.error('Error claiming winnings:', error);
      toast.error('Failed to claim winnings');
      setClaimingType(null);
      setIsApproving(false);
    }
  };

  // Track when hash is received and set approval hash if it's the approval transaction
  useEffect(() => {
    if (hash) {
      // If this is the approval transaction, set approvalHash
      if (claimingType === 'winnings' && isApproving) {
        setApprovalHash(hash);
      }
      
      if (claimingType === 'lp' || claimingType === 'winnings') {
        toast.info('Transaction submitted, waiting for confirmation...');
      }
    }
  }, [hash, claimingType, isApproving]);

  // Show success toast when transaction confirms
  useEffect(() => {
    if (isConfirmed && claimingType) {
      if (claimingType === 'lp') {
        toast.success('Presaler share claimed successfully!');
        setLpClaimed(true);
      } else if (claimingType === 'winnings') {
        toast.success('Winnings claimed successfully!');
        setWinningsClaimed(true);
      }
      setClaimingType(null);
    }
  }, [isConfirmed, claimingType]);

  const feesAmount = claimableFees ? parseUSDC(claimableFees as bigint) : 0;
  const lpSharesAmount = lpShares ? parseUSDC(lpShares as bigint) : 0;
  const isProcessing = isPending || isConfirming;
  
  // Handle approval confirmation and auto-redeem
  useEffect(() => {
    if (isApprovalConfirmed && claimingType === 'winnings' && isApproving) {
      setIsApproving(false);
      toast.success('Approval confirmed! Claiming tokens...');
      
      // Automatically proceed with redemption
      if (address && market.id && winningTokenAddress && winningTokenBalance) {
        const yesAmount = winningOutcome === 'YES' ? winningTokenBalance as bigint : BigInt(0);
        const noAmount = winningOutcome === 'NO' ? winningTokenBalance as bigint : BigInt(0);
        
        writeContract({
          address: contracts.PRESALE_MANAGER as `0x${string}`,
          abi: PRESALE_MANAGER_ABI,
          functionName: 'redeemTokens',
          args: [market.id as `0x${string}`, yesAmount, noAmount],
        } as any);
      }
    }
  }, [isApprovalConfirmed, claimingType, isApproving, address, market.id, winningTokenAddress, winningTokenBalance, winningOutcome, contracts.PRESALE_MANAGER, writeContract]);

  if (!isConnected) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Claim Rewards</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect wallet to claim your rewards
            </p>
          </div>
          <Button onClick={connect} className="w-full">
            Connect Wallet
          </Button>
        </div>
      </Card>
    );
  }

  if (!market.resolved) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Market Not Resolved</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This market has not been resolved yet
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const hasAnyClaims = (isCreator && feesAmount > 0) || lpSharesAmount > 0 || winningBalanceFormatted > 0 || winningsClaimed || lpClaimed;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Market Resolved</h3>
            {winningOutcome && (
              <p className="text-sm text-muted-foreground">
                Winning outcome: <span className="font-semibold text-foreground">{winningOutcome}</span>
              </p>
            )}
          </div>
        </div>

        <Separator />

        {!hasAnyClaims ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No rewards to claim for this market
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Creator Fees */}
            {isCreator && (feesAmount > 0 || market.creatorClaimed) && (
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Creator Fees</span>
                  </div>
                  <span className="font-semibold">${feesAmount.toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handleClaimFees}
                  disabled={isProcessing || claimingType !== null || market.creatorClaimed}
                  className="w-full"
                  size="sm"
                  variant={market.creatorClaimed ? "outline" : "default"}
                >
                  {claimingType === 'fees' && isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Claiming...
                    </>
                  ) : market.creatorClaimed ? (
                    `$${feesAmount.toFixed(2)} Claimed`
                  ) : (
                    'Claim Fees'
                  )}
                </Button>
              </div>
            )}

            {/* LP Shares */}
            {(lpSharesAmount > 0 || lpClaimed) && (
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Presaler Share</span>
                  </div>
                  {!lpClaimed && <span className="font-semibold">${lpSharesAmount.toFixed(2)}</span>}
                </div>
                <Button 
                  onClick={handleClaimPresalerShare}
                  disabled={isProcessing || claimingType !== null || lpClaimed}
                  className="w-full"
                  size="sm"
                  variant={lpClaimed ? "outline" : "default"}
                >
                  {claimingType === 'lp' && isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Claiming...
                    </>
                  ) : lpClaimed ? (
                    'Presaler Share Claimed'
                  ) : (
                    'Claim Presaler Share'
                  )}
                </Button>
              </div>
            )}

            {/* Winning Tokens */}
            {(winningBalanceFormatted > 0 || winningsClaimed) && (
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium">{winningOutcome} Token Winnings</span>
                  </div>
                  {!winningsClaimed && <span className="font-semibold">${winningBalanceFormatted.toFixed(2)}</span>}
                </div>
                <Button 
                  onClick={handleClaimWinnings}
                  disabled={isProcessing || claimingType !== null || isApproving || winningsClaimed}
                  className="w-full bg-success hover:bg-success/90"
                  size="sm"
                  variant={winningsClaimed ? "outline" : "default"}
                >
                  {isApproving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Approving...
                    </>
                  ) : claimingType === 'winnings' && isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Claiming...
                    </>
                                     ) : winningsClaimed ? (
                     'Tokens Claimed'
                   ) : (
                     'Claim Winnings'
                   )}
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            {isCreator && "As the creator, you can claim 0.5% trading fees. "}
            {lpSharesAmount > 0 && "You provided liquidity during the launchpad phase. "}
            {winningBalanceFormatted > 0 && `Your ${winningOutcome} tokens can be redeemed for USDT.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ClaimWidget;

