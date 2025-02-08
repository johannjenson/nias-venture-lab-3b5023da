
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

    // Generate a magic link using Supabase auth API
    const magicLinkResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/auth/v1/magiclink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify({
        email,
        redirect_to: signInUrl,
        data: {
          suppress_email: true,
          use_custom_email: true
        }
      })
    });

    if (!magicLinkResponse.ok) {
      const error = await magicLinkResponse.text();
      console.error("Failed to generate magic link:", error);
      throw new Error('Failed to generate magic link: ' + error);
    }

    const responseData = await magicLinkResponse.json();
    console.log("Magic link response:", JSON.stringify(responseData, null, 2));

    if (!responseData.action_link) {
      throw new Error('No action link returned from Supabase');
    }

    const emailResponse = await resend.emails.send({
      from: "Nias Network <membership@nias.io>",
      to: [email],
      subject: "Your Magic Link - Nias Network",
      html: `
        <h1>Welcome to Nias Network!</h1>
        <p>Click the link below to sign in to your account:</p>
        <p><a href="${responseData.action_link}">Sign In to Nias Network</a></p>
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
        status: 400,
      }
    );
  }
});
