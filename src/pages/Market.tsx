import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketHeader from "@/components/market/MarketHeader";
import PriceCard from "@/components/market/PriceCard";
import TradeWidget from "@/components/market/TradeWidget";
import ClaimWidget from "@/components/market/ClaimWidget";
import ChargingWidget from "@/components/market/ChargingWidget";
import ProbabilityChart from "@/components/market/ProbabilityChart";
import ResolutionRules from "@/components/market/ResolutionRules";
import MarketDescription from "@/components/market/MarketDescription";
import { usePresales } from "@/hooks/usePresales";
import { transformPresaleToMarket, formatDeadline } from "@/lib/marketHelpers";
import { formatMarketWithMetadata } from "@/lib/presaleMetadataHelpers";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - kept as fallback
const mockMarketData = {
  id: "1",
  title: "Will Bitcoin reach $100K before 2026?",
  description: "This market will resolve to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before January 1st, 2026 00:00 UTC.",
  truthSource: "CoinGecko API, Coinbase Pro, Binance",
  deadline: "2025-12-31T23:59:59Z",
  tags: ["Crypto", "Bitcoin", "Price Prediction"],
  status: "open" as const,
  marketIcon: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=200&fit=crop",
  creatorName: "Sarah Johnson",
  currentProbability: 68,
  change24h: 2.5,
  volume24h: 0,
  liquidity: 450000,
  yesPrice: 0.68,
  noPrice: 0.32,
  rules: `
    <h3>Resolution Criteria</h3>
    <p>This market will resolve to YES if:</p>
    <ul>
      <li>Bitcoin (BTC/USD) reaches or exceeds $100,000 on at least one of the following exchanges: Coinbase, Binance, or Kraken</li>
      <li>The price must be sustained for at least 1 hour (not just a flash spike)</li>
      <li>This occurs before January 1st, 2026 00:00 UTC</li>
    </ul>
    
    <h3>Resolution Sources</h3>
    <p>Primary: CoinGecko API historical data</p>
    <p>Secondary: Direct exchange APIs (Coinbase Pro, Binance, Kraken)</p>
    
    <h3>Invalid Resolution</h3>
    <p>This market will be invalidated if:</p>
    <ul>
      <li>All primary and secondary data sources become unavailable</li>
      <li>A critical bug or exploit affects Bitcoin pricing across exchanges</li>
    </ul>
  `,
  proofLinks: [
    { label: "CoinGecko", url: "https://coingecko.com" },
    { label: "Coinbase", url: "https://coinbase.com" }
  ]
};

const Market = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: presales, isLoading } = usePresales();
  const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO">("YES");

  // Trouver le marché correspondant à l'ID
  const market = useMemo(() => {
    if (!presales || !id) return null;

    const presaleWithMetadata = presales.find(p => p.id === id);
    if (!presaleWithMetadata) return null;

    const transformed = transformPresaleToMarket(presaleWithMetadata, presaleWithMetadata.metadata);
    const formatted = formatMarketWithMetadata(presaleWithMetadata, presaleWithMetadata.metadata);

    // Add additional data for MarketHeader and ClaimWidget
    return {
      ...transformed,
      title: formatted.title,
      description: formatted.description,
      deadline: presaleWithMetadata.deadline, // Pass timestamp directly for UTC formatting
      tags: [formatted.category],
      currentProbability: transformed.yesPrice,
      yesPrice: transformed.yesPrice,
      noPrice: 100 - transformed.yesPrice, // For resolved markets: YES won = 100/0, NO won = 0/100
      change24h: 0, // Dynamic: Would need historical data from subgraph
      volume24h: 0, // Will be replaced by real trading volume from PriceCard
      liquidity: parseInt(presaleWithMetadata.targetAmount) / 1e18, // Convert from wei to USDT
      creator: presaleWithMetadata.creator,
      creatorName: `${presaleWithMetadata.creator.slice(0, 6)}...${presaleWithMetadata.creator.slice(-4)}`, // Format address
      marketIcon: formatted.marketIcon,
      rules: formatted.resolutionRules,
      proofLinks: [
        { label: "Reality.eth", url: "https://reality.eth.link" }
      ],
      // Add token addresses for ClaimWidget
      yesToken: transformed.yesToken,
      noToken: transformed.noToken,
      resolved: transformed.resolved,
      forceResolvedAnswer: transformed.forceResolvedAnswer,
      creatorClaimed: presaleWithMetadata.creatorClaimed,
      // Add metadata loading state
      metadataLoading: !presaleWithMetadata.metadata && isLoading
    };
  }, [presales, id, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Loading market...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Market Not Found</h1>
                <p className="text-muted-foreground mb-6">This market doesn't exist or has been removed</p>
                <Button onClick={() => navigate("/")}>
                  Back to Markets
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
          <MarketHeader market={market} />

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Main content - Left side */}
            <div className="lg:col-span-2 space-y-6">
              <PriceCard market={market} />
              {!market.resolved && (
                <ChargingWidget
                  presaleId={market.id}
                  onOddsUpdate={(yesPrice, noPrice) => {
                    // Update market prices with live data
                    market.yesPrice = yesPrice;
                    market.noPrice = noPrice;
                  }}
                />
              )}
              <ProbabilityChart
                marketId={market.id}
                selectedOutcome={selectedOutcome}
                yesPrice={market.yesPrice}
                noPrice={market.noPrice}
                isResolved={market.resolved}
                forceResolvedAnswer={market.forceResolvedAnswer}
              />
              <MarketDescription description={market.description} />
              <ResolutionRules rules={market.rules} proofLinks={market.proofLinks} />
            </div>

            {/* Sidebar - Right side */}
            <div className="lg:col-span-1">
              {market.resolved ? (
                <ClaimWidget market={market} />
              ) : (
                <TradeWidget
                  market={market}
                  onOutcomeChange={setSelectedOutcome}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Market;
