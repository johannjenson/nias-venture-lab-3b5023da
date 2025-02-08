
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

      if (error || !eventRequest?.notes_uuid) {
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
      
      type RequestData = { email: string };
      const { data, error: membershipError } = await supabase
        .from('Request')
        .select('email')
        .eq('id', requestId)
        .single<RequestData>();

      if (membershipError || !data?.email) return null;

      type ContactData = { id: string };
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', data.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
        .single<ContactData>();

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
