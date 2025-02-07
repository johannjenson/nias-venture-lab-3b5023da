
import { supabase } from "@/integrations/supabase/client";
import { IndustryType } from "../types/contact";

interface ContactData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone_number: string | null;
  company: string | null;
  title: string | null;
  industry: IndustryType | null;
  linkedin_url: string | null;
  source: 'network_request' | 'event_request';
  source_id: string;
  stage: string;
}

export const createContactAndUpdateRequest = async (
  requestId: number,
  contactData: ContactData,
  requestType: 'membership' | 'event'
) => {
  // Create the contact
  const { data: newContact, error: contactError } = await supabase
    .from('contacts')
    .insert([contactData])
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

