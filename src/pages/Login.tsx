
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RequestInviteModal from "@/components/RequestInviteModal";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check current session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();

    // Handle error parameters in URL
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error === 'access_denied' && errorDescription) {
      toast.error(decodeURIComponent(errorDescription).replace(/\+/g, ' '));
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, searchParams]);

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
        <div className="max-w-md mx-auto min-h-[400px]">
          <h1 className="text-4xl font-bold text-primary mb-8">Member Login</h1>
          <div className="w-full">
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
              view="magic_link"
              showLinks={false}
              localization={{
                variables: {
                  magic_link: {
                    button_label: "Send Magic Link",
                    loading_button_label: "Sending magic link ...",
                    email_input_label: "Email address",
                    email_input_placeholder: "Your email address",
                    confirmation_text: "Check your email for the magic link",
                  }
                }
              }}
            />
            <div className="mt-4 space-y-2 text-center">
              <button
                onClick={() => setShowRequestModal(true)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Don't have an account? Request to Join
              </button>
            </div>
          </div>
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
