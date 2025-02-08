
import { useEffect, useState } from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RequestInviteModal from "@/components/RequestInviteModal";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate OTP but don't send email (we'll send our own)
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: 'https://nias.io/login',
          // Disable the default email
          data: {
            disable_email: true
          }
        },
      });

      if (signInError) throw signInError;

      // Send our custom email
      const { error } = await supabase.functions.invoke('send-magic-link', {
        body: { 
          email,
          signInUrl: 'https://nias.io/login'
        },
      });

      if (error) throw error;

      toast.success("Check your email for the magic link!");
    } catch (error) {
      console.error('Error sending magic link:', error);
      toast.error("Failed to send magic link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSendMagicLink} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending magic link..." : "Send Magic Link"}
              </Button>
            </form>
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
