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
  formData: Record<string, any>;
}

const formatFieldLabel = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace('Gcc', 'GCC')
    .replace('Ebitda', 'EBITDA')
    .replace('Hq', 'HQ')
    .replace('Aum', 'AUM');
};

const formatFieldValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
};

const generateDetailsHtml = (formData: Record<string, any>): string => {
  const rows = Object.entries(formData)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0))
    .map(([key, value]) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-weight: 500; color: #4A5568; width: 40%;">${formatFieldLabel(key)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; color: #2D3748;">${formatFieldValue(value)}</td>
      </tr>
    `)
    .join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #F7FAFC; border-radius: 8px; overflow: hidden;">
      ${rows}
    </table>
  `;
};

const getApplicantEmailTemplate = (applicationType: string, name: string, formData: Record<string, any>) => {
  const typeLabel = applicationType === 'company' ? 'Company' : 
                    applicationType === 'fund' ? 'Institutional Platform' : 'Advisor';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 40px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 8px 8px; }
          .footer { text-align: center; margin-top: 40px; color: #718096; font-size: 14px; }
          h1 { margin: 0; font-size: 28px; font-weight: 600; }
          h2 { color: #2D3748; font-size: 18px; margin-top: 30px; }
          .highlight { background: #F7FAFC; padding: 20px; border-left: 4px solid #2D3748; margin: 20px 0; }
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

            <h2>Your Application Details</h2>
            ${generateDetailsHtml(formData)}
            
            <p style="margin-top: 30px;">In the meantime, feel free to explore more about NIAS:</p>
            <ul>
              <li><a href="https://nias.io/people" style="color: #2D3748;">Meet our team</a></li>
              <li><a href="https://nias.io/resources" style="color: #2D3748;">Explore Vision 2030 opportunities</a></li>
              <li><a href="https://nias.io/clients-partners" style="color: #2D3748;">Our clients & partners</a></li>
            </ul>
            
            <p>If you have any urgent questions, please don't hesitate to reach out to our team at <a href="mailto:network@nias.io" style="color: #2D3748;">network@nias.io</a>.</p>
            
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

const getTeamEmailTemplate = (applicationType: string, name: string, email: string, formData: Record<string, any>) => {
  const typeLabel = applicationType === 'company' ? 'Company' : 
                    applicationType === 'fund' ? 'Institutional Platform' : 'Advisor';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 40px 20px; }
          .header { background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 8px 8px; }
          h1 { margin: 0; font-size: 22px; font-weight: 600; }
          .badge { display: inline-block; background: #EBF8FF; color: #2B6CB0; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 500; margin-left: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Partnership Application <span class="badge">${typeLabel}</span></h1>
          </div>
          <div class="content">
            <p style="margin-top: 0;"><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #2D3748;">${email}</a>)</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
            
            ${generateDetailsHtml(formData)}
            
            <p style="margin-top: 20px; color: #718096; font-size: 14px;">
              <a href="https://supabase.com/dashboard/project/govawobduzmxagqmfobp/editor" style="color: #2D3748;">View in Database →</a>
            </p>
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
    const { applicationType, email, formData }: PartnershipEmailRequest = await req.json();

    console.log('Sending partnership confirmation email to:', email);
    console.log('Application type:', applicationType);
    console.log('Form data keys:', Object.keys(formData));

    const displayName = formData.full_name || formData.company_name || formData.fund_name || formData.advisor_name || 'Applicant';

    // Send confirmation email to applicant with all details
    const confirmationEmail = await resend.emails.send({
      from: "NIAS Partnerships <partnerships@nias.io>",
      to: [email],
      subject: "Your NIAS Partnership Application - Confirmation",
      html: getApplicantEmailTemplate(applicationType, displayName, formData),
    });

    console.log("Confirmation email sent successfully:", confirmationEmail);

    // Send notification to NIAS team (network@nias.io) with all details
    const notificationEmail = await resend.emails.send({
      from: "NIAS Partnerships <partnerships@nias.io>",
      to: ["network@nias.io"],
      subject: `New ${applicationType.charAt(0).toUpperCase() + applicationType.slice(1)} Application: ${displayName}`,
      html: getTeamEmailTemplate(applicationType, displayName, email, formData),
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
