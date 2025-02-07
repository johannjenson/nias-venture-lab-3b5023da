
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
    const { error } = await supabase
      .from('event_requests')
      .update({ request_status: status })
      .eq('id', requestId)
      .eq('event_type', type === 'dinner' ? 'dinner' : 'forum');

    if (error) {
      toast({
        title: "Error updating request status",
        description: error.message,
        variant: "destructive",
      });
      return;
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
