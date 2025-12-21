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
import { Loader2, AlertCircle, Coins, TrendingUp, TrendingDown, Minus, BarChart3, Building2, Rocket, Crown, Cpu, Trophy, Zap, GraduationCap, Palette, MoreHorizontal, Hotel, Home, Building, Briefcase, Users, X } from "lucide-react";
import PhoneInputWithCode from "./PhoneInputWithCode";
import { cn } from "@/lib/utils";
import { allCountries } from "@/data/countries";

const companySchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(200),
  role_title: z.string().min(1, "Role/job title is required").max(200),
  company_name: z.string().min(1, "Company name is required").max(200),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").max(50),
  website: z.string().max(500).optional(),
  hq_country: z.string().min(1, "HQ country is required").max(100),
  year_founded: z.string().min(1, "Year founded is required").max(10),
  primary_sector: z.string().min(1, "Primary sector is required"),
  primary_sector_other: z.string().max(200).optional(),
  revenue_band: z.string().optional(),
  last_12_months_revenue: z.string().max(100).optional(),
  ebitda_status: z.string().min(1, "EBITDA status is required"),
  profit_margin: z.string().max(50).optional(),
  desired_outcome: z.string().min(1, "Please describe your desired outcome").max(2000),
  mandates: z.array(z.string()).min(1, "Please select at least one mandate"),
  advisory_mandate: z.string().min(1, "Please select an option"),
  gcc_readiness: z.array(z.string()).optional(),
  accommodation_type: z.string().optional(),
  office_space_type: z.string().optional(),
  // Sector-specific fields
  frontier_core_tech: z.string().max(2000).optional(),
  frontier_deployment_proof: z.string().max(2000).optional(),
  frontier_saudi_relevance: z.string().max(2000).optional(),
  sports_control_own: z.string().max(2000).optional(),
  sports_revenue_drivers: z.string().max(2000).optional(),
  sports_saudi_strategy: z.string().max(2000).optional(),
  energy_value_chain: z.string().max(2000).optional(),
  energy_contracted_vs_spot: z.string().max(2000).optional(),
  energy_saudi_importance: z.string().max(2000).optional(),
  education_model: z.string().max(2000).optional(),
  education_regulation: z.string().max(2000).optional(),
  education_gap: z.string().max(2000).optional(),
  art_core_business: z.string().max(2000).optional(),
  art_revenue_model: z.string().max(2000).optional(),
  art_saudi_role: z.string().max(2000).optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

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

const primarySectors = [
  { value: "frontier_technology", label: "Frontier Tech", icon: Cpu },
  { value: "sports_entertainment", label: "Sports & Entertainment", icon: Trophy },
  { value: "energy", label: "Energy", icon: Zap },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "art_lifestyle", label: "Art & Lifestyle", icon: Palette },
  { value: "other", label: "Other", icon: MoreHorizontal },
];

// Using allCountries from shared data file - already sorted alphabetically

const revenueBands = [
  { value: "under_10m", label: "<$10M", icon: Coins, description: "Early stage" },
  { value: "10_25m", label: "$10–25M", icon: BarChart3, description: "Scaling" },
  { value: "25_50m", label: "$25–50M", icon: Building2, description: "Growth" },
  { value: "50_100m", label: "$50–100M", icon: Rocket, description: "Expansion" },
  { value: "100m_plus", label: "$100M+", icon: Crown, description: "Enterprise" },
];

const ebitdaStatuses = [
  { value: "profitable", label: "Profitable", icon: TrendingUp, color: "text-green-600" },
  { value: "breakeven", label: "Break-even", icon: Minus, color: "text-amber-600" },
  { value: "loss_improving", label: "Improving", description: "Loss-making but improving", icon: TrendingUp, color: "text-blue-600" },
  { value: "loss_making", label: "Loss-making", icon: TrendingDown, color: "text-red-600" },
];

