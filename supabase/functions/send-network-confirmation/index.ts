
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NetworkRequestConfirmation {
  fullName: string;
  email: string;
  company: string;
  title: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: { ...corsHeaders },
      status: 204
    });
  }

  try {
    // Parse request body
    const data = await req.json();
    const { fullName, email, company, title } = data as NetworkRequestConfirmation;

    if (!fullName || !email || !company || !title) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          }
        }
      );
    }

    console.log("Sending network request confirmation to:", email);

    const emailResponse = await resend.emails.send({
      from: "Nias Network <network@nias.io>",
      to: [email],
      subject: "Nias Network Application Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #221F26; margin-bottom: 24px;">Thank you for your interest, ${fullName}!</h1>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
            We have received your request to join the Nias Network. Our team will carefully review your application
            and get back to you shortly.
          </p>

          <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h2 style="color: #221F26; font-size: 18px; margin-bottom: 12px;">Application Details</h2>
            <p style="color: #4B5563; margin: 4px 0;">Name: ${fullName}</p>
            <p style="color: #4B5563; margin: 4px 0;">Company: ${company}</p>
            <p style="color: #4B5563; margin: 4px 0;">Role: ${title}</p>
            <p style="color: #4B5563; margin: 4px 0;">Email: ${email}</p>
          </div>

          <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
            The Nias Network connects exceptional companies with strategic investors and partners in Saudi Arabia.
            We look forward to learning more about how we can support your business objectives in the Kingdom.
          </p>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            If you have any questions in the meantime, please don't hesitate to contact us.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify(emailResponse),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
        status: 200
      }
    );

  } catch (error) {
    console.error("Error in send-network-confirmation:", error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        details: error
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        }
      }
    );
  }
};

serve(handler);
