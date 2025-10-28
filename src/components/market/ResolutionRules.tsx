import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResolutionRulesProps {
  rules: string;
  proofLinks: Array<{
    label: string;
    url: string;
  }>;
}

const ResolutionRules = ({ rules, proofLinks }: ResolutionRulesProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <Accordion type="single" collapsible className="w-full" defaultValue="resolution">
        <AccordionItem value="resolution" className="border-none">
          <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline">
            Rules & Resolution
          </AccordionTrigger>
          <AccordionContent>
            {/* Rules content */}
            <div 
              className="prose prose-sm max-w-none text-foreground/80 mt-4"
              dangerouslySetInnerHTML={{ __html: rules }}
              style={{
                // Custom prose styles matching theme
                color: 'hsl(var(--foreground) / 0.8)'
              }}
            />

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ResolutionRules;
