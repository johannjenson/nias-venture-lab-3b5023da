
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MembershipCard } from "./MembershipCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MembershipRequest = {
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

const MembershipRequestsBoard = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);
  const { toast } = useToast();

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

  const updateRequestStatus = async (requestId: string, status: string) => {
    // If the new status is 'approved', create an account for the member
    if (status === 'approved') {
      const request = requests.find(r => r.id === requestId);
      if (!request || !request.email || !request.first_name) {
        toast({
          title: "Error approving request",
          description: "Missing required information for account creation",
          variant: "destructive",
        });
        return;
      }

      try {
        const { error: createAccountError } = await supabase.functions.invoke('create-approved-member', {
          body: {
            requestId,
            email: request.email,
            firstName: request.first_name,
            lastName: request.last_name || '',
          },
        });

        if (createAccountError) {
          throw createAccountError;
        }

        toast({
          title: "Request approved",
          description: "Account has been created and a password reset email has been sent.",
        });
      } catch (error) {
        console.error('Error creating account:', error);
        toast({
          title: "Error creating account",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    } else {
      // For other status updates, just update the status
      const { error } = await supabase
        .from('membership_requests')
        .update({ request_status: status })
        .eq('id', requestId);

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
        description: `Request status has been updated to ${status}`,
      });
    }

    fetchRequests();
  };

  const filterRequests = (status: string | null) => {
    if (status === 'pending') {
      return requests.filter(r => !r.request_status || r.request_status === 'pending');
    }
    return requests.filter(r => r.request_status === status);
  };

  return (
    <div className="space-y-4 bg-[#F5F2EB] p-6 rounded-lg">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4">
            {requests.map(request => (
              <MembershipCard 
                key={request.id} 
                request={request}
                onUpdateStatus={updateRequestStatus}
              />
            ))}
          </div>
        </TabsContent>

        {['pending', 'waitlist', 'approved', 'rejected'].map(status => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-4">
              {filterRequests(status).map(request => (
                <MembershipCard 
                  key={request.id} 
                  request={request}
                  onUpdateStatus={updateRequestStatus}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MembershipRequestsBoard;
