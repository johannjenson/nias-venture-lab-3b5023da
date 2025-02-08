
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EventRegistrationRequest {
  eventType: 'forum' | 'dinner';
  fullName: string;
  email: string;
  company: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const data = await req.json();
    console.log("Received event confirmation request:", data);

    const { eventType, fullName, email, company } = data as EventRegistrationRequest;

    if (!fullName || !email || !company || !eventType) {
      console.error("Missing required fields:", { fullName, email, company, eventType });
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

    const eventDetails = {
      forum: {
        name: "Nias Business Forum",
        date: "February 13th, 2024",
        location: "Riyadh",
      },
      dinner: {
        name: "Nias Network Dinner at LEAP",
        date: "February 9th, 2024",
        location: "Riyadh",
      },
    };

    const event = eventDetails[eventType];

    console.log("Attempting to send confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Nias Events <events@nias.io>",
      to: [email],
      subject: `Registration Received: ${event.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #221F26; margin-bottom: 24px;">Thank you for registering, ${fullName}!</h1>
          
          <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
            We have received your registration request for the ${event.name} in ${event.location} on ${event.date}.
          </p>

          <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
            Our team will review your application and get back to you within 48 hours with further details.
          </p>

          <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h2 style="color: #221F26; font-size: 18px; margin-bottom: 12px;">Registration Details</h2>
            <p style="color: #4B5563; margin: 4px 0;">Name: ${fullName}</p>
            <p style="color: #4B5563; margin: 4px 0;">Company: ${company}</p>
            <p style="color: #4B5563; margin: 4px 0;">Email: ${email}</p>
          </div>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            If you have any questions, please don't hesitate to reach out to our team.
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

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

  } catch (error: any) {
    console.error("Error in send-event-confirmation function:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
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
