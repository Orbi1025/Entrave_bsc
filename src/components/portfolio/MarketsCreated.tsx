import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Users, XCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseUSDCAmount } from "@/lib/marketHelpers";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { useClaimableFees } from "@/hooks/useClaimableFees";

interface MarketsCreatedProps {
  presales: any[];
  userAddress?: string;
}

const MarketsCreated = ({ presales, userAddress }: MarketsCreatedProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { claimFees, isPending, isConfirming } = usePresaleManager();
  const [claimingMarket, setClaimingMarket] = useState<string | null>(null);

  // Transform created presales into active markets
  const markets = useMemo(() => {
    return presales
      .filter(p => p.tokensCreated && !p.resolved) // Active markets (graduated but not resolved)
      .map(presale => {
        const volume = parseUSDCAmount(presale.raisedAmount);
        const totalFees = volume * 0.33; // 33% creator fee

        return {
          id: presale.id,
          question: presale.question,
          volume,
          totalFees,
          claimedFees: 0, // TODO: Implement
          unclaimedFees: totalFees,
          participants: parseInt(presale.contributorCount),
          status: "active"
        };
      });
  }, [presales]);

  // Presales in launchpad (Active or Pending)
  const inLaunchpad = useMemo(() => {
    return presales
      .filter(p => !p.tokensCreated && (p.state === 'Active' || p.state === 'Pending'))
      .map(presale => {
        const volume = parseUSDCAmount(presale.raisedAmount);
        const targetAmount = parseUSDCAmount(presale.targetAmount);
        const progress = (volume / targetAmount) * 100;

        return {
          id: presale.id,
          question: presale.question,
          volume,
          targetAmount,
          progress,
          participants: parseInt(presale.contributorCount),
          state: presale.state,
          deadline: presale.deadline
        };
      });
  }, [presales]);

  // All presales history
  const history = useMemo(() => {
    return presales.map(presale => {
      const volume = parseUSDCAmount(presale.raisedAmount);
      const totalFees = volume * 0.005;

      // Determine status based on presale state
      let status = "active";
      let outcome = "Active";
      if (presale.resolved) {
        status = "resolved";
        outcome = "Resolved";
      } else if (presale.state === 'Cancelled') {
        status = "cancelled";
        outcome = "Cancelled";
      } else if (presale.tokensCreated) {
        status = "graduated";
        outcome = "Graduated";
      } else if (presale.state === 'Pending') {
        status = "pending";
        outcome = "Pending";
      }

      return {
        id: presale.id,
        question: presale.question,
        volume,
        totalFees,
        claimedFees: totalFees,
        unclaimedFees: 0,
        participants: parseInt(presale.contributorCount),
        status,
        result: presale.resolved ? "success" : status,
        outcome,
        reason: presale.state === 'Cancelled' ? "Market was cancelled" : undefined,
        state: presale.state
      };
    });
  }, [presales]);


  const handleClaimFees = async (marketId: string, amount: number) => {
    try {
      setClaimingMarket(marketId);
      
      await claimFees(marketId);
      
      toast({
        title: "Claim Transaction Submitted!",
        description: `Claiming $${amount.toFixed(2)} in trading fees`,
      });
      
      // Wait a bit then show success
      setTimeout(() => {
        toast({
          title: "Fees Claimed!",
          description: `Successfully claimed $${amount.toFixed(2)} in trading fees`,
        });
        setClaimingMarket(null);
      }, 3000);
    } catch (error: any) {
      console.error('Error claiming fees:', error);
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim fees",
        variant: "destructive",
      });
      setClaimingMarket(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Markets You Created</h2>
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Markets</TabsTrigger>
          <TabsTrigger value="launchpad">Launchpad</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Markets List */}
          <div className="space-y-4">
            {markets.length === 0 ? (
              <Card className="p-12 text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Active Markets
                </h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any active markets yet.
                </p>
                <Button variant="outline" onClick={() => navigate('/create-market')}>
                  Create Your First Market
                </Button>
              </Card>
            ) : (
              markets.map((market) => (
              <Card key={market.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {market.question}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="default">Active</Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {market.participants} traders
                      </Badge>
                    </div>
                  </div>
                  {market.unclaimedFees > 0 && (
                    <Button 
                      size="sm"
                      className="bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => handleClaimFees(market.id, market.unclaimedFees)}
                      disabled={claimingMarket === market.id || isPending || isConfirming}
                    >
                      {claimingMarket === market.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Claiming...
                        </>
                      ) : (
                        `Claim $${market.unclaimedFees.toFixed(2)}`
                      )}
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Volume</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <p className="font-medium text-foreground">${market.volume.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Fees</p>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <p className="font-medium text-foreground">${market.totalFees.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Claimed</p>
                    <p className="font-medium text-foreground">${market.claimedFees.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Unclaimed</p>
                    <p className={`font-bold ${market.unclaimedFees > 0 ? "text-success" : "text-muted-foreground"}`}>
                      ${market.unclaimedFees.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="launchpad" className="space-y-6">
          <div className="space-y-4">
            {inLaunchpad.length === 0 ? (
              <Card className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Markets in Launchpad
                </h3>
                <p className="text-muted-foreground">
                  You don't have any markets currently in launchpad phase.
                </p>
              </Card>
            ) : (
              inLaunchpad.map((presale) => (
              <Card key={presale.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {presale.question}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant={presale.state === 'Pending' ? 'secondary' : 'default'}>
                        {presale.state}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {presale.participants} contributors
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium text-foreground">{presale.progress.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${Math.min(presale.progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Raised</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <p className="font-medium text-foreground">${presale.volume.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Target</p>
                      <p className="font-medium text-foreground">${presale.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {history.length === 0 ? (
              <Card className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No History
                </h3>
                <p className="text-muted-foreground">
                  Your market history will appear here.
                </p>
              </Card>
            ) : (
              history.map((market) => (
              <Card key={market.id} className={`p-6 border-border ${
                market.result === "failed" ? "bg-destructive/5 border-destructive/30" : "bg-card"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {market.question}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {market.status === "resolved" ? (
                        <Badge variant="outline" className="gap-1 border-success text-success bg-success/10">
                          <CheckCircle className="w-3 h-3" />
                          Resolved
                        </Badge>
                      ) : market.status === "cancelled" ? (
                        <Badge variant="outline" className="gap-1 border-destructive text-destructive bg-destructive/10">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </Badge>
                      ) : market.status === "graduated" ? (
                        <Badge variant="outline" className="gap-1 border-success text-success bg-success/10">
                          <CheckCircle className="w-3 h-3" />
                          Graduated
                        </Badge>
                      ) : market.status === "pending" ? (
                        <Badge variant="outline" className="gap-1 border-primary text-primary bg-primary/10">
                          <Clock className="w-3 h-3" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1 border-primary text-primary bg-primary/10">
                          <Clock className="w-3 h-3" />
                          Active
                        </Badge>
                      )}
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {market.participants} traders
                      </Badge>
                    </div>
                    {market.reason && (
                      <p className="text-sm text-muted-foreground mt-2">{market.reason}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Volume</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <p className="font-medium text-foreground">${market.volume.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Fees Earned</p>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <p className="font-medium text-foreground">${market.totalFees.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Status</p>
                    <p className="font-medium text-muted-foreground">All fees claimed</p>
                  </div>
                </div>
              </Card>
            ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketsCreated;