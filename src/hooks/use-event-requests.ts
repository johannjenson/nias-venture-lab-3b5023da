
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventRequest } from "@/types/event-requests";
import { useToast } from "@/hooks/use-toast";

export const useEventRequests = () => {
  const [dinnerRequests, setDinnerRequests] = useState<EventRequest[]>([]);
  const [forumRequests, setForumRequests] = useState<EventRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('event_requests_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'event_requests' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRequests = async () => {
    const { data: dinnerData, error: dinnerError } = await supabase
      .from('dinner_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (dinnerError) {
      toast({
        title: "Error fetching dinner requests",
        description: dinnerError.message,
        variant: "destructive",
      });
      return;
    }

    setDinnerRequests(dinnerData || []);

    const { data: forumData, error: forumError } = await supabase
      .from('forum_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (forumError) {
      toast({
        title: "Error fetching forum requests",
        description: forumError.message,
        variant: "destructive",
      });
      return;
    }

    setForumRequests(forumData || []);
  };

  const updateRequestStatus = async (requestId: number, status: string, type: 'dinner' | 'forum') => {
    // First get the request details so we can send the email
    const { data: requestData, error: fetchError } = await supabase
      .from('event_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError) {
      toast({
        title: "Error fetching request details",
        description: fetchError.message,
        variant: "destructive",
      });
      return;
    }

    // Update the status in the database
    const { error: updateError } = await supabase
      .from('event_requests')
      .update({ request_status: status })
      .eq('id', requestId)
      .eq('event_type', type);

    if (updateError) {
      toast({
        title: "Error updating request status",
        description: updateError.message,
        variant: "destructive",
      });
      return;
    }

    // Send status update email if the status is approved, rejected, or waitlist
    if (['approved', 'rejected', 'waitlist'].includes(status)) {
      try {
        const { error: emailError } = await supabase.functions.invoke('send-event-status', {
          body: {
            eventType: type,
            status,
            fullName: requestData.name,
            email: requestData.email,
          },
        });

        if (emailError) {
          console.error('Error sending status update email:', emailError);
          toast({
            title: "Status updated but email failed",
            description: "The status was updated but we couldn't send the notification email.",
            variant: "destructive",
          });
          return;
        }
      } catch (emailError) {
        console.error('Error invoking send-event-status function:', emailError);
      }
    }

    toast({
      title: "Status updated",
      description: `Request has been moved to ${status}`,
    });

    fetchRequests();
  };

  return {
    dinnerRequests,
    forumRequests,
    updateRequestStatus,
  };
};
