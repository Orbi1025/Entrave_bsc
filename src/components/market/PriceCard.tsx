import { Card } from "@/components/ui/card";
import { useMarketVolume } from "@/hooks/useMarketVolume";

interface PriceCardProps {
  market: {
    id: string;
    currentProbability: number;
    change24h: number;
    volume24h: number;
    liquidity: number;
  };
}

const PriceCard = ({ market }: PriceCardProps) => {
  // Get real trading volume and swappers data
  const { totalVolume, totalSwaps, uniqueSwappers, isLoading: volumeLoading } = useMarketVolume(market.id);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Use real data when available, fallback to 0 if no data
  const displayVolume = totalVolume > 0 ? Math.floor(totalVolume) : 0;
  const displaySwaps = totalSwaps > 0 ? totalSwaps : 0;
  const displayUniqueSwappers = uniqueSwappers > 0 ? uniqueSwappers : 0;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        {/* Total Volume, Total Swaps, and Unique Swappers */}
        <div className="grid grid-cols-2 gap-6">
          {/* Total Volume */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Volume</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">
                {volumeLoading ? (
                  <div className="w-20 h-10 bg-muted animate-pulse rounded" />
                ) : (
                  formatCurrency(displayVolume)
                )}
              </span>
            </div>
          </div>

          {/* Total Swaps */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Trades</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">
                {volumeLoading ? (
                  <div className="w-16 h-10 bg-muted animate-pulse rounded" />
                ) : (
                  displaySwaps.toLocaleString()
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceCard;
