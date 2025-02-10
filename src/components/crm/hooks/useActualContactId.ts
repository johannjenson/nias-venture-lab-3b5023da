
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type EventRequest = Database['public']['Tables']['event_requests']['Row'];
type MembershipRequest = Database['public']['Tables']['Request']['Row'];
type Contact = Database['public']['Tables']['contacts']['Row'];

export const useActualContactId = () => {
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string): Promise<string | null> => {
    if (prefixedId.startsWith('forum_')) {
      const forumId = parseInt(prefixedId.replace('forum_', ''), 10);
      const { data: forumRequest, error } = await supabase
        .from('event_requests')
        .select('*')
        .eq('id', forumId)
        .maybeSingle();

      if (error || !forumRequest) {
        toast({
          title: "Error fetching contact ID",
          description: "Could not find the forum request",
          variant: "destructive",
        });
        return null;
      }
      
      return forumRequest.notes_uuid ?? null;
    }

    if (prefixedId.startsWith('membership_')) {
      const requestId = parseInt(prefixedId.replace('membership_', ''), 10);
      
      const { data: membershipRequest, error: membershipError } = await supabase
        .from('Request')
        .select('*')
        .eq('id', requestId)
        .maybeSingle();

      if (membershipError || !membershipRequest?.email) return null;

      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .eq('email', membershipRequest.email)
        .eq('source', 'network_request')
        .eq('source_id', requestId.toString())
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

