import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <header>
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: October 2025</p>
            <p className="text-foreground mt-4">By using Entrave, you agree to these Terms of Service.</p>
          </header>

          <Separator className="my-8" />

          <section>
            <h3 className="text-2xl font-semibold mt-8 mb-4">1. What Entrave Is</h3>
            <p>
              Entrave is a creator-driven prediction market protocol that allows users to trade on outcomes of real-world events, create markets through a Launchpad, provide liquidity, and earn fees or points. Entrave operates as a decentralized information market, not a gambling or betting service. Users interact directly with smart contracts deployed on public blockchains such as Ethereum and BNB.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">2. Non-Custodial Nature & Wallet Security</h3>
            <p>
              Entrave is non-custodial. You maintain full control over your wallet and funds at all times. Entrave never takes custody of your assets. All trades and transactions occur directly on-chain via your connected wallet. If you lose your private keys, Entrave cannot recover them.
            </p>
            <p className="mt-4">
              You are solely responsible for the security of your wallet and private keys. Entrave is not responsible for any losses resulting from lost, stolen, or compromised wallets, hacked accounts, phishing attacks, or unauthorized access to your funds. Always use secure practices to protect your wallet credentials.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">3. Use at Your Own Risk</h3>
            <p>
              Entrave provides no guarantees of outcome, profit, or accuracy. Market tokens and other digital assets on Entrave have no intrinsic value. By using Entrave, you acknowledge that you may lose all value of any tokens or assets you trade, and that market outcomes may be delayed, disputed, or incorrectly resolved by oracles. Entrave is provided 'as is' without warranties or guarantees.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">4. Not Gambling or Investment Advice</h3>
            <p>
              Entrave is not a gambling platform, exchange, brokerage, or investment advisor. Markets are for information aggregation and entertainment purposes only. No content on Entrave should be considered financial or investment advice. You are solely responsible for your actions and compliance with local laws.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">5. Eligibility</h3>
            <p>
              By using Entrave, you confirm that you are at least 18 years old and that using decentralized prediction markets is legal in your jurisdiction. Entrave may restrict access to certain users or regions as required by local regulations.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">6. Creator and Market Responsibility</h3>
            <p>
              When creating a market, you must ensure that it is clear, factual, and lawful. Markets that promote violence, discrimination, hate speech, or illegal activity are prohibited and may be removed. Entrave reserves the right to delist or hide markets that violate applicable laws or community guidelines.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">7. Fees and Rewards</h3>
            <p>
              Entrave charges platform fees (e.g., 1–3% of trading volume) to support protocol operations. A portion of these fees may be distributed to market creators and liquidity providers. Fees, rewards, and points are not guaranteed and may change over time. Points or token rewards have no monetary value until explicitly stated.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Services</h3>
            <p>
              Entrave integrates with third-party services, including Supabase, Google Analytics, Brevo, AWS, Cloudflare, and centralized oracles. These providers assist with hosting, data storage, analytics, email, and resolution processes. Each has its own terms and privacy practices. Entrave is not responsible for third-party performance or potential data leaks.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">9. Intellectual Property</h3>
            <p>
              Entrave's branding, design, and interface elements are property of the Entrave project. Content created by users, such as market questions or event descriptions, remains owned by them, but users grant Entrave a non-exclusive license to display, share, and distribute that content within the platform.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h3>
            <p>
              Entrave and its contributors are not liable for any damages or losses arising from your use of the platform, including loss of funds, data, or reputation; smart contract failures; oracle errors; or downtime from third-party services. Your sole remedy is to discontinue use of Entrave.
            </p>

            <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm">
                For information about how we handle your data, please read our <Link to="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
