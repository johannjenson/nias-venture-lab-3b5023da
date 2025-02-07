
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  email: string;
  firstName: string;
  lastName: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName }: RequestBody = await req.json();

    console.log(`Sending account invitation to ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Nias Network <membership@nias.io>",
      to: [email],
      subject: "Join Nias Network - Create Your Account",
      html: `
        <h1>Welcome to Nias Network, ${firstName}!</h1>
        <p>We're excited to invite you to create your account on our platform.</p>
        <p>Click the link below to set up your account:</p>
        <p><a href="https://nias.io/register?email=${encodeURIComponent(email)}">Create Your Account</a></p>
        <p>Best regards,<br>The Nias Network Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-account-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
