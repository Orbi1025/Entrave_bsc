import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, Calculator } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LaunchpadIncentivesProps {
  earlyBoost: number;
  creatorFee: number;
}

const LaunchpadIncentives = ({ earlyBoost, creatorFee }: LaunchpadIncentivesProps) => {
  const [userContribution] = useState(1000); // Example: $1,000 contribution
  const totalLiquidity = 10000; // Example: $10,000 total launchpad liquidity
  const tradingVolume = 100000; // Example: $100,000 trading volume after launch
  
  const userPoolShare = (userContribution / totalLiquidity) * 100;
  const tradingFees = tradingVolume * 0.01; // 1% trading fee total
  const lpFeeShare = tradingFees * 0.50; // 50% goes to LPs
  const userEarnings = (userContribution / totalLiquidity) * lpFeeShare;
  const userROI = (userEarnings / userContribution) * 100;

  return (
    <Card className="p-6 bg-card border-border">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="fees" className="border-none">
          <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline">
            Fee distribution on Entrave
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 mt-4">

        {/* Fee Distribution */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Total Fees from Volume</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50%</div>
              <div className="text-xs text-muted-foreground mt-1">Liquidity Providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">20%</div>
              <div className="text-xs text-muted-foreground mt-1">Market Creator</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">30%</div>
              <div className="text-xs text-muted-foreground mt-1">Platform</div>
            </div>
          </div>
        </div>

        {/* Earnings Example */}
        <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-primary" />
            <h4 className="text-base font-bold text-foreground">LP Provider Example</h4>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">Your contribution</span>
              <span className="font-semibold text-foreground">${userContribution.toLocaleString()} USDT</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">Total launchpad liquidity</span>
              <span className="font-semibold text-foreground">${totalLiquidity.toLocaleString()} USDT</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-muted-foreground">Your pool share</span>
              <span className="font-semibold text-primary">{userPoolShare}%</span>
            </div>

            <div className="pt-2 mt-2 border-t-2 border-primary/20">
              <div className="text-xs text-muted-foreground mb-2">After market launches with $100k trading volume:</div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">Total trading fees (1%)</span>
                <span className="font-medium text-foreground">${tradingFees.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">LP share (0.5%)</span>
                <span className="font-medium text-foreground">${lpFeeShare.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="font-medium text-foreground">Your earnings</span>
                <span className="font-bold text-success text-lg">${userEarnings.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">Return on investment</span>
                <span className="font-bold text-success">{userROI.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Point Multiplier */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Protocol Points</span>
            </div>
            <p className="text-2xl font-bold text-primary">{earlyBoost}x Multiplier</p>
            <p className="text-xs text-muted-foreground mt-1">
              Early LPs earn boosted points for protocol rewards
            </p>
          </div>

          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-foreground">Continuous Earnings</span>
            </div>
            <p className="text-2xl font-bold text-success">Passive</p>
            <p className="text-xs text-muted-foreground mt-1">
              Earn fees on every trade for as long as you provide liquidity
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Additional Benefits</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Earnings scale with market trading volume</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Higher multiplier points can unlock exclusive perks</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Early LP status for priority in future launchpads</span>
            </li>
          </ul>
        </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default LaunchpadIncentives;
