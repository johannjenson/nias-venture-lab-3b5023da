
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type EventRequest = {
  id: number;
  notes_uuid: string;
};

type MembershipRequest = {
  id: number;
  email: string;
};

type Contact = {
  id: string;
  email: string;
  source: string;
  source_id: string;
};

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string): Promise<string | null> => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest, error: eventError } = await supabase
        .from('event_requests')
        .select('notes_uuid')
        .eq('id', eventId)
        .single();

      if (eventError || !eventRequest?.notes_uuid) {
        toast({
          title: "Error fetching contact ID",
          description: "Could not find the event request",
          variant: "destructive",
        });
        return null;
      }
      
      return eventRequest.notes_uuid;
    }

    if (prefixedId.startsWith('membership_')) {
      const requestId = parseInt(prefixedId.replace('membership_', ''), 10);
      const { data: membershipRequest, error: membershipError } = await supabase
        .from('Request')
        .select('email')
        .eq('id', requestId)
        .single();

      if (membershipError || !membershipRequest?.email) return null;

      const { data: contact } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', membershipRequest.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
        .maybeSingle();

      if (!contact?.id) {
        toast({
          title: "Error fetching contact ID",
          description: "Could not find the contact",
          variant: "destructive",
        });
        return null;
      }

      return contact.id;
    }

    if (prefixedId.startsWith('contact_')) {
      return prefixedId.replace('contact_', '');
    }

    return prefixedId;
  };

  return getActualContactId;
};
