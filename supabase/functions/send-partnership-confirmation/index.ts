import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PartnershipEmailRequest {
  applicationType: 'company' | 'fund' | 'advisor';
  email: string;
  companyName?: string;
  advisorName?: string;
  phone: string;
}

const getEmailTemplate = (applicationType: string, name: string) => {
  const typeLabel = applicationType === 'company' ? 'Company' : 
                    applicationType === 'fund' ? 'Fund' : 'Advisor';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 40px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 40px; color: #718096; font-size: 14px; }
          h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .highlight { background: #F7FAFC; padding: 20px; border-left: 4px solid #2D3748; margin: 20px 0; }
          .button { display: inline-block; background: #2D3748; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Received</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for your interest in partnering with NIAS. We have successfully received your <strong>${typeLabel}</strong> partnership application.</p>
            
            <div class="highlight">
              <p style="margin: 0;"><strong>What happens next?</strong></p>
              <p style="margin-top: 10px; margin-bottom: 0;">Our Partnerships Team will review your submission and respond within <strong>7–10 business days</strong>. If your opportunity aligns with our strategic focus on the Gulf region, we'll reach out to coordinate a deeper discussion.</p>
            </div>
            
            <p>In the meantime, feel free to explore more about NIAS:</p>
            <ul>
              <li><a href="https://nias.io/people" style="color: #2D3748;">Meet our team</a></li>
              <li><a href="https://nias.io/resources" style="color: #2D3748;">Explore Vision 2030 opportunities</a></li>
              <li><a href="https://nias.io/clients-partners" style="color: #2D3748;">Our clients & partners</a></li>
            </ul>
            
            <p>If you have any urgent questions, please don't hesitate to reach out to our team.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>The NIAS Partnerships Team</strong></p>
          </div>
          <div class="footer">
            <p>NIAS - Connecting Global Opportunities with Gulf Growth</p>
            <p><a href="https://nias.io" style="color: #2D3748;">nias.io</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationType, email, companyName, advisorName, phone }: PartnershipEmailRequest = await req.json();

    console.log('Sending partnership confirmation email to:', email);

    const displayName = companyName || advisorName || 'Applicant';

    // Send confirmation email to applicant
    const confirmationEmail = await resend.emails.send({
      from: "NIAS Partnerships <onboarding@resend.dev>",
      to: [email],
      subject: "Your NIAS Partnership Application",
      html: getEmailTemplate(applicationType, displayName),
    });

    console.log("Confirmation email sent successfully:", confirmationEmail);

    // Send notification to NIAS team
    const notificationEmail = await resend.emails.send({
      from: "NIAS Application System <onboarding@resend.dev>",
      to: ["team@nias.io"], // Replace with actual NIAS team email
      subject: `New ${applicationType.toUpperCase()} Partnership Application`,
      html: `
        <h2>New Partnership Application Received</h2>
        <p><strong>Type:</strong> ${applicationType.toUpperCase()}</p>
        <p><strong>Name:</strong> ${displayName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><a href="https://govawobduzmxagqmfobp.supabase.co/project/govawobduzmxagqmfobp/editor">View in Database</a></p>
      `,
    });

    console.log("Team notification email sent successfully:", notificationEmail);

    return new Response(JSON.stringify({ 
      success: true, 
      confirmationId: confirmationEmail.data?.id,
      notificationId: notificationEmail.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-partnership-confirmation function:", error);
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
