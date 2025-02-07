
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Contact } from "./types/kanban";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import ContactDetailsDialog from "./ContactDetailsDialog";
import RequestDetailsDialog from "./RequestDetailsDialog";
import { IndustryType } from "./types/contact";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type LeadEntry = {
  id: string;
  first_name: string | null;
  last_name: string | null;
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
      .from('EventRequest')
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
        email: contact.email,
        title: contact.title,
        industry: contact.industry,
        company: contact.company,
        status: contact.stage || 'Unknown',
        type: 'contact',
        stage: contact.stage
      })),
      ...eventData.map((request): LeadEntry => ({
        id: `event_${request.id}`,
        first_name: request.full_name?.split(' ')[0] || null,
        last_name: request.full_name?.split(' ').slice(1).join(' ') || null,
        email: request.email,
        title: request.title,
        industry: request.industry,
        company: request.company,
        status: request.request_status || 'pending',
        type: 'request',
        request_status: request.request_status
      })),
      ...membershipData.map((request): LeadEntry => ({
        id: `membership_${request.id}`,
        first_name: request.first_name,
        last_name: request.last_name,
        email: request.email,
        title: request.title,
        industry: null, // Membership requests don't have industry yet
        company: request.company,
        status: request.request_status || 'pending',
        type: 'request',
        request_status: request.request_status
      }))
    ];

    setLeads(allLeads);
  };

  const handleEditLead = async (leadEntry: LeadEntry) => {
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
      const requestId = leadEntry.id;
      if (requestId.startsWith('membership_')) {
        setRequestType('membership');
      } else if (requestId.startsWith('event_')) {
        setRequestType('event');
      }
      setSelectedRequest(leadEntry);
    }
  };

  const handleDeleteLead = async (leadEntry: LeadEntry) => {
    try {
      if (leadEntry.type === 'contact') {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', leadEntry.id);

        if (error) throw error;
      } else {
        const table = leadEntry.id.startsWith('membership_') ? 'Request' : 'EventRequest';
        const id = parseInt(leadEntry.id.replace(leadEntry.id.startsWith('membership_') ? 'membership_' : 'event_', ''));

        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', id);

        if (error) throw error;
      }

      toast({
        title: "Lead deleted",
        description: "The lead has been successfully deleted",
      });

      fetchAllLeads();
    } catch (error: any) {
      toast({
        title: "Error deleting lead",
        description: error.message,
        variant: "destructive",
      });
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                {lead.first_name} {lead.last_name}
              </TableCell>
              <TableCell>{lead.title}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.industry}</TableCell>
              <TableCell>
                {lead.type === 'contact' ? lead.stage : lead.request_status}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditLead(lead)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this lead
                        from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteLead(lead)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
