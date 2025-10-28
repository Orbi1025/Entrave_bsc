import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Info, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import React from "react";

interface ParametersStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "ET (Eastern Time)" },
  { value: "America/Chicago", label: "CT (Central Time)" },
  { value: "America/Denver", label: "MT (Mountain Time)" },
  { value: "America/Los_Angeles", label: "PT (Pacific Time)" },
  { value: "Europe/London", label: "GMT (London)" },
  { value: "Europe/Paris", label: "CET (Paris)" },
  { value: "Asia/Tokyo", label: "JST (Tokyo)" },
  { value: "Asia/Shanghai", label: "CST (Shanghai)" },
  { value: "Asia/Dubai", label: "GST (Dubai)" },
];

const ParametersStep = ({ formData, updateFormData }: ParametersStepProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [timezone, setTimezone] = useState("UTC");

  // Set default values automatically
  React.useEffect(() => {
    if (!formData.targetLiquidity) {
      updateFormData({ targetLiquidity: "10000" });
    }
    if (!formData.launchpadDuration) {
      updateFormData({ launchpadDuration: "7" });
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Market Deadline */}
      <div className="space-y-3">
        <div>
          <Label className="text-base">Market Deadline *</Label>
          <p className="text-xs text-muted-foreground mt-1">
            When should trading close and resolution begin?
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  updateFormData({ deadline: newDate?.toISOString() });
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time & Timezone in Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Time</Label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <Input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  updateFormData({ time: e.target.value });
                }}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Timezone</Label>
            <Select value={timezone} onValueChange={(value) => {
              setTimezone(value);
              updateFormData({ timezone: value });
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Info about defaults */}
      <div className="flex items-start gap-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Default Settings Applied</p>
          <ul className="space-y-0.5">
            <li>• Target Liquidity: $10,000</li>
            <li>• Launchpad Duration: 7 days</li>
            <li>• These settings are optimized for market success</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParametersStep;
