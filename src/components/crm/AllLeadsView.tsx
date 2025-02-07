
import { useState } from "react";
import { Contact } from "./types/kanban";
import ContactDetailsDialog from "./ContactDetailsDialog";
import RequestDetailsDialog from "./RequestDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeadEntry } from "./types/contact";
import LeadsTable from "./components/LeadsTable";
import { useLeads } from "./hooks/useLeads";

const AllLeadsView = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<LeadEntry | null>(null);
  const [requestType, setRequestType] = useState<'membership' | 'event' | null>(null);
  const { toast } = useToast();
  const { leads, fetchAllLeads } = useLeads();

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
      <LeadsTable leads={leads} onLeadClick={handleLeadClick} />

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
