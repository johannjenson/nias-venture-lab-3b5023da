
export interface DinnerInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DinnerFormData {
  name: string;
  phoneNumber: string;
  email: string;
  company: string;
  role: string;
  interests: string;
}

export type RoleOption = 'founder' | 'executive' | 'investor' | 'advisor' | 'broker';

export type IndustryType = 'manufacturing' | 'technology' | 'tourism' | 'healthcare' | 'energy' |
  'mining' | 'logistics' | 'education' | 'finance' | 'real_estate' | 'agriculture' |
  'water' | 'defense' | 'sports' | 'aerospace' | 'retail' | 'creative' | 'biotech' |
  'construction' | 'ocean';
