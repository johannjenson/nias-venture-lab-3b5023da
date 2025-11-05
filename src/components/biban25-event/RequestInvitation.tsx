import { Button } from "@/components/ui/button";

interface RequestInvitationProps {
  onRequestClick: () => void;
}

const RequestInvitation = ({ onRequestClick }: RequestInvitationProps) => {
  return (
    <section className="py-16 bg-[#F8F3E8]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Join Us at Biban25 Art Gala</h2>
        <p className="text-xl text-gray-600 mb-8">
          This is an exclusive, invitation-only event. Space is limited to 100 carefully selected attendees, 
          so please RSVP early to secure your spot at this unique evening.
        </p>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          onClick={onRequestClick}
        >
          RSVP Now
        </Button>
      </div>
    </section>
  );
};

export default RequestInvitation;
