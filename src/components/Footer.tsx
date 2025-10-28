import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import xLogo from "@/assets/x-logo.png";
import discordLogo from "@/assets/discord-logo.svg";
import logo from "@/assets/logo-entrave.svg";
import WaitlistDialog from "./WaitlistDialog";
import HowItWorksDialog from "./HowItWorksDialog";

const Footer = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleGetStarted = () => {
    // Check if user has already joined waitlist
    const hasJoinedWaitlist = localStorage.getItem("entrave-waitlist-joined");
    
    if (!hasJoinedWaitlist) {
      // Close How It Works and open Waitlist
      setShowHowItWorks(false);
      setShowWaitlist(true);
    } else {
      // User already joined, just close the dialog
      setShowHowItWorks(false);
    }
  };

  return (
    <>
      <footer className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <Link to="/" className="inline-block">
                <img 
                  src={logo} 
                  alt="Entrave" 
                  className="h-6 md:mx-0 hover:opacity-80 transition-opacity cursor-pointer"
                />
              </Link>
              <p className="text-sm text-muted-foreground">
                The future has odds
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="https://t.me/ENTRAVE_bsc" className="hover:text-primary transition-colors">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Connect</h3>
              <div className="space-y-2">
                <div className="flex gap-3">
                  <a 
                    href="https://x.com/TryEntrave" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary transition-all hover:scale-105 flex items-center justify-center group"
                    aria-label="Follow us on X"
                  >
                    <img src={xLogo} alt="X" className="w-4 h-4 group-hover:brightness-0 group-hover:invert transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 Entrave. All rights reserved.
            </p>
            <span className="hidden md:inline text-muted-foreground text-xs">•</span>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
      <HowItWorksDialog 
        open={showHowItWorks} 
        onOpenChange={setShowHowItWorks}
        onGetStarted={handleGetStarted}
      />
    </>
  );
};

export default Footer;