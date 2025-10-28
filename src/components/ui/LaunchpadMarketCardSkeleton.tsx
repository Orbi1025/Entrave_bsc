import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LaunchpadMarketCardSkeleton = () => {
    return (
        <Card className="p-6 bg-card border-border">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
            </div>

            {/* Question */}
            <div className="space-y-2 mb-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Creator */}
            <Skeleton className="h-4 w-32 mb-4" />

            {/* Progress Bar */}
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-20" />
                </div>
            </div>

            {/* Action Button */}
            <Skeleton className="h-10 w-full rounded-md" />
        </Card>
    );
};

export default LaunchpadMarketCardSkeleton;
