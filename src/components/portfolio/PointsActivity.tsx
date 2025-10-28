import { Card } from "@/components/ui/card";
import { TrendingUp, Rocket, PlusCircle, Award, Clock, Users } from "lucide-react";
import { usePointsHistory } from "@/hooks/usePointsHistory";
import { useWallet } from "@/hooks/useWallet";

const PointsActivity = () => {
  const { address } = useWallet();
  const { history, isLoading } = usePointsHistory(address);

  const getIcon = (actionType: string) => {
    switch (actionType) {
      case 'trade': return TrendingUp;
      case 'launchpad': return Rocket;
      case 'market_creation': return PlusCircle;
      case 'referral': return Users;
      default: return Award;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const activities = history.map(item => ({
    id: item.id,
    icon: getIcon(item.action_type),
    description: item.description,
    timestamp: formatTimestamp(item.created_at),
    points: item.points
  }));

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activity yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start trading or contributing to see your activity here
            </p>
          </div>
        ) : (
          activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  {activity.description}
                </p>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">+{activity.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          );
        })
        )}
      </div>
    </Card>
  );
};

export default PointsActivity;
