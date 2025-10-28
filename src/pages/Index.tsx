import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo, useEffect } from "react";
import {
  TrendingUp, Rocket, Zap, Bitcoin, Trophy, Landmark, Flame,
  DollarSign, Globe, Sparkles, Smartphone, Briefcase, Heart,
  Scale, Lightbulb, Flag, MapPin, Loader2
} from "lucide-react";
import LaunchpadMarketCard from "@/components/launchpad/LaunchpadMarketCard";
import LaunchpadMarketCardSkeleton from "@/components/ui/LaunchpadMarketCardSkeleton";
import MarketCard from "@/components/explorer/MarketCard";
import MarketCardSkeleton from "@/components/ui/MarketCardSkeleton";
import CategoryBar from "@/components/CategoryBar";
import InlineFilters from "@/components/InlineFilters";
import { usePresales } from "@/hooks/usePresales";
import { transformPresaleToMarket, transformPresaleToLaunchpad } from "@/lib/marketHelpers";
import { useMarketLiveOdds } from "@/hooks/useMarketLiveOdds";
import { MarketOddsProvider } from "@/providers/MarketOddsProvider";

// Unified categories for both Active Markets and Launchpad
const allCategories = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "crypto", label: "Crypto", icon: Bitcoin },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "politics", label: "Politics", icon: Landmark },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "culture", label: "Culture", icon: Flame },
  { id: "global", label: "Global", icon: Globe },
  { id: "tech", label: "Tech", icon: Smartphone },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "social", label: "Social", icon: Heart },
  { id: "legal", label: "Legal", icon: Scale },
  { id: "innovation", label: "Innovation", icon: Lightbulb },
  { id: "entertainment", label: "Entertainment", icon: Sparkles },
  { id: "china", label: "China", icon: Flag },
  { id: "geopolitics", label: "Geopolitics", icon: MapPin },
];


// Sort options for Active Markets
const activeMarketSortOptions = [
  { value: "volume", label: "Highest Volume" },
  { value: "ending", label: "Ending Soon" },
  { value: "newest", label: "Newest" },
  { value: "price-change", label: "Price Change" },
];

// Status filter options for Active Markets
const statusFilterOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending Resolution" },
  { value: "resolved", label: "Resolved" },
];

