import EventDetails from "./EventDetails";
import GuestsOfHonor from "./GuestsOfHonor";
import WhatToExpect from "./WhatToExpect";

const EventContent = () => {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <EventDetails />
            <WhatToExpect />
          </div>
          <GuestsOfHonor />
        </div>
      </div>
    </section>
  );
};

export default EventContent;
