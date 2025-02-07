
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type EventType = 'forum' | 'dinner';

interface StatusUpdateRequest {
  eventType: EventType;
  status: 'approved' | 'rejected' | 'waitlist';
  fullName: string;
  email: string;
}

const eventDetails = {
  forum: {
    name: "Nias Business Forum",
    date: "February 20th, 2024",
    location: "Riyadh",
  },
  dinner: {
    name: "Nias Network Dinner at LEAP",
    date: "February 9th, 2024",
    location: "Riyadh",
  },
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { eventType, status, fullName, email }: StatusUpdateRequest = await req.json();
    const event = eventDetails[eventType];

    let subject: string;
    let content: string;

    switch (status) {
      case 'approved':
        subject = `Your registration for ${event.name} has been approved!`;
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #221F26; margin-bottom: 24px;">Great news, ${fullName}!</h1>
            
            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              Your registration for the ${event.name} has been approved. We're excited to have you join us!
            </p>

            <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <h2 style="color: #221F26; font-size: 18px; margin-bottom: 12px;">Event Details</h2>
              <p style="color: #4B5563; margin: 4px 0;">Date: ${event.date}</p>
              <p style="color: #4B5563; margin: 4px 0;">Location: ${event.location}</p>
            </div>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              We will send you a follow-up email with more details about the event, including the exact venue and agenda.
            </p>

            <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
              If you have any questions, please don't hesitate to reach out to our team.
            </p>
          </div>
        `;
        break;

      case 'waitlist':
        subject = `You've been added to the waitlist for ${event.name}`;
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #221F26; margin-bottom: 24px;">Hello ${fullName},</h1>
            
            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              Thank you for your interest in the ${event.name}. Due to high demand, we've added you to our waitlist.
            </p>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              If a spot becomes available, we will contact you immediately. We appreciate your understanding and hope to accommodate you.
            </p>

            <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <h2 style="color: #221F26; font-size: 18px; margin-bottom: 12px;">Event Details</h2>
              <p style="color: #4B5563; margin: 4px 0;">Date: ${event.date}</p>
              <p style="color: #4B5563; margin: 4px 0;">Location: ${event.location}</p>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
              If you have any questions or would like to explore other upcoming events, please feel free to contact us.
            </p>
          </div>
        `;
        break;

      case 'rejected':
        subject = `Update regarding your registration for ${event.name}`;
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #221F26; margin-bottom: 24px;">Dear ${fullName},</h1>
            
            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              Thank you for your interest in the ${event.name}. After careful consideration of all applications, we regret to inform you that we are unable to accommodate your registration at this time.
            </p>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              We receive many applications for our events, and unfortunately, we have limited capacity. We encourage you to apply for our future events that might align better with your interests and expertise.
            </p>

            <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
              If you would like to learn more about upcoming events or have any questions, please don't hesitate to reach out to our team.
            </p>
          </div>
        `;
        break;

      default:
        throw new Error('Invalid status provided');
    }

    console.log(`Sending ${status} email for ${eventType} event to ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Nias Events <events@nias.io>",
      to: [email],
      subject: subject,
      html: content,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending status update email:", error);
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
