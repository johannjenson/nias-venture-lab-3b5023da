
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Contact, CompanyView, stages } from "./types/kanban";
import StageHeader from "./components/StageHeader";
import UserView from "./components/UserView";
import CompanyStageView from "./components/CompanyView";

interface KanbanBoardProps {
  viewType: 'user' | 'company';
  leadTypeFilter: 'all' | Contact['lead_type'];
}

const KanbanBoard = ({ viewType, leadTypeFilter }: KanbanBoardProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companyViews, setCompanyViews] = useState<CompanyView[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('contacts_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'contacts' 
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [viewType, leadTypeFilter]);

  const fetchData = async () => {
    let query = supabase
      .from('contacts')
      .select('*, company_id')
      .order('created_at', { ascending: false });

    if (leadTypeFilter !== 'all') {
      query = query.eq('lead_type', leadTypeFilter);
    }

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error fetching contacts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (viewType === 'user') {
      setContacts(data || []);
    } else {
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('id, company, stage, last_contact_date');

      if (leadsError) {
        toast({
          title: "Error fetching companies",
          description: leadsError.message,
          variant: "destructive",
        });
        return;
      }

      const companyViews = leadsData.map(lead => ({
        id: lead.id,
        company: lead.company,
        stage: lead.stage,
        last_contact_date: lead.last_contact_date,
        contacts: data?.filter(contact => contact.company_id === lead.id) || []
      })).filter(company => company.contacts.length > 0);

      setCompanyViews(companyViews);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-80">
          <Card className="p-4">
            <StageHeader
              label={stage.label}
              description={stage.description}
              count={
                viewType === 'user'
                  ? contacts.filter(c => c.stage === stage.id).length
                  : companyViews.filter(c => c.stage === stage.id).length
              }
            />
            {viewType === 'user' ? (
              <UserView
                contacts={contacts}
                stage={stage.id}
                onUpdate={fetchData}
              />
            ) : (
              <CompanyStageView
                companies={companyViews}
                stage={stage.id}
                onUpdate={fetchData}
              />
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
