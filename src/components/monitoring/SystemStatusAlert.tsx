import { useEffect, useState, useRef } from "react";
import { infuraMonitor } from "@/lib/infuraMonitor";
import { goldskyMonitor } from "@/lib/goldskyMonitor";
import { toast } from "sonner";

export function SystemStatusAlert() {
  const [lastInfuraAlert, setLastInfuraAlert] = useState<number>(0);
  const [lastGoldskyAlert, setLastGoldskyAlert] = useState<number>(0);
  const toastIds = useRef<{ infura?: string | number; goldsky?: string | number }>({});

  useEffect(() => {
    const updateStats = () => {
      const infura = infuraMonitor.getStats();
      const goldsky = goldskyMonitor.getStats();

      // Check Infura alerts
      const infuraNeedsAttention = infura && (
        infura.isRateLimitWarning || 
        infura.callsPerMinute > 100
      );

      if (infuraNeedsAttention) {
        const now = Date.now();
        // Only show alert every 2 minutes to avoid spamming
        if (now - lastInfuraAlert > 120000) {
          let message = '';
          let duration = Infinity;

          if (infura.rateLimitedCalls > 0) {
            message = '⚠️ Too many users on the platform. Please refresh or try again later.';
            duration = Infinity; // Keep until dismissed
            console.error('🚨 Infura Rate Limit Exceeded:', {
              totalCalls: infura.totalCalls,
              rateLimitedCalls: infura.rateLimitedCalls,
              callsPerMinute: infura.callsPerMinute,
              recommendsUpgrade: 'Consider upgrading to Growth plan'
            });
          } else if (infura.callsPerMinute > 100) {
            message = '⚠️ High traffic detected. Some features may be slower.';
            console.warn('⚠️ Infura High Usage:', {
              callsPerMinute: infura.callsPerMinute,
              totalCalls: infura.totalCalls,
              averageDuration: `${infura.averageDuration?.toFixed(2)}ms`,
              recommendation: infura.recommendation
            });
          }

          if (message) {
            // Dismiss previous toast if exists
            if (toastIds.current.infura) {
              toast.dismiss(toastIds.current.infura);
            }
            
            const id = toast.error(message, { duration });
            toastIds.current.infura = id;
            setLastInfuraAlert(now);
          }
        }
      } else {
        // Dismiss alert if no longer needed
        if (toastIds.current.infura) {
          toast.dismiss(toastIds.current.infura);
          toastIds.current.infura = undefined;
        }
      }

      // Check Goldsky alerts - now triggers on any error including CORS
      const goldskyNeedsAttention = goldsky && (
        goldsky.isRateLimitWarning ||
        (goldsky.failedCalls > 0 && goldsky.recentFailures > 0) ||
        goldsky.hasError ||
        goldsky.errorMessage
      );

      if (goldskyNeedsAttention) {
        const now = Date.now();
        // Only show alert every 2 minutes to avoid spamming
        if (now - lastGoldskyAlert > 120000) {
          let message = '';
          let duration = Infinity;

          if (goldsky.rateLimitedCalls > 0) {
            message = '⚠️ Too many users on the platform. Please refresh or try again later.';
            duration = Infinity;
            console.error('🚨 Goldsky Rate Limit Exceeded:', {
              totalCalls: goldsky.totalCalls,
              rateLimitedCalls: goldsky.rateLimitedCalls,
              callsPerMinute: goldsky.callsPerMinute,
              recommendation: goldsky.recommendation
            });
          } else if (goldsky.hasError || goldsky.recentFailures > 0 || goldsky.failedCalls > 0) {
            message = '⚠️ Too many users on the platform. Please refresh or try again later.';
            duration = Infinity;
            console.error('❌ Goldsky Service Error:', {
              errorMessage: goldsky.errorMessage,
              failedCalls: goldsky.failedCalls,
              recentFailures: goldsky.recentFailures,
              totalCalls: goldsky.totalCalls,
              lastFailedTimestamp: new Date(goldsky.lastFailedTimestamp).toISOString()
            });
          }

          if (message) {
            // Dismiss previous toast if exists
            if (toastIds.current.goldsky) {
              toast.dismiss(toastIds.current.goldsky);
            }
            
            const id = toast.error(message, { duration });
            toastIds.current.goldsky = id;
            setLastGoldskyAlert(now);
          }
        }
      } else {
        // Dismiss alert if no longer needed
        if (toastIds.current.goldsky) {
          toast.dismiss(toastIds.current.goldsky);
          toastIds.current.goldsky = undefined;
        }
      }
    };

    // Initial update
    updateStats();

    // Update every 30 seconds
    const interval = setInterval(updateStats, 30000);

    return () => clearInterval(interval);
  }, [lastInfuraAlert, lastGoldskyAlert]);

  // This component doesn't render anything, it just manages toast notifications
  return null;
}

export default SystemStatusAlert;

