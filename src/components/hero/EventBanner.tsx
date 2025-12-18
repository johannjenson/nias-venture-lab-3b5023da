import React from "react";
import { Link } from "react-router-dom";

const EventBanner = () => {
  const navItems = [
    { name: "Gather", href: "#gatherings" },
    { name: "Network", href: "#network" },
    { name: "Explore", href: "#opportunities" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background py-4 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 md:gap-12">
        <div className="flex items-center gap-4 md:gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] text-background/60 hover:text-background transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
        <Link 
          to="/work-with-nias" 
          className="text-nias-gold hover:text-nias-gold/80 transition-colors text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] font-medium"
        >
          Work with NIAS
        </Link>
      </div>
    </div>
  );
};

export default EventBanner;
