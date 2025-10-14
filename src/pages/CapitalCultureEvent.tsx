import Footer from "@/components/Footer";
import EventHeader from "@/components/capital-culture-event/EventHeader";
import EventContent from "@/components/capital-culture-event/EventContent";
import RequestInvitation from "@/components/capital-culture-event/RequestInvitation";
import EventSEO from "@/components/capital-culture-event/EventSEO";

const CapitalCultureEvent = () => {
  const handleRequestClick = () => {
    window.open('https://luma.com/capital-culture-riyadh', '_blank', 'noopener,noreferrer');
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

export default CapitalCultureEvent;
