import React from "react";

const MainNav = () => {
  const navItems = [
    { name: "Network", href: "#network" },
    { name: "Gatherings", href: "#gatherings" },
    { name: "Opportunities", href: "#opportunities" },
  ];

  return (
    <nav className="absolute top-16 md:top-14 left-0 right-0 z-40 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
