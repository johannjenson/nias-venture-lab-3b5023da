import React from "react";
import { Link } from "react-router-dom";
import NiasLogo from "../NiasLogo";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NiasLogo variant="light" />
        <div className="flex items-center gap-6 text-sm">
          <Link 
            to="/work-with-nias" 
            className="hover:opacity-80 transition-opacity hidden md:block"
          >
            Work with NIAS
          </Link>
          <span className="text-background/40 hidden md:block">|</span>
          <a 
            href="https://access.nias.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-olive hover:opacity-80 transition-opacity font-medium"
          >
            Member Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
