
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ContactCard from "./ContactCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventRequest = {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  title: string | null;
  phone_number: string | null;
  interests: string | null;
  created_at: string;
};

const stages = [
  { id: 'dinner', label: 'Dinner Requests' },
  { id: 'forum', label: 'Forum Requests' },
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

    setDinnerRequests(dinnerData || []);

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

    setForumRequests(forumData || []);
  };

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
              <Card key={request.id} className="p-4">
                <ContactCard 
                  contact={{
                    id: request.id,
                    first_name: request.name || '',
                    last_name: '',
                    email: request.email || '',
                    company: request.company || '',
                    title: request.title || '',
                    stage: 'mql_lead',
                    source: 'dinner_request',
                    source_id: request.id
                  }}
                  onUpdate={fetchRequests}
                />
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <div className="grid gap-4">
            {forumRequests.map(request => (
              <Card key={request.id} className="p-4">
                <ContactCard 
                  contact={{
                    id: request.id,
                    first_name: request.name || '',
                    last_name: '',
                    email: request.email || '',
                    company: request.company || '',
                    title: request.title || '',
                    stage: 'mql_lead',
                    source: 'forum_request',
                    source_id: request.id
                  }}
                  onUpdate={fetchRequests}
                />
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventRequestsBoard;
