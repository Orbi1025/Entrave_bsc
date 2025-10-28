import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketHeader from "@/components/market/MarketHeader";
import LaunchpadWidget from "@/components/launchpad/LaunchpadWidget";
import LaunchpadProgress from "@/components/launchpad/LaunchpadProgress";
import LaunchpadIncentives from "@/components/launchpad/LaunchpadIncentives";
import LaunchpadHowItWorks from "@/components/launchpad/LaunchpadHowItWorks";
import ResolutionRules from "@/components/market/ResolutionRules";
import MarketDescription from "@/components/market/MarketDescription";
import { usePresales } from "@/hooks/usePresales";
import { parseUSDCAmount } from "@/lib/marketHelpers";
import { formatMarketWithMetadata } from "@/lib/presaleMetadataHelpers";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const launchpadData = {
  id: "3",
  title: "Will a new stablecoin enter the top 5?",
  description: "This market will resolve to YES if a stablecoin not currently in the top 5 by market cap enters the top 5 on CoinGecko before March 15, 2025.",
  truthSource: "CoinGecko Top Stablecoins Rankings",
  deadline: "2025-03-15T23:59:59Z",
  tags: ["DeFi", "Stablecoins", "Market Cap"],
  status: "launchpad" as const,
  marketIcon: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=200&fit=crop",
  creatorName: "Alex Thompson",
  creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  targetLiquidity: 100000,
  currentLiquidity: 56000,
  timeRemaining: "4 days, 12 hours",
  earlyBoost: 1.5,
  creatorFee: 0.5,
  rules: `
    <h3>Resolution Criteria</h3>
    <p>This market will resolve to YES if:</p>
    <ul>
      <li>A stablecoin not currently in the top 5 enters the top 5 by market capitalization</li>
      <li>The ranking is verified on CoinGecko's official stablecoin rankings</li>
      <li>The stablecoin maintains this position for at least 24 hours</li>
      <li>This occurs before March 15, 2025 23:59 UTC</li>
    </ul>
    
    <h3>Current Top 5 (as of market creation)</h3>
    <ol>
      <li>USDT (Tether)</li>
      <li>USDT (USD Coin)</li>
      <li>DAI</li>
      <li>BUSD (Binance USD)</li>
      <li>TUSD (TrueUSD)</li>
    </ol>
    
    <h3>Resolution Source</h3>
    <p>Primary: CoinGecko Stablecoin Rankings</p>
  `,
  proofLinks: [
    { label: "CoinGecko Stablecoins", url: "https://www.coingecko.com/en/stablecoins" }
  ]
};

const LaunchpadMarket = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: presales, isLoading, refetch: refetchPresales } = usePresales();

  // Trouver la presale correspondante
  const presale = useMemo(() => {
    if (!presales || !id) return null;
    return presales.find(p => p.id === id);
  }, [presales, id]);

  // Calculate data for display
  const launchpadData = useMemo(() => {
    if (!presale) return null;

    const currentLiquidity = parseUSDCAmount(presale.raisedAmount);
    const targetLiquidity = parseUSDCAmount(presale.targetAmount);

    // Calculer le temps restant
    const deadlineTimestamp = parseInt(presale.deadline) * 1000;
    const now = Date.now();
    const timeLeft = deadlineTimestamp - now;
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const timeRemaining = daysLeft > 0
      ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''}, ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`
      : `${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`;

    // Format with metadata
    const formatted = formatMarketWithMetadata(presale, presale.metadata);

    return {
      id: presale.id,
      title: formatted.title,
      description: formatted.description,
      deadline: presale.deadline, // Pass timestamp directly for UTC formatting
      tags: [presale.state],
      status: "launchpad" as const,
      marketIcon: formatted.marketIcon,
      creatorName: presale.creator ? `${presale.creator.slice(0, 6)}...${presale.creator.slice(-4)}` : undefined,
      creatorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${presale.creator}`,
      targetLiquidity,
      currentLiquidity,
      timeRemaining,
      earlyBoost: 1.5,
      creatorFee: 0.2,
      earlyBoost: 1.5,
      creatorFee: 0.2,
      rules: formatted.resolutionRules,
      proofLinks: [
        { label: "Reality.eth", url: "https://reality.eth.link" }
      ],
      // Add metadata loading state
      metadataLoading: !presale.metadata && isLoading
    };
  }, [presale, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Loading presale...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!launchpadData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Presale Not Found</h1>
                <p className="text-muted-foreground mb-6">This presale doesn't exist or has been removed</p>
                <Button onClick={() => navigate("/")}>
                  Back to Launchpad
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <MarketHeader market={launchpadData} />

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Main content - Left side */}
            <div className="lg:col-span-2 space-y-6">
              <LaunchpadProgress
                current={launchpadData.currentLiquidity}
                target={launchpadData.targetLiquidity}
                timeRemaining={launchpadData.timeRemaining}
                creatorName={launchpadData.creatorName}
              />
              <MarketDescription description={launchpadData.description} />
              <ResolutionRules
                rules={launchpadData.rules}
                proofLinks={launchpadData.proofLinks}
              />
              <LaunchpadHowItWorks />
              <LaunchpadIncentives
                earlyBoost={launchpadData.earlyBoost}
                creatorFee={launchpadData.creatorFee}
              />
            </div>

            {/* Sidebar - Right side */}
            <div className="lg:col-span-1">
              <LaunchpadWidget
                marketId={launchpadData.id}
                currentLiquidity={launchpadData.currentLiquidity}
                targetLiquidity={launchpadData.targetLiquidity}
                onContributionSuccess={refetchPresales}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LaunchpadMarket;
