
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
      })
    });

    const responseText = await otpResponse.text();
    console.log("OTP response:", responseText);

    // If not ok status, handle the error
    if (!otpResponse.ok) {
      let errorMessage = "Failed to generate OTP";
      try {
        const errorData = JSON.parse(responseText);
        // Check if it's a rate limit error
        if (errorData.code === 429 || errorData.error_code === "over_email_send_rate_limit") {
          return new Response(
            JSON.stringify({ error: errorData.msg || "Rate limit exceeded. Please wait before trying again." }),
            {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        errorMessage = `${errorMessage}: ${JSON.stringify(errorData)}`;
      } catch (e) {
        errorMessage = `${errorMessage}: ${responseText}`;
      }
      throw new Error(errorMessage);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse OTP response:", e);
      throw new Error("Invalid response from auth service");
    }

    if (!responseData.link) {
      throw new Error('No link returned from Supabase');
    }

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
        status: error.status || 400,
      }
    );
  }
});
