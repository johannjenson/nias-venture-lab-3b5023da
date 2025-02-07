
import { supabase } from "@/integrations/supabase/client";
import { ContactStage } from "../types/kanban";
import { IndustryType } from "../types/contact";

interface ContactData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
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
  // First check if contact already exists
  const { data: existingContact, error: fetchError } = await supabase
    .from('leads_with_user_status')
    .select('*')
    .eq('email', contactData.email)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  let contactId;

  if (existingContact) {
    // Update existing contact with new information
    const { data: updatedContact, error: updateError } = await supabase
      .from('contacts')
      .update({
        first_name: contactData.first_name,
        last_name: contactData.last_name,
        phone: contactData.phone,
        company: contactData.company,
        title: contactData.title,
        industry: contactData.industry,
        linkedin_url: contactData.linkedin_url,
        source: contactData.source,
        source_id: contactData.source_id,
        // Don't update the stage if contact already exists
      })
      .eq('id', existingContact.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    contactId = existingContact.id;
  } else {
    // Create new contact
    const { data: newContact, error: createError } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    contactId = newContact.id;
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

  return { contactId };
};
