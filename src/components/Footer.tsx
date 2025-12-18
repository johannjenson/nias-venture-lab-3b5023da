import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

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
    main: [
      { name: "Opportunities", submenu: [
        { name: "Vision 2030", href: "/resources" },
        { name: "Real Estate", href: "/real-estate" },
      ]},
      { name: "Gatherings", submenu: [
        { name: "Upcoming", href: "/events" },
        { name: "Doers Summit Panel", href: "/events/doers-summit-dubai-panel" },
        { name: "US-Saudi VIP Dinner", href: "/events/us-saudi-forum-dinner" },
        { name: "Biban25 Art Gala", href: "/events/biban25-art-gala-dinner" },
        { name: "FII9 Night Caps", href: "/events/night-cap" },
        { name: "180 Studios Evening", href: "/events/studios180-event" },
      ]},
      { name: "About", submenu: [
        { name: "Team", href: "/people" },
        { name: "Clients & Partners", href: "/clients-partners" },
        { name: "Contact", href: "/contact" },
        ...(user ? [{ name: "Log Out", href: "#", onClick: handleLogout }] : []),
      ]},
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

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <div>
                <span className="text-sm font-semibold leading-6 text-background">
                  {item.name}
                </span>
                {item.submenu && (
                  <ul className="mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        {subitem.onClick ? (
                          <button
                            onClick={subitem.onClick}
                            className="text-sm leading-6 text-background/60 hover:text-background"
                          >
                            {subitem.name}
                          </button>
                        ) : (
                          <a
                            href={subitem.href}
                            className="text-sm leading-6 text-background/60 hover:text-background"
                          >
                            {subitem.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-background/40 hover:text-background/60" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-background/50">
          &copy; {new Date().getFullYear()} NIAS. All rights reserved.
          <span className="mx-2">·</span>
          <a href="/privacy-policy" className="hover:text-background">Privacy Policy</a>
          <span className="mx-2">·</span>
          <a href="/terms-of-use" className="hover:text-background">Terms of Use</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
