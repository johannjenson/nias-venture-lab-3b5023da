import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const InferIndustriesButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInferIndustries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('infer-contact-industries');
      
      if (error) throw error;

      toast({
        title: "Industries Updated",
        description: data.message,
      });

    } catch (error) {
      console.error('Error inferring industries:', error);
      toast({
        title: "Error",
        description: "Failed to infer industries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleInferIndustries}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating Industries...
        </>
      ) : (
        'Infer Industries'
      )}
    </Button>
  );
};