import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <header>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: October 2025</p>
            <p className="text-foreground mt-4">
              Entrave respects your privacy and values transparency. This policy explains what data we collect, how we use it, and your rights.
            </p>
          </header>

          <Separator className="my-8" />

          <section>
            <h3 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h3>
            <p>Entrave may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wallet address (for identification and transaction tracking)</li>
              <li>Email address (for account creation or notifications)</li>
              <li>Device and IP data (via analytics and hosting providers)</li>
              <li>Usage and interaction data (pages visited, actions taken)</li>
              <li>Transaction data (on-chain data mirrored off-chain for analytics)</li>
            </ul>
            <p className="mt-4">Entrave never collects private keys or seed phrases.</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Data</h3>
            <p>
              We use collected data to operate and improve Entrave, provide support and notifications, analyze platform activity, and prevent abuse or fraud. Entrave does not sell or rent personal data to third parties.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Services</h3>
            <p>Entrave uses several trusted third-party providers:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supabase – data hosting and authentication</li>
              <li>AWS – cloud hosting</li>
              <li>Google Analytics – platform usage metrics</li>
              <li>Brevo – emails and notifications</li>
              <li>Cloudflare – network protection and caching</li>
              <li>Centralized oracles – event resolution</li>
            </ul>
            <p className="mt-4">
              These providers process data under their own privacy policies. Entrave is not responsible for how they handle information.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h3>
            <p>
              Entrave uses cookies for essential session management, analytics, and security. You can disable cookies in your browser settings, but some platform features may stop working properly.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h3>
            <p>
              Entrave retains wallet and email data as long as your account is active. Analytics data may be kept for up to 24 months. You can request data deletion by emailing <a href="mailto:privacy@entrave.com" className="text-primary hover:underline">privacy@entrave.com</a> (subject to blockchain immutability limits).
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h3>
            <p>
              Depending on your location, you may have rights to access, correct, or delete your personal data, and to withdraw consent for communications. To exercise these rights, email <a href="mailto:privacy@entrave.com" className="text-primary hover:underline">privacy@entrave.com</a>.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">7. Security</h3>
            <p>
              Entrave uses HTTPS, Supabase encryption, and secure infrastructure to protect data. However, no online service is completely secure. You use Entrave at your own risk.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h3>
            <p>
              Entrave is not intended for users under 18 years old. If we discover that we have collected information from minors, we will delete it promptly.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h3>
            <p>
              Entrave may update this Privacy Policy periodically. The updated version will be published on entrave.com/privacy with a new revision date.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">10. Contact</h3>
            <p>
              For privacy-related inquiries or data requests, contact: <a href="mailto:privacy@entrave.com" className="text-primary hover:underline">privacy@entrave.com</a>.
            </p>

            <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm">
                By using Entrave, you also agree to our <Link to="/terms-of-service" className="text-primary hover:underline font-medium">Terms of Service</Link>.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
