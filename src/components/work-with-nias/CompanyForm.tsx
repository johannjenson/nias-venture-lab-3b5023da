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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const companySchema = z.object({
  company_name: z.string().min(1, "Company name is required").max(200),
  revenue_usd: z.string().min(1, "Revenue is required").max(100),
  profit_margin: z.string().min(1, "Profit margin is required").max(50),
  growth_rate: z.string().min(1, "Growth rate is required").max(50),
  geographic_footprint: z.string().min(1, "Geographic footprint is required").max(1000),
  gulf_expansion_plans: z.string().min(1, "Expansion plans are required").max(2000),
  strategic_metric_type: z.string().min(1, "Please select a metric"),
  strategic_metric_value: z.string().max(500).optional(),
  additional_info: z.string().max(2000).optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      company_name: "",
      revenue_usd: "",
      profit_margin: "",
      growth_rate: "",
      geographic_footprint: "",
      gulf_expansion_plans: "",
      strategic_metric_type: "",
      strategic_metric_value: "",
      additional_info: "",
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("partnership_applications")
        .insert({
          application_type: "company",
          company_name: data.company_name,
          revenue_usd: data.revenue_usd,
          profit_margin: data.profit_margin,
          growth_rate: data.growth_rate,
          geographic_footprint: data.geographic_footprint,
          gulf_expansion_plans: data.gulf_expansion_plans,
          strategic_metric_type: data.strategic_metric_type,
          strategic_metric_value: data.strategic_metric_value || null,
          additional_info: data.additional_info || null,
        });

      if (error) throw error;

      toast.success("Application submitted successfully! We'll be in touch within 7-10 days.");
      form.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Stream 1 — Companies</h2>
        <p className="text-sm text-muted-foreground">
          For operating businesses seeking entry or expansion into the GCC
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="revenue_usd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last 12 Months Revenue (USD)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $150M" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profit_margin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profit Margin (%)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 25%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="growth_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last 12 Months Growth (%)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 40%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="geographic_footprint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geographic Footprint (Countries of Operation)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List countries where you operate..."
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
            name="gulf_expansion_plans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe Your Gulf Expansion Plans</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Outline your strategy, timeline, and objectives..."
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
            name="strategic_metric_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Strategic Metric</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cac">Customer Acquisition Cost (CAC)</SelectItem>
                    <SelectItem value="ltv">LTV / Revenue per Customer</SelectItem>
                    <SelectItem value="ebitda">EBITDA Multiple</SelectItem>
                    <SelectItem value="acv">Average Contract Value (ACV)</SelectItem>
                    <SelectItem value="enterprise">Number of Enterprise Clients</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="strategic_metric_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metric Value (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Provide specific numbers or details..." {...field} />
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

export default CompanyForm;
