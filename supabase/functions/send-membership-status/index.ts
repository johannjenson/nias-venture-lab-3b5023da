
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  requestId: string;
  status: 'approved' | 'waitlist' | 'rejected';
  recipient: {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  };
}

const getEmailContent = (status: string, firstName: string) => {
  switch (status) {
    case 'approved':
      return {
        subject: 'Welcome to Our Network! Your Membership is Approved',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #221F26; margin-bottom: 24px;">Welcome to Our Network, ${firstName}!</h1>
            
            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              We're thrilled to inform you that your membership request has been approved! You now have access to our exclusive network and all its benefits.
            </p>

            <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <h2 style="color: #221F26; font-size: 18px; margin-bottom: 12px;">About Your Account</h2>
              <p style="color: #4B5563; margin: 0; line-height: 1.5;">
                We've created your account and you'll be able to sign in using your email address. If this is your first time logging in, simply:
              </p>
              <ol style="color: #4B5563; margin: 12px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Go to the login page</li>
                <li style="margin-bottom: 8px;">Click "Forgot Password"</li>
                <li style="margin-bottom: 8px;">Enter your email address (${firstName ? firstName + ", " : ""}the same one you used for your application)</li>
                <li style="margin-bottom: 8px;">Follow the instructions in the reset password email to set your password</li>
              </ol>
            </div>

            <p style="color: #4B5563; font-size: 16px; line-height: 1.5;">
              We look forward to connecting with you and seeing the value you'll bring to our community.
            </p>

            <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
              If you have any trouble accessing your account, please don't hesitate to contact our support team.
            </p>
          </div>
        `,
      };
    case 'waitlist':
      return {
        subject: 'Your Membership Request Update',
        html: `
          <h1>Thank you for your interest, ${firstName}!</h1>
          <p>We appreciate your membership request and wanted to let you know that you've been added to our waitlist.</p>
          <p>We carefully review each application to ensure the best experience for all members. We'll contact you as soon as a spot becomes available.</p>
          <p>Best regards,<br>The Team</p>
        `,
      };
    case 'rejected':
      return {
        subject: 'Update on Your Membership Request',
        html: `
          <h1>Dear ${firstName},</h1>
          <p>Thank you for your interest in joining our network.</p>
          <p>After careful consideration, we regret to inform you that we are unable to approve your membership request at this time.</p>
          <p>We encourage you to apply again in the future as your professional journey evolves.</p>
          <p>Best regards,<br>The Team</p>
        `,
      };
    default:
      throw new Error('Invalid status');
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requestId, status, recipient }: RequestBody = await req.json();

    if (!recipient.email) {
      throw new Error('Recipient email is required');
    }

    const firstName = recipient.firstName || 'there';
    const emailContent = getEmailContent(status, firstName);

    console.log(`Sending ${status} notification to ${recipient.email} for request ${requestId}`);

    const emailResponse = await resend.emails.send({
      from: "Nias Network Membership <membership@nias.io>",
      to: [recipient.email],
      subject: emailContent.subject,
      html: emailContent.html,
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
    console.error("Error in send-membership-status function:", error);
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

