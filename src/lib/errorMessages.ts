// Centralized error messages for the application
export const ERROR_MESSAGES = {
  // Network & Connection Errors
  NETWORK: {
    WRONG_NETWORK: 'Please switch to BSC Mainnet (Chain ID: 8453) to use this application.',
    CONNECTION_FAILED: 'Failed to connect to the network. Please check your internet connection.',
    TRANSACTION_FAILED: 'Transaction failed. Please try again.',
    TRANSACTION_REJECTED: 'Transaction was rejected by user.',
    INSUFFICIENT_BALANCE: 'Insufficient balance to complete this transaction.',
  },

  // Wallet Errors
  WALLET: {
    NOT_CONNECTED: 'Please connect your wallet first.',
    CONNECTION_ERROR: 'Failed to connect wallet. Please try again.',
    DISCONNECTION_ERROR: 'Failed to disconnect wallet.',
    SWITCH_NETWORK_ERROR: 'Failed to switch network. Please switch manually to BSC Mainnet.',
    NO_INJECTED_CONNECTOR: 'No wallet detected. Please install MetaMask or another compatible wallet.',
    WALLET_NOT_FOUND: 'Wallet not found. Please install a compatible wallet.',
    USER_REJECTED: 'Connection was rejected by user.',
    CHAIN_NOT_SUPPORTED: 'This wallet does not support BSC Mainnet.',
    ACCOUNT_CHANGED: 'Wallet account changed. Please reconnect.',
  },

  // Contract Errors
  CONTRACT: {
    CALL_FAILED: 'Contract call failed. Please try again.',
    APPROVAL_FAILED: 'Token approval failed. Please try again.',
    TRANSACTION_TIMEOUT: 'Transaction is taking longer than expected. Please check your wallet.',
    INVALID_ADDRESS: 'Invalid contract address.',
  },

  // Presale Errors
  PRESALE: {
    CREATION_FAILED: 'Failed to create presale. Please try again.',
    CONTRIBUTION_FAILED: 'Failed to contribute to presale. Please try again.',
    APPROVAL_REQUIRED: 'Token approval required before contributing.',
    INSUFFICIENT_USDT: 'Insufficient USDT balance for contribution.',
    MINIMUM_CONTRIBUTION: 'Minimum contribution amount is $1.',
    PRESALE_NOT_FOUND: 'Presale not found.',
    PRESALE_CLOSED: 'This presale is no longer accepting contributions.',
    PRESALE_GRADUATED: 'This presale has already graduated.',
    PRESALE_CANCELLED: 'This presale has been cancelled.',
    GRADUATION_FAILED: 'Failed to graduate presale.',
    CANCELLATION_FAILED: 'Failed to cancel presale.',
    RESOLUTION_FAILED: 'Failed to resolve presale.',
    REDEEM_FAILED: 'Failed to redeem presale rewards.',
    CLAIM_FEES_FAILED: 'Failed to claim creator fees.',
  },

  // Trading Errors
  TRADING: {
    INSUFFICIENT_USDT: 'Insufficient USDT balance for this trade.',
    INSUFFICIENT_TOKENS: 'Insufficient token balance for this trade.',
    INVALID_AMOUNT: 'Please enter a valid amount.',
    NO_LIQUIDITY: 'No liquidity available for this trade.',
    TRADE_FAILED: 'Trade transaction failed. Please try again.',
    ESTIMATE_FAILED: 'Failed to get trade estimate. Please try again.',
    TOKENS_NOT_CREATED: 'Market tokens have not been created yet.',
    INVALID_OUTCOME: 'Invalid trading outcome selected.',
  },

  // Swap Errors
  SWAP: {
    SWAP_FAILED: 'Swap transaction failed. Please try again.',
    ESTIMATE_FAILED: 'Failed to get swap estimate. Please try again.',
    NO_POOL_EXISTS: 'No liquidity pool exists for this token pair.',
    INSUFFICIENT_LIQUIDITY: 'Insufficient liquidity in the pool for this swap.',
    SLIPPAGE_TOO_HIGH: 'Price impact too high. Try reducing the amount.',
    DEADLINE_EXCEEDED: 'Transaction deadline exceeded. Please try again.',
    INVALID_PATH: 'Invalid swap path. Token pair not supported.',
    APPROVAL_REQUIRED: 'Token approval required before swapping.',
    APPROVAL_FAILED: 'Token approval failed. Please try again.',
    SWAP_AMOUNT_TOO_LOW: 'Swap amount is too low. Please increase the amount.',
    SWAP_AMOUNT_TOO_HIGH: 'Swap amount exceeds available liquidity.',
  },

  // PancakeSwap Infinity Errors
  PANCAKESWAP_V4: {
    SWAP_FAILED: 'PancakeSwap Infinity swap transaction failed. Please try again.',
    ESTIMATE_FAILED: 'Failed to get PancakeSwap Infinity swap estimate. Please try again.',
    NO_POOL_EXISTS: 'No PancakeSwap Infinity pool exists for this token pair.',
    INSUFFICIENT_LIQUIDITY: 'Insufficient liquidity in PancakeSwap Infinity pool for this swap.',
    SLIPPAGE_TOO_HIGH: 'Price impact too high in PancakeSwap Infinity. Try reducing the amount.',
    DEADLINE_EXCEEDED: 'PancakeSwap Infinity transaction deadline exceeded. Please try again.',
    INVALID_PATH: 'Invalid PancakeSwap Infinity swap path. Token pair not supported.',
    APPROVAL_REQUIRED: 'Token approval required before PancakeSwap Infinity swapping.',
    APPROVAL_FAILED: 'Token approval failed for PancakeSwap Infinity. Please try again.',
    SWAP_AMOUNT_TOO_LOW: 'PancakeSwap Infinity swap amount is too low. Please increase the amount.',
    SWAP_AMOUNT_TOO_HIGH: 'PancakeSwap Infinity swap amount exceeds available liquidity.',
    HOOK_ERROR: 'PancakeSwap Infinity hook execution failed. Please try again.',
    VAULT_ERROR: 'PancakeSwap Infinity vault operation failed. Please try again.',
    POOL_MANAGER_ERROR: 'PancakeSwap Infinity pool manager error. Please try again.',
    FLASH_ACCOUNTING_ERROR: 'PancakeSwap Infinity flash accounting failed. Please try again.',
    SINGLETON_ERROR: 'PancakeSwap Infinity singleton contract error. Please try again.',
  },

  // Faucet Errors
  FAUCET: {
    MINT_FAILED: 'Failed to mint test USDT. Please try again.',
    ALREADY_MINTED: 'You have already claimed from the faucet recently.',
    FAUCET_EMPTY: 'Faucet is temporarily empty. Please try again later.',
  },

  // User & Authentication Errors
  AUTH: {
    LOGIN_FAILED: 'Failed to log in. Please try again.',
    LOGOUT_FAILED: 'Failed to log out.',
    EMAIL_REQUIRED: 'Email address is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    WAITLIST_ERROR: 'Failed to join waitlist. Please try again.',
    EMAIL_SYNC_FAILED: 'Failed to sync email with account.',
  },

  // Database & API Errors
  API: {
    FETCH_FAILED: 'Failed to fetch data. Please try again.',
    UPDATE_FAILED: 'Failed to update data. Please try again.',
    SUBGRAPH_ERROR: 'Failed to connect to the blockchain data service.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT: 'Request timed out. Please try again.',
  },

  // Points & Rewards Errors
  POINTS: {
    TRACKING_FAILED: 'Failed to track points. Please try again.',
    CLAIM_FAILED: 'Failed to claim rewards. Please try again.',
    REFERRAL_FAILED: 'Failed to process referral. Please try again.',
    LEADERBOARD_ERROR: 'Failed to load leaderboard. Please try again.',
  },

  // General Errors
  GENERAL: {
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    INVALID_INPUT: 'Please check your input and try again.',
    PERMISSION_DENIED: 'You do not have permission to perform this action.',
    FEATURE_UNAVAILABLE: 'This feature is temporarily unavailable.',
    MAINTENANCE: 'The application is under maintenance. Please try again later.',
  },
} as const;

