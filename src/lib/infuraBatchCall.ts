import { createPublicClient, http, PublicClient } from 'viem';
import { bsc } from 'viem/chains';

let publicClientInstance: PublicClient | null = null;

/**
 * Get or create a singleton instance of the Viem public client
 * This ensures we reuse the same connection across the app
 */
export function getPublicClient(): PublicClient {
  if (!publicClientInstance) {
    const RPC_URL = (import.meta as any).env?.VITE_BASE_RPC_URL || 
                    'https://bsc-mainnet.infura.io/v3/d2ea31ea15274181a6181dc2e99cd4d6';
    
    publicClientInstance = createPublicClient({
      chain: bsc,
      transport: http(RPC_URL, {
        // Batch multiple requests into a single HTTP request
        batch: true,
        // Maximum number of requests to batch together
        batchSize: 10,
      })
    });
  }
  
  return publicClientInstance;
}

/**
 * Execute multiple read contract calls in a single batch
 * This reduces the number of HTTP requests to Infura
 */
export async function batchReadContracts<T>(
  contracts: Array<{
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args?: any[];
  }>
): Promise<T[]> {
  const client = getPublicClient();
  
  // Use multicall to batch all requests
  const results = await client.multicall({
    contracts: contracts.map(contract => ({
      address: contract.address,
      abi: contract.abi,
      functionName: contract.functionName,
      args: contract.args || []
    }))
  });
  
  // Extract results and handle errors
  return results.map((result, index) => {
    if (result.status === 'failure') {
      throw new Error(`Contract call ${index} failed: ${result.error?.message || 'Unknown error'}`);
    }
    return result.result as T;
  });
}

/**
 * Rate limiter for Infura calls
 */
class InfuraRateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastCallTime = 0;
  private readonly minDelay = 100; // 100ms minimum between calls

  async execute<T>(call: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await call();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const nextCall = this.queue.shift();
      if (!nextCall) {
        return;
      }

      // Ensure minimum delay between calls
      const timeSinceLastCall = Date.now() - this.lastCallTime;
      if (timeSinceLastCall < this.minDelay) {
        await new Promise(resolve => setTimeout(resolve, this.minDelay - timeSinceLastCall));
      }

      this.lastCallTime = Date.now();
      await nextCall();
    } finally {
      this.isProcessing = false;
      // Process next item in queue
      this.processQueue();
    }
  }
}

export const infuraRateLimiter = new InfuraRateLimiter();
