
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