const mandateOptions = [
  { id: "strategic_advisory", label: "Strategic advisory & positioning" },
  { id: "partnership_development", label: "Partnership development" },
  { id: "market_entry", label: "Market entry / KSA or GCC setup" },
  { id: "jv_alliance", label: "Joint venture or alliance exploration" },
  { id: "regional_advisory", label: "Ongoing regional advisory support" },
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

  // Removed auto-focus on first input

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      full_name: "",
      role_title: "",
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
      accommodation_type: "",
      office_space_type: "",
      // Sector-specific fields
      frontier_core_tech: "",
      frontier_deployment_proof: "",
      frontier_saudi_relevance: "",
      sports_control_own: "",
      sports_revenue_drivers: "",
      sports_saudi_strategy: "",
      energy_value_chain: "",
      energy_contracted_vs_spot: "",
      energy_saudi_importance: "",
      education_model: "",
      education_regulation: "",
      education_gap: "",
      art_core_business: "",
      art_revenue_model: "",
      art_saudi_role: "",
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
      let fileUrl = "";
      
      // Upload file to Supabase Storage if present
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${data.company_name.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
        const filePath = `company-decks/${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('partnership_files')
          .upload(filePath, uploadedFile);
        
        if (uploadError) {
          console.error('File upload error:', uploadError);
          toast.error('Failed to upload file. Submitting without attachment.');
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('partnership_files')
            .getPublicUrl(filePath);
          fileUrl = urlData.publicUrl;
        }
      }

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
          additional_info: fileUrl || null,
        });

      if (error) throw error;

      // Send to Google Sheets
      try {
        const sector = data.primary_sector === "other" ? data.primary_sector_other : 
          primarySectors.find(s => s.value === data.primary_sector)?.label || data.primary_sector;
        const revenueBandLabel = revenueBands.find(r => r.value === data.revenue_band)?.label || data.revenue_band || "";
        const ebitdaLabel = ebitdaStatuses.find(e => e.value === data.ebitda_status)?.label || data.ebitda_status;
        const mandateLabels = data.mandates.map(m => mandateOptions.find(o => o.id === m)?.label || m).join(", ");
        const gccReadinessLabels = (data.gcc_readiness || []).map(g => gccReadinessOptions.find(o => o.id === g)?.label || g).join(", ");
        const accommodationLabel = accommodationOptions.find(a => a.value === data.accommodation_type)?.label || data.accommodation_type || "";
        const officeSpaceLabel = officeSpaceOptions.find(o => o.value === data.office_space_type)?.label || data.office_space_type || "";
        
        await supabase.functions.invoke('send-to-google-sheets', {
          body: {
            type: "Companies",
            headers: [
              "Submitted At", "Company Name", "Email", "Phone", "Website", "HQ Country", 
              "Year Founded", "Primary Sector", "Revenue Band", "Last 12 Months Revenue", 
              "EBITDA Status", "Profit Margin", "Desired Outcome", "Mandates", 
              "Advisory Mandate", "GCC Readiness", "Accommodation", "Office Space", "Deck URL"
            ],
            values: [
              new Date().toISOString(),
              data.company_name,
              data.email,
              data.phone,
              data.website || "",
              data.hq_country,
              data.year_founded,
              sector,
              revenueBandLabel,
              data.last_12_months_revenue || "",
              ebitdaLabel,
              data.profit_margin || "",
              data.desired_outcome,
              mandateLabels,
              data.advisory_mandate,
              gccReadinessLabels,
              accommodationLabel,
              officeSpaceLabel,
              fileUrl
            ]
          }
        });
      } catch (sheetError) {
        console.error('Error sending to Google Sheets:', sheetError);
      }

      // Send confirmation email with all form details
      try {
        const sector = data.primary_sector === "other" ? data.primary_sector_other : 
          primarySectors.find(s => s.value === data.primary_sector)?.label || data.primary_sector;
        const revenueBandLabel = revenueBands.find(r => r.value === data.revenue_band)?.label || data.revenue_band || "";
        const ebitdaLabel = ebitdaStatuses.find(e => e.value === data.ebitda_status)?.label || data.ebitda_status;
        const mandateLabels = data.mandates.map(m => mandateOptions.find(o => o.id === m)?.label || m);
        const gccReadinessLabels = (data.gcc_readiness || []).map(g => gccReadinessOptions.find(o => o.id === g)?.label || g);
        const accommodationLabel = accommodationOptions.find(a => a.value === data.accommodation_type)?.label || "";
        const officeSpaceLabel = officeSpaceOptions.find(o => o.value === data.office_space_type)?.label || "";
        
        await supabase.functions.invoke('send-partnership-confirmation', {
          body: {
            applicationType: 'company',
            email: data.email,
            formData: {
              full_name: data.full_name,
              role_title: data.role_title,
              company_name: data.company_name,
              email: data.email,
              phone: data.phone,
              website: data.website || null,
              hq_country: data.hq_country,
              year_founded: data.year_founded,
              primary_sector: sector,
              revenue_band: revenueBandLabel,
              last_12_months_revenue: data.last_12_months_revenue || null,
              ebitda_status: ebitdaLabel,
              profit_margin: data.profit_margin || null,
              desired_outcome: data.desired_outcome,
              mandates: mandateLabels,
              advisory_mandate: data.advisory_mandate,
              gcc_readiness: gccReadinessLabels.length > 0 ? gccReadinessLabels : null,
              accommodation: accommodationLabel || null,
              office_space: officeSpaceLabel || null,
              deck_url: fileUrl || null,
            }
          }
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      toast.success("Application submitted successfully!");
      setIsSubmitted(true);
      setUploadedFile(null);
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
          NIAS works with a small number of post-revenue companies exploring strategic partnerships, international expansion, and long-term growth across Saudi Arabia and the GCC. We typically engage with companies at $50M+ revenue, or with a very clear path there within 12–18 months.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Section 1: Contact Information (Easy fields first for momentum) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} ref={firstInputRef} />
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role (Job Title)</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO, Managing Director, etc." {...field} />
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
            </div>
          </div>

          {/* Section 2: Company Information */}
          <div className="border-t pt-5 space-y-4">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company Ltd." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="hq_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HQ Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {allCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 3: Business Profile (Qualifying questions) */}
          <div className="border-t pt-5">
          <FormField
            control={form.control}
            name="primary_sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Sector</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {primarySectors.map((sector) => {
                      const Icon = sector.icon;
                      const isSelected = field.value === sector.value;
                      return (
                        <button
                          key={sector.value}
                          type="button"
                          onClick={() => field.onChange(sector.value)}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-background hover:bg-muted/50"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-xs font-medium text-center leading-tight", isSelected ? "text-primary" : "text-foreground")}>
                            {sector.label}
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

          {/* Frontier Technology Follow-ups */}
          {watchedPrimarySector === "frontier_technology" && (
            <div className="space-y-5 p-4 rounded-lg border border-border bg-muted/20">
              <FormField
                control={form.control}
                name="frontier_core_tech"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the core technology you have built or own?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="AI, computer vision, robotics, biotech, advanced materials, deep infrastructure software, other..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frontier_deployment_proof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What proof of real-world deployment do you have today?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Live customers, production contracts, government pilots, enterprise deployments..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frontier_saudi_relevance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why is Saudi Arabia strategically relevant to your technology's next phase?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Scale, data access, infrastructure, capital, sovereign partners, regulatory advantage..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Sports & Entertainment Follow-ups */}
          {watchedPrimarySector === "sports_entertainment" && (
            <div className="space-y-5 p-4 rounded-lg border border-border bg-muted/20">
              <FormField
                control={form.control}
                name="sports_control_own"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you control or own?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="IP, league or franchise rights, media rights, venues, talent contracts..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sports_revenue_drivers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your primary revenue drivers today?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Media, sponsorships, ticketing, licensing, government contracts..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sports_saudi_strategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How would Saudi Arabia fit into your growth strategy?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Anchor market, production hub, regional HQ, capital partner..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Energy Follow-ups */}
          {watchedPrimarySector === "energy" && (
            <div className="space-y-5 p-4 rounded-lg border border-border bg-muted/20">
              <FormField
                control={form.control}
                name="energy_value_chain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where do you sit in the energy value chain?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Upstream, midstream, downstream, infrastructure, transition..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energy_contracted_vs_spot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What percentage of your revenues are contracted versus spot?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., 70% contracted, 30% spot..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="energy_saudi_importance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why is Saudi Arabia strategically important to your energy roadmap?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your strategic rationale..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Education Follow-ups */}
          {watchedPrimarySector === "education" && (
            <div className="space-y-5 p-4 rounded-lg border border-border bg-muted/20">
              <FormField
                control={form.control}
                name="education_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What education model do you operate?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="K–12, higher ed, vocational, executive, EdTech, hybrid..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education_regulation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How regulated is your business and have you operated in regulated markets before?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your regulatory experience..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education_gap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What specific gap in Saudi or GCC education does your model address?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the gap you address..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Art & Lifestyle Follow-ups */}
          {watchedPrimarySector === "art_lifestyle" && (
            <div className="space-y-5 p-4 rounded-lg border border-border bg-muted/20">
              <FormField
                control={form.control}
                name="art_core_business"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the core of your business?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Platform, gallery, IP, cultural production, lifestyle brand..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="art_revenue_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How repeatable or scalable is your revenue model?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your revenue model..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="art_saudi_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What long-term role do you see Saudi Arabia playing for your brand?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your vision for Saudi Arabia..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Revenue Band */}
          <FormField
            control={form.control}
            name="revenue_band"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue Band</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {revenueBands.map((band) => {
                      const Icon = band.icon;
                      const isSelected = field.value === band.value;
                      return (
                        <button
                          key={band.value}
                          type="button"
                          onClick={() => field.onChange(band.value)}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-background hover:bg-muted/50"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                            {band.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-0.5">{band.description}</span>
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
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
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ebitdaStatuses.map((status) => {
                      const Icon = status.icon;
                      const isSelected = field.value === status.value;
                      return (
                        <button
                          key={status.value}
                          type="button"
                          onClick={() => field.onChange(status.value)}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-background hover:bg-muted/50"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : status.color)} />
                          <span className={cn("text-sm font-medium text-center", isSelected ? "text-primary" : "text-foreground")}>
                            {status.label}
                          </span>
                          {status.description && (
                            <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">
                              {status.description}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
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
          </div>

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
                        placeholder="Strategic partnerships, international expansion, joint ventures, regional M&A exploration, shareholder planning, other…"
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

              {/* Advisory Mandate */}
              <FormField
                control={form.control}
                name="advisory_mandate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Would you consider engaging NIAS as a regional strategic advisor if aligned?</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {[
                          { value: "yes", label: "Yes" },
                          { value: "potentially", label: "Potentially" },
                          { value: "no", label: "No" },
                        ].map((option) => {
                          const isSelected = field.value === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={cn(
                                "flex items-center justify-center py-3 px-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50",
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border bg-background hover:bg-muted/50"
                              )}
                            >
                              <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                                {option.label}
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

              {/* GCC Readiness */}
              <FormField
                control={form.control}
                name="gcc_readiness"
                render={() => (
                  <FormItem>
                    <FormLabel>GCC Readiness</FormLabel>
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

              {/* Regional Presence Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-sm font-medium text-foreground mb-1">Regional Presence</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  We recommend spending at least 5 days in the region every 2 months. How can we support your executives?
                </p>
                
                {/* Accommodation */}
                <FormField
                  control={form.control}
                  name="accommodation_type"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Executive Accommodation</FormLabel>
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

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Latest investor deck or info memo (PDF)</Label>
                <p className="text-sm text-muted-foreground">Optional · Max 20MB</p>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file && file.size > 20 * 1024 * 1024) {
                      e.target.value = '';
                      setUploadedFile(null);
                      alert('File size must be less than 20MB');
                      return;
                    }
                    setUploadedFile(file);
                  }}
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {uploadedFile.name} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)}MB)
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
