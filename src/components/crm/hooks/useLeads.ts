
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeadEntry, IndustryType } from "../types/contact";
import { EventRequest } from "@/types/event-requests";

export const useLeads = () => {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const { toast } = useToast();

  const fetchAllLeads = async () => {
    const { data: contactsData, error: contactsError } = await supabase
      .from('leads_with_user_status')  // Use the view that includes has_account
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

    // Process contacts data
    const contactLeads: LeadEntry[] = (contactsData || []).map((contact): LeadEntry => ({
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      name: contact.first_name && contact.last_name 
        ? `${contact.first_name} ${contact.last_name}`
        : null,
      email: contact.email,
      title: contact.title,
      industry: contact.industry as IndustryType | null,
      company: contact.company,
      status: contact.stage || 'Unknown',
      type: 'contact',
      stage: contact.stage,
      has_account: contact.has_account
    }));

    // Process event request data
    const eventLeads: LeadEntry[] = (eventData || []).map((request: EventRequest): LeadEntry => ({
      id: request.id.toString(),
      first_name: request.name?.split(' ')[0] || null,
      last_name: request.name?.split(' ').slice(1).join(' ') || null,
      name: request.name,
      email: request.email,
      title: request.title,
      industry: request.industry as IndustryType | null,
      company: request.company,
      status: request.request_status || 'pending',
      type: 'request',
      request_status: request.request_status
    }));

    // Process membership request data
    const membershipLeads: LeadEntry[] = (membershipData || []).map((request): LeadEntry => ({
      id: request.id.toString(),
      first_name: request.first_name,
      last_name: request.last_name,
      name: request.first_name && request.last_name 
        ? `${request.first_name} ${request.last_name}`
        : null,
      email: request.email,
      title: request.title,
      industry: request.industry as IndustryType | null,
      company: request.company,
      status: request.request_status || 'pending',
      type: 'request',
      request_status: request.request_status
    }));

    // Combine all leads and ensure unique IDs by adding a prefix
    const allLeads: LeadEntry[] = [
      ...contactLeads.map(lead => ({ ...lead, id: `contact_${lead.id}` })),
      ...eventLeads.map(lead => ({ ...lead, id: `event_${lead.id}` })),
      ...membershipLeads.map(lead => ({ ...lead, id: `membership_${lead.id}` }))
    ];

    setLeads(allLeads);
  };

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

  return { leads, fetchAllLeads };
};
