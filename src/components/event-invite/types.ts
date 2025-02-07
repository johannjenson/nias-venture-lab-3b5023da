
export interface EventInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EventFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  title: string;
  industry: IndustryType;
  interests: string;
}

export type IndustryType = 'manufacturing' | 'technology' | 'tourism' | 'healthcare' | 'energy' |
  'mining' | 'logistics' | 'education' | 'finance' | 'real_estate' | 'agriculture' |
  'water' | 'defense' | 'sports' | 'aerospace' | 'retail' | 'creative' | 'biotech' |
  'construction' | 'ocean';
