import EventDetails from "./EventDetails";
import GuestsOfHonor from "./GuestsOfHonor";
import WhatToExpect from "./WhatToExpect";

const EventContent = () => {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <img 
            src="/moove-founders.jpg" 
            alt="Ladi Delano and Jide Odunsi, Co-CEOs of Moove"
            className="w-full max-w-3xl mx-auto h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <EventDetails />
          <div>
            <GuestsOfHonor />
            <WhatToExpect />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventContent;