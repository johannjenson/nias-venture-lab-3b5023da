
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
      const { data: eventRequest } = await supabase
        .from('event_requests')
        .select<'event_requests', EventRequest>('notes_uuid')
        .eq('id', eventId)
        .maybeSingle();

      if (!eventRequest?.notes_uuid) {
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
      const { data: membershipRequest } = await supabase
        .from('Request')
        .select<'Request', MembershipRequest>('email')
        .eq('id', requestId)
        .maybeSingle();

      if (!membershipRequest?.email) return null;

      const { data: contact } = await supabase
        .from('contacts')
        .select<'contacts', Contact>('id')
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
