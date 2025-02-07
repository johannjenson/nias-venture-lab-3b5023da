
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import LeadsTable from "@/components/crm/components/LeadsTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { LeadEntry, IndustryType } from "@/components/crm/types/contact";

const InboundContacts = () => {
  const navigate = useNavigate();
  
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['inbound-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Contact')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map((contact): LeadEntry => ({
        id: contact.id.toString(),
        name: contact.name,
        email: contact.email,
        industry: contact.industry as IndustryType | null,
        type: 'request',
        request_status: contact.request_status,
        status: contact.request_status || 'pending', // Add status field, fallback to 'pending' if request_status is null
        company: null,
        title: null,
        first_name: null,
        last_name: null
      }));
    }
  });

  const handleLeadClick = (lead: LeadEntry) => {
    // For now, just log the lead. We can implement a details view later.
    console.log("Lead clicked:", lead);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Inbound Contacts
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              View and manage all contact form submissions
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading contacts...</div>
          ) : contacts && contacts.length > 0 ? (
            <LeadsTable leads={contacts} onLeadClick={handleLeadClick} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No contact form submissions yet
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InboundContacts;
