
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
}

export interface ChecklistItem {
  id: string;
  contact_id: string | null;
  stage: ContactStage;
  item_text: string;
  completed: boolean;
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
