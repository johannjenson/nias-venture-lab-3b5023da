import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRegistrationRequest {
  fullName: string;
  email: string;
  phone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone }: NewsletterRegistrationRequest = await req.json();

    console.log("Sending newsletter confirmation for:", { fullName, email, phone });

    // Send confirmation email to johann@nias.io
    const emailResponse = await resend.emails.send({
      from: "Nias <onboarding@resend.dev>",
      to: ["johann@nias.io"],
      subject: "New Newsletter Registration - Nias Expansion Capital",
      html: `
        <h1>New Newsletter Registration</h1>
        <p>Someone has just signed up for the Nias Expansion Capital newsletter:</p>
        
        <h2>Registration Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Registration Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        
        <p>This registration was captured from the newsletter signup form on the website.</p>
        
        <p>Best regards,<br>Nias Website</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);