import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MarketHeaderProps {
  market: {
    title: string;
    description: string;
    deadline: string;
    tags: string[];
    status: "launchpad" | "open" | "resolving" | "resolved";
    marketIcon?: string;
    creatorName?: string;
    metadataLoading?: boolean;
  };
}

const MarketHeader = ({ market }: MarketHeaderProps) => {
  const statusColors = {
    launchpad: "bg-primary/10 text-primary border-primary/20",
    open: "bg-success/10 text-success border-success/20",
    resolving: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    resolved: "bg-muted text-muted-foreground border-border"
  };

  return (
    <div className="space-y-4">
      {/* Status and Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={`${statusColors[market.status]} border`}>
          {market.status.toUpperCase()}
        </Badge>
        {market.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-primary/5 capitalize">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Title with Icon */}
      <div className="flex items-start gap-4">
        {(market.marketIcon || market.metadataLoading) && (
          <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
            {market.metadataLoading ? (
              <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
              </div>
            ) : (
              <img 
                src={market.marketIcon} 
                alt={market.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex-1">
          {market.title}
        </h1>
      </div>

      {/* Description */}
      <p className="text-lg text-foreground/70 leading-relaxed">
        {market.description}
      </p>

      {/* Meta info */}
      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            Closes: {(() => {
              try {
                // market.deadline can be a timestamp (number in seconds) or a date string
                const timestamp = typeof market.deadline === 'string' 
                  ? parseInt(market.deadline) * 1000 
                  : market.deadline;
                return format(new Date(timestamp), "MMM dd, yyyy 'at' HH:mm") + " UTC";
              } catch {
                return "Invalid date";
              }
            })()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
