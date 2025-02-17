
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

    // Create Attio request payload with correct API format
    const payload = {
      object_type_id: "people",
      attributes: {
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        email: [{ value: email }],
        phone: phoneNumber ? [{ value: phoneNumber }] : [],
        title: title,
        company_name: company,
        industry: industry,
        linkedin: linkedinUrl,
        referred_by: referredBy,
        additional_info: additionalInfo,
        tags: ["Network Request"]
      }
    }

    console.log('Sending payload to Attio:', JSON.stringify(payload))

    // Push to Attio API with correct endpoint
    const attioResponse = await fetch('https://api.attio.com/v2/objects', {
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
      throw new Error(`Attio API error: ${attioResponse.status} - ${JSON.stringify(errorData)}`)
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
