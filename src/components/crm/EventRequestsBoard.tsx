
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventRequest = {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  title: string | null;
  phone_number: string | null;
  interests: string | null;
  request_status: string | null;
  created_at: string;
};

const statuses = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'waitlist', label: 'Waitlist' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const EventRequestsBoard = () => {
  const [dinnerRequests, setDinnerRequests] = useState<EventRequest[]>([]);
  const [forumRequests, setForumRequests] = useState<EventRequest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();

    const dinnerChannel = supabase
      .channel('dinner_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'DinnerRequest' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    const forumChannel = supabase
      .channel('forum_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'EventRequest' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(dinnerChannel);
      supabase.removeChannel(forumChannel);
    };
  }, []);

  const fetchRequests = async () => {
    // Fetch dinner requests
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

    // Transform the data to match EventRequest type
    const transformedDinnerData: EventRequest[] = (dinnerData || []).map(item => ({
      ...item,
      request_status: item.request_status || 'pending',
      id: item.id.toString()
    }));

    setDinnerRequests(transformedDinnerData);

    // Fetch forum requests
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

    // Transform the data to match EventRequest type
    const transformedForumData: EventRequest[] = (forumData || []).map(item => ({
      ...item,
      request_status: item.request_status || 'pending',
      id: item.id.toString()
    }));

    setForumRequests(transformedForumData);
  };

  const updateRequestStatus = async (requestId: string, status: string, type: 'dinner' | 'forum') => {
    const table = type === 'dinner' ? 'DinnerRequest' : 'EventRequest';
    const { error } = await supabase
      .from(table)
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
      description: `Request has been moved to ${status}`,
    });

    fetchRequests();
  };

  const RequestCard = ({ request, type }: { request: EventRequest, type: 'dinner' | 'forum' }) => (
    <Card key={request.id} className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium">{request.name}</h4>
          <p className="text-sm text-gray-500">{request.company}</p>
          <p className="text-sm text-gray-600">{request.title}</p>
          <p className="text-sm text-gray-500 truncate">{request.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {request.request_status || 'Pending'} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                onClick={() => updateRequestStatus(request.id, status.value, type)}
              >
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {request.interests && (
        <div className="text-sm text-gray-600">
          <p className="font-medium">Interests:</p>
          <p>{request.interests}</p>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="dinner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dinner">Dinner Requests</TabsTrigger>
          <TabsTrigger value="forum">Forum Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="dinner">
          <div className="grid gap-4">
            {dinnerRequests.map(request => (
              <RequestCard key={request.id} request={request} type="dinner" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <div className="grid gap-4">
            {forumRequests.map(request => (
              <RequestCard key={request.id} request={request} type="forum" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventRequestsBoard;
