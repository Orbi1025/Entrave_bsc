import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, Coins, ChevronRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UserRole = "trader" | "creator" | "lp" | null;

const roleInfo = {
  trader: {
    title: "How to Trade",
    icon: TrendingUp,
    steps: [
      {
        title: "Browse Markets",
        description: "Explore active prediction markets across various categories like crypto, sports, politics, and more."
      },
      {
        title: "Make Your Prediction",
        description: "Buy 'Yes' or 'No' shares based on your prediction. Prices reflect the market's probability of the outcome."
      },
      {
        title: "Trade & Profit",
        description: "Sell your shares anytime before resolution. Profit when your prediction is correct - shares resolve to $1."
      }
    ]
  },
  creator: {
    title: "How to Create Markets",
    icon: Plus,
    steps: [
      {
        title: "Define Your Market",
        description: "Create a prediction market with a clear question and resolution criteria. Set market parameters and fees."
      },
      {
        title: "Launch on Launchpad",
        description: "Your market enters the launchpad where community members can provide initial liquidity to bootstrap it."
      },
      {
        title: "Earn from Trading",
        description: "Once funded and live, earn a percentage of all trading fees as the market creator for the lifetime of the market."
      }
    ]
  },
  lp: {
    title: "How to Provide Liquidity",
    icon: Coins,
    steps: [
      {
        title: "Fund Launchpad Markets",
        description: "Browse launchpad markets and provide initial liquidity to help new markets go live."
      },
      {
        title: "Earn Boosted Rewards",
        description: "Get 1.5x protocol points for early liquidity provision plus priority access to market fees."
      },
      {
        title: "Share Trading Fees",
        description: "Earn a portion of all trading volume on the markets you helped launch. Your liquidity earns ongoing passive income."
      }
    ]
  }
};

const HowItWorksDialog = ({ open, onOpenChange }: HowItWorksDialogProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentSlide(0);
  };

  const handleBack = () => {
    if (currentSlide === 0 || (selectedRole && currentSlide === roleInfo[selectedRole].steps.length - 1)) {
      setSelectedRole(null);
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (selectedRole && currentSlide < roleInfo[selectedRole].steps.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onOpenChange(false);
      setSelectedRole(null);
      setCurrentSlide(0);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedRole(null);
    setCurrentSlide(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">How It Works</DialogTitle>
        </DialogHeader>

        {!selectedRole ? (
          // Role Selection Screen
          <div className="py-6 space-y-4">
            <p className="text-center text-muted-foreground mb-6">
              Choose your path to get started
            </p>
            
            <Card 
              className="p-4 cursor-pointer hover:border-primary transition-all"
              onClick={() => handleRoleSelect("trader")}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Trade Markets</h3>
                  <p className="text-sm text-muted-foreground">Buy and sell shares on outcomes</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:border-primary transition-all"
              onClick={() => handleRoleSelect("creator")}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Create Markets</h3>
                  <p className="text-sm text-muted-foreground">Launch your own prediction markets</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:border-primary transition-all"
              onClick={() => handleRoleSelect("lp")}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Provide Liquidity</h3>
                  <p className="text-sm text-muted-foreground">Fund markets and earn rewards</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          </div>
        ) : (
          // Role-Specific Steps
          <div className="py-8 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                {(() => {
                  const Icon = roleInfo[selectedRole].icon;
                  return <Icon className="w-10 h-10 text-primary" />;
                })()}
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-foreground">
                {roleInfo[selectedRole].steps[currentSlide].title}
              </h3>
              <p className="text-muted-foreground">
                {roleInfo[selectedRole].steps[currentSlide].description}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {roleInfo[selectedRole].steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-primary w-6" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={handleBack} 
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1" size="lg">
                {currentSlide < roleInfo[selectedRole].steps.length - 1 ? (
                  <>
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;