// Error message formatter
export function formatErrorMessage(error: unknown, fallback?: string): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    // Handle specific error messages
    const message = error.message.toLowerCase();
    
    // Network errors
    if (message.includes('user rejected') || message.includes('user denied')) {
      return ERROR_MESSAGES.NETWORK.TRANSACTION_REJECTED;
    }
    
    // Wallet specific errors
    if (message.includes('wallet') && message.includes('not found')) {
      return ERROR_MESSAGES.WALLET.WALLET_NOT_FOUND;
    }
    
    if (message.includes('user rejected') || message.includes('user denied')) {
      return ERROR_MESSAGES.WALLET.USER_REJECTED;
    }
    
    if (message.includes('chain not supported') || message.includes('unsupported chain')) {
      return ERROR_MESSAGES.WALLET.CHAIN_NOT_SUPPORTED;
    }
    
    if (message.includes('account changed')) {
      return ERROR_MESSAGES.WALLET.ACCOUNT_CHANGED;
    }
    
    if (message.includes('insufficient funds') || message.includes('insufficient balance')) {
      return ERROR_MESSAGES.NETWORK.INSUFFICIENT_BALANCE;
    }
    
    if (message.includes('network') || message.includes('connection')) {
      return ERROR_MESSAGES.NETWORK.CONNECTION_FAILED;
    }
    
    if (message.includes('transaction failed') || message.includes('execution reverted')) {
      return ERROR_MESSAGES.CONTRACT.CALL_FAILED;
    }
    
    if (message.includes('approval')) {
      return ERROR_MESSAGES.CONTRACT.APPROVAL_FAILED;
    }
    
    // PancakeSwap Infinity specific errors
    if (message.includes('pancakeswap') || message.includes('pancake')) {
      if (message.includes('hook')) {
        return ERROR_MESSAGES.PANCAKESWAP_V4.HOOK_ERROR;
      }
      if (message.includes('vault')) {
        return ERROR_MESSAGES.PANCAKESWAP_V4.VAULT_ERROR;
      }
      if (message.includes('pool manager')) {
        return ERROR_MESSAGES.PANCAKESWAP_V4.POOL_MANAGER_ERROR;
      }
      if (message.includes('flash accounting')) {
        return ERROR_MESSAGES.PANCAKESWAP_V4.FLASH_ACCOUNTING_ERROR;
      }
      if (message.includes('singleton')) {
        return ERROR_MESSAGES.PANCAKESWAP_V4.SINGLETON_ERROR;
      }
      return ERROR_MESSAGES.PANCAKESWAP_V4.SWAP_FAILED;
    }
    
    // Swap specific errors
    if (message.includes('swap') || message.includes('exchange')) {
      return ERROR_MESSAGES.SWAP.SWAP_FAILED;
    }
    
    if (message.includes('liquidity') && message.includes('pool')) {
      return ERROR_MESSAGES.SWAP.NO_POOL_EXISTS;
    }
    
    if (message.includes('slippage') || message.includes('price impact')) {
      return ERROR_MESSAGES.SWAP.SLIPPAGE_TOO_HIGH;
    }
    
    if (message.includes('deadline')) {
      return ERROR_MESSAGES.SWAP.DEADLINE_EXCEEDED;
    }
    
    if (message.includes('path') && message.includes('invalid')) {
      return ERROR_MESSAGES.SWAP.INVALID_PATH;
    }
    
    // Return the original message if it's user-friendly
    if (error.message.length < 100 && !error.message.includes('0x')) {
      return error.message;
    }
  }
  
  return fallback || ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR;
}

// Error logging utility
export function logError(context: string, error: unknown, additionalInfo?: Record<string, any>) {
  console.error(`[${context}]`, error);
  
  if (additionalInfo) {
    console.error('Additional info:', additionalInfo);
  }
  
  // In production, you might want to send errors to a logging service
  // Example: sendToLoggingService(context, error, additionalInfo);
}
