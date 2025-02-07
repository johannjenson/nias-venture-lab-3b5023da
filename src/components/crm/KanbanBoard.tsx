
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Contact, CompanyView, stages } from "./types/kanban";
import { IndustryType } from "./types/contact";
import StageHeader from "./components/StageHeader";
import UserView from "./components/UserView";
import CompanyStageView from "./components/CompanyView";

interface KanbanBoardProps {
  viewType: 'user' | 'company';
  leadTypeFilter: 'all' | Contact['lead_type'];
  industryFilter: 'all' | IndustryType;
}

const KanbanBoard = ({ viewType, leadTypeFilter, industryFilter }: KanbanBoardProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companyViews, setCompanyViews] = useState<CompanyView[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();

    // Subscribe to all relevant changes
    const contactsChannel = supabase
      .channel('contacts_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'contacts' 
      }, () => {
        fetchData();
      })
      .subscribe();

    const requestsChannel = supabase
      .channel('requests_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'Request'
      }, () => {
        fetchData();
      })
      .subscribe();

    const eventRequestsChannel = supabase
      .channel('event_requests_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'event_requests'
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(requestsChannel);
      supabase.removeChannel(eventRequestsChannel);
    };
  }, [viewType, leadTypeFilter, industryFilter]);

  const fetchData = async () => {
    let query = supabase
      .from('contacts')
      .select('*, company_id')
      .order('created_at', { ascending: false });

    if (leadTypeFilter !== 'all') {
      query = query.eq('lead_type', leadTypeFilter);
    }

    // Only add industry filter if a specific industry is selected
    if (industryFilter !== 'all') {
      query = query.eq('industry', industryFilter);
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
      let leadsQuery = supabase
        .from('leads')
        .select('id, company, stage, last_contact_date');

      // Only add industry filter for company view if a specific industry is selected
      if (industryFilter !== 'all') {
        leadsQuery = leadsQuery.eq('industry', industryFilter);
      }

      const { data: leadsData, error: leadsError } = await leadsQuery;

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
              stage={stage.id}
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
