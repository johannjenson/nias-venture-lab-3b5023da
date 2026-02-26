import Footer from "@/components/Footer";
import EventHeader from "@/components/jeddah-suhoor/EventHeader";
import EventContent from "@/components/jeddah-suhoor/EventContent";
import RequestInvitation from "@/components/jeddah-suhoor/RequestInvitation";
import EventSEO from "@/components/jeddah-suhoor/EventSEO";

const JeddahSuhoorDinner = () => {
  const handleRequestClick = () => {
    // Opens the invitation request form (lu.ma link or modal to be added)
    window.open('https://lu.ma/jeddah-suhoor', '_blank', 'noopener,noreferrer');
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

export default JeddahSuhoorDinner;
