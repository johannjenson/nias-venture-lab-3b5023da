import React from "react";
import { Link } from "react-router-dom";

const EventBanner = () => {
  const navItems = [
    { name: "Network", href: "#network" },
    { name: "Gatherings", href: "#gatherings" },
    { name: "Opportunities", href: "#opportunities" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-8">
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm text-background/70 hover:text-background transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        <Link 
          to="/work-with-nias" 
          className="text-olive hover:opacity-80 transition-opacity text-sm font-medium"
        >
          Work with NIAS
        </Link>
      </div>
    </div>
  );
};

export default EventBanner;
