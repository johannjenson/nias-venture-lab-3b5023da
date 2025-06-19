
import { Button } from "@/components/ui/button";

interface RequestInvitationProps {
  onRequestClick: () => void;
}

const RequestInvitation = ({ onRequestClick }: RequestInvitationProps) => {
  return (
    <section id="register" className="py-24 bg-secondary mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Confirm Your Attendance
          </h2>
          <p className="text-gray-600 mb-8">Ready to join us for this exclusive evening? Please confirm your attendance for our curated gathering of 25 visionary leaders from technology, media, investment, and government sectors. We look forward to celebrating innovation and forging meaningful connections with you in the intimate setting of our Irqah Farmhouse.</p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={onRequestClick}>
            RSVP
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
