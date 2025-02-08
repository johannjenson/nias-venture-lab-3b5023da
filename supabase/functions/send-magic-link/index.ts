
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  email: string;
  signInUrl: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, signInUrl }: RequestBody = await req.json();
    console.log("Received request:", { email, signInUrl });

    // Generate an OTP token using Supabase auth API
    const otpResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/auth/v1/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({
        email,
        email_redirect_to: signInUrl,
        create_user: true,
        gotrue_meta_security: {}
      })
    });

    const responseText = await otpResponse.text();
    console.log("OTP response:", responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse OTP response:", e);
      throw new Error("Invalid response from auth service");
    }

    // Handle specific error cases
    if (!otpResponse.ok) {
      const errorMessage = responseData?.msg || responseData?.message || responseData?.error_description || 'Authentication error';
      
      // Handle rate limiting
      if (responseData.code === 429 || responseData.error_code === "over_email_send_rate_limit") {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait before trying again." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Handle database errors
      if (errorMessage.includes('Database error')) {
        console.error("Database error:", responseData);
        return new Response(
          JSON.stringify({ 
            error: "Unable to create user profile. Please try again later.",
            details: responseData 
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: otpResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!responseData.link) {
      console.error("No link in response data:", responseData);
      throw new Error('No link returned from Supabase');
    }

    console.log("Magic link generated:", responseData.link);

    const emailResponse = await resend.emails.send({
      from: "Nias Network <membership@nias.io>",
      to: [email],
      subject: "Your Magic Link - Nias Network",
      html: `
        <h1>Welcome to Nias Network!</h1>
        <p>Click the link below to sign in to your account:</p>
        <p><a href="${responseData.link}">Sign In to Nias Network</a></p>
        <p>If you didn't request this link, you can safely ignore this email.</p>
        <p>Best regards,<br>The Nias Network Team</p>
      `,
    });

    console.log("Magic link email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-magic-link function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: error.status || 500,
      }
    );
  }
});
