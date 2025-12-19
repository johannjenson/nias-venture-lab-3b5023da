import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EventBanner = () => {
  const navItems = [
    { name: "Gather", href: "#gatherings" },
    { name: "Network", href: "#network" },
    { name: "Explore", href: "#opportunities" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top line - dark background with Work with NIAS */}
      <div className="bg-foreground text-background py-4 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 md:gap-12">
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-[0.15em] text-background/60 hover:text-background transition-colors font-medium"
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
      
      {/* Second line - white background with nav links (mobile only) */}
      <div className="md:hidden bg-background border-b border-border/30 py-3 px-4">
        <div className="flex items-center justify-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-nias-gold/10 border-b border-nias-gold/20 py-2 px-4">
        <a
          href="https://mof.gov.sa/en/budget/2026/Pages/Home.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 group"
        >
          <span className="text-[10px] md:text-xs text-foreground/70 uppercase tracking-[0.1em]">
            Just Announced
          </span>
          <span className="text-[10px] md:text-xs font-medium text-foreground group-hover:text-nias-gold transition-colors">
            Saudi Arabia 2026 Budget
          </span>
          <ArrowRight className="w-3 h-3 text-nias-gold group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default EventBanner;
