
import { Database } from "@/integrations/supabase/types";

export type ContactStage = Database["public"]["Enums"]["contact_stage"];
export type LeadType = Database["public"]["Enums"]["lead_type"];

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: ContactStage;
  lead_type?: LeadType;
  heat_rating: number;
  goal?: string;
  company_id?: string;
  source?: string;
  source_id?: string;
  has_account?: boolean;
  industry?: Database["public"]["Enums"]["industry_type"];
};

export type CompanyView = {
  id: string;
  company: string;
  stage: ContactStage;
  last_contact_date: string | null;
  contacts: Contact[];
};

export const stages: { id: ContactStage; label: string; description: string }[] = [
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
    label: 'Closed Won',
    description: 'Successfully closed opportunities'
  },
  { 
    id: 'closed_lost', 
    label: 'Closed Lost',
    description: 'Lost or declined opportunities'
  },
];

export const leadTypes: { id: LeadType; label: string }[] = [
  { id: 'founder_executive', label: 'Founders & Executives' },
  { id: 'investor_buyer', label: 'Investors & Buyers' },
  { id: 'advisor_broker', label: 'Advisors & Brokers' },
  { id: 'other', label: 'Other' },
];
