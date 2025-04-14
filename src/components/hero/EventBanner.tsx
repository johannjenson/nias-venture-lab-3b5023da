
import React from "react";

const EventBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
      <span className="text-sm md:text-base">
        On April 20th, join us for an evening with GitHub cofounder Tom Preston-Werner at our Irqah Farmhouse in Riyadh.{" "}
        <a 
          href="/events/an-evening-with-github-cofounder-tom-preston-werner"
          className="underline font-medium hover:text-white/90"
        >
          Learn More
        </a>
      </span>
    </div>
  );
};

export default EventBanner;
