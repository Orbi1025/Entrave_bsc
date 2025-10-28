import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

interface FeesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const FeesStep = ({ formData, updateFormData }: FeesStepProps) => {
  const tradingVolume = parseFloat(formData.projectedVolume || "150000");
  const creatorFeePercent = 20; // Fixed at 20%
  const creatorRevenue = tradingVolume * (creatorFeePercent / 100);

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      {/* Revenue Projection */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Revenue Projection Calculator
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Estimate your potential earnings based on trading volume
        </p>

        {/* Volume Slider */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <Label>Expected Trading Volume</Label>
            <span className="text-2xl font-bold text-primary">
              {formatVolume(tradingVolume)}
            </span>
          </div>
          <Slider
            value={[tradingVolume]}
            onValueChange={([value]) => updateFormData({ projectedVolume: value.toString() })}
            min={10000}
            max={10000000}
            step={10000}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$10K</span>
            <span>$10M</span>
          </div>
        </div>

        {/* Revenue Calculation */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Trading Volume</p>
              <p className="text-lg font-medium text-foreground">{formatVolume(tradingVolume)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Creator Fee</p>
              <p className="text-lg font-medium text-foreground">{creatorFeePercent}%</p>
            </div>
          </div>
          
          <div className="flex justify-between p-4 bg-success/10 rounded-lg border border-success/20">
            <div>
              <p className="text-sm text-foreground font-medium">Your Earnings</p>
              <p className="text-xs text-muted-foreground">As market creator</p>
            </div>
            <p className="text-2xl font-bold text-success">
              ${creatorRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="space-y-2 text-sm">
            <p className="text-foreground font-medium">Creator Earnings</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• You earn 20% of the fee pool (1% total)</li>
              <li>• Lifetime earnings - no time limit</li>
              <li>• Higher quality markets attract more traders</li>
              <li>• Clear resolution criteria drives participation</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeesStep;
