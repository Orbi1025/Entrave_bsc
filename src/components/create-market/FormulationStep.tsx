import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, Filter, Plus, X } from "lucide-react";

interface FormulationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const categories = ["crypto", "sports", "politics", "finance", "culture", "global", "tech", "business", "social", "legal", "innovation", "entertainment", "china", "geopolitics"];

// Catégories étendues avec des sous-catégories et des mots-clés
const extendedCategories = {
  crypto: {
    keywords: ["bitcoin", "ethereum", "blockchain", "defi", "nft", "web3", "cryptocurrency", "token", "coin"],
    subcategories: ["DeFi", "NFT", "Web3", "Layer 2", "Staking", "Mining"]
  },
  sports: {
    keywords: ["football", "basketball", "soccer", "tennis", "olympics", "world cup", "championship", "tournament"],
    subcategories: ["Football", "Basketball", "Tennis", "Olympics", "World Cup", "Championship"]
  },
  politics: {
    keywords: ["election", "president", "government", "policy", "vote", "campaign", "parliament", "congress"],
    subcategories: ["Elections", "Policy", "International Relations", "Local Politics", "Referendums"]
  },
  finance: {
    keywords: ["stock", "market", "economy", "inflation", "interest", "rate", "banking", "investment"],
    subcategories: ["Stock Market", "Macroeconomics", "Banking", "Investment", "Insurance"]
  },
  culture: {
    keywords: ["art", "music", "movie", "book", "festival", "award", "celebration", "tradition"],
    subcategories: ["Art", "Music", "Movies", "Literature", "Festivals", "Awards"]
  },
  global: {
    keywords: ["climate", "environment", "pandemic", "war", "peace", "disaster", "crisis", "international"],
    subcategories: ["Climate Change", "International Relations", "Crisis", "Peace", "Disasters"]
  },
  tech: {
    keywords: ["ai", "artificial intelligence", "software", "hardware", "startup", "innovation", "gadget", "app"],
    subcategories: ["AI", "Software", "Hardware", "Startups", "Mobile", "Cloud"]
  },
  business: {
    keywords: ["company", "merger", "acquisition", "ipo", "startup", "venture", "corporate", "enterprise"],
    subcategories: ["M&A", "IPO", "Startups", "Corporate", "Venture Capital", "Enterprise"]
  },
  social: {
    keywords: ["social media", "trend", "viral", "influence", "community", "network", "platform"],
    subcategories: ["Social Media", "Trends", "Community", "Influencers", "Networks"]
  },
  legal: {
    keywords: ["law", "court", "legal", "regulation", "compliance", "lawsuit", "judgment", "ruling"],
    subcategories: ["Court Cases", "Regulations", "Compliance", "Legal Precedents", "Legislation"]
  },
  innovation: {
    keywords: ["research", "development", "patent", "breakthrough", "discovery", "invention", "technology"],
    subcategories: ["Research", "Patents", "Breakthroughs", "Inventions", "R&D"]
  },
  entertainment: {
    keywords: ["celebrity", "show", "series", "game", "streaming", "platform", "content", "media"],
    subcategories: ["TV Shows", "Movies", "Gaming", "Streaming", "Celebrities", "Content"]
  },
  china: {
    keywords: ["china", "chinese", "beijing", "shanghai", "ccp", "communist party", "xi jinping", "taiwan", "hong kong", "macau"],
    subcategories: ["Politics", "Economy", "Technology", "Military", "Taiwan", "Hong Kong"]
  },
  geopolitics: {
    keywords: ["geopolitics", "international relations", "diplomacy", "war", "peace", "alliance", "sanctions", "trade war", "conflict"],
    subcategories: ["International Relations", "Diplomacy", "Conflicts", "Alliances", "Trade Wars", "Sanctions"]
  }
};

