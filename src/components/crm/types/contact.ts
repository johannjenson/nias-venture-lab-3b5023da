
export type LeadType = 'founder_executive' | 'investor_buyer' | 'advisor_broker' | 'other';

export type IndustryType = 
  | 'manufacturing' | 'technology' | 'tourism' | 'healthcare' | 'energy'
  | 'mining' | 'logistics' | 'education' | 'finance' | 'real_estate'
  | 'agriculture' | 'water' | 'defense' | 'sports' | 'aerospace'
  | 'retail' | 'creative' | 'biotech' | 'construction' | 'ocean';

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  lead_type: LeadType;
  industry: IndustryType;
  note?: string;
}

export const leadTypes = [
  { id: 'founder_executive' as const, label: 'Founders & Executives' },
  { id: 'investor_buyer' as const, label: 'Investors & Buyers' },
  { id: 'advisor_broker' as const, label: 'Advisors & Brokers' },
  { id: 'other' as const, label: 'Other' },
] as const;

export const industryTypes = [
  { id: 'manufacturing' as const, label: 'Manufacturing' },
  { id: 'technology' as const, label: 'Technology' },
  { id: 'tourism' as const, label: 'Tourism & Entertainment' },
  { id: 'healthcare' as const, label: 'Healthcare' },
  { id: 'energy' as const, label: 'Renewable Energy' },
  { id: 'mining' as const, label: 'Mining & Minerals' },
  { id: 'logistics' as const, label: 'Logistics & Transportation' },
  { id: 'education' as const, label: 'Education' },
  { id: 'finance' as const, label: 'Financial Services' },
  { id: 'real_estate' as const, label: 'Real Estate' },
  { id: 'agriculture' as const, label: 'Agriculture & Food Security' },
  { id: 'water' as const, label: 'Water & Environment' },
  { id: 'defense' as const, label: 'Defense & Security' },
  { id: 'sports' as const, label: 'Sports & Entertainment' },
  { id: 'aerospace' as const, label: 'Aerospace' },
  { id: 'retail' as const, label: 'Retail' },
  { id: 'creative' as const, label: 'Creative Industries' },
  { id: 'biotech' as const, label: 'Biotechnology' },
  { id: 'construction' as const, label: 'Smart Construction' },
  { id: 'ocean' as const, label: 'Ocean Economy' }
] as const;

export type LeadEntry = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string | null;
  title: string | null;
  industry: IndustryType | null;
  status: string;
  type: 'contact' | 'request';
  stage?: string;
  request_status?: string;
  company?: string | null;
  phone_number?: string | null;
  interests?: string | null;
  additional_info?: string | null;
  linkedin_url?: string | null;
  referred_by?: string | null;
  has_account?: boolean;
};

