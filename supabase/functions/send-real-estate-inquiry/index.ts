import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message }: InquiryRequest = await req.json();

    // Send email to NIAS Real Estate team
    const emailResponse = await resend.emails.send({
      from: "NIAS Real Estate <onboarding@resend.dev>",
      to: ["realestate@nias.io"],
      subject: `New Real Estate Inquiry from ${name}`,
      html: `
        <h2>New Real Estate Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to the inquirer
    await resend.emails.send({
      from: "NIAS Real Estate <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your inquiry - NIAS Real Estate",
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We've received your inquiry about real estate opportunities in Saudi Arabia.</p>
        <p>Our team will review your message and get back to you within 24 hours.</p>
        <p>In the meantime, feel free to reach out directly at <a href="mailto:realestate@nias.io">realestate@nias.io</a></p>
        <br>
        <p>Best regards,<br>
        <strong>The NIAS Real Estate Team</strong></p>
      `,
    });

    console.log("Real estate inquiry emails sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-real-estate-inquiry function:", error);
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
