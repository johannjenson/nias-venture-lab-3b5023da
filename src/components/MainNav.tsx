import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React, { useEffect, useState } from "react";
import { NavMenuItem } from "./navigation/NavMenuItem";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const MainNav = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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

  // Don't render navigation on mobile
  if (isMobile) return null;

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
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const opportunities = [
    {
      title: "Vision 2030",
      href: "/resources",
      description: "Explore investment opportunities aligned with Saudi Vision 2030.",
    },
    {
      title: "Real Estate",
      href: "/real-estate",
      description: "Discover exclusive property opportunities in Riyadh and Khobar.",
    },
  ];

  const gatherings = [
    {
      title: "Upcoming",
      href: "/events",
      description: "View our upcoming exclusive gatherings and events.",
    },
    {
      title: "Doers Summit Dubai Panel",
      href: "/events/doers-summit-dubai-panel",
      description: "The Playbook for Landing & Expanding in Saudi Arabia.",
    },
    {
      title: "US-Saudi VIP Dinner in DC",
      href: "/events/us-saudi-forum-dinner",
      description: "An exclusive gathering on the eve of the US-Saudi Investment Forum.",
    },
    {
      title: "Biban25 Art Gala Dinner",
      href: "/events/biban25-art-gala-dinner",
      description: "An exclusive evening at Shamalat Art Co.",
    },
    {
      title: "FII9 Night Caps",
      href: "/events/night-cap",
      description: "An intimate evening gathering at The Greek Villa.",
    },
  ];

  const about = [
    {
      title: "Team",
      href: "/people",
      description: "Meet the NIAS founding team.",
    },
    {
      title: "Clients & Partners",
      href: "/clients-partners",
      description: "Our trusted clients and strategic partners.",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our team.",
    },
    ...(user ? [
      {
        title: "Inbound Contacts",
        href: "/resources/inbound-contacts",
        description: "View and manage contact form submissions",
      },
      {
        title: "CRM",
        href: "/crm",
        description: "Relationship Management",
      },
      {
        title: "Log Out",
        href: "#",
        description: "Sign out of your account",
        onClick: handleLogout,
      }
    ] : []),
  ];

  return (
    <NavigationMenu className="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 z-50 w-full md:w-auto px-4 md:px-0">
      <NavigationMenuList className="gap-6">
        <NavMenuItem title="Opportunities" items={opportunities} />
        <NavMenuItem title="Gatherings" items={gatherings} />
        <NavMenuItem title="About" items={about} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
