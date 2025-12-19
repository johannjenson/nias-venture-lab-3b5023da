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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Hotel, Home, Building, Briefcase, Users, Building2, X } from "lucide-react";
import PhoneInputWithCode from "./PhoneInputWithCode";
import { cn } from "@/lib/utils";

const advisorSchema = z.object({
  advisor_name: z.string().min(1, "Advisor/firm name is required").max(200),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").max(50),
  advisor_role: z.string().min(1, "Please describe your advisory role").max(1000),
  opportunity_description: z.string().min(1, "Please describe the opportunity").max(2000),
  relationship_type: z.string().min(1, "Please select your relationship"),
  relationship_other: z.string().max(500).optional(),
  gulf_relevance: z.string().min(1, "Please explain the Gulf relevance").max(2000),
  opportunity_type: z.enum(["company", "fund"], {
    required_error: "Please select opportunity type",
  }),
  company_revenue_band: z.string().optional(),
  company_footprint: z.string().max(1000).optional(),
  fund_aum_band: z.string().optional(),
  fund_sector_focus: z.string().max(1000).optional(),
  partnership_engagement_type: z.string().min(1, "Please select engagement type"),
  partnership_engagement_details: z.string().max(1000).optional(),
  accommodation_type: z.string().optional(),
  office_space_type: z.string().optional(),
  additional_info: z.string().max(2000).optional(),
});

type AdvisorFormData = z.infer<typeof advisorSchema>;

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

const AdvisorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const form = useForm<AdvisorFormData>({
    resolver: zodResolver(advisorSchema),
    defaultValues: {
      advisor_name: "",
      email: "",
      phone: "",
      advisor_role: "",
      opportunity_description: "",
      relationship_type: "",
      relationship_other: "",
      gulf_relevance: "",
      opportunity_type: "company",
      company_revenue_band: "",
      company_footprint: "",
      fund_aum_band: "",
      fund_sector_focus: "",
      partnership_engagement_type: "",
      partnership_engagement_details: "",
      accommodation_type: "",
      office_space_type: "",
      additional_info: "",
    },
  });

  const opportunityType = form.watch("opportunity_type");
  const relationshipType = form.watch("relationship_type");

  const onSubmit = async (data: AdvisorFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("partnership_applications" as any)
        .insert({
          application_type: "advisor",
          advisor_name: data.advisor_name,
          company_name: data.email,
          advisor_role: data.phone + " | " + data.advisor_role,
          opportunity_description: data.opportunity_description,
          relationship_type: data.relationship_type === "other" 
            ? data.relationship_other 
            : data.relationship_type,
          gulf_relevance: data.gulf_relevance,
          opportunity_type: data.opportunity_type,
          company_revenue_band: data.opportunity_type === "company" ? data.company_revenue_band : null,
          company_footprint: data.opportunity_type === "company" ? data.company_footprint : null,
          fund_aum_band: data.opportunity_type === "fund" ? data.fund_aum_band : null,
          fund_sector_focus: data.opportunity_type === "fund" ? data.fund_sector_focus : null,
          partnership_engagement_type: data.partnership_engagement_type,
          partnership_engagement_details: data.partnership_engagement_details || null,
          additional_info: data.additional_info || null,
        });

      if (error) throw error;

      // Send to Google Sheets
      try {
        const accommodationLabel = accommodationOptions.find(a => a.value === data.accommodation_type)?.label || data.accommodation_type || "";
        const officeSpaceLabel = officeSpaceOptions.find(o => o.value === data.office_space_type)?.label || data.office_space_type || "";
        
        await supabase.functions.invoke('send-to-google-sheets', {
          body: {
            type: "Advisors",
            headers: [
              "Submitted At", "Advisor Name", "Email", "Phone", "Advisory Role", 
              "Opportunity Description", "Relationship Type", "Gulf Relevance", 
              "Opportunity Type", "Company Revenue Band", "Company Footprint", 
              "Fund AUM Band", "Fund Sector Focus", "Engagement Type", 
              "Engagement Details", "Accommodation", "Office Space", "Additional Info"
            ],
            values: [
              new Date().toISOString(),
              data.advisor_name,
              data.email,
              data.phone,
              data.advisor_role,
              data.opportunity_description,
              data.relationship_type === "other" ? data.relationship_other : data.relationship_type,
              data.gulf_relevance,
              data.opportunity_type,
              data.company_revenue_band || "",
              data.company_footprint || "",
              data.fund_aum_band || "",
              data.fund_sector_focus || "",
              data.partnership_engagement_type,
              data.partnership_engagement_details || "",
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
            applicationType: 'advisor',
            email: data.email,
            advisorName: data.advisor_name,
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
        <h2 className="text-lg font-medium text-foreground mb-1">Advisors</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          For trusted advisors sharing high-quality dealflow with NIAS
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="advisor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advisor or Advisory Firm Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name or firm" {...field} ref={firstInputRef} />
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
                  <Input type="email" placeholder="contact@advisory.com" {...field} />
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
            name="advisor_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nature of Your Advisory Role</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., strategic advisor, board member, consultant, introducer, banker, operator, subject-matter expert..."
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
            name="opportunity_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe the Opportunity</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Company, fund, or transaction context — no confidential information required..."
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationship_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Relationship With the Company/Fund</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="direct_advisor">Direct advisor</SelectItem>
                    <SelectItem value="board_member">Board/committee member</SelectItem>
                    <SelectItem value="consultant">Long-term consultant</SelectItem>
                    <SelectItem value="strategic_partner">Strategic partner</SelectItem>
                    <SelectItem value="friend_founders">Friend of the founders</SelectItem>
                    <SelectItem value="introducer">Introducer with indirect connection</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {relationshipType === "other" && (
            <FormField
              control={form.control}
              name="relationship_other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please specify your relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe your relationship..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="gulf_relevance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gulf Relevance</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Sector alignment, market readiness, regional value..."
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Maturity & Metrics of the Opportunity</h3>
            
            <FormField
              control={form.control}
              name="opportunity_type"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Choose one track depending on what you're sharing</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="company" id="company" />
                        <Label htmlFor="company" className="cursor-pointer">Company</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fund" id="fund" />
                        <Label htmlFor="fund" className="cursor-pointer">Fund</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {opportunityType === "company" && (
              <>
                <FormField
                  control={form.control}
                  name="company_revenue_band"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue band (USD)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select revenue band" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="25-100m">$25–100M</SelectItem>
                          <SelectItem value="100-250m">$100–250M</SelectItem>
                          <SelectItem value="250m+">$250M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_footprint"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Geographic footprint</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List countries of operation..."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {opportunityType === "fund" && (
              <>
                <FormField
                  control={form.control}
                  name="fund_aum_band"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AUM band</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select AUM band" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="<100m">&lt;$100M</SelectItem>
                          <SelectItem value="100-500m">$100–500M</SelectItem>
                          <SelectItem value="500m+">$500M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fund_sector_focus"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Sector focus</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe primary sector focus..."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <FormField
            control={form.control}
            name="partnership_engagement_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partnership or Engagement Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select engagement type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="strategic_collaboration">Strategic collaboration</SelectItem>
                    <SelectItem value="expansion_support">Expansion support</SelectItem>
                    <SelectItem value="co_hosting">Co-hosting gatherings</SelectItem>
                    <SelectItem value="ecosystem_partnerships">Ecosystem partnerships</SelectItem>
                    <SelectItem value="intelligence_reports">Intelligence/report inclusion</SelectItem>
                    <SelectItem value="share_dealflow">Share dealflow</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="partnership_engagement_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional engagement details (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Provide more context..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Regional Presence Section */}
          <div className="border-t pt-6 mt-2">
            <h3 className="text-sm font-medium text-foreground mb-1">Regional Presence</h3>
            <p className="text-xs text-muted-foreground mb-4">
              We recommend spending at least 5 days in the region every 2 months. How can we support your team?
            </p>
            
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
                              isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:bg-muted/50"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-sm font-medium text-center", isSelected ? "text-primary" : "text-foreground")}>{option.label}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">{option.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                              isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:bg-muted/50"
                            )}
                          >
                            <Icon className={cn("h-5 w-5 mb-1.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-sm font-medium text-center", isSelected ? "text-primary" : "text-foreground")}>{option.label}</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5 text-center leading-tight">{option.description}</span>
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

export default AdvisorForm;
