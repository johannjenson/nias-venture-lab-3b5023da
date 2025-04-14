
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
        { name: "GitHub Founder Event", href: "/events/github-founder" },
      ]},
      { name: "Past", submenu: [
        { name: "Business Forum", href: "/events/nias-business-forum" },
        { name: "LEAP Dinner", href: "/events/leap-dinner" },
        { name: "Suhoor Dinner", href: "/events/suhoor-dinner" },
        { name: "Fireside Chats", href: "/events/fireside-chats" },
      ]},
      { name: "Resources", submenu: [
        { name: "Opportunities", href: "/resources" },
        { name: "Member Login", href: "/login" },
        ...(user ? [{ name: "Log Out", href: "#", onClick: handleLogout }] : []),
      ]},
      { name: "About", submenu: [
        { name: "People", href: "/people" },
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
      {
        name: "Twitter",
        href: "https://x.com/niasnetwork",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
          &copy; {new Date().getFullYear()} Nias.io. All rights reserved.
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
