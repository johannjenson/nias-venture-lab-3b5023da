
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export type MembershipRequest = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  title: string | null;
  linkedin_url: string | null;
  referred_by: string | null;
  additional_info: string | null;
  request_status: string | null;
  created_at: string;
};

export const useMembershipRequests = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);
  const { toast } = useToast();

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('membership_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching membership requests",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setRequests(data || []);
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('requests_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'membership_requests' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filterRequests = (status: string | null) => {
    if (status === 'pending') {
      return requests.filter(r => !r.request_status || r.request_status === 'pending');
    }
    return requests.filter(r => r.request_status === status);
  };

  return {
    requests,
    filterRequests,
    fetchRequests
  };
};
