// Contract addresses and ABIs
// Use environment variables if available, fallback to hardcoded values
export const CONTRACT_ADDRESSES = {
  // BSC Mainnet (Production) - Updated from subgraph protocol data
  base: {
    USDC: import.meta.env.VITE_USDC_ADDRESS || '0x55d398326f99059fF775485246999027B3197955', // USDC from pmx
    PRESALE_MANAGER: import.meta.env.VITE_PRESALE_MANAGER_ADDRESS || '0xb712fA8e376DF2dC4A6e8D73db96661e13AE348A', // PresaleManager from pmx
    TOKEN_FACTORY: import.meta.env.VITE_TOKEN_FACTORY_ADDRESS || '0x2e49Fc88a38F94D00f7AF501D7f4fc1e219c3901', // TokenFactory from subgraph protocol
    REALITIO: import.meta.env.VITE_REALITIO_ADDRESS || '0x18d1fBf7dD5F907403E40CF8684a911415Adc2cf', // Realitio from subgraph protocol
    // PancakeSwap V4 addresses (from pmx contract)
    PCS_V4_POOL_MANAGER: import.meta.env.VITE_PCS_V4_POOL_MANAGER || '0xa0FfB9c1CE1Fe56963B0321B32E7A0302114058b',
    PCS_V4_POSITION_MANAGER: import.meta.env.VITE_PCS_V4_POSITION_MANAGER || '0x55f4c8abA71A1e923edC303eb4fEfF14608cC226',
    PCS_V4_VAULT: import.meta.env.VITE_PCS_V4_VAULT || '0x238a358808379702088667322f80aC48bAd5e6c4',
    PCS_V4_ROUTER: import.meta.env.VITE_PCS_V4_ROUTER || '0xd9c500dff816a1da21a48a732d3498bf09dc9aeb',
    // SwapperV4FromPosition - uses position NFT PoolKey for swaps
    SWAPPER_V4_FROM_POSITION: import.meta.env.VITE_SWAPPER_V4_FROM_POSITION || '0xF0609E8027BE4eF74C6FD2a93CDc3Ba578ff01e1', // TODO: Add deployed address
  }
}

// Get contract addresses based on network (like pmx-ui)
export function getContractAddresses(chainId?: number) {
  // Default to BSC Mainnet addresses (like pmx-ui)
  if (!chainId) return CONTRACT_ADDRESSES.base
  
  switch (chainId) {
    case 56: // BSC Mainnet
      return CONTRACT_ADDRESSES.base
    default:
      return CONTRACT_ADDRESSES.base
  }
}

// USDC ABI (ERC20 standard + TestUSDC faucet)
export const USDC_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// PresaleManager ABI (key functions)
export const PRESALE_MANAGER_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_address", "type": "address"}],
    "name": "canCreatePresale",
    "outputs": [
      {"internalType": "bool", "name": "canCreate", "type": "bool"},
      {"internalType": "string", "name": "reason", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "question", "type": "string"},
      {"internalType": "uint256", "name": "targetAmount", "type": "uint256"},
      {"internalType": "uint32", "name": "deadline", "type": "uint32"},
      {"internalType": "uint256", "name": "minBond", "type": "uint256"}
    ],
    "name": "createPresale",
    "outputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "contributeToPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "usdcAmount", "type": "uint256"}
    ],
    "name": "splitPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "redeemPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "yesOdds", "type": "uint256"},
      {"internalType": "uint256", "name": "noOdds", "type": "uint256"}
    ],
    "name": "graduatePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "cancelPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "answer", "type": "uint256"}
    ],
    "name": "forceResolvePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "resolvePresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "usdcAmount", "type": "uint256"}
    ],
    "name": "splitPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "getPresale",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "question", "type": "string"},
          {"internalType": "uint256", "name": "targetAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "raisedAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "bytes32", "name": "questionId", "type": "bytes32"},
          {"internalType": "address", "name": "yesToken", "type": "address"},
          {"internalType": "address", "name": "noToken", "type": "address"},
          {"internalType": "bool", "name": "tokensCreated", "type": "bool"},
          {"internalType": "bool", "name": "lpCreated", "type": "bool"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "uint256", "name": "minBond", "type": "uint256"},
          {"internalType": "uint256", "name": "reserveAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "lpWithdrawn", "type": "uint256"},
          {"internalType": "uint8", "name": "state", "type": "uint8"},
          {"internalType": "uint256", "name": "yesOdds", "type": "uint256"},
          {"internalType": "uint256", "name": "noOdds", "type": "uint256"}
        ],
        "internalType": "struct PresaleManager.Presale",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllPresales",
    "outputs": [{"internalType": "bytes32[]", "name": "", "type": "bytes32[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPendingPresales",
    "outputs": [{"internalType": "bytes32[]", "name": "", "type": "bytes32[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "getPresaleState",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "redeemPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "claimFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "claimPresalerShare",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "uint256", "name": "yesAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "noAmount", "type": "uint256"}
    ],
    "name": "redeemTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "contributorLPShares",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"},
      {"internalType": "address", "name": "contributor", "type": "address"}
    ],
    "name": "getClaimableFees",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "getFeesPerShare",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}],
    "name": "getPresaleOdds",
    "outputs": [
      {"internalType": "uint256", "name": "yesOdds", "type": "uint256"},
      {"internalType": "uint256", "name": "noOdds", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "presaleId", "type": "bytes32"}
    ],
    "name": "getPresale",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "question", "type": "string"},
          {"internalType": "uint256", "name": "targetAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "raisedAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "deadline", "type": "uint256"},
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "bytes32", "name": "questionId", "type": "bytes32"},
          {"internalType": "address", "name": "yesToken", "type": "address"},
          {"internalType": "address", "name": "noToken", "type": "address"},
          {"internalType": "bool", "name": "tokensCreated", "type": "bool"},
          {"internalType": "bool", "name": "lpCreated", "type": "bool"},
          {"internalType": "bool", "name": "resolved", "type": "bool"},
          {"internalType": "uint256", "name": "minBond", "type": "uint256"},
          {"internalType": "uint256", "name": "reserveAmount", "type": "uint256"},
          {"internalType": "uint256", "name": "lpWithdrawn", "type": "uint256"},
          {"internalType": "uint8", "name": "state", "type": "uint8"},
          {"internalType": "uint256", "name": "yesOdds", "type": "uint256"},
          {"internalType": "uint256", "name": "noOdds", "type": "uint256"}
        ],
        "internalType": "struct PresaleManager.Presale",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Note: Uniswap V2 ABIs removed - we now use PancakeSwap V4 exclusively

