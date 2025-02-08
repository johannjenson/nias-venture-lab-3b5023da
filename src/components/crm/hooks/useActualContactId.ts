
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string) => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest, error } = await supabase
        .from('event_requests')
        .select('uuid_id')
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
      
      return eventRequest?.uuid_id;
    }

    if (prefixedId.startsWith('membership_')) {
      const requestId = parseInt(prefixedId.replace('membership_', ''), 10);
      const { data: membershipRequest, error } = await supabase
        .from('Request')
        .select('*')
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

      // Find the corresponding contact for this membership request
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', membershipRequest.email)
        .single();

      if (contactError) {
        toast({
          title: "Error fetching contact ID",
          description: contactError.message,
          variant: "destructive",
        });
        return null;
      }

      return contact?.id;
    }

    return prefixedId;
  };

  return getActualContactId;
};
