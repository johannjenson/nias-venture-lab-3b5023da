
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  requestId: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Generate a secure temporary password
const generateTempPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % charset.length;
    password += charset[randomIndex];
  }
  return password;
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { requestId, email, firstName, lastName }: RequestBody = await req.json();

    console.log(`Processing approved member request: ${requestId} for ${email}`);

    // First, check if user already exists
    const { data: existingUser } = await supabaseClient.auth.admin.listUsers();
    const userExists = existingUser.users.some(user => user.email === email);

    if (userExists) {
      console.log(`User with email ${email} already exists, updating request status`);
      
      // Update the request status to reflect the account already exists
      const { error: updateError } = await supabaseClient
        .from('Request')
        .update({ request_status: 'account_exists' })
        .eq('id', requestId);

      if (updateError) {
        console.error('Error updating request status:', updateError);
        throw updateError;
      }

      return new Response(
        JSON.stringify({ 
          message: 'User account already exists',
          status: 'account_exists'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Generate a temporary password
    const tempPassword = generateTempPassword();

    // Create the user account with the temporary password
    const { data: userData, error: createUserError } = await supabaseClient.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    if (createUserError) {
      console.error('Error creating user:', createUserError);
      throw createUserError;
    }

    // Update the request status to reflect the account creation
    const { error: updateError } = await supabaseClient
      .from('Request')
      .update({ 
        request_status: 'account_created',
        temp_password: tempPassword // Store the temporary password in the request record
      })
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating request status:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        message: 'User account created successfully',
        userId: userData.user.id,
        tempPassword
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in create-approved-member function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
