
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

    // Create Folk payload following v3 API format
    const payload = {
      data: {
        email: email,
        name: {
          first_name: firstName,
          last_name: lastName
        },
        phone_numbers: phoneNumber ? [phoneNumber] : [],
        job: {
          title: title,
          company: {
            name: company
          }
        },
        tags: ["Network Request"],
        custom_fields: {
          industry: industry,
          referred_by: referredBy,
          additional_info: additionalInfo
        },
        social_links: linkedinUrl ? [{
          url: linkedinUrl,
          type: "linkedin"
        }] : []
      }
    }

    console.log('Sending payload to Folk:', JSON.stringify(payload))

    const FOLK_WORKSPACE_ID = Deno.env.get('FOLK_WORKSPACE_ID') || '';
    // Push to Folk API v3 with workspace ID
    const folkResponse = await fetch(`https://api.folk.app/v3/workspaces/${FOLK_WORKSPACE_ID}/people`, {
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
      throw new Error(`Folk API error: ${folkResponse.status} - ${JSON.stringify(errorData)}`)
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
