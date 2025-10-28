import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PointsOverview from "@/components/portfolio/PointsOverview";
import PointsActivity from "@/components/portfolio/PointsActivity";
import TradingPositions from "@/components/portfolio/TradingPositions";
import MarketsCreated from "@/components/portfolio/MarketsCreated";
import LaunchpadPositions from "@/components/portfolio/LaunchpadPositions";
import EmailLinkSection from "@/components/portfolio/EmailLinkSection";
import { useState, useMemo } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useUserContributions } from "@/hooks/useUserContributions";
import { useUserCreatedPresales } from "@/hooks/useUserCreatedPresales";
import { parseUSDCAmount } from "@/lib/marketHelpers";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useTradingMetrics } from "@/hooks/useTradingMetrics";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("trading");

  const { address, isConnected, connect, usdcBalance } = useWallet();
  const { data: userContributions, isLoading: isLoadingContributions } = useUserContributions(address);
  const { data: userCreatedPresales, isLoading: isLoadingCreated } = useUserCreatedPresales(address);

  // Calculate metrics from real data
  const launchpadMetrics = useMemo(() => {
    if (!userContributions || userContributions.length === 0) {
      return {
        totalContributed: 0,
        currentValue: 0,
        unclaimedRewards: 0,
        activePositions: 0
      };
    }

    const totalContributed = userContributions.reduce((sum, contributor) => {
      return sum + parseUSDCAmount(contributor.totalContributed);
    }, 0);

    const activePositions = userContributions.filter(c => !c.presale.tokensCreated).length;

    return {
      totalContributed,
      currentValue: totalContributed, // TODO: Calculate real value with tokens
      unclaimedRewards: 0, // TODO: Implement rewards retrieval
      activePositions
    };
  }, [userContributions]);

  const marketsCreatedMetrics = useMemo(() => {
    if (!userCreatedPresales || userCreatedPresales.length === 0) {
      return {
        totalMarkets: 0,
        activeMarkets: 0,
        inLaunchpad: 0,
        totalVolume: 0,
        totalFeesEarned: 0
      };
    }

    const totalVolume = userCreatedPresales.reduce((sum, presale) => {
      return sum + parseUSDCAmount(presale.raisedAmount);
    }, 0);

    const activeMarkets = userCreatedPresales.filter(p => !p.resolved && p.tokensCreated).length;
    const inLaunchpad = userCreatedPresales.filter(p => !p.tokensCreated && (p.state === 'Active' || p.state === 'Pending')).length;

    return {
      totalMarkets: userCreatedPresales.length,
      activeMarkets,
      inLaunchpad,
      totalVolume,
      totalFeesEarned: totalVolume * 0.33 // 33% creator fee estimation
    };
  }, [userCreatedPresales]);

  // Get real trading metrics
  const tradingMetrics = useTradingMetrics();

  // Get real points data
  const { points: userPoints } = useUserPoints(address);
  
  const activityMetrics = {
    totalPoints: userPoints?.total_points || 0,
    rank: userPoints?.rank || 0,
    weeklyPoints: 0, // TODO: Calculate from recent history
    totalActions: (userContributions?.length || 0) + (userCreatedPresales?.length || 0)
  };

  const isLoading = isLoadingContributions || isLoadingCreated;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Compact Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          </div>

          {/* Wallet Connection Required */}
          {!isConnected ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Connect Your Wallet
                </h2>
                <p className="text-muted-foreground mb-8">
                  Connect your wallet to view your portfolio and activity.
                </p>
                <Button onClick={connect} size="lg" className="w-full">
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </Card>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Loading your portfolio...</p>
              </div>
            </div>
          ) : (
            <>

          {/* Tabs First */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="trading" className="flex-1 md:flex-none">Trading</TabsTrigger>
              <TabsTrigger value="activelp" className="flex-1 md:flex-none">Liquidity</TabsTrigger>
              <TabsTrigger value="created" className="flex-1 md:flex-none">Creator</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 md:flex-none">Activity</TabsTrigger>
            </TabsList>

            {/* Dynamic Key Metrics Based on Active Tab */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {activeTab === "trading" && (
                <>
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">USDT Balance</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${tradingMetrics.usdcBalance.toFixed(2)}
                    </p>
                  </Card>
                  
                  {/* Portfolio Value - Commented out */}
                  {/* <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Portfolio Value</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${tradingMetrics.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </Card> */}
                  
                  {/* Total P&L - Commented out */}
                  {/* <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total P&L</p>
                    <div className="flex items-baseline gap-1.5">
                      <p className={`text-2xl font-bold ${tradingMetrics.totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                        {tradingMetrics.totalPnL >= 0 ? '+' : ''}${tradingMetrics.totalPnL.toFixed(2)}
                      </p>
                      <span className={`text-sm ${tradingMetrics.totalPnLPercent >= 0 ? "text-success" : "text-destructive"}`}>{tradingMetrics.totalPnLPercent >= 0 ? '+' : ''}{tradingMetrics.totalPnLPercent.toFixed(2)}%</span>
                    </div>
                  </Card> */}

                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Open Positions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {tradingMetrics.openPositions}
                    </p>
                  </Card>
                </>
              )}

              {activeTab === "activelp" && (
                <>
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Contributed</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${launchpadMetrics.totalContributed.toLocaleString()}
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${launchpadMetrics.currentValue.toLocaleString()}
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Unclaimed Rewards</p>
                    <p className="text-2xl font-bold text-success">
                      ${launchpadMetrics.unclaimedRewards.toLocaleString()}
                    </p>
                  </Card>

                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Active Positions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {launchpadMetrics.activePositions}
                    </p>
                  </Card>
                </>
              )}

              {activeTab === "created" && (
                <>
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Markets</p>
                    <p className="text-2xl font-bold text-foreground">
                      {marketsCreatedMetrics.totalMarkets}
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Active Markets</p>
                    <p className="text-2xl font-bold text-foreground">
                      {marketsCreatedMetrics.activeMarkets}
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${marketsCreatedMetrics.totalVolume.toLocaleString()}
                    </p>
                  </Card>

                  <Card className="p-4 bg-card border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Fees Earned</p>
                    <p className="text-2xl font-bold text-success">
                      ${marketsCreatedMetrics.totalFeesEarned.toLocaleString()}
                    </p>
                  </Card>
                </>
              )}

            </div>

            <TabsContent value="trading">
              <TradingPositions />
            </TabsContent>

            <TabsContent value="activelp">
              <LaunchpadPositions 
                contributions={userContributions || []}
                userAddress={address}
              />
            </TabsContent>

            <TabsContent value="created">
              <MarketsCreated 
                presales={userCreatedPresales || []}
                userAddress={address}
              />
            </TabsContent>

            <TabsContent value="activity">
              {isLoadingContributions || isLoadingCreated ? (
                <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-base font-medium text-muted-foreground">Loading activity data...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we fetch your data</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <EmailLinkSection />
                  <PointsOverview />
                  <PointsActivity />
                </div>
              )}
            </TabsContent>
          </Tabs>
          </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