// ERC20 ABI (for YES/NO tokens)
export const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// SwapperV4FromPosition ABI (uses position NFT PoolKey for swaps)
export const SWAPPER_V4_FROM_POSITION_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "address", "name": "tokenIn", "type": "address"},
      {"internalType": "address", "name": "tokenOut", "type": "address"},
      {"internalType": "uint128", "name": "amountIn", "type": "uint128"},
      {"internalType": "uint128", "name": "amountOutMinimum", "type": "uint128"},
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "name": "swapFromPosition",
    "outputs": [{"internalType": "uint256", "name": "amountOut", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "positionId", "type": "uint256"}],
    "name": "getPoolKeyFromPosition",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "currency0", "type": "address"},
          {"internalType": "address", "name": "currency1", "type": "address"},
          {"internalType": "address", "name": "hooks", "type": "address"},
          {"internalType": "address", "name": "poolManager", "type": "address"},
          {"internalType": "uint24", "name": "fee", "type": "uint24"},
          {"internalType": "bytes32", "name": "parameters", "type": "bytes32"}
        ],
        "internalType": "struct PoolKey",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "token", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "recoverTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "address", "name": "currency", "type": "address"}
    ],
    "name": "getPoolPrice",
    "outputs": [
      {"internalType": "uint256", "name": "price", "type": "uint256"},
      {"internalType": "uint256", "name": "sqrtPriceX96", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"}
    ],
    "name": "getPoolPrices",
    "outputs": [
      {"internalType": "uint256", "name": "currency0Price", "type": "uint256"},
      {"internalType": "uint256", "name": "currency1Price", "type": "uint256"},
      {"internalType": "uint256", "name": "sqrtPriceX96", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "address", "name": "yesCurrency", "type": "address"},
      {"internalType": "address", "name": "noCurrency", "type": "address"}
    ],
    "name": "getMarketOdds",
    "outputs": [
      {"internalType": "uint256", "name": "yesPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "noPrice", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"internalType": "address", "name": "yesCurrency", "type": "address"},
      {"internalType": "address", "name": "noCurrency", "type": "address"}
    ],
    "name": "getMarketPricing",
    "outputs": [
      {"internalType": "uint256", "name": "yesPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "noPrice", "type": "uint256"},
      {"internalType": "uint256", "name": "priceRatio", "type": "uint256"},
      {"internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Helper to format USDT amounts (18 decimals)
export function formatUSDC(amount: string | number): bigint {
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount
  return BigInt(Math.floor(amountNum * 1e18))
}

// Helper to parse USDT amounts (18 decimals)
export function parseUSDC(amount: bigint): number {
  return Number(amount) / 1e18
}

// Helper to parse token amounts (18 decimals)
export function parseToken(amount: bigint, decimals: number = 18): number {
  return Number(amount) / Math.pow(10, decimals)
}

// Helper to format token amounts (18 decimals)
export function formatToken(amount: string | number): bigint {
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount
  return BigInt(Math.floor(amountNum * 1e18))
}

// Helper to format USDC for display (with proper decimal places)
export function formatUSDCForDisplay(amount: bigint | number): string {
  const numAmount = typeof amount === 'bigint' ? parseUSDC(amount) : amount
  return numAmount.toFixed(6).replace(/\.?0+$/, '') // Remove trailing zeros
}

// Helper to format USDC for input (with 2 decimal places for user input)
export function formatUSDCForInput(amount: number): string {
  return amount.toFixed(2)
}


// Export the contract address for easy access
export const SWAPPER_V4_FROM_POSITION_ADDRESS = CONTRACT_ADDRESSES.base.SWAPPER_V4_FROM_POSITION;

