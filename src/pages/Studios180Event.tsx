
import { useState } from "react";
import Footer from "@/components/Footer";
import EventHeader from "@/components/studios180-event/EventHeader";
import EventContent from "@/components/studios180-event/EventContent";
import RequestInvitation from "@/components/studios180-event/RequestInvitation";
import EventSEO from "@/components/studios180-event/EventSEO";

const Studios180Event = () => {
  const handleRequestClick = () => {
    window.open('https://lu.ma/68r4t2h5', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <EventSEO />
      <EventHeader onRequestClick={handleRequestClick} />
      <main className="pt-16">
        <EventContent />
        <RequestInvitation onRequestClick={handleRequestClick} />
      </main>
      <Footer />
    </div>
  );
};

export default Studios180Event;
