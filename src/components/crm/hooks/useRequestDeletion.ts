
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
    const requestTable = type === 'membership' ? 'Request' : 'event_requests';
    
    try {
      // First, get the contact associated with this request
      const { data: contacts, error: contactFetchError } = await supabase
        .from('contacts')
        .select('id')
        .eq('source', type === 'membership' ? 'network_request' : 'event_request')
        .eq('source_id', requestId.toString());

      if (contactFetchError) {
        toast({
          title: "Error finding associated contact",
          description: contactFetchError.message,
          variant: "destructive",
        });
        return;
      }

      // Delete the original request first
      const { error: requestDeleteError } = await supabase
        .from(requestTable)
        .delete()
        .eq('id', requestId);

      if (requestDeleteError) {
        toast({
          title: "Error deleting request",
          description: requestDeleteError.message,
          variant: "destructive",
        });
        return;
      }

      // Delete the associated contact if found
      if (contacts && contacts.length > 0) {
        const { error: contactDeleteError } = await supabase
          .from('contacts')
          .delete()
          .eq('id', contacts[0].id);

        if (contactDeleteError) {
          toast({
            title: "Error deleting associated contact",
            description: contactDeleteError.message,
            variant: "destructive",
          });
          return;
        }
      }

      // Only if all operations succeeded, close dialog and update UI
      onOpenChange(false);
      onUpdate();

      toast({
        title: "Request deleted",
        description: "The request and associated contact have been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error during deletion",
        description: "An unexpected error occurred while deleting the request",
        variant: "destructive",
      });
    }
  };

  return { handleDelete };
};
