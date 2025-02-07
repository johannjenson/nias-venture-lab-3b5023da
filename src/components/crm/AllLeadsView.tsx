
import { useState } from "react";
import { Contact } from "./types/kanban";
import ContactDetailsDialog from "./ContactDetailsDialog";
import RequestDetailsDialog from "./RequestDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeadEntry, IndustryType, LeadType } from "./types/contact";
import LeadsTable from "./components/LeadsTable";
import CRMFilters from "./components/CRMFilters";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import { toast } from "sonner";

const AllLeadsView = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<LeadEntry | null>(null);
  const [requestType, setRequestType] = useState<'membership' | 'event' | null>(null);
  const [leadTypeFilter, setLeadTypeFilter] = useState<LeadType | 'all'>('all');
  const [industryFilter, setIndustryFilter] = useState<IndustryType | 'all'>('all');
  const [viewByCompany, setViewByCompany] = useState(false);
  const { toast } = useToast();
  const { leads, fetchAllLeads } = useLeads();

  const handleCreateAccount = async (lead: LeadEntry) => {
    if (!lead.email || !lead.first_name || !lead.last_name) {
      toast({
        title: "Missing Information",
        description: "First name, last name and email are required to create an account",
        variant: "destructive",
      });
      return;
    }

    // Check if email is from zid.sa domain
    if (lead.email.endsWith('@zid.sa')) {
      toast({
        title: "Cannot Create Account",
        description: "Accounts cannot be created for @zid.sa email addresses",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('create-approved-member', {
        body: {
          requestId: lead.id,
          email: lead.email,
          firstName: lead.first_name,
          lastName: lead.last_name,
        },
      });

      if (error) throw error;

      toast({
        title: "Account Created",
        description: "User account has been created and an email has been sent with login instructions",
      });

      fetchAllLeads();
    } catch (error: any) {
      toast({
        title: "Error Creating Account",
        description: error.message || "An error occurred while creating the account",
        variant: "destructive",
      });
    }
  };

  const handleLeadClick = async (leadEntry: LeadEntry) => {
    if (leadEntry.type === 'contact') {
      const { data: contact, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', leadEntry.id.replace('contact_', ''))
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
      const isEventRequest = leadEntry.id.startsWith('event_');
      if (isEventRequest) {
        setRequestType('event');
      } else {
        setRequestType('membership');
      }
      setSelectedRequest(leadEntry);
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (leadTypeFilter !== 'all' && (lead.type === 'request' || !lead.stage)) {
      return false;
    }
    if (industryFilter !== 'all' && lead.industry !== industryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <CRMFilters
        leadTypeFilter={leadTypeFilter}
        onLeadTypeChange={setLeadTypeFilter}
        industryFilter={industryFilter}
        onIndustryChange={setIndustryFilter}
        viewByCompany={viewByCompany}
        onViewTypeChange={setViewByCompany}
      />
      
      <div className="rounded-md border">
        <LeadsTable 
          leads={filteredLeads} 
          onLeadClick={handleLeadClick} 
          onCreateAccount={handleCreateAccount}
        />
      </div>

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
