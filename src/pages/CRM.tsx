import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CRM = () => {
  const navigate = useNavigate();
  
  // Frontend URL (from Vercel)
  const TWENTY_FRONTEND_URL = "https://your-twenty-frontend.vercel.app";
  
  // Backend URL (also from Vercel)
  const TWENTY_BACKEND_URL = "https://your-twenty-backend.vercel.app";
  
  // Auth URL (backend URL + /auth)
  const TWENTY_AUTH_URL = `${TWENTY_BACKEND_URL}/auth`;

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-transparent"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-7xl mx-auto">
          <iframe 
            src={TWENTY_FRONTEND_URL}
            className="w-full h-[calc(100vh-200px)] border-0 rounded-lg"
            title="Twenty CRM"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CRM;