const FormulationStep = ({ formData, updateFormData }: FormulationStepProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleImageSelect = (url: string) => {
    updateFormData({ marketIcon: url });
  };

  // Fonction pour détecter si une catégorie correspond
  const getCategoryMatch = (title: string, description: string) => {
    const text = `${title} ${description}`.toLowerCase();
    const matches: { category: string; score: number; subcategories: string[] }[] = [];

    Object.entries(extendedCategories).forEach(([category, data]) => {
      let score = 0;
      const matchedSubcategories: string[] = [];

      // Vérifier les mots-clés
      data.keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });

      // Vérifier les sous-catégories
      data.subcategories.forEach(subcategory => {
        if (text.includes(subcategory.toLowerCase())) {
          score += 2;
          matchedSubcategories.push(subcategory);
        }
      });

      if (score > 0) {
        matches.push({ category, score, subcategories: matchedSubcategories });
      }
    });

    return matches.sort((a, b) => b.score - a.score);
  };

  // Obtenir les catégories suggérées basées sur le contenu
  const suggestedCategories = getCategoryMatch(formData.title, formData.description);

  // Fonction pour ajouter une catégorie personnalisée
  const addCustomCategory = () => {
    if (customCategory.trim() && !categories.includes(customCategory.toLowerCase())) {
      updateFormData({ category: customCategory.toLowerCase() });
      setCustomCategory("");
      setShowFilters(false);
    }
  };

  // Fonction pour appliquer les filtres
  const applyFilters = (category: string) => {
    updateFormData({ category });
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Market Question *</Label>
        <Input
          id="title"
          placeholder="e.g., Will Bitcoin reach $100K before 2026?"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          Make it clear, specific, and answerable with YES/NO
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Resolution Statement *</Label>
        <Textarea
          id="description"
          placeholder="Describe exactly what conditions will cause this market to resolve YES vs NO. Be as specific as possible to avoid ambiguity."
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={5}
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          This is the most important part - be extremely clear about resolution criteria
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <div className="space-y-3">
        <Select
          value={formData.category}
          onValueChange={(value) => updateFormData({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
      </div>

      {/* Market Image */}
      <div className="space-y-2">
        <Label>Market Image *</Label>
        <ImageUpload
          onImageSelect={handleImageSelect}
          currentImage={formData.marketIcon}
        />
        <p className="text-xs text-muted-foreground">
          Upload a visual representation for your market (PNG, JPG, GIF, WebP - max 5MB)
        </p>
      </div>

      {/* Rules and Resolutions */}
      <div className="space-y-2">
        <Label htmlFor="rulesAndResolutions">Rules and Resolutions *</Label>
        <Textarea
          id="rulesAndResolutions"
          placeholder="Describe the exact rules for resolving this market, including specific conditions, timelines, and data sources."
          value={formData.rulesAndResolutions}
          onChange={(e) => updateFormData({ rulesAndResolutions: e.target.value })}
          rows={5}
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          Be extremely specific about how this market will be resolved
        </p>
      </div>

      {/* Truth Source */}
      <div className="space-y-2">
        <Label htmlFor="truthSource">Source of Truth *</Label>
        <Input
          id="truthSource"
          placeholder="e.g., CoinGecko API, Coinbase Pro, Binance"
          value={formData.truthSource}
          onChange={(e) => updateFormData({ truthSource: e.target.value })}
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          Where will the resolution data come from? Be specific.
        </p>
      </div>

      {/* Invalidity Conditions */}
      <div className="space-y-2">
        <Label htmlFor="invalidityConditions">Invalidity Conditions (Optional)</Label>
        <Textarea
          id="invalidityConditions"
          placeholder="Under what circumstances should this market be invalidated? (e.g., data sources unavailable, critical exploit)"
          value={formData.invalidityConditions}
          onChange={(e) => updateFormData({ invalidityConditions: e.target.value })}
          rows={3}
          className="text-base"
        />
        <p className="text-xs text-muted-foreground">
          Define edge cases where the market should resolve as invalid
        </p>
      </div>
    </div>
  );
};

export default FormulationStep;
