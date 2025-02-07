
export type EventRequest = {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  title: string | null;
  phone_number: string | null;
  interests: string | null;
  request_status: string | null;
  created_at: string;
};

export type RequestStatus = {
  value: string;
  label: string;
};

export type RequestType = 'dinner' | 'forum';
