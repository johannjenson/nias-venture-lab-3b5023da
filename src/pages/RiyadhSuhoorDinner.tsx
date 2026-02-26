import Footer from "@/components/Footer";
import EventHeader from "@/components/riyadh-suhoor/EventHeader";
import EventContent from "@/components/riyadh-suhoor/EventContent";
import RequestInvitation from "@/components/riyadh-suhoor/RequestInvitation";
import EventSEO from "@/components/riyadh-suhoor/EventSEO";

const RiyadhSuhoorDinner = () => {
  const handleRequestClick = () => {
    window.open('https://lu.ma/riyadh-suhoor', '_blank', 'noopener,noreferrer');
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

export default RiyadhSuhoorDinner;
