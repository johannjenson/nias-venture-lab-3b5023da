
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseRequestDeletionProps {
  requestId: number;
  type: 'membership' | 'event';
  onUpdate: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useRequestDeletion = ({
  requestId,
  type,
  onUpdate,
  onOpenChange,
}: UseRequestDeletionProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    const table = type === 'membership' ? 'Request' : 'event_requests';
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', requestId);

    if (error) {
      toast({
        title: "Error deleting request",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request deleted",
      description: "The request has been successfully deleted",
    });

    onOpenChange(false);
    onUpdate();
  };

  return { handleDelete };
};

