import Footer from "@/components/Footer";
import EventHeader from "@/components/art-wealth-event/EventHeader";
import EventContent from "@/components/art-wealth-event/EventContent";
import RequestInvitation from "@/components/art-wealth-event/RequestInvitation";
import EventSEO from "@/components/art-wealth-event/EventSEO";

const ArtWealthEvent = () => {
  const handleRequestClick = () => {
    window.open('https://luma.com/art-wealth-riyadh', '_blank', 'noopener,noreferrer');
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

export default ArtWealthEvent;
