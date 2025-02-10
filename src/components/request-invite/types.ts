
import { IndustryType } from "../crm/types/contact";

export interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  title: string;
  linkedinUrl: string;
  referredBy: string;
  additionalInfo: string;
  industry: IndustryType;
}

