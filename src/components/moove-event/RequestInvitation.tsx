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
            Request Your Invitation
          </h2>
          <p className="text-gray-600 mb-8">
            This exclusive gathering is limited to a select group of family office principals, 
            sovereign wealth fund leaders, and government representatives. Join us for an evening 
            exploring the future of autonomous mobility, AI infrastructure, and financial inclusion 
            with one of the industry's most visionary leaders.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg" onClick={onRequestClick}>
            Request an Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;