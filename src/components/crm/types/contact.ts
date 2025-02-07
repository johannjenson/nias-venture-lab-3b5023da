
export type LeadType = 'founder_executive' | 'investor_buyer' | 'advisor_broker' | 'other';

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  lead_type: LeadType;
  note?: string; // Added note as an optional field
}

export const leadTypes = [
  { id: 'founder_executive' as const, label: 'Founders & Executives' },
  { id: 'investor_buyer' as const, label: 'Investors & Buyers' },
  { id: 'advisor_broker' as const, label: 'Advisors & Brokers' },
  { id: 'other' as const, label: 'Other' },
] as const;
