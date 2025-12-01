
import React from "react";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <a 
        href="/work-with-nias" 
        className="text-sm md:text-base underline hover:opacity-80 transition-opacity"
      >
        Work with NIAS
      </a>
    </div>
  );
};

export default EventBanner;
