
import { supabase } from "@/integrations/supabase/client";
import { ContactFormData } from "../types/contact";

export const createContact = async (formData: ContactFormData, userId: string) => {
  // First, create the company in the leads table
  const { data: newCompany, error: createCompanyError } = await supabase
    .from('leads')
    .insert({
      company: formData.company,
      stage: 'mql_lead',
      user_id: userId,
      lead_type: formData.lead_type
    })
    .select('id')
    .single();

  if (createCompanyError) {
    throw new Error(createCompanyError.message);
  }

  // Now create the contact with reference to the company
  const { error: contactError } = await supabase
    .from('contacts')
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      company: formData.company,
      title: formData.title,
      stage: 'mql_lead',
      user_id: userId,
      company_id: newCompany.id,
      lead_type: formData.lead_type
    });

  if (contactError) {
    throw new Error(contactError.message);
  }

  return true;
};
