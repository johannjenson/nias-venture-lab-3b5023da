import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { NavMenuItem } from "./navigation/NavMenuItem";
import { useIsMobile } from "@/hooks/use-mobile";

const MainNav = () => {
  const isMobile = useIsMobile();
  
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
      description: "Join our inaugural business forum on February 20th connecting global companies with Saudi investors.",
    },
  ];

  const resources = [
    {
      title: "Vision 2030 Opportunities",
      href: "/resources",
      description: "Explore investment opportunities aligned with Saudi Vision 2030.",
    },
  ];

  const renderNavItems = () => (
    <NavigationMenuList className="gap-6">
      <NavMenuItem title="Events" items={events} />
      <NavMenuItem title="Resources" items={resources} />
      <NavMenuItem title="About" items={about} />
    </NavigationMenuList>
  );

  return (
    <NavigationMenu className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full md:w-auto px-4 md:px-0">
      {renderNavItems()}
    </NavigationMenu>
  );
};

export default MainNav;