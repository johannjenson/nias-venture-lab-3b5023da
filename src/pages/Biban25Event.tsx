import Footer from "@/components/Footer";
import EventHeader from "@/components/biban25-event/EventHeader";
import EventContent from "@/components/biban25-event/EventContent";
import RequestInvitation from "@/components/biban25-event/RequestInvitation";
import EventSEO from "@/components/biban25-event/EventSEO";
import { useIsMobile } from "@/hooks/use-mobile";

const Biban25Event = () => {
  const isMobile = useIsMobile();
  
  const handleRequestClick = () => {
    window.open('https://forms.gle/CkJriJXGVYgxLF7w9', '_blank', 'noopener,noreferrer');
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

export default Biban25Event;
