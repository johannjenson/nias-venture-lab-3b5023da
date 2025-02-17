
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  fullName: string;
  email: string;
  phoneNumber: string;
  company: string;
  title: string;
  industry: string;
  linkedinUrl: string;
  referredBy: string;
  additionalInfo: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fullName, email, phoneNumber, company, title, industry, linkedinUrl, referredBy, additionalInfo } = await req.json() as RequestBody

    // Split name into first and last name
    const names = fullName.split(' ')
    const firstName = names[0]
    const lastName = names.slice(1).join(' ')

    // Create Attio request payload
    const payload = {
      name: fullName,
      email_addresses: [{ email: email }],
      phone_numbers: phoneNumber ? [{ phone: phoneNumber }] : [],
      company: {
        name: company,
      },
      title: title,
      industry: industry,
      linkedin_url: linkedinUrl,
      referred_by: referredBy,
      additional_info: additionalInfo
    }

    // Push to Attio
    const attioResponse = await fetch('https://api.attio.com/v2/people', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('ATTIO_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!attioResponse.ok) {
      const errorData = await attioResponse.json()
      console.error('Attio API error:', errorData)
      throw new Error(`Attio API error: ${attioResponse.status}`)
    }

    const attioData = await attioResponse.json()
    console.log('Successfully pushed to Attio:', attioData)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
