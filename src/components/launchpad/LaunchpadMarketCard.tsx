import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LaunchpadMarketCardProps {
  market: {
    id: string;
    question: string;
    category: string;
    currentLiquidity: number;
    targetLiquidity: number;
    contributors: number;
    endDate: string;
    marketIcon?: string;
  };
}

const LaunchpadMarketCard = ({ market }: LaunchpadMarketCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const percentage = Math.round((market.currentLiquidity / market.targetLiquidity) * 100);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/launchpad/${market.id}`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied to clipboard",
        description: "Launchpad link copied successfully",
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
    navigate(`/launchpad/${market.id}`);
  };

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="shrink-0 capitalize">
                {market.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Ends {market.endDate}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 hover:text-white hover:bg-primary"
              onClick={handleShare}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Question with Icon */}
          <div className="flex items-start gap-3">
            {market.marketIcon && (
              <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
                <img 
                  src={market.marketIcon} 
                  alt={market.question}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 flex-1">
              {market.question}
            </h3>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to target</span>
            <span className="font-semibold text-foreground">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">
              {formatCurrency(market.currentLiquidity)} / {formatCurrency(market.targetLiquidity)}
            </span>
            <span className="text-muted-foreground">
              {market.contributors} contributors
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border/50 flex justify-center">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/launchpad/${market.id}`);
            }}
            className="w-full"
          >
            Fund Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LaunchpadMarketCard;
