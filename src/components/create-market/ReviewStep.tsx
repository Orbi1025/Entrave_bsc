import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ReviewStepProps {
  formData: any;
}

const ReviewStep = ({ formData }: ReviewStepProps) => {
  // Validation checks
  const checks = [
    { 
      label: "Market question is clear and specific",
      valid: formData.title && formData.title.length > 20
    },
    { 
      label: "Resolution criteria is detailed",
      valid: formData.description && formData.description.length > 50
    },
    { 
      label: "Source of truth is specified",
      valid: formData.truthSource && formData.truthSource.length > 0
    },
    { 
      label: "Deadline is set",
      valid: formData.deadline
    },
    { 
      label: "Parameters are configured",
      valid: formData.targetLiquidity
    }
  ];

  const allValid = checks.every(check => check.valid);

  const formatDeadline = () => {
    if (!formData.deadline) return "Not set";
    const date = new Date(formData.deadline);
    const dateStr = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    return `${dateStr} at ${formData.time || '12:00'} ${formData.timezone || 'UTC'}`;
  };

  return (
    <div className="space-y-6">
      {/* Validation Checklist */}
      <Card className="p-6 bg-muted/50">
        <h4 className="font-medium text-foreground mb-4">Pre-launch Checklist</h4>
        <div className="space-y-3">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-3">
              {check.valid ? (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
              )}
              <span className={`text-sm ${check.valid ? "text-foreground" : "text-destructive"}`}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Market Summary */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Market Summary</h4>
        
        {/* Market Image */}
        {formData.marketIcon && (
          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Market Image</Label>
            <img
              src={formData.marketIcon}
              alt="Market preview"
              className="w-full h-48 object-cover rounded-lg mt-2"
            />
          </Card>
        )}
        
        {/* Question */}
        <Card className="p-4">
          <Label className="text-xs text-muted-foreground mb-2">Question</Label>
          <p className="text-foreground font-medium">{formData.title || "Not set"}</p>
        </Card>

        {/* Category */}
        <Card className="p-4">
          <Label className="text-xs text-muted-foreground mb-2">Category</Label>
          <Badge variant="outline" className="capitalize">{formData.category || "Not set"}</Badge>
        </Card>

        {/* Resolution */}
        <Card className="p-4">
          <Label className="text-xs text-muted-foreground mb-2">Resolution Criteria</Label>
          <p className="text-sm text-foreground/80">{formData.description || "Not set"}</p>
        </Card>

        {/* Rules and Resolutions */}
        {formData.rulesAndResolutions && (
          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Rules and Resolutions</Label>
            <p className="text-sm text-foreground/80">{formData.rulesAndResolutions}</p>
          </Card>
        )}

        {/* Parameters Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Deadline</Label>
            <p className="text-foreground font-medium text-sm">
              {formatDeadline()}
            </p>
          </Card>

          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Target Liquidity</Label>
            <p className="text-foreground font-medium">
              {formData.targetLiquidity ? `$${parseInt(formData.targetLiquidity).toLocaleString()}` : "Not set"}
            </p>
          </Card>

          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Launchpad Duration</Label>
            <p className="text-foreground font-medium">
              {formData.launchpadDuration ? `${formData.launchpadDuration} days` : "Not set"}
            </p>
          </Card>

          <Card className="p-4">
            <Label className="text-xs text-muted-foreground mb-2">Creator Requirement</Label>
            <p className="text-foreground font-medium">$300 ENTRV Tokens</p>
          </Card>
        </div>
      </div>

      {/* Creator Requirement Section */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground text-lg">Creator Requirement</h4>
              <p className="text-sm text-muted-foreground mt-1">
                You must hold at least $300 worth of ENTRV tokens.
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">$300</p>
              <p className="text-xs text-muted-foreground">ENTRV Tokens</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="text-xs text-primary">
              <p className="font-medium">Token Hold Requirement</p>
              <p className="mt-1">
                You must maintain $300 worth of ENTRV tokens in your wallet to create markets. This prevents spam and ensures quality market creation.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Warning */}
      {!allValid && (
        <Card className="p-4 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Incomplete Information</p>
              <p className="text-xs text-destructive/80 mt-1">
                Please complete all required fields before launching your market.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`block ${className}`}>{children}</div>
);

export default ReviewStep;
