import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Wallet, User, HelpCircle, Search, Copy, LogOut, UserPlus, Trophy, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HowItWorksDialog from "./HowItWorksDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { useUserPoints } from "@/hooks/useUserPoints";
import logo from "@/assets/logo-entrave.svg";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ searchQuery = "", onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const { 
    address, 
    formattedAddress, 
    isConnected, 
    isConnecting,
    usdcBalance,
    connect,
    disconnect 
  } = useWallet();
  
  const { points: userPoints, isLoading: pointsLoading } = useUserPoints(address);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    }
  };

  const handleCopyReferral = () => {
    if (userPoints?.referral_code) {
      const referralLink = `https://entrave.com?ref=${userPoints.referral_code}`;
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success("Wallet disconnected");
  };

  const handleConnect = () => {
    connect();
  };

  return (
    <>
      <header className="fixed-header border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0 cursor-pointer group" onClick={() => navigate("/")}>
              <img 
                src={logo} 
                alt="Entrave" 
                className="h-6 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Search Bar - Polymarket style */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="pl-10 bg-muted/50 border-muted hover:bg-muted/70 focus:bg-muted transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button 
                size="sm" 
                variant="ghost" 
                className="gap-2" 
                onClick={() => setShowHowItWorks(true)}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden lg:inline">How It Works</span>
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="gap-2"
                onClick={() => navigate("/docs")}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden lg:inline">Docs</span>
              </Button>
              <Button size="sm" variant="outline" className="hidden md:flex" onClick={() => navigate("/create-market")}>
                Create Market
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => navigate("/portfolio")}
              >
                <User className="w-4 h-4" />
                <span className="hidden lg:inline ml-2">Profile</span>
              </Button>
              
              {!isConnected ? (
                <Button size="sm" onClick={handleConnect} disabled={isConnecting}>
                  <Wallet className="w-4 h-4" />
                  <span className="hidden lg:inline ml-2">
                    {isConnecting ? "Connecting..." : "Connect"}
                  </span>
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Wallet className="w-4 h-4" />
                      <span className="hidden lg:inline ml-2">{formattedAddress}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 bg-card border-border z-50">
                  {/* Header with balance */}
                  <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">USDT Balance</span>
                      <span className="text-lg font-bold text-foreground">
                        ${parseFloat(usdcBalance).toFixed(2)} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Address</span>
                      <button 
                        onClick={handleCopyAddress}
                        className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                      >
                        <span className="font-mono">{formattedAddress}</span>
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="p-4 grid grid-cols-2 gap-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Points</p>
                        <p className="text-sm font-bold text-foreground">
                          {pointsLoading ? "..." : (userPoints?.total_points || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rank</p>
                      <p className="text-sm font-bold text-foreground">
                        {pointsLoading ? "..." : `#${userPoints?.rank || 0}`}
                      </p>
                    </div>
                  </div>

                  {/* Invite Friends - Prominent */}
                  <div className="p-3 m-3 rounded-lg bg-primary/10 border border-primary/20">
                    <button 
                      onClick={handleCopyReferral}
                      className="w-full"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Invite Friends</span>
                        </div>
                        <Copy className="w-3 h-3 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-left">Earn 500 pts + 5% of their points</p>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <DropdownMenuItem 
                      onClick={handleDisconnect}
                      className="cursor-pointer text-destructive focus:text-destructive hover:text-white hover:bg-destructive focus:text-white focus:bg-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <HowItWorksDialog open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </>
  );
};

export default Header;
