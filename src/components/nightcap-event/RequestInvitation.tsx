import { Button } from "@/components/ui/button";

interface RequestInvitationProps {
  onRequestClick: () => void;
}

const RequestInvitation = ({ onRequestClick }: RequestInvitationProps) => {
  return (
    <section className="py-16 bg-[#F8F3E8]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Join Us for Night Cap</h2>
        <p className="text-xl text-gray-600 mb-8">
          This is an intimate, invitation-only gathering. Space is limited, so please RSVP early 
          to secure your spot at this unique evening event.
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
