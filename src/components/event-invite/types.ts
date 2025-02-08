
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
  interests: string;
}
