
import { useState } from "react";
import Footer from "@/components/Footer";
import EventHeader from "@/components/github-event/EventHeader";
import EventContent from "@/components/github-event/EventContent";
import RequestInvitation from "@/components/github-event/RequestInvitation";
import EventSEO from "@/components/github-event/EventSEO";

const GithubFounderEvent = () => {
  const handleRequestClick = () => {
    window.open('https://lu.ma/lcqqdchq', '_blank', 'noopener,noreferrer');
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

export default GithubFounderEvent;
