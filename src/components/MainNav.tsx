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
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };
  
  const about = [
    {
      title: "People",
      href: "/people",
      description: "Meet our crew at Nias.",
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our team.",
    },
  ];

  const events = [
    {
      title: "Nias Business Forum",
      href: "/events/riyadh",
      description: "Join our inaugural business forum on February 13th connecting global companies with Saudi investors at 7:00 PM.",
    },
    {
      title: "Nias Network Dinner at LEAP",
      href: "/events/leap-dinner",
      description: "Connect with industry leaders at our exclusive dinner during LEAP 2024 in Riyadh at 7:00 PM.",
    },
  ];

  const resources = [
    {
      title: "Vision 2030 Opportunities",
      href: "/resources",
      description: "Explore investment opportunities aligned with Saudi Vision 2030.",
    },
    {
      title: "Member Login",
      href: "/login",
      description: "Access your Nias member account.",
    },
    ...(user ? [
      {
        title: "CRM",
        href: "/crm",
        description: "Access the Twenty CRM system.",
      },
      {
        title: "Log Out",
        href: "#",
        description: "Sign out of your account",
        onClick: handleLogout,
      }
    ] : []),
  ];

  const renderNavItems = () => (
    <NavigationMenuList className="gap-6">
      <NavMenuItem title="Events" items={events} />
      <NavMenuItem title="Resources" items={resources} />
      <NavMenuItem title="About" items={about} />
    </NavigationMenuList>
  );

  return (
    <NavigationMenu className="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 z-50 w-full md:w-auto px-4 md:px-0">
      {renderNavItems()}
    </NavigationMenu>
  );
};

export default MainNav;