import React from "react";
import { Link } from "react-router-dom";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
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
