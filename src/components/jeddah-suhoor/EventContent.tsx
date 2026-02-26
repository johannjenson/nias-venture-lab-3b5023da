import EventDetails from "./EventDetails";
import WhatToExpect from "./WhatToExpect";

const EventContent = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <EventDetails />
          <WhatToExpect />
        </div>
      </div>
    </section>
  );
};

export default EventContent;
