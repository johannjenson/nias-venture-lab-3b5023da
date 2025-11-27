import EventDetails from "./EventDetails";
import Speakers from "./Speakers";
import WhatToExpect from "./WhatToExpect";

const EventContent = () => {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <WhatToExpect />
            <EventDetails />
          </div>
          <Speakers />
        </div>
      </div>
    </section>
  );
};

export default EventContent;
