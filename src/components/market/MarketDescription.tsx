import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MarketDescriptionProps {
  description: string;
}

const MarketDescription = ({ description }: MarketDescriptionProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <Accordion type="single" collapsible className="w-full" defaultValue="description">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent>
            {/* Description content */}
            <div 
              className="prose prose-sm max-w-none text-foreground/80 mt-4"
              dangerouslySetInnerHTML={{ __html: description }}
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

export default MarketDescription;
