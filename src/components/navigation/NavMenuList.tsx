import React from "react";
import { ListItem } from "./ListItem";

interface NavItem {
  title: string;
  href: string;
  description: string;
}

interface NavMenuListProps {
  items: NavItem[];
}

export const NavMenuList = ({ items }: NavMenuListProps) => {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] bg-white">
      {items.map((item) => (
        <ListItem key={item.title} title={item.title} href={item.href}>
          {item.description}
        </ListItem>
      ))}
    </ul>
  );
};