
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "../types/contact-details";

export const useContactUpdates = (onUpdate: () => void) => {
  const { toast } = useToast();

  const updateHeatRating = async (contactId: string, rating: number) => {
    const { error } = await supabase
      .from('contacts')
      .update({ heat_rating: rating })
      .eq('id', contactId);

    if (error) {
      toast({
        title: "Error updating heat rating",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
  };

  const updateGoal = async (contactId: string, goal: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ goal })
      .eq('id', contactId);

    if (error) {
      toast({
        title: "Error updating target",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
    toast({
      title: "Target updated",
      description: "The contact's target has been updated successfully.",
    });
  };

  const updateStage = async (contactId: string, stage: Contact['stage']) => {
    const { error } = await supabase
      .from('contacts')
      .update({ stage })
      .eq('id', contactId);

    if (error) {
      toast({
        title: "Error updating stage",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    onUpdate();
    return true;
  };

  return {
    updateHeatRating,
    updateGoal,
    updateStage
  };
};
