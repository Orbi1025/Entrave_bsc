import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivyProviderWrapper } from "@/providers/PrivyProvider";
import WaitlistDialog from "@/components/WaitlistDialog";
import EmailLinkDialogWrapper from "@/components/EmailLinkDialogWrapper";
import { SystemStatusAlert } from "@/components/monitoring/SystemStatusAlert";
import Index from "./pages/Index";
import Market from "./pages/Market";
import LaunchpadMarket from "./pages/LaunchpadMarket";
import CreateMarket from "./pages/CreateMarket";
import Portfolio from "./pages/Portfolio";
import Faucet from "./pages/Faucet";
import Docs from "./pages/Docs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <PrivyProviderWrapper>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SystemStatusAlert />
        <WaitlistDialog 
          open={isWaitlistOpen} 
          onOpenChange={setIsWaitlistOpen} 
        />
        <EmailLinkDialogWrapper />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/market/:id" element={<Market />} />
            <Route path="/launchpad/:id" element={<LaunchpadMarket />} />
            <Route path="/create-market" element={<CreateMarket />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/faucet" element={<Faucet />} /> {/* Page cachée - pas dans le header */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PrivyProviderWrapper>
  );
};

export default App;
