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
}

interface NavMenuItemProps {
  title: string;
  items: NavItem[];
}

export const NavMenuItem = ({ title, items }: NavMenuItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-black bg-transparent hover:bg-white hover:text-black transition-colors">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavMenuList items={items} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};