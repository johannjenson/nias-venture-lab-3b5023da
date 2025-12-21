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
        <td style="padding: 14px 16px; border-bottom: 1px solid #2a2a2a; color: #9ca3af; font-size: 14px; width: 40%; vertical-align: top;">${formatFieldLabel(key)}</td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #2a2a2a; color: #f5f5f5; font-size: 14px;">${formatFieldValue(value)}</td>
      </tr>
    `)
    .join('');

  return `
    <table style="width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; overflow: hidden; margin: 20px 0;">
      ${rows}
    </table>
  `;
};

const getApplicantEmailTemplate = (applicationType: string, name: string, formData: Record<string, any>) => {
  const typeLabel = applicationType === 'company' ? 'Company Application' : 
                    applicationType === 'fund' ? 'Institutional Platform Application' : 'Advisory Application';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received - NIAS Client</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="width: 100%; max-width: 620px; border-collapse: collapse;">
              
              <!-- Header with Logo -->
              <tr>
                <td style="padding: 32px 40px; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-bottom: 2px solid #b8860b;">
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td>
                        <h1 style="margin: 0; font-size: 26px; font-weight: 600; color: #ffffff; letter-spacing: 3px;">
                          NIAS
                          <span style="color: #b8860b; font-size: 14px; font-weight: 400; margin-left: 10px; letter-spacing: 1px;">CLIENT</span>
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px; background-color: #111111;">
                  <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 500; color: #ffffff; line-height: 1.4;">
                    Application Received
                  </h2>
                  
                  <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #d1d5db;">
                    Dear ${name},
                  </p>
                  
                  <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #d1d5db;">
                    Thank you for submitting your application to NIAS Client. We have received your information and our team will review your submission carefully.
                  </p>
                  
                  <!-- Application Type Badge -->
                  <div style="margin-bottom: 28px;">
                    <span style="display: inline-block; padding: 10px 18px; background-color: rgba(184, 134, 11, 0.15); border: 1px solid #b8860b; border-radius: 4px; color: #b8860b; font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">
                      ${typeLabel}
                    </span>
                  </div>
                  
                  <!-- What's Next Section -->
                  <div style="margin-bottom: 32px; padding: 24px; background-color: #1a1a1a; border-radius: 8px; border-left: 3px solid #b8860b;">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 500; color: #ffffff;">
                      What Happens Next?
                    </h3>
                    <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #9ca3af;">
                      Our team will review your application and assess how NIAS Client can best support your objectives in Saudi Arabia. We typically respond within 5-7 business days.
                    </p>
                  </div>
                  
                  <!-- Application Details -->
                  <h3 style="margin: 0 0 16px 0; font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px;">
                    Your Application Details
                  </h3>
                  ${generateDetailsHtml(formData)}
                </td>
              </tr>
              
              <!-- Footer Action Boxes -->
              <tr>
                <td style="padding: 0 40px 40px 40px; background-color: #111111;">
                  <h3 style="margin: 0 0 20px 0; font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px;">
                    Explore Our Network
                  </h3>
                  
                  <!-- Action Box 1: NIAS Network Tiers -->
                  <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 24px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #2a2a2a;">
                        <h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">
                          Join the NIAS Network
                        </h4>
                        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                          Explore membership tiers designed to support your Saudi Arabia market strategy.
                        </p>
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="padding-right: 10px; padding-bottom: 8px;">
                              <a href="https://access.nias.io" style="display: inline-block; padding: 10px 16px; background-color: rgba(184, 134, 11, 0.15); border: 1px solid #b8860b; border-radius: 4px; color: #b8860b; font-size: 13px; text-decoration: none; font-weight: 500;">
                                NIAS Access
                              </a>
                            </td>
                            <td style="padding-right: 10px; padding-bottom: 8px;">
                              <a href="https://access.nias.io/private" style="display: inline-block; padding: 10px 16px; background-color: rgba(184, 134, 11, 0.15); border: 1px solid #b8860b; border-radius: 4px; color: #b8860b; font-size: 13px; text-decoration: none; font-weight: 500;">
                                NIAS Private
                              </a>
                            </td>
                            <td style="padding-bottom: 8px;">
                              <span style="display: inline-block; padding: 10px 16px; background-color: #1f1f1f; border: 1px solid #3a3a3a; border-radius: 4px; color: #6b7280; font-size: 13px; font-weight: 500;">
                                Family Office <span style="font-size: 11px;">(Invite Only)</span>
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Action Box 2: Vision 2030 Sector Analysis -->
                  <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 24px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #2a2a2a;">
                        <h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">
                          Vision 2030 Sector Analysis
                        </h4>
                        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                          Explore comprehensive insights across 20+ sectors aligned with Saudi Arabia's Vision 2030 strategic priorities.
                        </p>
                        <a href="https://nias.io/resources" style="display: inline-block; padding: 12px 24px; background-color: #b8860b; border-radius: 4px; color: #ffffff; font-size: 14px; text-decoration: none; font-weight: 500;">
                          View Sector Analysis →
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Action Box 3: Contact -->
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td style="padding: 24px; background-color: #1a1a1a; border-radius: 8px; border: 1px solid #2a2a2a;">
                        <h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #ffffff;">
                          Questions?
                        </h4>
                        <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #9ca3af;">
                          If you have any urgent questions, please don't hesitate to reach out to our team at 
                          <a href="mailto:client@nias.io" style="color: #b8860b; text-decoration: none; font-weight: 500;">client@nias.io</a>. 
                          Or visit 
                          <a href="https://nias.io/work-with-nias" style="color: #b8860b; text-decoration: none; font-weight: 500;">nias.io/work-with-nias</a> 
                          to book a call.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Signature -->
              <tr>
                <td style="padding: 32px 40px; background-color: #0a0a0a; border-top: 1px solid #1a1a1a;">
                  <p style="margin: 0 0 4px 0; font-size: 15px; color: #d1d5db;">
                    Best regards,
                  </p>
                  <p style="margin: 0 0 24px 0; font-size: 15px; font-weight: 600; color: #ffffff;">
                    NIAS Client
                  </p>
                  
                  <!-- Legal Disclaimer -->
                  <p style="margin: 0; font-size: 11px; line-height: 1.7; color: #6b7280;">
                    This email and any attachments are confidential and may be privileged. If you are not the intended recipient, please notify the sender immediately and delete this email. This communication is for informational purposes only and does not constitute financial advice, an offer, or a solicitation to buy or sell any securities or financial instruments. Any investment decisions should be made based on independent professional advice. NIAS does not guarantee the accuracy or completeness of any information provided and accepts no liability for any loss arising from reliance on such information.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const getTeamEmailTemplate = (applicationType: string, name: string, email: string, formData: Record<string, any>) => {
  const typeLabel = applicationType === 'company' ? 'Company' : 
                    applicationType === 'fund' ? 'Institutional Platform' : 'Advisor';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Application - NIAS Client</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="width: 100%; max-width: 620px; border-collapse: collapse;">
              
              <!-- Header -->
              <tr>
                <td style="padding: 28px 40px; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-bottom: 2px solid #b8860b;">
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 500; color: #ffffff;">
                          New ${typeLabel} Application
                          <span style="display: inline-block; margin-left: 12px; padding: 6px 12px; background-color: rgba(184, 134, 11, 0.2); border: 1px solid #b8860b; border-radius: 4px; color: #b8860b; font-size: 12px; font-weight: 500; vertical-align: middle;">
                            ${typeLabel}
                          </span>
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 32px 40px; background-color: #111111;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #9ca3af;">
                    <strong style="color: #d1d5db;">From:</strong> ${name} 
                    (<a href="mailto:${email}" style="color: #b8860b; text-decoration: none;">${email}</a>)
                  </p>
                  <p style="margin: 0 0 24px 0; font-size: 14px; color: #9ca3af;">
                    <strong style="color: #d1d5db;">Submitted:</strong> ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                  
                  ${generateDetailsHtml(formData)}
                  
                  <p style="margin-top: 24px; font-size: 13px; color: #6b7280;">
                    <a href="https://supabase.com/dashboard/project/govawobduzmxagqmfobp/editor" style="color: #b8860b; text-decoration: none;">View in Database →</a>
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
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

    const displayName = formData.full_name || formData.fullName || formData.company_name || formData.fund_name || formData.advisor_name || 'Applicant';

    // Send confirmation email to applicant with all details
    const confirmationEmail = await resend.emails.send({
      from: "NIAS Client <client@nias.io>",
      to: [email],
      subject: "Your NIAS Client Application - Confirmation",
      html: getApplicantEmailTemplate(applicationType, displayName, formData),
    });

    console.log("Confirmation email sent successfully:", confirmationEmail);

    // Send notification to NIAS team (network@nias.io) with all details
    const notificationEmail = await resend.emails.send({
      from: "NIAS Client <client@nias.io>",
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
