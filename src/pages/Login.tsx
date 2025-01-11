import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RequestInviteModal from "@/components/RequestInviteModal";

const Login = () => {
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
      // Intercept sign up attempts
      if (event === "INITIAL_SESSION" && window.location.hash.includes('#auth-sign-up')) {
        setShowRequestModal(true);
        // Remove the hash to prevent modal from showing again on refresh
        window.history.replaceState(null, '', window.location.pathname);
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
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Member Login</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#000000',
                    brandAccent: '#404040',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
            view="sign_in"
            localization={{
              variables: {
                sign_up: {
                  link_text: "Don't have an account? Request to Join the Nias Network",
                  button_label: "Request to Join the Nias Network"
                }
              }
            }}
          />
          <RequestInviteModal 
            open={showRequestModal} 
            onOpenChange={setShowRequestModal}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;