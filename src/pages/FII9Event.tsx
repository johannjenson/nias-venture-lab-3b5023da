import Footer from "@/components/Footer";
import EventHeader from "@/components/fii9-event/EventHeader";
import EventContent from "@/components/fii9-event/EventContent";
import RequestInvitation from "@/components/fii9-event/RequestInvitation";
import EventSEO from "@/components/fii9-event/EventSEO";
import { useIsMobile } from "@/hooks/use-mobile";

const FII9Event = () => {
  const isMobile = useIsMobile();
  
  const handleRequestClick = () => {
    window.open('https://luma.com/rxo8tdf9', '_blank', 'noopener,noreferrer');
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

export default FII9Event;
