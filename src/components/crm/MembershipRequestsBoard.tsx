
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ContactCard from "./ContactCard";

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

const stages = [
  { id: 'pending', label: 'Pending Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

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
        table: 'Request' 
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

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageRequests = requests.filter(r => 
          stage.id === 'pending' ? !r.request_status || r.request_status === 'pending' 
          : r.request_status === stage.id
        );
        
        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stage.label}</h3>
                <span className="text-sm text-gray-500">
                  {stageRequests.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageRequests.map(request => (
                  <ContactCard 
                    key={request.id} 
                    contact={{
                      id: request.id,
                      first_name: request.first_name || '',
                      last_name: request.last_name || '',
                      email: request.email || '',
                      company: request.company || '',
                      title: request.title || '',
                      stage: 'mql_lead',
                      source: 'network_request',
                      source_id: request.id
                    }}
                    onUpdate={fetchRequests}
                  />
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MembershipRequestsBoard;
