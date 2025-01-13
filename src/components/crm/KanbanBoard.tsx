import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import ContactCard from "./ContactCard";
import { useToast } from "@/components/ui/use-toast";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: string;
};

const stages = [
  { id: 'new_lead', label: 'New Lead' },
  { id: 'qualifying', label: 'Qualifying' },
  { id: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { id: 'proposal_sent', label: 'Proposal Sent' },
  { id: 'negotiating', label: 'Negotiating' },
  { id: 'closed_won', label: 'Closed Won' },
  { id: 'closed_lost', label: 'Closed Lost' },
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
      {stages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-80">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{stage.label}</h3>
              <span className="text-sm text-gray-500">
                {contacts.filter(c => c.stage === stage.id).length}
              </span>
            </div>
            <div className="space-y-4">
              {contacts
                .filter(contact => contact.stage === stage.id)
                .map(contact => (
                  <ContactCard 
                    key={contact.id} 
                    contact={contact}
                    onUpdate={fetchContacts}
                  />
                ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;