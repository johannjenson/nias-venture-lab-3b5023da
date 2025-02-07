
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Database } from '../_shared/database.types.ts'
import { industryTypes } from '../_shared/constants.ts'

type IndustryType = Database['public']['Enums']['industry_type']

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Contact {
  id: string
  company: string | null
  company_domain?: string | null
  company_description?: string | null
  title: string | null
  linkedin_url?: string | null
  notes: string | null
}

interface ClearbitCompany {
  name: string;
  domain: string;
  description: string;
  category?: {
    industry?: string;
    sector?: string;
  };
}

// Keywords that suggest an industry
const industryKeywords: Record<IndustryType, string[]> = {
  manufacturing: ['factory', 'manufacturing', 'production', 'industrial', 'assembly'],
  technology: ['software', 'tech', 'digital', 'it', 'cyber', 'ai', 'cloud', 'saas'],
  tourism: ['travel', 'tourism', 'hospitality', 'hotel', 'airline'],
  healthcare: ['health', 'medical', 'pharma', 'biotech', 'hospital'],
  energy: ['energy', 'power', 'renewable', 'solar', 'wind', 'oil', 'gas'],
  mining: ['mining', 'minerals', 'metals', 'extraction'],
  logistics: ['logistics', 'transport', 'shipping', 'supply chain'],
  education: ['education', 'school', 'university', 'training', 'learning'],
  finance: ['bank', 'finance', 'investment', 'insurance', 'fintech'],
  real_estate: ['real estate', 'property', 'construction', 'development'],
  agriculture: ['agriculture', 'farming', 'food', 'agritech'],
  water: ['water', 'desalination', 'utilities'],
  defense: ['defense', 'security', 'military', 'aerospace'],
  sports: ['sports', 'fitness', 'entertainment'],
  aerospace: ['aerospace', 'aviation', 'space'],
  retail: ['retail', 'commerce', 'shop', 'store', 'ecommerce'],
  creative: ['media', 'design', 'art', 'creative', 'entertainment'],
  biotech: ['biotech', 'life sciences', 'research'],
  construction: ['construction', 'building', 'infrastructure'],
  ocean: ['marine', 'ocean', 'maritime', 'shipping']
}

// Map Clearbit categories to our industry types
const clearbitToIndustryMap: Record<string, IndustryType> = {
  'Software': 'technology',
  'Hardware': 'technology',
  'Information Technology': 'technology',
  'Financial Services': 'finance',
  'Banking': 'finance',
  'Insurance': 'finance',
  'Healthcare': 'healthcare',
  'Manufacturing': 'manufacturing',
  'Transportation': 'logistics',
  'Education': 'education',
  'Real Estate': 'real_estate',
  'Agriculture': 'agriculture',
  'Energy': 'energy',
  'Mining': 'mining',
  'Defense': 'defense',
  'Aerospace': 'aerospace',
  'Retail': 'retail',
  'Media': 'creative',
  'Entertainment': 'creative',
  'Biotechnology': 'biotech',
  'Construction': 'construction',
  'Maritime': 'ocean'
}

async function lookupCompany(companyName: string): Promise<ClearbitCompany | null> {
  try {
    // First try to find the company domain
    const domainResponse = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(companyName)}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('CLEARBIT_API_KEY')}`
        }
      }
    );

    if (!domainResponse.ok) {
      console.error('Clearbit API error:', await domainResponse.text());
      return null;
    }

    const suggestions = await domainResponse.json();
    if (!suggestions || suggestions.length === 0) {
      return null;
    }

    // Get the first suggestion's domain
    const domain = suggestions[0].domain;

    // Then get detailed company information
    const companyResponse = await fetch(
      `https://company.clearbit.com/v2/companies/find?domain=${domain}`,
      {
        headers: {
          'Authorization': `Bearer ${Deno.env.get('CLEARBIT_API_KEY')}`
        }
      }
    );

    if (!companyResponse.ok) {
      console.error('Clearbit Company API error:', await companyResponse.text());
      return null;
    }

    return await companyResponse.json();
  } catch (error) {
    console.error('Error looking up company:', error);
    return null;
  }
}

function inferIndustry(contact: Contact, companyInfo?: ClearbitCompany | null): IndustryType | null {
  // First try to use Clearbit industry information if available
  if (companyInfo?.category?.industry) {
    const mappedIndustry = clearbitToIndustryMap[companyInfo.category.industry];
    if (mappedIndustry) {
      return mappedIndustry;
    }
  }

  // Fall back to keyword matching using all available text
  const textToAnalyze = [
    contact.company,
    contact.title,
    contact.notes,
    companyInfo?.description
  ].filter(Boolean).join(' ').toLowerCase()

  // Score each industry based on keyword matches
  const scores = Object.entries(industryKeywords).map(([industry, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (textToAnalyze.includes(keyword.toLowerCase()) ? 1 : 0)
    }, 0)
    return { industry, score }
  })

  // Sort by score and get the highest scoring industry
  const [topIndustry] = scores
    .sort((a, b) => b.score - a.score)
    .filter(({ score }) => score > 0)

  return topIndustry ? topIndustry.industry as IndustryType : null
}

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

    // Get contacts without industry set
    const { data: contacts, error: fetchError } = await supabaseClient
      .from('contacts')
      .select('id, company, company_domain, company_description, title, notes')
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

      const industry = inferIndustry(contact, companyInfo);
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

