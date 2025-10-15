
import React from "react";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        See you in October for FII9!{" "}
        <a 
          href="https://docs.google.com/spreadsheets/d/12XVLc9IaDRS5PH047_YluUnbD32Mi9xuTvXpI58sO8M/edit?gid=0#gid=0" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          Click here
        </a>
        {" "}for a list of all events and side events in Riyadh.
      </span>
    </div>
  );
};

export default EventBanner;
