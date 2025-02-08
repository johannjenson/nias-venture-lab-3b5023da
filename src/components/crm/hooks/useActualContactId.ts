
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string): Promise<string | null> => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest, error } = await supabase
        .from('event_requests')
        .select('notes_uuid')
        .eq('id', eventId)
        .single();

      if (error) {
        toast({
          title: "Error fetching contact ID",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      return eventRequest?.notes_uuid || null;
    }

    if (prefixedId.startsWith('membership_')) {
      const requestId = parseInt(prefixedId.replace('membership_', ''), 10);
      const { data: membershipRequest, error } = await supabase
        .from('Request')
        .select('email')
        .eq('id', requestId)
        .single();

      if (error) {
        toast({
          title: "Error fetching contact ID",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      if (!membershipRequest?.email) return null;

      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', membershipRequest.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
        .single();

      if (contactError) {
        toast({
          title: "Error fetching contact ID",
          description: contactError.message,
          variant: "destructive",
        });
        return null;
      }

      return contact?.id || null;
    }

    if (prefixedId.startsWith('contact_')) {
      return prefixedId.replace('contact_', '');
    }

    return prefixedId;
  };

  return getActualContactId;
};
