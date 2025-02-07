
import { Button } from "@/components/ui/button";
import { DatabaseZap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const InferIndustriesButton = () => {
  const { toast } = useToast();

  const handleInferIndustries = async () => {
    try {
      const response = await fetch("/api/infer-contact-industries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Industries Inferred",
        description: data.message,
      });
    } catch (error) {
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
