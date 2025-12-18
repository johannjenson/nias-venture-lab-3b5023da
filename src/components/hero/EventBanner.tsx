import React from "react";
import { Link } from "react-router-dom";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background text-center py-3 px-4">
      <div className="flex items-center justify-center gap-6 text-sm">
        <Link 
          to="/work-with-nias" 
          className="hover:opacity-80 transition-opacity"
        >
          Work with NIAS
        </Link>
        <span className="text-background/40">|</span>
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
  );
};

export default EventBanner;
