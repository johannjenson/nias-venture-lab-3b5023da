
import { supabase } from "@/integrations/supabase/client";
import { IndustryType } from "../types/contact";
import { ContactStage } from "../types/kanban";

interface ContactData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null; // Note: changed from phone_number to match DB schema
  company: string | null;
  title: string | null;
  industry: IndustryType | null;
  linkedin_url: string | null;
  source: 'network_request' | 'event_request';
  source_id: string;
  stage: ContactStage;
}

export const createContactAndUpdateRequest = async (
  requestId: number,
  contactData: ContactData,
  requestType: 'membership' | 'event'
) => {
  // Create the contact
  const { data: newContact, error: contactError } = await supabase
    .from('contacts')
    .insert({
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      email: contactData.email,
      phone: contactData.phone, // Note: using 'phone' instead of 'phone_number'
      company: contactData.company,
      title: contactData.title,
      industry: contactData.industry,
      linkedin_url: contactData.linkedin_url,
      source: contactData.source,
      source_id: contactData.source_id,
      stage: contactData.stage
    })
    .select()
    .single();

  if (contactError) {
    throw contactError;
  }

  // Update the request
  const table = requestType === 'membership' ? 'Request' : 'event_requests';
  const { error: updateError } = await supabase
    .from(table)
    .update({ 
      moved_to_pipeline: true,
      request_status: 'moved_to_pipeline' 
    })
    .eq('id', requestId);

  if (updateError) {
    throw updateError;
  }

  return newContact;
};
