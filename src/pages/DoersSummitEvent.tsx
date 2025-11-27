import Footer from "@/components/Footer";
import EventHeader from "@/components/doers-summit/EventHeader";
import EventContent from "@/components/doers-summit/EventContent";
import RequestInvitation from "@/components/doers-summit/RequestInvitation";
import EventSEO from "@/components/doers-summit/EventSEO";

const DoersSummitEvent = () => {
  const handleAttendClick = () => {
    window.open('https://www.doerssummit.com/agenda/dubai-agenda', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <EventSEO />
      <EventHeader onAttendClick={handleAttendClick} />
      <main className="pt-16">
        <EventContent />
        <RequestInvitation onAttendClick={handleAttendClick} />
      </main>
      <Footer />
    </div>
  );
};

export default DoersSummitEvent;
