/**
 * Goldsky Usage Monitor
 * Track subgraph queries to monitor usage and detect rate limiting
 */

interface GoldskyCall {
  query: string;
  timestamp: number;
  success: boolean;
  duration: number;
  error?: string;
}

class GoldskyMonitor {
  private calls: GoldskyCall[] = [];
  private readonly maxHistory = 1000; // Keep last 1000 calls
  
  // Statistics
  private stats = {
    totalCalls: 0,
    successfulCalls: 0,
    failedCalls: 0,
    rateLimitedCalls: 0,
    averageDuration: 0,
    callsPerSecond: 0,
    callsPerMinute: 0,
    hasError: false,
    errorMessage: null as string | null,
    recentFailures: 0,
    lastFailedTimestamp: 0 as number,
  };

  /**
   * Log a subgraph query
   */
  logCall(query: string, success: boolean, duration: number, error?: string) {
    const call: GoldskyCall = {
      query,
      timestamp: Date.now(),
      success,
      duration,
      error
    };

    // Add to history
    this.calls.push(call);
    
    // Trim history if too long
    if (this.calls.length > this.maxHistory) {
      this.calls.shift();
    }

    // Update statistics
    this.updateStats();
  }

  /**
   * Update statistics
   */
  private updateStats() {
    const now = Date.now();
    const oneSecondAgo = now - 1000;
    const oneMinuteAgo = now - 60000;
    
    // Filter recent calls
    const callsLastSecond = this.calls.filter(c => c.timestamp >= oneSecondAgo);
    const callsLastMinute = this.calls.filter(c => c.timestamp >= oneMinuteAgo);
    
    // Count success/failures
    let successes = 0;
    let failures = 0;
    let rateLimited = 0;
    let totalDuration = 0;
    let recentError: string | null = null;
    let lastFailedTime = 0;
    
    callsLastMinute.forEach(call => {
      if (call.success) {
        successes++;
      } else {
        failures++;
        if (call.error?.includes('rate limit') || call.error?.includes('429') || call.error?.includes('503')) {
          rateLimited++;
        }
        if (call.error) {
          recentError = call.error;
        }
        lastFailedTime = Math.max(lastFailedTime, call.timestamp);
      }
      totalDuration += call.duration;
    });

    // Check recent errors
    const hasError = failures > 0; // true if any failure in last minute
    const errorMessage = hasError && recentError ? recentError : null;

    // Update stats
    this.stats = {
      totalCalls: this.calls.length,
      successfulCalls: successes,
      failedCalls: failures,
      rateLimitedCalls: rateLimited,
      averageDuration: callsLastMinute.length > 0 ? totalDuration / callsLastMinute.length : 0,
      callsPerSecond: callsLastSecond.length,
      callsPerMinute: callsLastMinute.length,
      hasError: hasError,
      errorMessage: errorMessage,
      recentFailures: failures,
      lastFailedTimestamp: lastFailedTime,
    };
  }

  /**
   * Get current statistics
   */
  getStats() {
    return {
      ...this.stats,
      history: this.calls.slice(-100), // Last 100 calls
      isRateLimitWarning: this.stats.rateLimitedCalls > 0 || this.stats.hasError,
      recommendation: this.getRecommendation(),
    };
  }

  /**
   * Get recommendations based on usage
   */
  private getRecommendation(): string {
    const { callsPerMinute, rateLimitedCalls, hasError } = this.stats;
    
    if (hasError) {
      return '🚨 SUBGRAPH ERROR! Check Goldsky dashboard for issues.';
    }
    
    if (rateLimitedCalls > 0) {
      return '🚨 RATE LIMIT EXCEEDED! Consider upgrading Goldsky plan.';
    }
    
    if (callsPerMinute > 120) { // More than 2 req/sec
      return '⚠️ High subgraph usage. Monitor closely.';
    }
    
    if (callsPerMinute > 60) { // More than 1 req/sec
      return '💡 Normal subgraph usage.';
    }
    
    return '✅ Low usage. All good.';
  }

  /**
   * Get usage report
   */
  getUsageReport() {
    const now = Date.now();
    const lastHour = now - 3600000;
    const lastDay = now - 86400000;
    
    const callsLastHour = this.calls.filter(c => c.timestamp >= lastHour);
    const callsLastDay = this.calls.filter(c => c.timestamp >= lastDay);
    
    // Estimate monthly usage
    const callsPerMinute = this.stats.callsPerMinute;
    const estimatedMonthlyQueries = callsPerMinute * 60 * 24 * 30;
    
    return {
      current: {
        callsPerSecond: this.stats.callsPerSecond,
        callsPerMinute: callsPerMinute,
        rateLimited: this.stats.rateLimitedCalls > 0,
        hasError: this.stats.hasError,
        errorMessage: this.stats.errorMessage,
      },
      recent: {
        callsLastHour: callsLastHour.length,
        callsLastDay: callsLastDay.length,
      },
      estimated: {
        monthlyQueries: estimatedMonthlyQueries,
        estimatedCost: this.estimateMonthlyCost(estimatedMonthlyQueries),
      },
    };
  }

  /**
   * Estimate monthly cost based on usage
   */
  private estimateMonthlyCost(monthlyQueries: number): string {
    // Goldsky Scale Plan pricing
    // First 2,250 worker-hours are free
    // Additional: $0.05/hour per subgraph (~$36.50/month per subgraph)
    
    // Estimate based on queries (not worker-hours)
    // Assuming 100 queries ≈ 0.01 worker-hour
    const estimatedWorkerHours = monthlyQueries * 0.0001;
    
    if (estimatedWorkerHours <= 2250) {
      return '$0/month (Free tier)';
    }
    
    const additionalHours = estimatedWorkerHours - 2250;
    const additionalCost = additionalHours * 0.05;
    const totalCost = Math.round(additionalCost);
    
    return `$${totalCost}/month (estimated)`;
  }

  /**
   * Clear history
   */
  clearHistory() {
    this.calls = [];
    this.updateStats();
  }
}

// Singleton instance
export const goldskyMonitor = new GoldskyMonitor();

// Log stats every minute in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setInterval(() => {
    const stats = goldskyMonitor.getStats();
    if (stats.totalCalls > 0) {
      console.log('📊 Goldsky Monitor:', {
        callsPerSecond: stats.callsPerSecond,
        callsPerMinute: stats.callsPerMinute,
        rateLimited: stats.rateLimitedCalls,
        hasError: stats.hasError,
        errorMessage: stats.errorMessage,
        recommendation: stats.recommendation,
      });
      
      // Show usage report every 5 minutes
      if (stats.totalCalls % 300 === 0) {
        const report = goldskyMonitor.getUsageReport();
        console.log('📈 Goldsky Usage Report:', report);
      }
    }
  }, 30000); // Every 30 seconds
}

export default goldskyMonitor;

