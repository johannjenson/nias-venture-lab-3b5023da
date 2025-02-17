
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
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fullName, email, phoneNumber, company, title, industry, linkedinUrl, referredBy, additionalInfo } = await req.json() as RequestBody

    // Split name into first and last name
    const names = fullName.split(' ')
    const firstName = names[0]
    const lastName = names.slice(1).join(' ')

    // Create Folk payload
    const payload = {
      email,
      firstName,
      lastName,
      phone: phoneNumber,
      company: {
        name: company,
      },
      jobTitle: title,
      labels: ["Network Request"],
      customFields: {
        industry,
        referredBy,
        additionalInfo,
      },
      urls: linkedinUrl ? [{
        type: "linkedin",
        url: linkedinUrl
      }] : []
    }

    console.log('Sending payload to Folk:', JSON.stringify(payload))

    // Push to Folk API
    const folkResponse = await fetch('https://api.folk.app/v2/people', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('FOLK_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!folkResponse.ok) {
      const errorData = await folkResponse.json()
      console.error('Folk API error:', errorData)
      throw new Error(`Folk API error: ${folkResponse.status}`)
    }

    const folkData = await folkResponse.json()
    console.log('Successfully pushed to Folk:', folkData)

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
