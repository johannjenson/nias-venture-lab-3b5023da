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
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const fundSchema = z.object({
  fund_aum_vintage: z.string().min(1, "This field is required").max(2000),
  investment_strategy: z.string().min(1, "This field is required").max(2000),
  historical_performance: z.string().min(1, "This field is required").max(2000),
  gulf_strategy: z.string().min(1, "This field is required").max(2000),
  partnership_type: z.string().min(1, "This field is required").max(2000),
  additional_info: z.string().max(2000).optional(),
});

type FundFormData = z.infer<typeof fundSchema>;

const FundForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FundFormData>({
    resolver: zodResolver(fundSchema),
    defaultValues: {
      fund_aum_vintage: "",
      investment_strategy: "",
      historical_performance: "",
      gulf_strategy: "",
      partnership_type: "",
      additional_info: "",
    },
  });

  const onSubmit = async (data: FundFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("partnership_applications")
        .insert({
          application_type: "fund",
          fund_aum_vintage: data.fund_aum_vintage,
          investment_strategy: data.investment_strategy,
          historical_performance: data.historical_performance,
          gulf_strategy: data.gulf_strategy,
          partnership_type: data.partnership_type,
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
        <h2 className="text-2xl font-bold text-primary mb-2">Stream 2 — Funds</h2>
        <p className="text-sm text-muted-foreground">
          For investment funds seeking Gulf partnerships, co-locations, or LP relationships
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fund_aum_vintage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. What is your fund's total AUM and current fund vintage?</FormLabel>
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
                <FormLabel>2. What is your investment strategy and sector focus?</FormLabel>
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
                <FormLabel>3. What is your historical performance (IRR, TVPI, DPI)?</FormLabel>
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
                <FormLabel>4. How does the Gulf region fit into your fund's long-term strategy?</FormLabel>
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
                <FormLabel>5. What type of partnership or presence are you seeking in the Gulf?</FormLabel>
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

          <FormField
            control={form.control}
            name="additional_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6. Additional Information (Optional)</FormLabel>
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
