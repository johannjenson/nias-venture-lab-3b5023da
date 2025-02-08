
import { Database } from "@/integrations/supabase/types";

type ContactStage = Database["public"]["Enums"]["contact_stage"];

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: ContactStage;
  heat_rating: number;
  goal?: string;
  company_id?: string;
  industry?: Database["public"]["Enums"]["industry_type"];
  lead_type?: Database["public"]["Enums"]["lead_type"];
  invitation_status?: string;
  invitation_sent_at?: string;
}

export interface ChecklistItem {
  id: string;
  contact_id: string | null;
  stage: ContactStage;
  item_text: string;
  completed: boolean;
  completed_at: string | null;
  completed_by?: string | null;
}

export interface Note {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    email: string | null;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export interface ContactDetailsDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export interface TimelineItem {
  id: string;
  type: 'note' | 'checklist';
  timestamp: string;
  content: string;
  user?: {
    email: string | null;
    first_name: string | null;
    last_name: string | null;
  } | null;
  stage?: ContactStage;
  completed?: boolean;
  completed_by?: {
    email: string | null;
    first_name: string | null;
    last_name: string | null;
  } | null;
}
