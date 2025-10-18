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
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      // Still navigate home in case of error
      navigate("/");
    }
  };
  
  const upcoming = [
    {
      title: "FII9 Recap: Celebrating Saudi Arabia's Innovation Ecosystem",
      href: "/events/fii9-recap",
      description: "An exclusive evening honoring Avra's latest cohort and the visionaries shaping the future of entrepreneurship in the Kingdom.",
    },
  ];

  const pastEvents = [
    {
      title: "An Evening with London's creative powerhouse 180 Studios",
      href: "/events/studios180-event",
      description: "Join us for dinner and conversation with Tim Robinson on June 24th, 2025 at Irqah Farmhouse in Riyadh. (Private invite-only gathering)",
    },
  ];

  const about = [
    {
      title: "People",
      href: "/people",
      description: "Meet our crew at NIAS.",
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
  ];

  const resources = [
    {
      title: "Vision 2030 Opportunities",
      href: "/resources",
      description: "Explore investment opportunities aligned with Saudi Vision 2030.",
    },
    ...(user ? [{
      title: "Inbound Contacts",
      href: "/resources/inbound-contacts",
      description: "View and manage contact form submissions",
    }] : []),
    ...(!user ? [{
      title: "Member Login",
      href: "https://access.nias.io",
      description: "Access your NIAS member account.",
      onClick: () => window.open("https://access.nias.io", "_blank", "noopener,noreferrer"),
    }] : []),
    ...(user ? [
      {
        title: "Relationship Management",
        href: "/crm",
        description: "You eat what you hunt",
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
        <NavMenuItem title="Upcoming" items={upcoming} />
        <NavMenuItem title="Past" items={pastEvents} />
        <NavMenuItem title="About" items={about} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
