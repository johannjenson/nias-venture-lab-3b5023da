import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === "SIGNED_IN" && session) {
        toast.success("Account created successfully!");
        navigate("/");
      } else if (event === "USER_UPDATED") {
        console.log("User updated event received");
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
      }
    });

    // Check for error parameters in URL
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      console.error("Auth error:", error, errorDescription);
      toast.error(decodeURIComponent(errorDescription || 'An error occurred during signup'));
    }

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Create Account | NIAS</title>
        <meta name="description" content="Create your NIAS member account to join our exclusive network of business leaders expanding into Saudi Arabia and the Gulf region." />
        <meta property="og:title" content="Create Account | NIAS" />
        <meta property="og:description" content="Create your NIAS member account to join our exclusive network of business leaders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/register" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://nias.io/register" />
      </Helmet>

      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/login")}
            className="hover:bg-transparent"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-8">Create Your Account</h1>
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
            onlyThirdPartyProviders={false}
            view="sign_up"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
