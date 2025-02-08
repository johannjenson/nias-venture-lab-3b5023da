
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type EventRequest = Database['public']['Tables']['event_requests']['Row'];
type MembershipRequest = Database['public']['Tables']['Request']['Row'];
type ContactRecord = Database['public']['Tables']['contacts']['Row'];

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string): Promise<string | null> => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest, error: eventError } = await supabase
        .from('event_requests')
        .select<'notes_uuid', Pick<EventRequest, 'notes_uuid'>>('notes_uuid')
        .eq('id', eventId)
        .maybeSingle();

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
        .select<'email', Pick<MembershipRequest, 'email'>>('email')
        .eq('id', requestId)
        .maybeSingle();

      if (membershipError || !membershipRequest?.email) return null;

      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select<'id', Pick<ContactRecord, 'id'>>('id')
        .eq('email', membershipRequest.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
        .maybeSingle();

      if (contactError || !contact?.id) {
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
