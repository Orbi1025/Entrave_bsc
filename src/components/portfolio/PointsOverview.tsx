import { Card } from "@/components/ui/card";
import { Trophy, HelpCircle, Copy, Check, Users, Award, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HowToEarnPoints from "./HowToEarnPoints";
import { useUserPoints } from "@/hooks/useUserPoints";
import { useReferrals } from "@/hooks/useReferrals";
import { useWallet } from "@/hooks/useWallet";

const PointsOverview = () => {
  const [copied, setCopied] = useState(false);
  const { address } = useWallet();
  
  const { points, isLoading: pointsLoading } = useUserPoints(address);
  const { totalReferrals, totalPointsEarned, isLoading: referralsLoading } = useReferrals(address);

  const pointsData = {
    totalPoints: points?.total_points || 0,
    rank: points?.rank || 0,
    multiplier: points?.multiplier || 1.0
  };

  const referralData = {
    totalReferrals: totalReferrals,
    pointsEarned: totalPointsEarned
  };

  const referralLink = points?.referral_code 
    ? `https://entrave.com?ref=${points.referral_code}`
    : `https://entrave.com?ref=LOADING...`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Entrave Prediction Markets',
          text: 'Join me on Entrave and start predicting!',
          url: referralLink
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to copy
      handleCopyReferral();
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Entrave Points</h3>
        <Dialog>
          <DialogTrigger asChild>
            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>How to Earn Points</DialogTitle>
              <DialogDescription>
                Collect points by trading, providing liquidity, and more
              </DialogDescription>
            </DialogHeader>
            <HowToEarnPoints />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Points</p>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">
              {pointsData.totalPoints.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
          <p className="text-2xl font-bold text-foreground">#{pointsData.rank}</p>
        </div>

        {/* Referral Section */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Referrals</h4>
          </div>

          <div className="space-y-4">
            {/* How it works */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Trophy className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground"><span className="font-semibold">500 points</span> when your friend makes their first trade</p>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground"><span className="font-semibold">5% of their points</span> for every point they earn</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">Points are calculated every Monday</p>
            </div>

            {/* Referral link */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Share your link</p>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="flex-1 font-mono text-sm bg-muted/50"
                />
                <Button
                  onClick={handleCopyReferral}
                  size="sm"
                  variant="outline"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleShareReferral}
                  size="sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Simple stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-foreground">{referralData.totalReferrals}</p>
                <p className="text-xs text-muted-foreground mt-1">Friends joined</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">{referralData.pointsEarned}</p>
                <p className="text-xs text-muted-foreground mt-1">Points earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PointsOverview;
