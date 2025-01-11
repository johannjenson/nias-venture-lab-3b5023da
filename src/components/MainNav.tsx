import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { NavMenuItem } from "./navigation/NavMenuItem";

const MainNav = () => {
  const about = [
    {
      title: "People",
      href: "/people",
      description: "Meet our team of founders and leaders.",
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
      description: "Join our inaugural business forum connecting global companies with Saudi investors.",
    },
  ];

  const resources = [
    {
      title: "Vision 2030 Opportunities",
      href: "/resources",
      description: "Explore investment opportunities aligned with Saudi Vision 2030.",
    },
  ];

  return (
    <NavigationMenu className="absolute top-14 left-1/2 -translate-x-1/2 z-50">
      <NavigationMenuList className="gap-6">
        <NavMenuItem title="Events" items={events} />
        <NavMenuItem title="Resources" items={resources} />
        <NavMenuItem title="About" items={about} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;