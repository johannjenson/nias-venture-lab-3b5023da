import Footer from "@/components/Footer";
import EventHeader from "@/components/us-saudi-dinner/EventHeader";
import EventContent from "@/components/us-saudi-dinner/EventContent";
import RequestInvitation from "@/components/us-saudi-dinner/RequestInvitation";
import EventSEO from "@/components/us-saudi-dinner/EventSEO";

const USSaudiForumDinner = () => {
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

export default USSaudiForumDinner;
