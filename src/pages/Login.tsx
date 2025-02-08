
import { useEffect, useState } from "react";
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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

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

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      console.error('Unexpected login error:', error);
      toast.error(error.message || "Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    if (timeSinceLastSubmit < 60000) {
      toast.error("Please wait at least 60 seconds before requesting another magic link");
      return;
    }

    setIsLoading(true);
    setLastSubmitTime(now);

    try {
      const { error } = await supabase.functions.invoke('send-magic-link', {
        body: { 
          email,
          signInUrl: 'https://nias.io/login'
        },
      });

      if (error) {
        if (error.message.includes('rate_limit')) {
          throw new Error("Please wait a minute before requesting another magic link");
        }
        throw error;
      }

      toast.success("Check your email for the magic link!");
    } catch (error: any) {
      console.error('Error sending magic link:', error);
      toast.error(error.message || "Failed to send magic link. Please try again.");
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
          <div className="w-full space-y-8">
            {/* Password Login Form */}
            <form onSubmit={handlePasswordLogin} className="space-y-4">
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
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login with Password"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Magic Link Form */}
            <form onSubmit={handleSendMagicLink} className="space-y-4">
              <Button 
                type="submit" 
                variant="outline"
                className="w-full"
                disabled={isLoading || !email}
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
