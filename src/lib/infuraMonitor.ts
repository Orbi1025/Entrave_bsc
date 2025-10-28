/**
 * Infura Usage Monitor
 * Track RPC calls to monitor usage and detect rate limiting
 */

interface InfuraCall {
  endpoint: string;
  method: string;
  timestamp: number;
  success: boolean;
  duration: number;
  error?: string;
}

class InfuraMonitor {
  private calls: InfuraCall[] = [];
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
  };

  /**
   * Log an RPC call
   */
  logCall(endpoint: string, method: string, success: boolean, duration: number, error?: string) {
    const call: InfuraCall = {
      endpoint,
      method,
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
    
    callsLastMinute.forEach(call => {
      if (call.success) {
        successes++;
      } else {
        failures++;
        if (call.error?.includes('rate limit') || call.error?.includes('429')) {
          rateLimited++;
        }
      }
      totalDuration += call.duration;
    });

    // Update stats
    this.stats = {
      totalCalls: this.calls.length,
      successfulCalls: successes,
      failedCalls: failures,
      rateLimitedCalls: rateLimited,
      averageDuration: callsLastMinute.length > 0 ? totalDuration / callsLastMinute.length : 0,
      callsPerSecond: callsLastSecond.length,
      callsPerMinute: callsLastMinute.length,
    };
  }

  /**
   * Get current statistics
   */
  getStats() {
    return {
      ...this.stats,
      history: this.calls.slice(-100), // Last 100 calls
      isRateLimitWarning: this.stats.rateLimitedCalls > 0,
      recommendation: this.getRecommendation(),
    };
  }

  /**
   * Get recommendations based on usage
   */
  private getRecommendation(): string {
    const { callsPerMinute, rateLimitedCalls } = this.stats;
    
    if (rateLimitedCalls > 0) {
      return '🚨 RATE LIMIT EXCEEDED! Upgrade to Growth plan ($50/month)';
    }
    
    if (callsPerMinute > 180) { // More than 3 req/sec
      return '⚠️ Approaching rate limits. Consider upgrading to Growth plan ($50/month)';
    }
    
    if (callsPerMinute > 100) { // More than 1.6 req/sec
      return '💡 High usage detected. Monitor closely.';
    }
    
    if (callsPerMinute > 50) { // More than 0.8 req/sec
      return '✅ Usage is normal.';
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
    const estimatedMonthlyCalls = callsPerMinute * 60 * 24 * 30;
    
    return {
      current: {
        callsPerSecond: this.stats.callsPerSecond,
        callsPerMinute: callsPerMinute,
        rateLimited: this.stats.rateLimitedCalls > 0,
      },
      recent: {
        callsLastHour: callsLastHour.length,
        callsLastDay: callsLastDay.length,
      },
      estimated: {
        monthlyCalls: estimatedMonthlyCalls,
        monthlyCost: this.estimateMonthlyCost(estimatedMonthlyCalls),
      },
      plan: {
        current: 'Free (2 req/sec)',
        recommended: this.stats.rateLimitedCalls > 0 ? 'Growth ($50/month)' : 
                     callsPerMinute > 180 ? 'Growth ($50/month)' : 
                     'Free is sufficient',
      },
    };
  }

  /**
   * Estimate monthly cost based on usage
   */
  private estimateMonthlyCost(monthlyCalls: number): string {
    const credits = monthlyCalls;
    
    // Free: 100,000 credits
    if (credits <= 100000) {
      return '$0/month (Free plan)';
    }
    
    // Growth: 1,500,000 credits for $50
    if (credits <= 1500000) {
      return '$50/month (Growth plan)';
    }
    
    // Scale: 5,000,000 credits for $175
    if (credits <= 5000000) {
      return '$175/month (Scale plan)';
    }
    
    // Enterprise required
    return '$500+/month (Enterprise plan)';
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
export const infuraMonitor = new InfuraMonitor();

// Log stats every minute in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setInterval(() => {
    const stats = infuraMonitor.getStats();
    if (stats.totalCalls > 0) {
      console.log('📊 Infura Monitor:', {
        callsPerSecond: stats.callsPerSecond,
        callsPerMinute: stats.callsPerMinute,
        rateLimited: stats.rateLimitedCalls,
        recommendation: stats.recommendation,
      });
      
      // Show usage report every 5 minutes
      if (stats.totalCalls % 300 === 0) {
        const report = infuraMonitor.getUsageReport();
        console.log('📈 Infura Usage Report:', report);
      }
    }
  }, 30000); // Every 30 seconds
}

export default infuraMonitor;
