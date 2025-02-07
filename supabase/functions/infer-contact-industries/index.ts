import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Database } from '../_shared/database.types.ts'

type IndustryType = Database['public']['Enums']['industry_type']

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Contact {
  id: string
  company: string | null
  title: string | null
  linkedin_url?: string | null
  notes: string | null
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

function inferIndustry(contact: Contact): IndustryType | null {
  const textToAnalyze = [
    contact.company,
    contact.title,
    contact.notes
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
      .select('id, company, title, notes')
      .is('industry', null)

    if (fetchError) throw fetchError

    // Process each contact
    const updates = contacts.map(async (contact) => {
      const industry = inferIndustry(contact)
      if (!industry) return null

      const { error: updateError } = await supabaseClient
        .from('contacts')
        .update({ industry })
        .eq('id', contact.id)

      if (updateError) {
        console.error(`Error updating contact ${contact.id}:`, updateError)
        return null
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