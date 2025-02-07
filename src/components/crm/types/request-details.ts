
import { IndustryType } from "./contact";

export interface RequestDetailsDialogProps {
  request: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    name?: string | null;  // Added this field for event requests
    email?: string | null;
    phone_number?: string | null;
    company?: string | null;
    title?: string | null;
    request_status?: string | null;
    interests?: string | null;
    additional_info?: string | null;
    linkedin_url?: string | null;
    referred_by?: string | null;
    industry?: IndustryType | null;
  };
  type: 'membership' | 'event';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}
