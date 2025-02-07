
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "./types/kanban";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ContactDetailsDialog from "./ContactDetailsDialog";
import RequestDetailsDialog from "./RequestDetailsDialog";
import { IndustryType } from "./types/contact";
import { EventRequest } from "@/types/event-requests";

type LeadEntry = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string | null;
  title: string | null;
  industry: IndustryType | string | null;
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
};

const AllLeadsView = () => {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<LeadEntry | null>(null);
  const [requestType, setRequestType] = useState<'membership' | 'event' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllLeads();

    const channel = supabase
      .channel('all_leads_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'contacts' 
      }, () => {
        fetchAllLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAllLeads = async () => {
    const { data: contactsData, error: contactsError } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (contactsError) {
      toast({
        title: "Error fetching contacts",
        description: contactsError.message,
        variant: "destructive",
      });
      return;
    }

    const { data: eventData, error: eventError } = await supabase
      .from('event_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (eventError) {
      toast({
        title: "Error fetching event requests",
        description: eventError.message,
        variant: "destructive",
      });
      return;
    }

    const { data: membershipData, error: membershipError } = await supabase
      .from('Request')
      .select('*')
      .order('created_at', { ascending: false });

    if (membershipError) {
      toast({
        title: "Error fetching membership requests",
        description: membershipError.message,
        variant: "destructive",
      });
      return;
    }

    const allLeads: LeadEntry[] = [
      ...contactsData.map((contact): LeadEntry => ({
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        name: contact.first_name && contact.last_name 
          ? `${contact.first_name} ${contact.last_name}`
          : null,
        email: contact.email,
        title: contact.title,
        industry: contact.industry,
        company: contact.company,
        status: contact.stage || 'Unknown',
        type: 'contact',
        stage: contact.stage
      })),
      ...eventData.map((request: EventRequest): LeadEntry => ({
        id: request.id.toString(),
        first_name: request.name?.split(' ')[0] || null,
        last_name: request.name?.split(' ').slice(1).join(' ') || null,
        name: request.name,
        email: request.email,
        title: request.title,
        industry: request.industry,
        company: request.company,
        status: request.request_status || 'pending',
        type: 'request',
        request_status: request.request_status
      })),
      ...membershipData.map((request): LeadEntry => ({
        id: request.id.toString(),
        first_name: request.first_name,
        last_name: request.last_name,
        name: request.first_name && request.last_name 
          ? `${request.first_name} ${request.last_name}`
          : null,
        email: request.email,
        title: request.title,
        industry: request.industry,
        company: request.company,
        status: request.request_status || 'pending',
        type: 'request',
        request_status: request.request_status
      }))
    ];

    setLeads(allLeads);
  };

  const handleLeadClick = async (leadEntry: LeadEntry) => {
    if (leadEntry.type === 'contact') {
      const { data: contact, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', leadEntry.id)
        .single();

      if (error) {
        toast({
          title: "Error fetching contact details",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setSelectedContact(contact);
    } else {
      const isEventRequest = leads.find(l => l.id === leadEntry.id)?.type === 'request';
      if (isEventRequest) {
        setRequestType('event');
      } else {
        setRequestType('membership');
      }
      setSelectedRequest(leadEntry);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow 
              key={lead.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleLeadClick(lead)}
            >
              <TableCell>
                {lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`}
              </TableCell>
              <TableCell>{lead.title}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.industry}</TableCell>
              <TableCell>
                {lead.type === 'contact' ? lead.stage : lead.request_status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedContact && (
        <ContactDetailsDialog
          contact={selectedContact}
          open={!!selectedContact}
          onOpenChange={(open) => !open && setSelectedContact(null)}
          onUpdate={fetchAllLeads}
        />
      )}

      {selectedRequest && requestType && (
        <RequestDetailsDialog
          request={selectedRequest}
          type={requestType}
          open={!!selectedRequest}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRequest(null);
              setRequestType(null);
            }
          }}
          onUpdate={fetchAllLeads}
        />
      )}
    </div>
  );
};

export default AllLeadsView;
