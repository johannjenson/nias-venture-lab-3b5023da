
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatabaseZap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AIOptionsDropdown = () => {
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
    <div className="ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sparkles className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleInferIndustries}>
            <DatabaseZap className="mr-2 h-4 w-4" />
            Infer Industries
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
