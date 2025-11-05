
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Footer = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear any existing session from storage first
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
      { name: "Upcoming", submenu: [
        { name: "Biban25 Art Gala Dinner", href: "/events/biban25-art-gala-dinner" },
      ]},
      { name: "Past", submenu: [
        { name: "FII9 Recap", href: "/events/fii9-recap" },
        { name: "FII9 Night Caps", href: "/events/night-cap" },
        { name: "180 Studios Evening", href: "/events/studios180-event" },
        { name: "GitHub Founder Evening", href: "/events/an-evening-with-github-cofounder-tom-preston-werner" },
        { name: "VNTR Investor Forum", href: "/events/vntr-investor-forum" },
        { name: "Business Forum", href: "/events/nias-business-forum" },
        { name: "LEAP Dinner", href: "/events/leap-dinner" },
        { name: "Suhoor Dinner", href: "/events/suhoor-dinner" },
        { name: "Fireside Chats", href: "/events/fireside-chats" },
      ]},
      { name: "Resources", submenu: [
        { name: "Opportunities", href: "/resources" },
        { name: "Real Estate", href: "/real-estate" },
        { name: "Member Login", href: "https://access.nias.io", target: "_blank" },
        ...(user ? [{ name: "Log Out", href: "#", onClick: handleLogout }] : []),
      ]},
      { name: "About", submenu: [
        { name: "People", href: "/people" },
        { name: "Clients & Partners", href: "/clients-partners" },
        { name: "Contact", href: "/contact" }
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
    ],
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <div>
                <span className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </span>
                {item.submenu && (
                  <ul className="mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        {subitem.onClick ? (
                          <button
                            onClick={subitem.onClick}
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                          >
                            {subitem.name}
                          </button>
                        ) : (
                          <a
                            href={subitem.href}
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                            target={subitem.target}
                            rel={subitem.target === "_blank" ? "noopener noreferrer" : undefined}
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
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} NIAS.io. All rights reserved.
          <span className="mx-2">·</span>
          <a href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</a>
          <span className="mx-2">·</span>
          <a href="/terms-of-use" className="hover:text-gray-900">Terms of Use</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
