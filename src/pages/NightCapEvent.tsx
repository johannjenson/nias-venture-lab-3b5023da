import Footer from "@/components/Footer";
import EventHeader from "@/components/nightcap-event/EventHeader";
import EventContent from "@/components/nightcap-event/EventContent";
import RequestInvitation from "@/components/nightcap-event/RequestInvitation";
import EventSEO from "@/components/nightcap-event/EventSEO";
import { useIsMobile } from "@/hooks/use-mobile";

const NightCapEvent = () => {
  const isMobile = useIsMobile();
  
  const handleRequestClick = () => {
    window.open('https://luma.com/bde61x7h', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen bg-white ${isMobile ? 'pb-20' : ''}`}>
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

export default NightCapEvent;
