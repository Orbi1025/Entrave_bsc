import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePriceHistory } from "@/hooks/usePriceHistory";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

interface ProbabilityChartProps {
  marketId: string;
  selectedOutcome?: "YES" | "NO";
  onOutcomeHover?: (outcome: "YES" | "NO" | null) => void;
  yesPrice?: number;
  noPrice?: number;
  isResolved?: boolean;
  forceResolvedAnswer?: number;
}

const ProbabilityChart = ({ marketId, selectedOutcome = "YES", onOutcomeHover, yesPrice = 50, noPrice = 50, isResolved = false, forceResolvedAnswer }: ProbabilityChartProps) => {
  const [timeFilter, setTimeFilter] = useState<"24h" | "7d" | "30d" | "all">("30d");
  
  const {
    priceHistory,
    isLoading,
    liveYesPrice,
    liveNoPrice,
    hasLiveData,
    oddsError
  } = usePriceHistory(marketId, isResolved, forceResolvedAnswer);

  // Filter price history based on selected time filter and limit data points for performance
  const filteredPriceHistory = useMemo(() => {
    if (priceHistory.length === 0) {
      return priceHistory;
    }

    if (timeFilter === "all") {
      // For "All", return all data (already limited by the hook)
      return priceHistory;
    }

    const now = Date.now();
    let filterTime: number;
    let maxPoints: number;

    switch (timeFilter) {
      case "24h":
        filterTime = now - 24 * 60 * 60 * 1000;
        maxPoints = 24; // 1 point par heure
        break;
      case "7d":
        filterTime = now - 7 * 24 * 60 * 60 * 1000;
        maxPoints = 28; // 4 points par jour (6h interval)
        break;
      case "30d":
        filterTime = now - 30 * 24 * 60 * 60 * 1000;
        maxPoints = 30; // 1 point par jour
        break;
      default:
        return priceHistory;
    }

    const filtered = priceHistory.filter(point => {
      // Use timestamp if available, otherwise parse date string
      const pointTime = (point as any).timestamp || new Date(point.date).getTime();
      return pointTime >= filterTime;
    });

    // Si le filtre ne retourne aucune donnée, retourner les dernières données disponibles
    if (filtered.length === 0 && priceHistory.length > 0) {
      return priceHistory.slice(-Math.min(maxPoints, priceHistory.length));
    }

    // Limiter le nombre de points de données pour la performance
    if (filtered.length > maxPoints) {
      // Prendre les derniers points disponibles
      return filtered.slice(-maxPoints);
    }

    return filtered;
  }, [priceHistory, timeFilter]);

  // Use live prices if available, for resolved markets use final prices from history, otherwise fallback to props
  let currentYesPrice = liveYesPrice || yesPrice;
  let currentNoPrice = liveNoPrice || noPrice;
  
  // If market is resolved, use the final prices from the price history
  if (isResolved && filteredPriceHistory.length > 0) {
    const lastPoint = filteredPriceHistory[filteredPriceHistory.length - 1];
    currentYesPrice = lastPoint.yes;
    currentNoPrice = lastPoint.no;
  }
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Price History</h3>
          <Tabs value={timeFilter} onValueChange={(value) => setTimeFilter(value as "24h" | "7d" | "30d" | "all")} className="w-auto">
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full transition-all ${selectedOutcome === "YES"
              ? "bg-success ring-2 ring-success ring-offset-2"
              : "bg-success/50"
              }`} />
            <span className={`font-medium transition-colors ${selectedOutcome === "YES" ? "text-success" : "text-muted-foreground"
              }`}>YES</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full transition-all ${selectedOutcome === "NO"
              ? "bg-destructive ring-2 ring-destructive ring-offset-2"
              : "bg-destructive/50"
              }`} />
            <span className={`font-medium transition-colors ${selectedOutcome === "NO" ? "text-destructive" : "text-muted-foreground"
              }`}>NO</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredPriceHistory}
                onMouseMove={(e) => {
                  // Détection du hover sur les lignes
                  if (e && e.activePayload) {
                    const payload = e.activePayload;
                    if (payload[0]?.name === "yes" || payload[1]?.name === "yes") {
                      onOutcomeHover?.("YES");
                    } else if (payload[0]?.name === "no" || payload[1]?.name === "no") {
                      onOutcomeHover?.("NO");
                    }
                  }
                }}
                onMouseLeave={() => onOutcomeHover?.(null)}
              >
                <defs>
                  <linearGradient id="colorYes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                    padding: '12px'
                  }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                  formatter={(value: number, name: string) => {
                    const label = name === 'yes' ? 'YES' : 'NO';
                    const color = name === 'yes' ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
                    return [
                      <span style={{ color, fontWeight: 600 }}>{value}%</span>,
                      <span style={{ color }}>{label}</span>
                    ];
                  }}
                />

                {/* YES Line avec surbrillance */}
                <Line
                  type="monotone"
                  dataKey="yes"
                  stroke="hsl(var(--success))"
                  strokeWidth={selectedOutcome === "YES" ? 3 : 2}
                  dot={false}
                  activeDot={{
                    r: selectedOutcome === "YES" ? 6 : 4,
                    fill: "hsl(var(--success))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2
                  }}
                  opacity={selectedOutcome === "YES" ? 1 : 0.4}
                  className="transition-all duration-300"
                />

                {/* NO Line avec surbrillance */}
                <Line
                  type="monotone"
                  dataKey="no"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={selectedOutcome === "NO" ? 3 : 2}
                  dot={false}
                  activeDot={{
                    r: selectedOutcome === "NO" ? 6 : 4,
                    fill: "hsl(var(--destructive))",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2
                  }}
                  opacity={selectedOutcome === "NO" ? 1 : 0.4}
                  className="transition-all duration-300"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Price indicators */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className={`text-sm transition-all ${selectedOutcome === "YES" ? "scale-105" : ""}`}>
            <p className="text-muted-foreground mb-1">
              YES Price
              {!isResolved && hasLiveData && (
                <span className="text-xs text-green-600 ml-1">● Live</span>
              )}
              {isResolved && (
                <span className="text-xs text-muted-foreground ml-1">Final</span>
              )}
            </p>
            <p className={`text-2xl font-bold ${selectedOutcome === "YES" ? "text-success" : "text-foreground"}`}>
              {currentYesPrice.toFixed(1)}%
            </p>
            {filteredPriceHistory.length > 1 && (
              <p className="text-xs text-muted-foreground">
                Initial: {filteredPriceHistory[0]?.yes?.toFixed(1)}% → Current: {currentYesPrice.toFixed(1)}%
              </p>
            )}
          </div>
          <div className={`text-sm text-right transition-all ${selectedOutcome === "NO" ? "scale-105" : ""}`}>
            <p className="text-muted-foreground mb-1">
              NO Price
              {!isResolved && hasLiveData && (
                <span className="text-xs text-green-600 ml-1">● Live</span>
              )}
              {isResolved && (
                <span className="text-xs text-muted-foreground ml-1">Final</span>
              )}
            </p>
            <p className={`text-2xl font-bold ${selectedOutcome === "NO" ? "text-destructive" : "text-foreground"}`}>
              {currentNoPrice.toFixed(1)}%
            </p>
            {filteredPriceHistory.length > 1 && (
              <p className="text-xs text-muted-foreground">
                Initial: {filteredPriceHistory[0]?.no?.toFixed(1)}% → Current: {currentNoPrice.toFixed(1)}%
              </p>
            )}
          </div>
        </div>

        {/* Price progression summary */}
        {filteredPriceHistory.length > 1 && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Price Progression:</span>
              <span className="ml-2">
                {filteredPriceHistory[0]?.yes?.toFixed(1)}% → {currentYesPrice.toFixed(1)}%
                ({currentYesPrice > filteredPriceHistory[0]?.yes ? '+' : ''}{(currentYesPrice - filteredPriceHistory[0]?.yes).toFixed(1)}%)
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Data Source:</span>
              <span className="ml-2">
                {hasLiveData ? 'Live (PancakeSwap Infinity)' : 'Historical (Subgraph)'}
              </span>
            </div>
          </div>
        )}

        {/* Live data status */}
        {!isResolved && hasLiveData && (
          <div className="flex items-center justify-center pt-2">
            <div className="flex items-center gap-2 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live prices from PancakeSwap Infinity</span>
            </div>
          </div>
        )}

        {!isResolved && oddsError && (
          <div className="flex items-center justify-center pt-2">
            <div className="flex items-center gap-2 text-xs text-orange-500">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Using fallback prices</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProbabilityChart;
