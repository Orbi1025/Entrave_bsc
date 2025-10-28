/**
 * Utility functions for extracting and transforming presale metadata
 * 
 * NOTE: When a market is created, the metadata is initially saved to Supabase
 * with market_id = transactionHash. However, the subgraph indexes the presale
 * with a different presaleId. The usePresaleSync hook should handle syncing
 * these IDs so that metadata can be properly linked to the subgraph data.
 * 
 * TODO: Implement usePresaleSync to:
 * 1. Listen for new presale events from the subgraph
 * 2. Match transaction hashes with presaleIds
 * 3. Update Supabase records with the correct presaleId
 */
import { Presale, PresaleMetadata, PresaleWithMetadata } from '@/types';

/**
 * Combine presale data from subgraph with metadata from Supabase
 * @param presale - Presale data from subgraph
 * @param metadata - Metadata from Supabase (optional)
 * @returns Combined presale with metadata
 */
export function combinePresaleWithMetadata(
  presale: Presale,
  metadata?: PresaleMetadata | null
): PresaleWithMetadata {
  return {
    ...presale,
    metadata: metadata || undefined,
  };
}

/**
 * Extract market creation data for Supabase storage
 * @param formData - Form data from CreateMarket component
 * @param marketId - Market ID from subgraph (presaleId)
 * @param creatorWallet - Creator's wallet address
 * @param createdByUser - User who created the market (from user_points)
 * @returns Data formatted for Supabase presale table
 */
export function extractPresaleMetadata(
  formData: {
    title: string;
    description: string;
    truthSource: string;
    invalidityConditions: string;
    category: string;
    marketIcon: string;
    rulesAndResolutions?: string;
  },
  marketId: string,
  creatorWallet: string,
  createdByUser?: string
): Omit<PresaleMetadata, 'id' | 'created_at' | 'updated_at'> {
  return {
    market_id: marketId,
    title: formData.title,
    description: formData.description,
    category: formData.category,
    market_icon: formData.marketIcon,
    resolution_rules: formData.rulesAndResolutions,
    truth_source: formData.truthSource,
    invalidity_conditions: formData.invalidityConditions,
    creator_wallet: creatorWallet,
    created_by_user: createdByUser,
  };
}

/**
 * Generate HTML resolution rules from form data
 * @param formData - Form data from CreateMarket component
 * @returns HTML string for resolution rules
 */
function generateResolutionRules(formData: {
  title: string;
  description: string;
  truthSource: string;
  invalidityConditions: string;
}, rulesAndResolutions?: string): string {
  return `
    <h3>Resolution Criteria</h3>
    <p>This market uses Reality.eth as a decentralized oracle.</p>
    <ul>
      <li>Question: ${formData.title}</li>
      <li>Description: ${formData.description}</li>
    </ul>
    
    ${rulesAndResolutions ? `
    <h3>Rules and Resolutions</h3>
    <p>${rulesAndResolutions}</p>
    ` : ''}
    
    <h3>Source of Truth</h3>
    <p>${formData.truthSource}</p>
    
    ${formData.invalidityConditions ? `
    <h3>Invalidity Conditions</h3>
    <p>This market will be invalidated if:</p>
    <ul>
      <li>${formData.invalidityConditions}</li>
    </ul>
    ` : ''}
    
    <h3>Resolution Process</h3>
    <p>This market will be resolved using Reality.eth oracle system.</p>
  `;
}

/**
 * Get market icon URL based on category
 * @param category - Market category
 * @param customIcon - Custom icon URL (if provided)
 * @returns Icon URL
 */
export function getMarketIcon(category: string, customIcon?: string): string {
  if (customIcon) {
    return customIcon;
  }

  // Default icons based on category
  const categoryIcons: Record<string, string> = {
    'crypto': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=200&fit=crop',
    'politics': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2a8?w=200&h=200&fit=crop',
    'sports': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    'technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    'economics': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop',
    'weather': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=200&h=200&fit=crop',
    'entertainment': 'https://images.unsplash.com/photo-1489599800079-2a2a0b8a0b8b?w=200&h=200&fit=crop',
  };

  return categoryIcons[category.toLowerCase()] || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop';
}

/**
 * Format market data for display with metadata
 * @param presale - Presale from subgraph
 * @param metadata - Metadata from Supabase
 * @returns Formatted market data for UI components
 */
export function formatMarketWithMetadata(
  presale: Presale,
  metadata?: PresaleMetadata | null
) {
  const combined = combinePresaleWithMetadata(presale, metadata);
  
  return {
    ...combined,
    // Use metadata if available, fallback to computed values
    title: metadata?.title || presale.question,
    description: metadata?.description || `This market will resolve to YES if ${presale.question}`,
    marketIcon: metadata?.market_icon || (metadata === null ? getMarketIcon(metadata?.category || 'general') : undefined),
    category: metadata?.category || 'general',
    resolutionRules: metadata?.resolution_rules || generateDefaultResolutionRules(presale),
    truthSource: metadata?.truth_source || 'Reality.eth',
    invalidityConditions: metadata?.invalidity_conditions || '',
  };
}

/**
 * Generate default resolution rules for presales without metadata
 * @param presale - Presale from subgraph
 * @returns Default HTML resolution rules
 */
function generateDefaultResolutionRules(presale: Presale): string {
  return `
    <h3>Resolution Criteria</h3>
    <p>This market uses Reality.eth as a decentralized oracle.</p>
    <ul>
      <li>Question: ${presale.question}</li>
      <li>Creator: ${presale.creator}</li>
      <li>State: ${presale.state}</li>
    </ul>
    
    <h3>Resolution Process</h3>
    <p>This market will be resolved using Reality.eth oracle system.</p>
  `;
}
