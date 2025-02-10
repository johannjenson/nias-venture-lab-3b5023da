
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type EventRequestRow = Database['public']['Tables']['event_requests']['Row'];
type RequestRow = Database['public']['Tables']['Request']['Row'];
type ContactRow = Database['public']['Tables']['contacts']['Row'];

type EventRequest = Pick<EventRequestRow, 'notes_uuid'>;
type MembershipRequest = Pick<RequestRow, 'email'>;
type Contact = Pick<ContactRow, 'id'>;

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string): Promise<string | null> => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest, error } = await supabase
        .from('event_requests')
        .select('notes_uuid')
        .eq('id', eventId)
        .returns<EventRequest>()
        .maybeSingle();

      if (error || !eventRequest) {
        toast({
          title: "Error fetching contact ID",
          description: "Could not find the event request",
          variant: "destructive",
        });
        return null;
      }
      
      return eventRequest.notes_uuid ?? null;
    }

    if (prefixedId.startsWith('membership_')) {
      const requestId = parseInt(prefixedId.replace('membership_', ''), 10);
      
      const { data: membershipRequest, error: membershipError } = await supabase
        .from('Request')
        .select('email')
        .eq('id', requestId)
        .returns<MembershipRequest>()
        .maybeSingle();

      if (membershipError || !membershipRequest?.email) return null;

      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', membershipRequest.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
        .returns<Contact>()
        .maybeSingle();

      if (contactError || !contact) {
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
