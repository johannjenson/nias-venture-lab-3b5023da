
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  data: {
    email: string;
    name: {
      first_name: string;
      last_name: string;
    };
    phone_numbers: string[];
    job: {
      title: string;
      company: {
        name: string;
      };
    };
    tags: string[];
    custom_fields: {
      industry: string;
      referred_by: string;
      additional_info: string;
    };
    social_links: Array<{
      url: string;
      type: string;
    }>;
  };
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { data } = await req.json() as RequestBody;
    console.log('Received payload:', JSON.stringify(data));

    const FOLK_WORKSPACE_ID = Deno.env.get('FOLK_WORKSPACE_ID') || '';
    if (!FOLK_WORKSPACE_ID) {
      throw new Error('Folk workspace ID is not configured');
    }

    // Folk API v3 with workspace ID
    const folkResponse = await fetch(`https://api.folk.app/v3/workspaces/${FOLK_WORKSPACE_ID}/people`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('FOLK_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });

    if (!folkResponse.ok) {
      const errorData = await folkResponse.json();
      console.error('Folk API error:', errorData);
      throw new Error(`Folk API error: ${folkResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const folkData = await folkResponse.json();
    console.log('Successfully pushed to Folk:', folkData);

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
