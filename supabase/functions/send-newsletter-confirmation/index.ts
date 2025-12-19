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

    // Send confirmation email to the subscriber
    const subscriberEmail = await resend.emails.send({
      from: "Nias <network@nias.io>",
      to: [email],
      subject: "Confirm Your Subscription - Nias Expansion Capital",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="padding: 48px 40px; text-align: center;">
                      <h1 style="margin: 0 0 24px; font-size: 28px; font-weight: 600; color: #1a1a1a;">
                        Welcome to Nias, ${fullName.split(' ')[0]}!
                      </h1>
                      <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        Thank you for your interest in Nias Expansion Capital. Please confirm your subscription to receive our guide and focused updates on opportunities in KSA & Kuwait.
                      </p>
                      <a href="https://nias.io?confirmed=true&email=${encodeURIComponent(email)}" 
                         style="display: inline-block; padding: 16px 48px; background-color: #C5A572; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px; transition: background-color 0.2s;">
                        Confirm Subscription
                      </a>
                      <p style="margin: 32px 0 0; font-size: 14px; color: #888888;">
                        If you didn't sign up for this newsletter, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #eee; border-radius: 0 0 8px 8px;">
                      <p style="margin: 0; font-size: 13px; color: #888888; text-align: center;">
                        © ${new Date().getFullYear()} Nias. All rights reserved.<br>
                        <a href="https://nias.io" style="color: #C5A572; text-decoration: none;">nias.io</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Subscriber confirmation email sent:", subscriberEmail);

    // Send notification email to johann@nias.io
    const adminEmail = await resend.emails.send({
      from: "Nias <network@nias.io>",
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

    console.log("Admin notification email sent:", adminEmail);

    return new Response(JSON.stringify({ success: true, subscriberEmail, adminEmail }), {
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