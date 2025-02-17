
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  industry: string;
  linkedin_url: string;
  referred_by: string;
  additional_info: string;
  tags: string[];
  full_name: string;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const payload = await req.json() as RequestBody;
    console.log('Received payload:', JSON.stringify(payload));

    const MAKE_WEBHOOK_URL = Deno.env.get('MAKE_WEBHOOK_URL');
    if (!MAKE_WEBHOOK_URL) {
      throw new Error('Make.com webhook URL is not configured');
    }

    // Push to Make.com webhook
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!makeResponse.ok) {
      const errorData = await makeResponse.text();
      console.error('Make.com webhook error:', errorData);
      throw new Error(`Make.com webhook error: ${makeResponse.status} - ${errorData}`);
    }

    console.log('Successfully pushed to Make.com webhook');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
