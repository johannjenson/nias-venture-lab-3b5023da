
import { Button } from "@/components/ui/button";
import { DatabaseZap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const InferIndustriesButton = () => {
  const { toast } = useToast();

  const handleInferIndustries = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('infer-contact-industries');
      
      if (error) throw error;

      toast({
        title: "Industries Inferred",
        description: data.message,
      });
    } catch (error) {
      console.error('Error inferring industries:', error);
      toast({
        title: "Error",
        description: "Failed to infer industries. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleInferIndustries} variant="outline">
      <DatabaseZap className="mr-2 h-4 w-4" />
      Infer Industries
    </Button>
  );
};
