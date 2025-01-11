import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const MainNav = () => {
  const solutions = [
    {
      title: "Founders & Executives",
      href: "#founders",
      description: "Scale your business in KSA with confidence through strategic partnerships.",
    },
    {
      title: "Buyers & Investors",
      href: "#investors",
      description: "Uncover transformative investment opportunities aligned with Vision 2030.",
    },
    {
      title: "Advisors & Brokers",
      href: "#advisors",
      description: "Partner with global and local businesses to drive success.",
    },
  ];

  const resources = [
    {
      title: "Market Entry Guides",
      href: "#guides",
      description: "Essential steps and insights for expanding your business in Saudi Arabia.",
    },
    {
      title: "Investment Insights",
      href: "#insights",
      description: "Analysis of top sectors and opportunities under Vision 2030.",
    },
    {
      title: "Case Studies",
      href: "#cases",
      description: "Success stories of companies that have landed and expanded in KSA.",
    },
  ];

  return (
    <NavigationMenu className="absolute top-14 left-1/2 -translate-x-1/2 z-50">
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
            Solutions
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {solutions.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {resources.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-white hover:bg-white/10 hover:text-white"
            href="#events"
          >
            Events
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-white hover:bg-white/10 hover:text-white"
            href="#about"
          >
            About Us
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNav;