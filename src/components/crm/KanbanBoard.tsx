
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import ContactCard from "./ContactCard";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

type ContactStage = Database["public"]["Enums"]["contact_stage"];

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: ContactStage;
  source?: string;
  source_id?: string;
};

const stages: { id: ContactStage; label: string }[] = [
  { id: 'mql_lead', label: 'MQL Lead' },
  { id: 'sql_qualification', label: 'SQL Qualification' },
  { id: 'sqo_discovery', label: 'SQO Discovery' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'closed_won', label: 'Approved' },
  { id: 'closed_lost', label: 'Rejected' },
];

const KanbanBoard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();

    const channel = supabase
      .channel('contacts_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'contacts' 
      }, () => {
        fetchContacts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching contacts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setContacts(data || []);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageContacts = contacts.filter(c => c.stage === stage.id);
        const networkRequests = stageContacts.filter(c => c.source === 'network_request');
        const otherContacts = stageContacts.filter(c => c.source !== 'network_request');
        
        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stage.label}</h3>
                <span className="text-sm text-gray-500">
                  {stageContacts.length}
                </span>
              </div>
              <div className="space-y-4">
                {networkRequests.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-600">Network Requests</h4>
                    {networkRequests.map(contact => (
                      <ContactCard 
                        key={contact.id} 
                        contact={contact}
                        onUpdate={fetchContacts}
                      />
                    ))}
                  </div>
                )}
                {otherContacts.length > 0 && (
                  <div className="space-y-2">
                    {networkRequests.length > 0 && (
                      <h4 className="text-sm font-medium text-gray-600">Other Contacts</h4>
                    )}
                    {otherContacts.map(contact => (
                      <ContactCard 
                        key={contact.id} 
                        contact={contact}
                        onUpdate={fetchContacts}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
