import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import NiasLogo from "./NiasLogo";

const Footer = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem(`sb-govawobduzmxagqmfobp-auth-token`);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navigation = {
    network: [
      { name: "For Founders", href: "https://access.nias.io/", external: true },
      { name: "For Investors", href: "https://access.nias.io/investors", external: true },
    ],
    opportunities: [
      { name: "Vision 2030", href: "/resources" },
      { name: "Real Estate", href: "/real-estate" },
    ],
    about: [
      { name: "Team", href: "/people" },
      { name: "Clients & Partners", href: "/clients-partners" },
      { name: "Contact", href: "/contact" },
      ...(user ? [{ name: "Log Out", href: "#", onClick: handleLogout }] : []),
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/nias-network",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/nias.io/",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M7.5 0h9A7.5 7.5 0 0124 7.5v9a7.5 7.5 0 01-7.5 7.5h-9A7.5 7.5 0 010 16.5v-9A7.5 7.5 0 017.5 0zm0 3A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  const FooterLink = ({ item }: { item: { name: string; href: string; external?: boolean; onClick?: () => void } }) => {
    if (item.onClick) {
      return (
        <button
          onClick={item.onClick}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.name}
        </button>
      );
    }
    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.name}
        </a>
      );
    }
    return (
      <Link
        to={item.href}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {item.name}
      </Link>
    );
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {/* Network */}
          <div>
            <h3 className="text-sm font-medium text-background mb-4">Network</h3>
            <ul className="space-y-3">
              {navigation.network.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="text-sm font-medium text-background mb-4">Opportunities</h3>
            <ul className="space-y-3">
              {navigation.opportunities.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-medium text-background mb-4">About</h3>
            <ul className="space-y-3">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-6">
              {navigation.social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-background/40 hover:text-background/60 transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="text-xs text-background/50">
              &copy; {new Date().getFullYear()} NIAS. All rights reserved.
              <span className="mx-2">·</span>
              <Link to="/privacy-policy" className="hover:text-background">Privacy Policy</Link>
              <span className="mx-2">·</span>
              <Link to="/terms-of-use" className="hover:text-background">Terms of Use</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
