import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SheetData {
  type: "Companies" | "Funds" | "Advisors";
  headers: string[];
  values: (string | null)[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SheetData = await req.json();
    console.log("Received data for Google Sheets:", JSON.stringify(data));

    const googleAppsScriptUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    if (!googleAppsScriptUrl) {
      throw new Error("GOOGLE_APPS_SCRIPT_URL not configured");
    }

    const response = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log("Google Apps Script response:", responseText);

    if (!response.ok) {
      throw new Error(`Google Apps Script error: ${responseText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-to-google-sheets:", error);
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
