import { Card } from "@/components/ui/card";
import { Search, Coins, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LaunchpadHowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Browse Markets",
      description: "Discover promising prediction markets waiting for liquidity"
    },
    {
      number: 2,
      icon: Coins,
      title: "Add Liquidity",
      description: "Fund markets you believe in. Earlier = better returns"
    },
    {
      number: 3,
      icon: TrendingUp,
      title: "Earn Returns",
      description: "Share 1% of trading volume when markets go live"
    }
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <Accordion type="single" collapsible className="w-full" defaultValue="how-it-works">
        <AccordionItem value="how-it-works" className="border-none">
          <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline">
            How does it work
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 mt-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-4">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[29px] w-0.5 h-6 bg-border mt-10" />
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default LaunchpadHowItWorks;
