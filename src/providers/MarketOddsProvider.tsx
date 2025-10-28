import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRealTimeOdds } from '@/hooks/useRealTimeOdds';

interface MarketOdds {
  marketId: string;
  yesPrice: number;
  noPrice: number;
  lastUpdated: number;
  isLoading: boolean;
  hasLiveData: boolean;
  error: string | null;
}

interface MarketOddsContextType {
  marketOdds: Record<string, MarketOdds>;
  updateMarketOdds: (marketId: string, odds: MarketOdds) => void;
}

const MarketOddsContext = createContext<MarketOddsContextType | undefined>(undefined);

export function useMarketOdds() {
  const context = useContext(MarketOddsContext);
  if (!context) {
    throw new Error('useMarketOdds must be used within MarketOddsProvider');
  }
  return context;
}

interface MarketOddsProviderProps {
  children: React.ReactNode;
  marketIds: string[]; // IDs des marchés à suivre en temps réel
}

export function MarketOddsProvider({ children, marketIds }: MarketOddsProviderProps) {
  const [marketOdds, setMarketOdds] = useState<Record<string, MarketOdds>>({});
  const [currentBatch, setCurrentBatch] = useState(0);

  // Traiter les marchés par lots de 6 (pour afficher les 6 premiers)
  const BATCH_SIZE = 6;
  const totalBatches = Math.ceil(marketIds.length / BATCH_SIZE);
  
  // Calculer le lot actuel de marchés à suivre
  const startIndex = currentBatch * BATCH_SIZE;
  const endIndex = startIndex + BATCH_SIZE;
  const activeMarketIds = marketIds.slice(startIndex, endIndex);

  // Initialiser tous les odds avec des valeurs par défaut
  useEffect(() => {
    const initialOdds: Record<string, MarketOdds> = {};
    marketIds.forEach(id => {
      initialOdds[id] = {
        marketId: id,
        yesPrice: 50,
        noPrice: 50,
        lastUpdated: Date.now(),
        isLoading: true,
        hasLiveData: false,
        error: null,
      };
    });
    setMarketOdds(initialOdds);
  }, [marketIds.join(',')]);

  // Changer de lot toutes les 10 secondes
  useEffect(() => {
    if (marketIds.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBatch(prev => (prev + 1) % totalBatches);
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, [marketIds.length, totalBatches]);

  const updateMarketOdds = (marketId: string, odds: MarketOdds) => {
    setMarketOdds(prev => ({
      ...prev,
      [marketId]: odds,
    }));
  };

  return (
    <MarketOddsContext.Provider value={{ marketOdds, updateMarketOdds }}>
      {children}
      {/* Composants pour récupérer les odds pour chaque marché */}
      {activeMarketIds.map(marketId => (
        <MarketOddsFetcher key={marketId} marketId={marketId} onUpdate={updateMarketOdds} />
      ))}
    </MarketOddsContext.Provider>
  );
}

// Composant interne pour récupérer les odds d'un marché
function MarketOddsFetcher({ 
  marketId, 
  onUpdate 
}: { 
  marketId: string; 
  onUpdate: (marketId: string, odds: MarketOdds) => void;
}) {
  const { yesPrice, noPrice, isLoading, lastUpdated, error } = useRealTimeOdds(marketId);

  useEffect(() => {
    if (!isLoading && yesPrice !== undefined && noPrice !== undefined) {
      onUpdate(marketId, {
        marketId,
        yesPrice,
        noPrice,
        lastUpdated,
        isLoading: false,
        hasLiveData: true,
        error: error || null,
      });
    }
  }, [marketId, yesPrice, noPrice, isLoading, lastUpdated, error, onUpdate]);

  return null;
}
