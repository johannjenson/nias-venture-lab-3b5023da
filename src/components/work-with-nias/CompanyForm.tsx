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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import PhoneInputWithCode from "./PhoneInputWithCode";

const companySchema = z.object({
  company_name: z.string().min(1, "Company name is required").max(200),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").max(50),
  website: z.string().max(500).optional(),
  hq_country: z.string().min(1, "HQ country is required").max(100),
  year_founded: z.string().min(1, "Year founded is required").max(10),
  primary_sector: z.string().min(1, "Primary sector is required"),
  primary_sector_other: z.string().max(200).optional(),
  revenue_band: z.string().min(1, "Revenue band is required"),
  last_12_months_revenue: z.string().max(100).optional(),
  ebitda_status: z.string().min(1, "EBITDA status is required"),
  profit_margin: z.string().max(50).optional(),
  desired_outcome: z.string().min(1, "Please describe your desired outcome").max(2000),
  mandates: z.array(z.string()).min(1, "Please select at least one mandate"),
  advisory_mandate: z.string().min(1, "Please select an option"),
  gcc_readiness: z.array(z.string()).optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const primarySectors = [
  { value: "sports_entertainment", label: "Sports & Entertainment" },
  { value: "energy", label: "Energy" },
  { value: "education", label: "Education" },
  { value: "art_lifestyle", label: "Art & Lifestyle" },
  { value: "other", label: "Other (please specify)" },
];

const revenueBands = [
  { value: "under_10m", label: "<$10M" },
  { value: "10_25m", label: "$10–25M" },
  { value: "25_50m", label: "$25–50M" },
  { value: "50_100m", label: "$50–100M" },
  { value: "100m_plus", label: "$100M+" },
];

const ebitdaStatuses = [
  { value: "profitable", label: "Profitable" },
  { value: "breakeven", label: "Break-even" },
  { value: "loss_improving", label: "Loss-making but improving" },
  { value: "loss_making", label: "Loss-making" },
];

const mandateOptions = [
  { id: "capital_raising", label: "Capital raising" },
  { id: "strategic_partnerships", label: "Strategic partnerships" },
  { id: "market_entry", label: "Market entry / KSA or GCC setup" },
  { id: "coinvestment_jv", label: "Co-investment or JV structuring" },
  { id: "regional_representation", label: "Ongoing regional representation" },
];

const gccReadinessOptions = [
  { id: "existing_gcc_clients", label: "Existing GCC clients" },
  { id: "prior_ksa_uae_projects", label: "Prior projects in KSA/UAE" },
  { id: "local_partner_identified", label: "Local partner identified" },
  { id: "willing_regional_hq", label: "Willing to establish regional HQ" },
  { id: "willing_jv_minority_sale", label: "Willing to do JV or minority sale" },
];

const CompanyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      company_name: "",
      email: "",
      phone: "",
      website: "",
      hq_country: "",
      year_founded: "",
      primary_sector: "",
      primary_sector_other: "",
      revenue_band: "",
      last_12_months_revenue: "",
      ebitda_status: "",
      profit_margin: "",
      desired_outcome: "",
      mandates: [],
      advisory_mandate: "",
      gcc_readiness: [],
    },
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const watchedRevenueBand = form.watch("revenue_band");
  const watchedEbitdaStatus = form.watch("ebitda_status");
  const watchedPrimarySector = form.watch("primary_sector");

  // Check if disqualified (revenue < $25M OR deeply loss-making)
  const isDisqualified = 
    watchedRevenueBand === "under_10m" || 
    watchedRevenueBand === "10_25m" || 
    watchedEbitdaStatus === "loss_making";

  const showProfitMargin = watchedEbitdaStatus === "profitable";
  const showOtherSector = watchedPrimarySector === "other";

  const onSubmit = async (data: CompanyFormData) => {
    if (isDisqualified) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("partnership_applications" as any)
        .insert({
          application_type: "company",
          company_name: data.company_name,
          advisor_name: data.email,
          advisor_role: data.phone,
          company_footprint: data.website,
          geographic_footprint: data.hq_country,
          gulf_strategy: data.year_founded,
          fund_sector_focus: data.primary_sector === "other" ? data.primary_sector_other : data.primary_sector,
          company_revenue_band: data.revenue_band,
          revenue_usd: data.last_12_months_revenue || null,
          gulf_relevance: data.ebitda_status,
          profit_margin: data.profit_margin || null,
          gulf_expansion_plans: data.desired_outcome,
          strategic_metric_type: data.mandates.join(", "),
          strategic_metric_value: data.advisory_mandate,
        });

      if (error) throw error;

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-partnership-confirmation', {
          body: {
            applicationType: 'company',
            email: data.email,
            companyName: data.company_name,
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
        <h2 className="text-lg font-medium text-foreground mb-2">Companies</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          NIAS works with a small number of post-revenue companies seeking capital, strategic partners, and market entry across Saudi Arabia and the GCC. We typically engage with companies at $50M+ revenue, or with a very clear path there within 12–18 months.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Basic Info */}
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company Ltd." {...field} ref={firstInputRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@company.com" {...field} />
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourcompany.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hq_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HQ Country</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., United States" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_founded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Founded</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2015" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Primary Sector */}
          <FormField
            control={form.control}
            name="primary_sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Sector</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {primarySectors.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showOtherSector && (
            <FormField
              control={form.control}
              name="primary_sector_other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please Specify Sector</FormLabel>
                  <FormControl>
                    <Input placeholder="Your sector..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Revenue Band */}
          <FormField
            control={form.control}
            name="revenue_band"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue Band</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select revenue band" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {revenueBands.map((band) => (
                      <SelectItem key={band.value} value={band.value}>
                        {band.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last 12 Months Revenue */}
          <FormField
            control={form.control}
            name="last_12_months_revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last 12 Months Revenue (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 75000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EBITDA Status */}
          <FormField
            control={form.control}
            name="ebitda_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EBITDA Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select EBITDA status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ebitdaStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profit Margin - only show if profitable */}
          {showProfitMargin && (
            <FormField
              control={form.control}
              name="profit_margin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit Margin (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Disqualification Message */}
          {isDisqualified && (
            <div className="rounded-lg border border-muted bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Based on your current revenue and profitability profile, our advisory services may not be the right fit at this stage. We typically work with companies at $25M+ revenue with a path to profitability.
                  </p>
                  <a 
                    href="https://access.nias.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Explore NIAS Access →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Only show remaining fields if not disqualified */}
          {!isDisqualified && (
            <>
              {/* Desired Outcome */}
              <FormField
                control={form.control}
                name="desired_outcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the concrete outcome you want in the next 12–24 months?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Capital raise, strategic partner, GCC market entry, JV, regional acquisition, secondary liquidity, other..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mandates - Checkboxes */}
              <FormField
                control={form.control}
                name="mandates"
                render={() => (
                  <FormItem>
                    <FormLabel>What mandate are you seeking?</FormLabel>
                    <div className="space-y-3 mt-2">
                      {mandateOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="mandates"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    if (checked) {
                                      field.onChange([...current, option.id]);
                                    } else {
                                      field.onChange(current.filter((v) => v !== option.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <Label className="text-sm font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Advisory Mandate - Radio */}
              <FormField
                control={form.control}
                name="advisory_mandate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Would you consider granting NIAS a regional advisory mandate if aligned?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="yes" id="advisory_yes" />
                          <Label htmlFor="advisory_yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="potentially" id="advisory_potentially" />
                          <Label htmlFor="advisory_potentially" className="font-normal cursor-pointer">Potentially</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="no" id="advisory_no" />
                          <Label htmlFor="advisory_no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* GCC Readiness */}
              <FormField
                control={form.control}
                name="gcc_readiness"
                render={() => (
                  <FormItem>
                    <FormLabel>GCC Readiness (critical NIAS filter)</FormLabel>
                    <p className="text-sm text-muted-foreground mb-2">Select all that apply:</p>
                    <div className="space-y-3">
                      {gccReadinessOptions.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name="gcc_readiness"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    if (checked) {
                                      field.onChange([...current, option.id]);
                                    } else {
                                      field.onChange(current.filter((v) => v !== option.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <Label className="text-sm font-normal cursor-pointer">
                                {option.label}
                              </Label>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Latest investor deck or info memo (PDF)</Label>
                <p className="text-sm text-muted-foreground">Optional</p>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setUploadedFile(file);
                  }}
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>

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
                  "Submit Application"
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CompanyForm;