// Sort options for Launchpad
const launchpadSortOptions = [
  { value: "progress", label: "Most Funded" },
  { value: "ending", label: "Ending Soon" },
  { value: "newest", label: "Newest" },
  { value: "closest-goal", label: "Closest to Goal" },
  { value: "highest-target", label: "Highest Target" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [sortBy, setSortBy] = useState("volume");
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [oddsReady, setOddsReady] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number | undefined>(undefined);

  // Fetch data from subgraph
  const { data: presalesData, isLoading } = usePresales();

  // Transform presales to format for Active Markets and Launchpad
  const activeMarkets = useMemo(() => {
    if (!presalesData) return [];
    
    // IDs of markets to hide from the front-end
    const hiddenMarketIds = [
      '0xf50627a76fff393d6f4acaa7735325b666c9191eff94ac0eeb5939cbbd5fab94',
      '0xf3653e2e6c5c30b6ba7e1536146f5e0fd620d2440eacb55cd69426e9990c8b24'
    ];
    
    // Active Markets = presales with created tokens (Graduated or Resolved)
    return presalesData
      .filter(presale => presale.tokensCreated)
      .filter(presale => !hiddenMarketIds.includes(presale.id)) // Hide specific markets
      .map(presale => {
        const market = transformPresaleToMarket(presale, presale.metadata);
        const status = presale.resolved ? 'RESOLVED' as const : 'OPEN' as const;
        // Add status based on resolved state
        return {
          ...market,
          status,
          resolved: presale.resolved,
          forceResolvedAnswer: presale.forceResolvedAnswer
        };
      });
  }, [presalesData]);

  // Check if real-time odds are ready for all active markets
  // Wait 2 seconds after markets are loaded before showing them
  useEffect(() => {
    if (!presalesData || presalesData.length === 0) {
      setOddsReady(false);
      return;
    }

    const timer = setTimeout(() => {
      setOddsReady(true);
      // Set last update timestamp when odds are ready
      setLastUpdate(Date.now());
    }, 2000); // Wait 2 seconds for odds to load

    return () => clearTimeout(timer);
  }, [presalesData]);

  // Reset oddsReady when switching tabs to show loading state
  useEffect(() => {
    setOddsReady(false);
    // Update odds after a delay when switching to active markets tab
    if (activeTab === "active") {
      const timer = setTimeout(() => {
        setOddsReady(true);
        setLastUpdate(Date.now());
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const launchpadMarkets = useMemo(() => {
    if (!presalesData) return [];
    // Launchpad = presales sans tokens créés (encore en funding)
    return presalesData
      .filter(presale => !presale.tokensCreated)
      .map(presale => transformPresaleToLaunchpad(presale, presale.metadata));
  }, [presalesData]);

  // Filter markets by search, category, and status
  const filteredActiveMarkets = useMemo(() => {
    return activeMarkets.filter((market) => {
      const matchesSearch = searchQuery === "" ||
        market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "trending" ||
        market.category === selectedCategory;

      // Filter by status
      let matchesStatus = false;
      if (statusFilter === "active") {
        matchesStatus = !market.resolved && market.status === "OPEN";
      } else if (statusFilter === "pending") {
        matchesStatus = market.status === "OPEN" && market.forceResolvedAnswer !== 0;
      } else if (statusFilter === "resolved") {
        matchesStatus = market.resolved === true;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, statusFilter, activeMarkets]);

  // Filter launchpad markets
  const filteredLaunchpadMarkets = useMemo(() => {
    return launchpadMarkets.filter((market) => {
      const matchesSearch = searchQuery === "" ||
        market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "trending" ||
        market.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, launchpadMarkets]);

  // Sort active markets
  const sortedActiveMarkets = useMemo(() => {
    const sorted = [...filteredActiveMarkets];
    switch (sortBy) {
      case "volume":
        return sorted.sort((a, b) => {
          // Remove $, commas, and K/M suffixes to get numeric value
          const aVol = parseFloat(a.volume.replace(/[$,\s]/g, '').replace(/K/g, '000').replace(/M/g, '000000'));
          const bVol = parseFloat(b.volume.replace(/[$,\s]/g, '').replace(/K/g, '000').replace(/M/g, '000000'));
          return bVol - aVol;
        });
      case "ending":
        return sorted.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
      case "newest":
        return sorted.reverse();
      case "price-change":
        // Sort by how far from 50% (biggest movers)
        return sorted.sort((a, b) => {
          const aChange = Math.abs(a.yesPrice - 50);
          const bChange = Math.abs(b.yesPrice - 50);
          return bChange - aChange;
        });
      default:
        return sorted;
    }
  }, [sortBy, filteredActiveMarkets]);

  // Sort launchpad markets
  const sortedLaunchpadMarkets = useMemo(() => {
    const sorted = [...filteredLaunchpadMarkets];
    switch (sortBy) {
      case "progress":
        return sorted.sort((a, b) => {
          const aProgress = (a.currentLiquidity / a.targetLiquidity) * 100;
          const bProgress = (b.currentLiquidity / b.targetLiquidity) * 100;
          return bProgress - aProgress;
        });
      case "ending":
        return sorted.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
      case "newest":
        return sorted.reverse();
      case "closest-goal":
        // Sort by how close to 100% funded
        return sorted.sort((a, b) => {
          const aProgress = (a.currentLiquidity / a.targetLiquidity) * 100;
          const bProgress = (b.currentLiquidity / b.targetLiquidity) * 100;
          const aDistance = Math.abs(100 - aProgress);
          const bDistance = Math.abs(100 - bProgress);
          return aDistance - bDistance;
        });
      case "highest-target":
        return sorted.sort((a, b) => b.targetLiquidity - a.targetLiquidity);
      default:
        return sorted;
    }
  }, [sortBy, filteredLaunchpadMarkets]);

  // Reset sort when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSortBy(value === "active" ? "volume" : "progress");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Tabs - Direct Product Access */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex items-center justify-center mb-6">
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="active" className="px-8 gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Active Markets
                </TabsTrigger>
                <TabsTrigger value="launchpad" className="px-8 gap-2">
                  <Rocket className="w-4 h-4" />
                  Launchpad
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Category Bar */}
            <CategoryBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={allCategories}
            />

            {/* Active Markets Tab */}
            <TabsContent value="active" className="mt-6">
              <MarketOddsProvider marketIds={sortedActiveMarkets.filter(m => !m.resolved).map(m => m.id)}>
                <InlineFilters
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  sortOptions={activeMarketSortOptions}
                  lastUpdate={lastUpdate}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  statusOptions={statusFilterOptions}
                />
                {isLoading || !oddsReady ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading markets...</p>
                  </div>
                ) : sortedActiveMarkets.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No active markets found</p>
                      <p className="text-sm text-muted-foreground mt-2">Markets will appear here once graduated</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedActiveMarkets.map((market) => (
                      <MarketCard key={market.id} market={market} />
                    ))}
                  </div>
                )}
              </MarketOddsProvider>
            </TabsContent>

            {/* Launchpad Tab */}
            <TabsContent value="launchpad" className="mt-6">
              <InlineFilters
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOptions={launchpadSortOptions}
              />
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <LaunchpadMarketCardSkeleton key={index} />
                  ))}
                </div>
              ) : sortedLaunchpadMarkets.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Rocket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No presales in progress</p>
                    <p className="text-sm text-muted-foreground mt-2">Be the first to create a presale!</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedLaunchpadMarkets.map((market) => (
                    <LaunchpadMarketCard key={market.id} market={market} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
