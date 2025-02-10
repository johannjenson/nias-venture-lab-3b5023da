
import { Button } from "@/components/ui/button";

interface ForumRegistrationProps {
  onRequestInvite: () => void;
}

const ForumRegistration = ({ onRequestInvite }: ForumRegistrationProps) => {
  return (
    <section id="register" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Request Your Invitation
          </h2>
          <p className="text-gray-600 mb-8">
            This exclusive forum is limited to qualified business leaders and investors.
            Submit your details to request an invitation.
          </p>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
            onClick={onRequestInvite}
          >
            Request an Invite
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForumRegistration;

