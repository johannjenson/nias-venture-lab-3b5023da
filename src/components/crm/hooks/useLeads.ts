
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LeadEntry, IndustryType } from "../types/contact";
import { EventRequest } from "@/types/event-requests";

export const useLeads = () => {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAllLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching leads from consolidated_leads view...");
      const { data: contactsData, error: contactsError } = await supabase
        .from('consolidated_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) {
        console.error("Error fetching contacts:", contactsError);
        toast({
          title: "Error fetching contacts",
          description: contactsError.message,
          variant: "destructive",
        });
        setError(contactsError.message);
        return;
      }

      console.log("Consolidated leads data:", contactsData);
      console.log(`Retrieved ${contactsData?.length || 0} contacts from consolidated_leads`);

      // If no contacts found, try querying the contacts table directly
      if (!contactsData || contactsData.length === 0) {
        console.log("No data found in consolidated_leads, trying contacts table directly...");
        const { data: directContactsData, error: directContactsError } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (directContactsError) {
          console.error("Error fetching from contacts table:", directContactsError);
        } else {
          console.log(`Retrieved ${directContactsData?.length || 0} contacts from contacts table`);
          console.log("Direct contacts data:", directContactsData);
        }
      }

      const { data: eventData, error: eventError } = await supabase
        .from('event_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (eventError) {
        console.error("Error fetching event requests:", eventError);
        toast({
          title: "Error fetching event requests",
          description: eventError.message,
          variant: "destructive",
        });
        setError(prev => prev ? `${prev}, ${eventError.message}` : eventError.message);
        return;
      }

      console.log(`Retrieved ${eventData?.length || 0} event requests`);

      const { data: membershipData, error: membershipError } = await supabase
        .from('Request')
        .select('*')
        .order('created_at', { ascending: false });

      if (membershipError) {
        console.error("Error fetching membership requests:", membershipError);
        toast({
          title: "Error fetching membership requests",
          description: membershipError.message,
          variant: "destructive",
        });
        setError(prev => prev ? `${prev}, ${membershipError.message}` : membershipError.message);
        return;
      }

      console.log(`Retrieved ${membershipData?.length || 0} membership requests`);

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

      console.log(`Total combined leads: ${allLeads.length}`);
      setLeads(allLeads);
    } catch (err) {
      console.error("Unexpected error in fetchAllLeads:", err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast({
        title: "Error loading data",
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  return { leads, fetchAllLeads, isLoading, error };
};
