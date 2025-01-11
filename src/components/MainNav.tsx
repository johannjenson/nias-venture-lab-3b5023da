import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
import { NavMenuItem } from "./navigation/NavMenuItem";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

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

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed right-4 top-4 z-50 text-white hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[400px] bg-secondary">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <NavigationMenu className="w-full">
              {renderNavItems()}
            </NavigationMenu>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <NavigationMenu className="absolute top-14 left-1/2 -translate-x-1/2 z-50">
      {renderNavItems()}
    </NavigationMenu>
  );
};

export default MainNav;