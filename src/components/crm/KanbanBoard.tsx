import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import ContactCard from "./ContactCard";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { formatDistanceToNow } from "date-fns";

type ContactStage = Database["public"]["Enums"]["contact_stage"];
type LeadType = 'all' | 'founder_executive' | 'investor_buyer' | 'advisor_broker' | 'other';

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: ContactStage;
  lead_type: LeadType;
  source?: string;
  source_id?: string;
  company_id?: string;
};

type CompanyView = {
  id: string;
  company: string;
  stage: ContactStage;
  last_contact_date: string | null;
  contacts: Contact[];
};

const stages: { id: ContactStage; label: string; description: string }[] = [
  { 
    id: 'mql_lead', 
    label: 'MQL Lead',
    description: 'Marketing qualified leads ready for initial contact'
  },
  { 
    id: 'sql_qualification', 
    label: 'SQL Qualification',
    description: 'Sales qualified leads under evaluation'
  },
  { 
    id: 'sqo_discovery', 
    label: 'SQO Discovery',
    description: 'Sales qualified opportunities in discovery phase'
  },
  { 
    id: 'evaluation', 
    label: 'Evaluation',
    description: 'Leads actively evaluating membership'
  },
  { 
    id: 'closed_won', 
    label: 'Approved',
    description: 'Successfully approved members'
  },
  { 
    id: 'closed_lost', 
    label: 'Rejected',
    description: 'Declined or inactive leads'
  },
];

const leadTypes: { id: LeadType; label: string }[] = [
  { id: 'all', label: 'All Leads' },
  { id: 'founder_executive', label: 'Founders & Executives' },
  { id: 'investor_buyer', label: 'Investors & Buyers' },
  { id: 'advisor_broker', label: 'Advisors & Brokers' },
  { id: 'other', label: 'Other' },
];

interface KanbanBoardProps {
  viewType: 'user' | 'company';
  leadTypeFilter: LeadType;
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

  const renderUserView = (stage: ContactStage) => {
    const stageContacts = contacts.filter(c => c.stage === stage);
    const networkRequests = stageContacts.filter(c => c.source === 'network_request');
    const otherContacts = stageContacts.filter(c => c.source !== 'network_request');

    return (
      <div className="space-y-4">
        {networkRequests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-600">Network Requests</h4>
            {networkRequests.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact}
                onUpdate={fetchData}
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
                onUpdate={fetchData}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCompanyView = (stage: ContactStage) => {
    const stageCompanies = companyViews.filter(company => company.stage === stage);

    return (
      <div className="space-y-4">
        {stageCompanies.map(company => (
          <Card key={company.id} className="p-4">
            <div className="mb-4">
              <h4 className="font-medium text-lg">{company.company}</h4>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500">
                  {company.contacts.length} contact{company.contacts.length !== 1 ? 's' : ''}
                </p>
                {company.last_contact_date && (
                  <p className="text-sm text-gray-600">
                    Last contact: {formatDistanceToNow(new Date(company.last_contact_date), { addSuffix: true })}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {company.contacts.map(contact => (
                <ContactCard 
                  key={contact.id} 
                  contact={contact}
                  onUpdate={fetchData}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-80">
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="font-semibold">{stage.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{stage.description}</p>
              <div className="flex items-center justify-end mt-2">
                <span className="text-sm text-gray-500">
                  {viewType === 'user' 
                    ? contacts.filter(c => c.stage === stage.id).length
                    : companyViews.filter(c => c.stage === stage.id).length
                  }
                </span>
              </div>
            </div>
            {viewType === 'user' ? renderUserView(stage.id) : renderCompanyView(stage.id)}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
