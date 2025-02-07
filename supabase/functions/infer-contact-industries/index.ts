
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Database } from '../_shared/database.types.ts'
import { Contact } from './types.ts'
import { corsHeaders } from './constants.ts'
import { lookupCompany } from './clearbit-service.ts'
import { inferIndustry } from './industry-service.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // First run the SQL function to infer industries from requests
    const { error: fnError } = await supabaseClient.rpc('infer_industries_from_requests')
    
    if (fnError) {
      console.error('Error running infer_industries_from_requests:', fnError)
    }

    // Then get remaining contacts without industry set
    const { data: contacts, error: fetchError } = await supabaseClient
      .from('contacts')
      .select('id, company, company_domain, company_description, title, notes, linkedin_url')
      .is('industry', null)

    if (fetchError) throw fetchError

    // Process each contact
    const updates = contacts.map(async (contact) => {
      let companyInfo = null;
      
      // Only look up company info if we have a company name and don't already have company details
      if (contact.company && (!contact.company_domain || !contact.company_description)) {
        companyInfo = await lookupCompany(contact.company);
        
        if (companyInfo) {
          // Update contact with company information
          const { error: updateError } = await supabaseClient
            .from('contacts')
            .update({
              company_domain: companyInfo.domain,
              company_description: companyInfo.description
            })
            .eq('id', contact.id);

          if (updateError) {
            console.error(`Error updating company info for contact ${contact.id}:`, updateError);
          }
        }
      }

      const industry = await inferIndustry(contact, companyInfo);
      if (!industry) return null;

      const { error: updateError } = await supabaseClient
        .from('contacts')
        .update({ industry })
        .eq('id', contact.id)

      if (updateError) {
        console.error(`Error updating contact ${contact.id}:`, updateError);
        return null;
      }

      return { id: contact.id, industry }
    })

    const results = await Promise.all(updates)
    const updatedContacts = results.filter(Boolean)

    return new Response(
      JSON.stringify({
        message: `Updated ${updatedContacts.length} contacts with inferred industries`,
        updates: updatedContacts
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
