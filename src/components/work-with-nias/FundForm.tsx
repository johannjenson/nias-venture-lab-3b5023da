import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Hotel, Home, Building, Briefcase, Users, Building2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInputWithCode from "./PhoneInputWithCode";

const fundSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").max(50),
  fund_name: z.string().min(1, "Fund name is required").max(200),
  fund_aum_vintage: z.string().min(1, "This field is required").max(2000),
  investment_strategy: z.string().min(1, "This field is required").max(2000),
  historical_performance: z.string().min(1, "This field is required").max(2000),
  gulf_strategy: z.string().min(1, "This field is required").max(2000),
  partnership_type: z.string().min(1, "This field is required").max(2000),
  accommodation_type: z.string().optional(),
  office_space_type: z.string().optional(),
  additional_info: z.string().max(2000).optional(),
});

type FundFormData = z.infer<typeof fundSchema>;

const accommodationOptions = [
  { value: "not_needed", label: "Not needed", icon: X, description: "No accommodation required" },
  { value: "hotel", label: "Hotel", icon: Hotel, description: "5-star hotel stays" },
  { value: "serviced_apartment", label: "Serviced Apt", icon: Home, description: "Furnished apartments" },
  { value: "long_term_rental", label: "Long-term", icon: Building, description: "Extended lease" },
];

const officeSpaceOptions = [
  { value: "not_needed", label: "Not needed", icon: X, description: "No office required" },
  { value: "coworking", label: "Co-working", icon: Users, description: "Hot desk / shared" },
  { value: "private_office", label: "Private Office", icon: Briefcase, description: "Dedicated space" },
  { value: "full_floor", label: "Full Floor", icon: Building2, description: "Suite or floor" },
];

const FundForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const form = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),
    defaultValues: {
      email: "",
      phone: "",
      fund_name: "",
      fund_aum_vintage: "",
      investment_strategy: "",
      historical_performance: "",
      gulf_strategy: "",
      partnership_type: "",
      accommodation_type: "",
      office_space_type: "",
      additional_info: "",
    },
  });

  const onSubmit = async (data: FundFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("partnership_applications" as any)
        .insert({
          application_type: "fund",
          advisor_name: data.email,
          advisor_role: data.phone,
          company_name: data.fund_name,
          fund_aum_vintage: data.fund_aum_vintage,
          investment_strategy: data.investment_strategy,
          historical_performance: data.historical_performance,
          gulf_strategy: data.gulf_strategy,
          partnership_type: data.partnership_type,
          additional_info: data.additional_info || null,
        });

      if (error) throw error;

      // Send to Google Sheets
      try {
        const accommodationLabel = accommodationOptions.find(a => a.value === data.accommodation_type)?.label || data.accommodation_type || "";
        const officeSpaceLabel = officeSpaceOptions.find(o => o.value === data.office_space_type)?.label || data.office_space_type || "";
        
        await supabase.functions.invoke('send-to-google-sheets', {
          body: {
            type: "Funds",
            headers: [
              "Submitted At", "Email", "Phone", "Fund Name", "AUM & Vintage", 
              "Investment Strategy", "Historical Performance", "Gulf Strategy", 
              "Partnership Type", "Accommodation", "Office Space", "Additional Info"
            ],
            values: [
              new Date().toISOString(),
              data.email,
              data.phone,
              data.fund_name,
              data.fund_aum_vintage,
              data.investment_strategy,
              data.historical_performance,
              data.gulf_strategy,
              data.partnership_type,
              accommodationLabel,
              officeSpaceLabel,
              data.additional_info || ""
            ]
          }
        });
      } catch (sheetError) {
        console.error('Error sending to Google Sheets:', sheetError);
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-partnership-confirmation', {
          body: {
            applicationType: 'fund',
            email: data.email,
            companyName: data.fund_name,
            phone: data.phone,
          }
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Application Submitted</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Thank you for your interest. Our team will review and respond within 7–10 days.
        </p>
        <Link 
          to="/#network" 
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Join the NIAS Network →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground mb-1">Funds</h2>
        <p className="text-sm text-muted-foreground">
          For investment funds seeking Gulf partnerships, co-locations, or LP relationships
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@fund.com" {...field} ref={firstInputRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInputWithCode value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fund_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Acme Ventures Fund III" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fund_aum_vintage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total AUM & Current Fund Vintage</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your fund's AUM, vintage year, and fund structure..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investment_strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Strategy & Sector Focus</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your investment thesis, target sectors, check sizes, and stage focus..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="historical_performance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Performance (IRR, TVPI, DPI)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share key performance metrics and track record..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gulf_strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gulf Regional Strategy</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain your regional thesis, timeline, and objectives..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="partnership_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partnership Type</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., co-location, ecosystem partnerships, innovation programs, anchor LPs, regional SPVs..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Regional Presence Section */}
          <div className="border-t pt-6 mt-2">
            <h3 className="text-sm font-medium text-foreground mb-1">Regional Presence</h3>
            <p className="text-xs text-muted-foreground mb-4">
              We recommend spending at least 5 days in the region every 2 months. How can we support your team?
            </p>
            
            {/* Accommodation */}
            <FormField
              control={form.control}
              name="accommodation_type"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Team Accommodation</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      {accommodationOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = field.value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border bg-background hover:bg-muted/50"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-sm font-medium text-center", isSelected ? "text-primary" : "text-foreground")}>
                              {option.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">
                              {option.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Office Space */}
            <FormField
              control={form.control}
              name="office_space_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Space Requirements</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      {officeSpaceOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = field.value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border bg-background hover:bg-muted/50"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-sm font-medium text-center", isSelected ? "text-primary" : "text-foreground")}>
                              {option.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">
                              {option.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="additional_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other relevant information..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Opportunity"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FundForm;
