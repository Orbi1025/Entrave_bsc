import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Copy, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useMarketLiveOdds } from "@/hooks/useMarketLiveOdds";
import { useMarketVolume, formatVolume } from "@/hooks/useMarketVolume";
import { Skeleton } from "@/components/ui/skeleton";
import { BlinkingOddsSkeleton } from "@/components/ui/MarketCardSkeleton";
import { useMarketOdds } from "@/providers/MarketOddsProvider";

interface MarketCardProps {
  market: {
    id: string;
    question: string;
    category: string;
    yesPrice: number;
    volume: string;
    liquidity: string;
    endDate: string;
    status: "launchpad" | "open" | "resolving" | "resolved" | "OPEN" | "RESOLVED";
    marketIcon?: string;
    creatorName?: string;
  };
}

const MarketCard = ({ market }: MarketCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Try to get live odds from the global provider
  let oddsData: { yesPrice: number; noPrice: number; isLoading: boolean; hasLiveData: boolean; hasError: boolean };
  let isMarketInCurrentBatch = false;
  
  // Check if market is resolved (use status as fallback)
  const isResolved = market.status === "resolved" || market.status === "RESOLVED";
  
  try {
    const { marketOdds } = useMarketOdds();
    const liveOdds = marketOdds[market.id];
    
    if (liveOdds) {
      // Market is in the current batch being loaded
      isMarketInCurrentBatch = true;
      
      if (!liveOdds.isLoading) {
        // Use live odds from provider
        oddsData = {
          yesPrice: liveOdds.yesPrice,
          noPrice: liveOdds.noPrice,
          isLoading: false,
          hasLiveData: true,
          hasError: !!liveOdds.error,
        };
      } else {
        // Still loading or has error (show loading indicator)
        oddsData = {
          yesPrice: market.yesPrice,
          noPrice: 100 - market.yesPrice,
          isLoading: true && !isResolved, // Don't show loading for resolved markets
          hasLiveData: false,
          hasError: !!liveOdds.error,
        };
      }
    } else {
      // Market is NOT in the current batch (will be loaded later)
      oddsData = {
        yesPrice: market.yesPrice,
        noPrice: 100 - market.yesPrice,
        isLoading: false,
        hasLiveData: false,
        hasError: false,
      };
    }
  } catch {
    // Provider not available, use subgraph odds
    oddsData = {
      yesPrice: market.yesPrice,
      noPrice: 100 - market.yesPrice,
      isLoading: false,
      hasLiveData: false,
      hasError: false,
    };
  }

  const { yesPrice, noPrice, isLoading: oddsLoading, hasLiveData, hasError } = oddsData;
  
  // Use volume from market prop (already formatted as string like "$160" or "$1,234")
  // Remove "$" and parse to number for display
  const volumeString = market.volume || "$0";
  const volumeNumber = parseFloat(volumeString.replace(/[$,]/g, '')) || 0;

  const statusColors: Record<string, string> = {
    launchpad: "bg-primary/10 text-primary border-primary/20",
    open: "bg-success/10 text-success border-success/20",
    OPEN: "bg-success/10 text-success border-success/20",
    resolving: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    resolved: "bg-muted text-muted-foreground border-border",
    RESOLVED: "bg-muted text-muted-foreground border-border"
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/market/${market.id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied to clipboard",
        description: "Market link copied successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/market/${market.id}`);
  };

  return (
    <Card
      className="p-6 bg-card border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300 group flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-2">
          <Badge className={`${statusColors[market.status] || statusColors.open} border text-xs`}>
            {market.status}
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-xs capitalize">
            {market.category}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-white hover:bg-primary"
          onClick={handleShare}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>

      {/* Question with Icon */}
      <div className="flex items-start gap-3 mb-3">
        {market.marketIcon && (
          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
            <img
              src={market.marketIcon}
              alt={market.question}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {market.question}
        </h3>
      </div>


      {/* Stats */}
      <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total volume</p>
          <p className="text-sm font-bold text-foreground">
            {volumeNumber > 0 ? volumeString : volumeNumber.toLocaleString('en-US')}
          </p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{market.endDate}</span>
        </div>
      </div>

      {/* Yes/No Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button
          variant="outline"
          className="flex flex-col items-start p-4 h-auto border-success/20 hover:bg-success/10 hover:border-success/40"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/market/${market.id}`);
          }}
        >
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground">Yes</span>
            {!isResolved && hasLiveData && !hasError && (
              <Zap className="w-3 h-3 text-green-500" />
            )}
            {!isResolved && (oddsLoading || hasError) && !hasLiveData && (
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            )}
          </div>
          {oddsLoading && !hasLiveData ? (
            <div className="text-lg font-bold text-success animate-pulse">
              {yesPrice}¢
            </div>
          ) : (
            <span className="text-lg font-bold text-success">{yesPrice}¢</span>
          )}
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-start p-4 h-auto border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/market/${market.id}`);
          }}
        >
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground">No</span>
            {!isResolved && hasLiveData && !hasError && (
              <Zap className="w-3 h-3 text-green-500" />
            )}
            {!isResolved && (oddsLoading || hasError) && !hasLiveData && (
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>
          {oddsLoading && !hasLiveData ? (
            <div className="text-lg font-bold text-destructive animate-pulse">
              {noPrice}¢
            </div>
          ) : (
            <span className="text-lg font-bold text-destructive">{noPrice}¢</span>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default MarketCard;
