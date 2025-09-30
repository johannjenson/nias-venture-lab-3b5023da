import Footer from "@/components/Footer";
import EventHeader from "@/components/moove-event/EventHeader";
import EventContent from "@/components/moove-event/EventContent";
import RequestInvitation from "@/components/moove-event/RequestInvitation";
import EventSEO from "@/components/moove-event/EventSEO";

const MooveEvent = () => {
  const handleRequestClick = () => {
    window.open('https://luma.com/1qyexkvs', '_blank', 'noopener,noreferrer');
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

export default MooveEvent;