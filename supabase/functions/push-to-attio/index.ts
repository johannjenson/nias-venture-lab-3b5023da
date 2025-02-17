
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  data: {
    object_record: {
      object_type_id: string;
      attributes: {
        name: string;
        first_name: string;
        last_name: string;
        email: Array<{ value: string }>;
        phone: Array<{ value: string }>;
        title: string;
        company_name: string;
        industry: string;
        linkedin: string;
        referred_by: string;
        additional_info: string;
        tags: string[];
      };
    };
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { data } = await req.json() as RequestBody;
    console.log('Received payload:', JSON.stringify(data));

    // Push to Attio API
    const attioResponse = await fetch('https://api.attio.com/v2/records', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('ATTIO_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });

    if (!attioResponse.ok) {
      const errorData = await attioResponse.json();
      console.error('Attio API error:', errorData);
      throw new Error(`Attio API error: ${attioResponse.status} - ${JSON.stringify(errorData)}`);
    }

    const attioData = await attioResponse.json();
    console.log('Successfully pushed to Attio:', attioData);

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
