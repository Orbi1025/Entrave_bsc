import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Clock } from "lucide-react";

interface LaunchpadProgressProps {
  current: number;
  target: number;
  timeRemaining: string;
  creatorName?: string;
}

const LaunchpadProgress = ({ current, target, timeRemaining, creatorName }: LaunchpadProgressProps) => {
  const percentage = (current / target) * 100;
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Funding Progress</h3>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Liquidity Raised</span>
            <span className="font-medium text-foreground">
              {formatCurrency(current)} / {formatCurrency(target)}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">{percentage.toFixed(1)}%</span>
            <span className="text-sm text-muted-foreground">of target reached</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-4 h-4" />
              <span className="text-xs">Target</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(target)}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Remaining</span>
            </div>
            <p className="text-lg font-bold text-foreground">{timeRemaining}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LaunchpadProgress;
