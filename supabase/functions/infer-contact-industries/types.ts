
import { Database } from '../_shared/database.types.ts'

export type IndustryType = Database['public']['Enums']['industry_type']

export interface Contact {
  id: string
  company: string | null
  company_domain?: string | null
  company_description?: string | null
  title: string | null
  linkedin_url?: string | null
  notes: string | null
}

export interface ClearbitCompany {
  name: string;
  domain: string;
  description: string;
  category?: {
    industry?: string;
    sector?: string;
  };
}
