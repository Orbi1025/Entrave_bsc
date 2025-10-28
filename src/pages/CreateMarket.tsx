import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2, Wallet, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { usePresaleManager } from "@/hooks/usePresaleManager";
import { usePresales } from "@/hooks/usePresales";
import FormulationStep from "@/components/create-market/FormulationStep";
import ParametersStep from "@/components/create-market/ParametersStep";
import FeesStep from "@/components/create-market/FeesStep";
import ReviewStep from "@/components/create-market/ReviewStep";
import { toast as sonnerToast } from "sonner";
import { usePointsTracking } from "@/hooks/usePointsTracking";
import { usePresaleMetadata } from "@/hooks/usePresaleMetadata";
import { extractPresaleMetadata } from "@/lib/presaleMetadataHelpers";

const steps = [
  { id: 1, title: "Formulation", description: "Define your market question" },
  { id: 2, title: "Parameters", description: "Set market parameters" },
  { id: 3, title: "Revenue Projection", description: "Estimate your earnings" },
  { id: 4, title: "Review & Launch", description: "Review and deploy" }
];

const CreateMarket = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const hasHandledSuccess = useRef(false);
  
  const { isConnected, connect, address } = useWallet();
  const { createPresale, transactionStatus, isPending, isConfirming, isConfirmed, hash } = usePresaleManager();
  const { refetch: refetchPresales } = usePresales();
  const { trackMarketCreationPoints } = usePointsTracking();
  const { createMetadata } = usePresaleMetadata();
  
  const [formData, setFormData] = useState({
    // Step 1: Formulation
    title: "",
    description: "",
    truthSource: "",
    invalidityConditions: "",
    category: "",
    marketIcon: "",
    rulesAndResolutions: "", // Added for Rules and Resolutions
    // Step 2: Parameters
    deadline: "",
    time: "23:59",
    timezone: "UTC",
    targetLiquidity: "10000",
    launchpadDuration: "7", // Default 7 days
    // Step 3: Revenue
    projectedVolume: "100000"
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  // Function to save presale metadata
  const savePresaleMetadata = async (presaleId: string) => {
    try {
      const metadata = extractPresaleMetadata(
        formData,
        presaleId, // Use actual presaleId instead of transaction hash
        address || '',
        undefined // Don't set created_by_user to avoid foreign key constraint error
      );
      
      await createMetadata(metadata);
      console.log('✅ Presale metadata saved to Supabase with presaleId:', presaleId);
    } catch (error) {
      console.error('❌ Failed to save presale metadata:', error);
      // Don't show error to user as the presale was created successfully
    }
  };

  // Monitor transaction confirmation
  useEffect(() => {
    if (transactionStatus.type === 'create' && transactionStatus.status === 'success' && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      setSuccess(true);
      setIsCreating(false);
      sonnerToast.success("Presale created successfully! It will appear in the launchpad once indexed by the subgraph (5-30 seconds).");
      
      // Track points for market creation
      if (hash) {
        // Wait for subgraph to index, then get the actual presaleId
        // The subgraph will emit the presaleId in the PresaleCreated event
        trackMarketCreationPoints(hash, hash);
        
        // Wait 10 seconds for subgraph to index before trying to save metadata
        // Refetch presales to get the actual presaleId
        setTimeout(async () => {
          try {
            const refetchResult = await refetchPresales();
            const presales = refetchResult.data;
            // Find the newly created presale by creator
            // The most recently created presale should be first in the array
            const newPresale = presales?.find(p => {
              const isCreator = p.creator?.toLowerCase() === address?.toLowerCase();
              const matchesTitle = p.question === formData.title;
              return isCreator && matchesTitle;
            });
            if (newPresale?.id) {
              console.log('Found new presale with ID:', newPresale.id);
              savePresaleMetadata(newPresale.id);
            } else {
              console.warn('Could not find newly created presale, using hash as fallback');
              savePresaleMetadata(hash);
            }
          } catch (error) {
            console.error('Error fetching presales for metadata save:', error);
            savePresaleMetadata(hash);
          }
        }, 10000);
      }
      
      // Refetch after 5 seconds to give subgraph time to index
      setTimeout(() => {
        refetchPresales();
      }, 5000);
      
      // Refetch again after 15 seconds
      setTimeout(() => {
        refetchPresales();
      }, 15000);
      
      // Final refetch after 30 seconds
      setTimeout(() => {
        refetchPresales();
      }, 30000);
    }
    
    if (transactionStatus.type === 'create' && transactionStatus.status === 'error') {
      setIsCreating(false);
      hasHandledSuccess.current = false;
    }
  }, [transactionStatus, refetchPresales, hash, trackMarketCreationPoints, formData, address, createMetadata]);

  const progress = (currentStep / steps.length) * 100;

  // Check if all required fields are filled
  const isFormComplete = () => {
    return (
      formData.title.length > 20 &&
      formData.description.length > 50 &&
      formData.truthSource.length > 0 &&
      formData.category.length > 0 &&
      formData.marketIcon.length > 0 &&
      formData.deadline.length > 0 &&
      formData.launchpadDuration.length > 0
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = async () => {
    if (!isConnected) {
      sonnerToast.error("Connect your wallet first");
      return;
    }

    if (!isFormComplete()) {
      sonnerToast.error("Please fill all required fields");
      return;
    }

    // Prevent market creation - show whitelist message
    sonnerToast.error(
      <div>
        You need to be whitelisted or hold ENTRV tokens to create a market.{" "}
        <a 
          href="https://twitter.com/TryEntrave" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Follow us on X
        </a>{" "}
        to learn more.
      </div>,
      { duration: 6000 }
    );
    return;
    
    // MARKET CREATION DISABLED - Code below is unreachable
    // Create the presale
    setIsCreating(true);
    try {
      // Validate deadline
      if (!formData.deadline) {
        sonnerToast.error("Please set a deadline");
        setIsCreating(false);
        return;
      }

      // Validate target liquidity
      const targetLiquidity = parseFloat(formData.targetLiquidity);
      if (isNaN(targetLiquidity) || targetLiquidity <= 0) {
        sonnerToast.error("Target liquidity must be a valid positive number");
        setIsCreating(false);
        return;
      }

      // Parse the deadline date
      const deadlineDate = new Date(formData.deadline);
      if (isNaN(deadlineDate.getTime())) {
        sonnerToast.error("Invalid deadline format");
        setIsCreating(false);
        return;
      }

      // Extract hours and minutes from formData.time (format: "HH:mm")
      const [hours, minutes] = formData.time.split(':');
      deadlineDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const deadline = deadlineDate.toISOString();
      
      // Hardcode target liquidity to $1200 for now
      const finalTargetAmount = "1200";
      console.log('Creating presale with (overriding targetLiquidity):', {
        question: formData.title,
        originalTargetAmount: formData.targetLiquidity,
        finalTargetAmount,
        deadline,
        deadlineDate: deadlineDate.toString()
      });
      
      await createPresale(
        formData.title,
        finalTargetAmount,
        deadline
      );
      
      sonnerToast.info("Transaction submitted! Waiting for confirmation...");
    } catch (error) {
      console.error('Error creating market:', error);
      sonnerToast.error("Failed to create market");
      setIsCreating(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormulationStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ParametersStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FeesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Create a Market
            </h1>
            <p className="text-lg text-foreground/70">
              Launch a new prediction market in 4 simple steps
            </p>
          </div>

          {/* Wallet Connection Required */}
          {!isConnected ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Connect Your Wallet
                </h2>
                <p className="text-muted-foreground mb-8">
                  You need to connect your wallet to create a prediction market.
                </p>
                <Button onClick={connect} size="lg" className="w-full">
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </Card>
          ) : success ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Presale Created Successfully!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your presale has been created and is now live. Users can start contributing to it.
                </p>
                <div className="space-y-3">
                  <Button onClick={() => navigate("/")} size="lg" className="w-full">
                    View Launchpad
                  </Button>
                  <Button 
                    onClick={() => {
                      setSuccess(false);
                      setCurrentStep(1);
                      setFormData({
                        title: "",
                        description: "",
                        truthSource: "",
                        invalidityConditions: "",
                        category: "",
                        marketIcon: "",
                        rulesAndResolutions: "",
                        deadline: "",
                        time: "12:00",
                        timezone: "UTC",
                        targetLiquidity: "10000",
                        launchpadDuration: "",
                        projectedVolume: "100000"
                      });
                    }} 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                  >
                    Create Another Presale
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>

          {/* Progress */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {progress.toFixed(0)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              
              {/* Steps */}
              <div className="grid grid-cols-4 gap-4 pt-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`text-center ${
                      step.id === currentStep
                        ? "opacity-100"
                        : step.id < currentStep
                        ? "opacity-70"
                        : "opacity-40"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </div>
                    <p className="text-xs font-medium text-foreground">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Step Content */}
          <Card className="p-8 mb-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </div>
            
            {/* Transaction Status */}
            {transactionStatus.message && transactionStatus.type === 'create' && (
              <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
                transactionStatus.status === 'success' ? 'bg-success/10 border-success/20' :
                transactionStatus.status === 'error' ? 'bg-destructive/10 border-destructive/20' :
                'bg-primary/10 border-primary/20'
              }`}>
                {transactionStatus.status === 'confirming' && (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                )}
                <span className="text-sm font-medium">{transactionStatus.message}</span>
              </div>
            )}
            
            {renderStep()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isCreating || isPending || isConfirming}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            {currentStep === steps.length ? (
              !isConnected ? (
                <Button
                  onClick={connect}
                  className="gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  onClick={handleLaunch}
                  disabled={isCreating || isPending || isConfirming}
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isCreating || isPending || isConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isPending ? "Confirming..." : isConfirming ? "Confirming..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      🚀 Launch Market
                    </>
                  )}
                </Button>
              )
            ) : (
              <Button
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
          </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateMarket;
