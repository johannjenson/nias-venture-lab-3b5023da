
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
            Join us
          </h2>
          <p className="text-gray-600 mb-8">This exclusive evening is designed for 25 visionary leaders from technology, media, investment, and government sectors. We're bringing together pioneering minds to celebrate innovation and forge meaningful connections in an intimate setting. Submit your details to be considered for this curated experience.</p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={onRequestClick}>
            RSVP
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
