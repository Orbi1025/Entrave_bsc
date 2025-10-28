import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseUSDCAmount } from "@/lib/marketHelpers";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { useAccount, useReadContract } from "wagmi";
import { getContractAddresses, PRESALE_MANAGER_ABI } from "@/lib/contracts";
import { useUserContributions } from "@/hooks/useUserContributions";

interface Contribution {
  totalContributed: string;
  contributionCount: string;
  presale: {
    id: string;
    question: string;
    raisedAmount: string;
    targetAmount: string;
    deadline: string;
    state: string;
    tokensCreated: boolean;
    resolved: boolean;
    graduatedAt?: string;
  };
}

interface LaunchpadPositionsProps {
  contributions: Contribution[];
  userAddress?: string;
}

const LaunchpadPositions = ({ contributions, userAddress }: LaunchpadPositionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address } = useAccount();
  const { claimPresalerShare, isPending, isConfirming } = usePresaleManager();
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const contracts = getContractAddresses();
  
  // Get user contributions to check presalerShareClaimed status
  const { data: userContributions } = useUserContributions(address);

  // Read LP shares for each contribution - using a single hook with multiple calls
  const lpSharesQueries = contributions.map(contributor => 
    useReadContract({
      address: contracts.PRESALE_MANAGER as `0x${string}`,
      abi: PRESALE_MANAGER_ABI,
      functionName: 'contributorLPShares',
      args: [contributor.presale.id as `0x${string}`, address as `0x${string}`],
      query: {
        enabled: !!address && !!contributor.presale.resolved,
      }
    })
  );

  const lpSharesData = contributions.map((contributor, index) => ({
    presaleId: contributor.presale.id,
    lpShares: lpSharesQueries[index]?.data ? parseUSDCAmount(lpSharesQueries[index].data!.toString()) : 0
  }));

  // Transform contributions into positions
  const activePositions = useMemo(() => {
    return contributions
      .filter(contributor => {
        const presale = contributor.presale;
        
        // Only show if user has actually contributed
        if (!contributor.totalContributed || parseUSDCAmount(contributor.totalContributed) === 0) {
          return false;
        }
        
        // Hide resolved markets where presaler share was claimed from active positions
        if (presale.resolved) {
          const contributorData = userContributions?.find((c: any) => c.presale?.id === presale.id);
          if (contributorData?.presalerShareClaimed) {
            return false; // Don't show in active positions if resolved and claimed
          }
        }
        
        return true; // Show all other positions
      })
      .map(contributor => {
      const contributed = parseUSDCAmount(contributor.totalContributed);
      const presale = contributor.presale;
      const raisedAmount = parseUSDCAmount(presale.raisedAmount);
      const targetAmount = parseUSDCAmount(presale.targetAmount);
      const progress = (raisedAmount / targetAmount) * 100;
      
      // Get LP shares for this presale
      const lpData = lpSharesData.find(lp => lp.presaleId === presale.id);
      const lpShares = lpData?.lpShares || 0;
      
      // Get presalerShareClaimed status from subgraph
      const contributorData = userContributions?.find((c: any) => c.presale?.id === presale.id);
      const presalerShareClaimed = contributorData?.presalerShareClaimed || false;
      
      // Calculate days left
      const deadlineSeconds = Number(presale.deadline || '0');
      const nowSeconds = Math.floor(Date.now() / 1000);
      const secondsLeft = deadlineSeconds - nowSeconds;
      const daysLeft = secondsLeft > 0 ? Math.ceil(secondsLeft / 86400) : 0;

      return {
        id: presale.id,
        question: presale.question,
        contributed,
        currentValue: contributed,
        progress: Math.min(progress, 100),
        targetLiquidity: targetAmount,
        currentLiquidity: raisedAmount,
        status: presale.resolved && lpShares > 0 ? 'claimable' : presale.tokensCreated ? 'graduated' : presale.state === 'Cancelled' ? 'failed' : 'in-progress',
        unclaimedRewards: presale.resolved && lpShares > 0 ? lpShares : 0,
        contributionCount: parseInt(contributor.contributionCount),
        graduatedDate: presale.tokensCreated ? new Date(parseInt(presale.graduatedAt || '0') * 1000).toLocaleDateString() : null,
        daysLeft,
        refundable: presale.state === 'Cancelled' ? contributed : 0,
        reason: presale.state === 'Cancelled' ? 'Market was cancelled' : 'Did not reach funding goal',
        apy: 0,
        lpShares,
        presalerShareClaimed,
      };
    });
  }, [contributions, lpSharesData, userContributions]);

  // Count unclaimed positions for summary
  const unclaimedPositions = activePositions.filter(p => p.status === 'claimable' && !p.presalerShareClaimed);

  const history = useMemo(() => {
    return contributions
      .filter(contributor => {
        const presale = contributor.presale;
        
        // Only show resolved markets where presaler share was claimed
        if (!presale.resolved) return false;
        
        // Check if presaler share was claimed using userContributions
        const contributorData = userContributions?.find((c: any) => c.presale?.id === presale.id);
        return contributorData?.presalerShareClaimed || false;
      })
      .map(contributor => {
        const contributed = parseUSDCAmount(contributor.totalContributed);
        const presale = contributor.presale;
        
        // Get LP shares for this contribution
        const lpData = lpSharesData.find(lp => lp.presaleId === presale.id);
        const lpShares = lpData?.lpShares || 0;
        
        return {
          id: presale.id,
          question: presale.question,
          contributed,
          finalValue: contributed, // TODO: Calculate final value with tokens
          totalRewards: lpShares,
          pnl: 0,
          status: "completed",
          outcome: "Resolved",
          state: presale.state
        };
      });
  }, [contributions, lpSharesData, userContributions]);

  const handleClaimRewards = async (positionId: string) => {
    try {
      setRedeeming(positionId);
      const hash = await claimPresalerShare(positionId);
      
      toast({
        title: "Redeem Transaction Submitted!",
        description: `Transaction hash: ${hash.slice(0, 10)}...`,
      });
      
      // Wait a bit then show success
      setTimeout(() => {
        toast({
          title: "LP Shares Redeemed!",
          description: `Successfully redeemed your LP shares for USDT`,
        });
        setRedeeming(null);
      }, 3000);
    } catch (error: any) {
      console.error('Error redeeming LP shares:', error);
      toast({
        title: "Redeem Failed",
        description: error.message || "Failed to redeem LP shares",
        variant: "destructive",
      });
      setRedeeming(null);
    }
  };

  const handleRefund = (positionId: string, amount: number) => {
    toast({
      title: "Refund Not Yet Available",
      description: `Refund functionality for cancelled presales coming soon`,
    });
  };

  const totalUnclaimed = activePositions.reduce((sum, p) => {
    // Only count unclaimed rewards that haven't been claimed yet
    return sum + (p.unclaimedRewards || 0) * (p.presalerShareClaimed ? 0 : 1);
  }, 0);

  // Paginate active positions
  const ACTIVE_ITEMS_PER_PAGE = 10;
  const totalActivePages = Math.ceil(activePositions.length / ACTIVE_ITEMS_PER_PAGE);
  const activePositionsPaginated = activePositions.slice(
    (activePage - 1) * ACTIVE_ITEMS_PER_PAGE,
    activePage * ACTIVE_ITEMS_PER_PAGE
  );

  // Paginate history
  const HISTORY_ITEMS_PER_PAGE = 10;
  const totalHistoryPages = Math.ceil(history.length / HISTORY_ITEMS_PER_PAGE);
  const historyPaginated = history.slice(
    (historyPage - 1) * HISTORY_ITEMS_PER_PAGE,
    historyPage * HISTORY_ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      {totalUnclaimed > 0 && (
        <Card className="p-6 bg-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Claimable LP Rewards</p>
              <p className="text-3xl font-bold text-primary">${totalUnclaimed.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">From {unclaimedPositions.length} active positions</p>
            </div>
            <Button 
              onClick={() => {
                // Claim all individual rewards that haven't been claimed yet
                activePositions.forEach(position => {
                  if (position.unclaimedRewards > 0 && !position.presalerShareClaimed) {
                    handleClaimRewards(position.id);
                  }
                });
              }}
            >
              Claim All Rewards
            </Button>
          </div>
        </Card>
      )}

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active LaunchPad</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Active Positions */}
        <TabsContent value="active" className="space-y-4">
          {activePositions.length > 0 ? (
            activePositionsPaginated.map((position) => (
              <Card key={position.id} className={`p-6 border-border hover:border-primary/50 transition-all ${
                position.status === 'graduated' ? 'bg-card' : 
                position.status === 'failed' ? 'bg-destructive/5 border-destructive/30' : 
                'bg-card'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className={`w-5 h-5 ${
                        position.status === 'graduated' ? 'text-success' : 
                        position.status === 'failed' ? 'text-destructive' : 
                        'text-primary'
                      }`} />
                      <h3 className="text-lg font-semibold text-foreground">
                        {position.question}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      {position.status === 'graduated' && (
                        <Badge className="bg-success/20 text-success border-success/30">
                          Graduated from Launchpad
                        </Badge>
                      )}
                      {position.status === 'in-progress' && (
                        <>
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            In Progress
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {position.daysLeft} days left
                          </Badge>
                        </>
                      )}
                      {position.status === 'failed' && (
                        <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                          Did Not Graduate
                        </Badge>
                      )}
                    </div>
                  </div>
                  {position.status === 'claimable' && position.unclaimedRewards > 0 && (
                    <Button 
                      size="sm"
                      onClick={() => handleClaimRewards(position.id)}
                      disabled={redeeming === position.id || isPending || isConfirming || position.presalerShareClaimed}
                      variant={position.presalerShareClaimed ? "outline" : "default"}
                    >
                      {redeeming === position.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Redeeming...
                        </>
                      ) : position.presalerShareClaimed ? (
                        `Claimed`
                      ) : (
                        `Claim $${position.unclaimedRewards.toFixed(2)}`
                      )}
                    </Button>
                  )}
                  {position.status === 'failed' && position.refundable > 0 && (
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRefund(position.id, position.refundable)}
                    >
                      Refund ${position.refundable}
                    </Button>
                  )}
                  {position.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/launchpad/${position.id}`)}
                    >
                      View Progress
                    </Button>
                  )}
                </div>

                <div className={`grid gap-4 text-sm ${position.status === 'graduated' || position.status === 'claimable' ? 'grid-cols-3' : 'grid-cols-4'}`}>
                  <div>
                    <p className="text-muted-foreground mb-1">Contributed</p>
                    <p className="font-medium text-foreground">${position.contributed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Current Value</p>
                    <p className="font-medium text-foreground">${position.currentValue}</p>
                  </div>
                  {(position.status === 'graduated' || position.status === 'claimable') && (
                    <div>
                      <p className="text-muted-foreground mb-1">Claimable</p>
                      <p className={`font-bold ${position.presalerShareClaimed ? 'text-muted-foreground' : 'text-success'}`}>
                        {!position.presalerShareClaimed && position.unclaimedRewards > 0 
                          ? `$${position.unclaimedRewards.toFixed(2)}` 
                          : position.presalerShareClaimed 
                            ? 'Claimed' 
                            : '$0.00'}
                      </p>
                    </div>
                  )}
                  {position.status === 'in-progress' && (
                    <>
                      <div>
                        <p className="text-muted-foreground mb-1">Progress</p>
                        <p className="font-bold text-primary">{position.progress.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Liquidity</p>
                        <p className="font-medium text-foreground">${position.currentLiquidity.toLocaleString()}</p>
                      </div>
                    </>
                  )}
                  {position.status === 'failed' && (
                    <>
                      <div>
                        <p className="text-muted-foreground mb-1">Refundable</p>
                        <p className="font-bold text-destructive">${position.refundable}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Reason</p>
                        <p className="text-xs text-muted-foreground">{position.reason}</p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center bg-card border-border">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Active LP Positions
              </h3>
              <p className="text-muted-foreground mb-6">
                Contribute to launchpad markets to earn early LP rewards
              </p>
              <Button variant="outline" onClick={() => navigate('/')}>
                Browse Launchpads
              </Button>
            </Card>
          )}
          
          {/* Pagination for Active Positions */}
          {activePositions.length > 0 && totalActivePages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePage(p => Math.max(1, p - 1))}
                disabled={activePage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {activePage} of {totalActivePages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePage(p => Math.min(totalActivePages, p + 1))}
                disabled={activePage === totalActivePages}
              >
                Next
              </Button>
            </div>
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          {history.length > 0 ? (
            historyPaginated.map((item) => (
              <Card key={item.id} className="p-6 bg-card border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.question}
                      </h3>
                    </div>
                    <Badge className={
                      item.status === 'completed' ? 'bg-success/20 text-success border-success/30' :
                      item.status === 'failed' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                      'bg-primary/20 text-primary border-primary/30'
                    }>
                      {item.outcome}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Contributed</p>
                    <p className="font-medium text-foreground">${item.contributed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Final Value</p>
                    <p className="font-medium text-foreground">${item.finalValue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Rewards</p>
                    <p className="font-medium text-foreground">${item.totalRewards.toFixed(2)}</p>
                  </div>
                  {/* P&L - Commented out */}
                  {/* <div>
                    <p className="text-muted-foreground mb-1">P&L</p>
                    <p className={`font-bold ${item.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                      {item.pnl >= 0 ? "+" : ""}${item.pnl}
                    </p>
                  </div> */}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center bg-card border-border">
              <Rocket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No History
              </h3>
              <p className="text-muted-foreground">
                Your launchpad history will appear here.
              </p>
            </Card>
          )}
          
          {/* Pagination for History */}
          {history.length > 0 && totalHistoryPages > 1 && (
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

export default LaunchpadPositions;