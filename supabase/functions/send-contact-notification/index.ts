import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormRequest = await req.json();

    console.log("Sending contact form notification for:", { name, email });

    // Send notification email to johann@nias.io
    const emailResponse = await resend.emails.send({
      from: "Nias <network@nias.io>",
      to: ["johann@nias.io"],
      subject: "New Contact Form Submission - Nias",
      html: `
        <h1>New Contact Form Submission</h1>
        <p>Someone has submitted the contact form on the Nias website:</p>
        
        <h2>Contact Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Submission Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <p>Please respond to this inquiry at your earliest convenience.</p>
        
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
    console.error("Error in send-contact-notification function:", error);
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
