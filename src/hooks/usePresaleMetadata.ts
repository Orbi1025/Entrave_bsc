import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PresaleMetadata } from '@/types';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface UsePresaleMetadataReturn {
  metadata: PresaleMetadata | null;
  isLoading: boolean;
  error: string | null;
  createMetadata: (data: Omit<PresaleMetadata, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateMetadata: (marketId: string, data: Partial<PresaleMetadata>) => Promise<void>;
  deleteMetadata: (marketId: string) => Promise<void>;
}

/**
 * Hook pour gérer les métadonnées des presales dans Supabase
 * @param marketId - L'ID du marché (presaleId du subgraph)
 */
export function usePresaleMetadata(marketId?: string): UsePresaleMetadataReturn {
  const [metadata, setMetadata] = useState<PresaleMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch metadata for a specific market
  useEffect(() => {
    if (!marketId) {
      setMetadata(null);
      return;
    }

    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('presale')
          .select('*')
          .eq('market_id', marketId)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // No rows found - this is normal for new markets
            setMetadata(null);
          } else {
            throw fetchError;
          }
        } else {
          setMetadata(data);
        }
      } catch (err) {
        console.error('Error fetching presale metadata:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [marketId]);

  // Create new metadata
  const createMetadata = async (data: Omit<PresaleMetadata, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: newMetadata, error: createError } = await supabase
        .from('presale')
        .insert([data])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      setMetadata(newMetadata);
    } catch (err) {
      console.error('Error creating presale metadata:', err);
      setError(err instanceof Error ? err.message : 'Failed to create metadata');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update existing metadata
  const updateMetadata = async (marketId: string, data: Partial<PresaleMetadata>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: updatedMetadata, error: updateError } = await supabase
        .from('presale')
        .update(data)
        .eq('market_id', marketId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setMetadata(updatedMetadata);
    } catch (err) {
      console.error('Error updating presale metadata:', err);
      setError(err instanceof Error ? err.message : 'Failed to update metadata');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete metadata
  const deleteMetadata = async (marketId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('presale')
        .delete()
        .eq('market_id', marketId);

      if (deleteError) {
        throw deleteError;
      }

      setMetadata(null);
    } catch (err) {
      console.error('Error deleting presale metadata:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete metadata');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metadata,
    isLoading,
    error,
    createMetadata,
    updateMetadata,
    deleteMetadata,
  };
}

/**
 * Hook pour récupérer toutes les métadonnées des presales
 */
export function useAllPresaleMetadata() {
  const [metadata, setMetadata] = useState<PresaleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMetadata = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('presale')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setMetadata(data || []);
      } catch (err) {
        console.error('Error fetching all presale metadata:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMetadata();
  }, []);

  return {
    metadata,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      // Re-run the effect
      const fetchAllMetadata = async () => {
        try {
          const { data, error: fetchError } = await supabase
            .from('presale')
            .select('*')
            .order('created_at', { ascending: false });

          if (fetchError) {
            throw fetchError;
          }

          setMetadata(data || []);
        } catch (err) {
          console.error('Error fetching all presale metadata:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
        } finally {
          setIsLoading(false);
        }
      };

      fetchAllMetadata();
    },
  };
}
