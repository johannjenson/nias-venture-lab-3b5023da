
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, signInUrl }: RequestBody = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Nias Network <membership@nias.io>",
      to: [email],
      subject: "Your Magic Link - Nias Network",
      html: `
        <h1>Welcome to Nias Network!</h1>
        <p>Click the link below to sign in to your account:</p>
        <p><a href="${signInUrl}">Sign In to Nias Network</a></p>
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
