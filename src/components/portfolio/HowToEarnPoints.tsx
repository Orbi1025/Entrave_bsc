import { Card } from "@/components/ui/card";
import { TrendingUp, Rocket, PlusCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HowToEarnPoints = () => {
  const earningMethods = [
    {
      icon: TrendingUp,
      title: "Trading",
      points: "10 points per $1 traded",
      color: "text-primary"
    },
    {
      icon: Rocket,
      title: "Launchpad Funding",
      points: "100 points per $1",
      color: "text-primary"
    },
    {
      icon: PlusCircle,
      title: "Market Creation",
      points: "500 points per market",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Referrals",
      points: "500 points per user",
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-3">
      {earningMethods.map((method, index) => {
        const Icon = method.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
          >
            <div className={`p-2 rounded-lg bg-primary/10`}>
              <Icon className={`w-4 h-4 ${method.color}`} />
            </div>
            <div className="flex-1">
              <span className="font-medium text-foreground text-sm">{method.title}</span>
              <p className="text-xs text-muted-foreground">{method.points}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HowToEarnPoints;
