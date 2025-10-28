import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    TrendingDown,
    RefreshCw,
    Wifi,
    WifiOff,
    Clock,
    Zap
} from 'lucide-react';
import { useChargingWidget } from '@/hooks/useRealTimeOdds';

interface ChargingWidgetProps {
    presaleId: string;
    onOddsUpdate?: (yesPrice: number, noPrice: number) => void;
}

const ChargingWidget: React.FC<ChargingWidgetProps> = ({
    presaleId,
    onOddsUpdate
}) => {
    const {
        yesPrice,
        noPrice,
        isCharging,
        chargingProgress,
        error,
        lastUpdated
    } = useChargingWidget(presaleId);

    // Notify parent of odds updates
    React.useEffect(() => {
        if (onOddsUpdate && !isCharging) {
            onOddsUpdate(yesPrice, noPrice);
        }
    }, [yesPrice, noPrice, isCharging, onOddsUpdate]);

    const formatTime = (timestamp: number) => {
        // If timestamp is 0 or invalid, return "never"
        if (!timestamp || timestamp === 0) {
            return "never";
        }
        
        try {
            // Format as UTC date and time
            const date = new Date(timestamp);
            const dateStr = date.toUTCString(); // Full UTC string like "Wed, 01 Jan 2025 12:34:56 GMT"
            return dateStr;
        } catch {
            return "never";
        }
    };

    const getStatusColor = () => {
        if (error) return 'destructive';
        if (isCharging) return 'warning';
        return 'success';
    };

    const getStatusIcon = () => {
        if (error) return <WifiOff className="w-4 h-4" />;
        if (isCharging) return <RefreshCw className="w-4 h-4 animate-spin" />;
        return <Wifi className="w-4 h-4" />;
    };

    const getStatusText = () => {
        if (error) return 'Connection Error';
        if (isCharging) return 'Fetching Live Prices';
        return 'Live Prices';
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Live Market Odds
                    </CardTitle>
                    <Badge variant={getStatusColor()} className="flex items-center gap-1">
                        {getStatusIcon()}
                        {getStatusText()}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Charging Progress */}
                {isCharging && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Fetching real-time prices...</span>
                            <span className="text-muted-foreground">{Math.round(chargingProgress)}%</span>
                        </div>
                        <Progress value={chargingProgress} className="h-2" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive text-sm">
                            <WifiOff className="w-4 h-4" />
                            <span>Failed to fetch live prices: {error}</span>
                        </div>
                    </div>
                )}

                {/* Live Odds Display */}
                {!isCharging && !error && (
                    <div className="space-y-3">
                        {/* YES Price */}
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                <span className="font-medium text-green-800 dark:text-green-200">YES</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                                    {yesPrice.toFixed(1)}%
                                </div>
                                <div className="text-xs text-green-600 dark:text-green-400">
                                    Live Price
                                </div>
                            </div>
                        </div>

                        {/* NO Price */}
                        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-4 h-4 text-red-600" />
                                <span className="font-medium text-red-800 dark:text-red-200">NO</span>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                                    {noPrice.toFixed(1)}%
                                </div>
                                <div className="text-xs text-red-600 dark:text-red-400">
                                    Live Price
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Last Updated */}
                {!error && (
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Last updated: {formatTime(lastUpdated)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live</span>
                        </div>
                    </div>
                )}

                {/* Pool Key Info (Debug) */}
            </CardContent>
        </Card>
    );
};

export default ChargingWidget;
