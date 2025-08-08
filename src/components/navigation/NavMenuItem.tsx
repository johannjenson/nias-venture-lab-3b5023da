import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { NavMenuList } from "./NavMenuList";

interface NavItem {
  title: string;
  href: string;
  description: string;
  onClick?: () => void;
}

interface NavMenuItemProps {
  title: string;
  items: NavItem[];
}

export const NavMenuItem = ({ title, items }: NavMenuItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavMenuList items={items} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};