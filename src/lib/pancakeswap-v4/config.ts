// PancakeSwap V4 Configuration
export const PCS_V4_CONFIG = {
  // RPC rate limit settings
  RPC_DELAY_MS: 10000, // Increased delay between RPC calls (10 seconds)
  CACHE_DURATION_MS: 900000, // Increased cache duration (15 minutes)
  
  // Pool settings
  DEFAULT_FEE: 3000, // 0.3%
  DEFAULT_TICK_SPACING: 60,
  DEFAULT_HOOKS: "0x0000000000000000000000000000000000000000",
}

// Helper function to get RPC delay
export const getRpcDelay = (): number => {
  return PCS_V4_CONFIG.RPC_DELAY_MS
}

// Helper function to get cache duration
export const getCacheDuration = (): number => {
  return PCS_V4_CONFIG.CACHE_DURATION_MS
}
