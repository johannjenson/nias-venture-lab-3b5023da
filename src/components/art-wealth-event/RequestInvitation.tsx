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
            Join Us for This Exclusive Gathering
          </h2>
          <p className="text-gray-600 mb-8">
            This intimate evening is limited to collectors, wealth managers, family offices, and cultural leaders. Request your invitation to be part of this dialogue at the intersection of art, heritage, and wealth.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={onRequestClick}>
            Request Your Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
