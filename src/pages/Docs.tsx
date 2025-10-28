import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WaitlistDialog from "@/components/WaitlistDialog";

const Docs = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    // Small delay to ensure layout is settled
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-44 md:pt-40 pb-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">How Entrave Works</h1>
            <p className="text-lg text-muted-foreground">
              Entrave is a next-generation prediction-market platform built on BNB Chain, powered by PancakeSwap Infinity's new hook architecture.
              It lets anyone trade real-world outcomes or create their own markets that earn revenue as they grow.
            </p>
            <div className="space-y-3 p-6 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-lg font-semibold text-primary">
                Public Launch: Starting October 28, 2025
              </p>
              <p className="text-muted-foreground">
                Entrave is launching through a progressive feature rollout to waitlist members:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                <li><strong>October 28:</strong> Public launch for all features except market creation (only available for whitelist users)</li>
                <li><strong>November 5:</strong> All features available for all users</li>
              </ul>
              <div className="mt-4">
                <Button 
                  size="lg"
                  onClick={() => setShowWaitlist(true)}
                  className="font-semibold"
                >
                  Register for Early Access
                </Button>
              </div>
            </div>
          </div>

          {/* Core Mechanics */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Core Mechanics</h2>

            {/* Market Creation */}
            <Card className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold">1. Market Creation</h3>
              <p className="text-muted-foreground">
                Anyone can create a market such as:
              </p>
              <p className="text-lg font-medium italic">
                "Will BNB reach $4,000 before 2027?"
              </p>
              
              <div className="p-4 bg-primary/10 border-2 border-primary/30 rounded-lg">
                <p className="font-semibold text-primary mb-2"><strong>$ENTRV</strong> Token Requirement (not a fee)</p>
                <p className="text-muted-foreground">
                  To create a market, your wallet will need to hold at least $300 worth of $ENTRV. Nothing will be charged, locked, or transferred—this will be a balance check to deter spam and align creators with the Entrave community. If your balance drops below the threshold, market creation will be paused until you top back up.
                </p>
              </div>

              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Market creation is free and risk-free for the creator beyond the token holding requirement.</li>
                <li>Each new market begins in the Launchpad phase, where liquidity providers (LPs) deposit funds to activate it.</li>
                <li>The Launchpad threshold is currently set at $1,200. This will evolve in the future to allow market creators to choose their own threshold.</li>
                <li>The Launchpad duration is set to 7 days. In the future, this may be customizable by the market creator.</li>
                <li>Once the liquidity target is met, the market graduates to an active trading market. When the launchpad goal is reached, there is a moderation procedure to ensure markets are not harmful and are verifiable by public sources. This procedure can take up to 12 hours.</li>
                <li>YES/USDT and NO/USDT trading pairs are created based on the initial odds.</li>
                <li>If the liquidity goal is not reached, all participants are automatically refunded in full.</li>
                <li>If the goal is reached, the market becomes instantly tradable on-chain.</li>
              </ul>
              <p className="text-muted-foreground">
                Entrave uses PancakeSwap Infinity's AMM engine with custom hooks that handle fee routing, settlement, and liquidity management.
                This setup keeps liquidity deep and pricing automatic, without relying on an order book.
              </p>
            </Card>

            {/* Trading */}
            <Card className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold">2. Trading</h3>
              <p className="text-muted-foreground">
                Traders buy "YES" or "NO" shares representing each side of an event.
                The pool price moves dynamically with supply and demand, reflecting live market odds in real time.
              </p>
              <p className="text-muted-foreground">
                Entrave's market design ensures that 1 YES share + 1 NO share will always equal $1, 
                guaranteeing balanced pricing and preventing arbitrage opportunities.
              </p>
              <p className="text-muted-foreground">
                Because Entrave is built on PancakeSwap Infinity:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li><strong>Instant:</strong> trades settle on-chain in one transaction.</li>
                <li><strong>Efficient:</strong> the AMM and hook logic manage liquidity and fees automatically.</li>
                <li><strong>Advanced Features:</strong> PancakeSwap Infinity hooks enable limit orders and direct liquidity routing for enhanced trading flexibility.</li>
                <li><strong>Composable:</strong> future versions will integrate oracles and data feeds directly into the hook system.</li>
              </ul>
            </Card>

            {/* Fees & Incentives */}
            <Card className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold">3. Fees and Incentives</h3>
              <p className="text-muted-foreground">
                Every trade on Entrave carries on average a 1% transaction fee, automatically distributed to align everyone's interests.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Recipient</th>
                      <th className="text-left py-3 px-4">Share of Fee</th>
                      <th className="text-left py-3 px-4">Example on $1M Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Market Creator</td>
                      <td className="py-3 px-4">20%</td>
                      <td className="py-3 px-4">$2,000</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Liquidity Providers</td>
                      <td className="py-3 px-4">50%</td>
                      <td className="py-3 px-4">$5,000</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Entrave (Platform)</td>
                      <td className="py-3 px-4">30%</td>
                      <td className="py-3 px-4">$3,000</td>
                    </tr>
                    <tr className="font-semibold">
                      <td className="py-3 px-4">Total Fees (1%)</td>
                      <td className="py-3 px-4">—</td>
                      <td className="py-3 px-4">$10,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-muted-foreground">This model rewards everyone fairly:</p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Creators earn from their ideas.</li>
                <li>LPs earn yield with guaranteed principal.</li>
                <li>Entrave maintains liquidity and infrastructure.</li>
              </ul>

              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="font-semibold text-primary mb-2">Upcoming Token Benefits</p>
                <p className="text-muted-foreground mb-2">
                  $ENTRV token holders will enjoy additional advantages across the platform:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside ml-4">
                  <li><strong>Trading Fee Rebates:</strong> Reduced trading fees for active $ENTRV holders</li>
                  <li><strong>Enhanced LP Returns:</strong> Extra fee earnings when providing liquidity to Launchpad markets</li>
                  <li><strong>Resolution Rewards:</strong> Earn yield by participating in market resolution through the decentralized resolution mechanism</li>
                </ul>
              </div>
            </Card>

            {/* Liquidity Guarantee */}
            <Card className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold">4. Liquidity Guarantee</h3>
              <p className="text-muted-foreground">
                Entrave keeps every market tradable through a protected liquidity model.
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>LP capital is protected through Entrave's AMM structure and backstop fund, which are designed to prevent permanent loss of principal.</li>
                <li>LPs cannot withdraw their liquidity before the market resolves or if the market is cancelled. Soon, participants will be able to withdraw and add liquidity when an active market is live (coming soon feature).</li>
                <li>During early stages, Entrave may co-provide or backstop liquidity to ensure smooth trading.</li>
                <li>PancakeSwap Infinity manages swaps and settlements, while Entrave's hooks apply the prediction-market logic.</li>
              </ul>
            </Card>

            {/* Resolution */}
            <Card className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold">5. Resolution</h3>
              <p className="text-muted-foreground">
                Resolution is centralized at launch but fully transparent. Entrave will publish all sources and on-chain proofs for each market outcome.
              </p>
              <p className="text-muted-foreground">
                <strong>Decentralized Resolution Mechanism (Coming Soon):</strong> The $ENTRV token will be at the heart of Entrave's upcoming decentralized resolution system. 
                Token holders will be able to participate in market resolution and earn yield by staking $ENTRV to verify and validate market outcomes. 
                This creates a transparent, community-driven resolution process with aligned incentives for accurate reporting.
              </p>
            </Card>
          </div>

          {/* Market Lifecycle */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Market Lifecycle Overview</h2>
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Stage</th>
                      <th className="text-left py-3 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-semibold">1. Creation</td>
                      <td className="py-3 px-4">A user creates a market idea for free.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-semibold">2. Launchpad</td>
                      <td className="py-3 px-4">LPs fund the market. If the goal is met, it goes live; if not, funds are refunded.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-semibold">3. Trading</td>
                      <td className="py-3 px-4">Users buy YES or NO shares, and prices update dynamically.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-semibold">4. Resolution</td>
                      <td className="py-3 px-4">Entrave verifies and settles the event outcome.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">5. Rewards</td>
                      <td className="py-3 px-4">Fees and points are distributed among creators, LPs, and traders.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* How to Earn Points */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">How to Earn Points</h2>
            <Card className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Entrave rewards participation through a points system that tracks user activity and early engagement.
                Points determine your airdrop allocation at the end of each season.
              </p>
              
              <div className="space-y-3">
                <h4 className="text-xl font-semibold">Season Structure</h4>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Beta Season begins October 20 for early waitlist members</li>
                  <li>Season 1 officially begins on October 28 and ends on November 5</li>
                  <li>Beta testers earn 2x points multiplier for all actions during the beta period</li>
                  <li>At the end of each season, points will be distributed based on participation and activity</li>
                  <li>Future seasons will introduce new missions, bonuses, and reward tiers</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold">Earning Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Action</th>
                        <th className="text-left py-3 px-4">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Trading</td>
                        <td className="py-3 px-4">10 points per $1 traded</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Launchpad Funding</td>
                        <td className="py-3 px-4">100 points per $1 provided</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Market Creation</td>
                        <td className="py-3 px-4">500 points per market created</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Referrals</td>
                        <td className="py-3 px-4">500 points per user referred + 5% of their points</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-muted-foreground">
                Every action on the platform contributes to your rank and final reward tier.
                The more you trade, create, and share, the higher your future allocation will be.
              </p>
            </Card>
          </div>


          {/* ENTRV Token */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">$ENTRV Token</h2>
            <Card className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The $ENTRV token is the utility token powering the Entrave ecosystem, designed to align incentives across all participants.
              </p>
              
              <div className="space-y-3">
                <h4 className="text-xl font-semibold">Token Utility</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                    <span className="flex-1">
                      <strong>Market Creation Access:</strong> Hold $300 worth of $ENTRV to create markets
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Coming Soon</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                    <span className="flex-1">
                      <strong>Fee Rebates:</strong> Receive discounted trading fees based on your $ENTRV holdings
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Coming Soon</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                    <span className="flex-1">
                      <strong>Enhanced LP Rewards:</strong> Earn additional fees when providing liquidity to Launchpad markets
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Coming Soon</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                    <span className="flex-1">
                      <strong>Resolution Participation:</strong> Stake $ENTRV to participate in the decentralized resolution mechanism and earn yield
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">Coming Soon</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold">Tokenomics</h4>
                <p className="text-muted-foreground">
                  $ENTRV has a carefully designed token distribution to ensure long-term sustainability and alignment:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4">Allocation</th>
                        <th className="text-left py-3 px-4">Percentage</th>
                        <th className="text-left py-3 px-4">Vesting Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Liquidity</td>
                        <td className="py-3 px-4">75%</td>
                        <td className="py-3 px-4">Immediate - Ensures deep market liquidity from day one</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Team</td>
                        <td className="py-3 px-4">10%</td>
                        <td className="py-3 px-4">12-month cliff, then linear unlock over 24 months</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Community</td>
                        <td className="py-3 px-4">10%</td>
                        <td className="py-3 px-4">1-month cliff, then linear unlock over 12 months</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Marketing</td>
                        <td className="py-3 px-4">5%</td>
                        <td className="py-3 px-4">1-month cliff, then linear unlock over 12 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The majority of tokens (75%) are dedicated to liquidity, ensuring sustainable trading conditions and deep market depth for the $ENTRV token.
                </p>
              </div>
            </Card>
          </div>

          {/* Why Entrave Exists */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Entrave Exists</h2>
            <Card className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Prediction markets failed because they lacked liquidity and creator incentives.
              </p>
              <p className="text-lg font-semibold">
                Entrave fixes both.
              </p>
              <p className="text-muted-foreground">
                Built on PancakeSwap Infinity, Entrave blends DeFi efficiency with social virality:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Anyone can create a market that earns real fees.</li>
                <li>Liquidity stays deep and protected.</li>
                <li>Every participant shares the upside.</li>
              </ul>
              <p className="text-lg font-semibold text-primary mt-4">
                Entrave turns every idea into a tradable market.
              </p>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </div>
  );
};

export default Docs;
