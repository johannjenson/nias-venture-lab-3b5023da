
import React from "react";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        See you at FII9 in Riyadh!{" "}
        <a 
          href="https://chat.whatsapp.com/H82Lt1szZyK6249KcSgak5" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          Join us on WhatsApp
        </a>
        {" "}for a list of all side events.
      </span>
    </div>
  );
};

export default EventBanner;
