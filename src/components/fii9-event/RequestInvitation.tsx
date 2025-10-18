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
            Attendance by Invitation Only
          </h2>
          <p className="text-gray-600 mb-8">
            This exclusive celebration is limited to global founders, innovation leaders, government representatives, and select ecosystem builders. Space is extremely limited. Submit your details to join the waitlist.
          </p>
          <Button 
            disabled
            className="bg-gray-400 hover:bg-gray-400 text-gray-600 px-8 py-6 text-lg cursor-not-allowed"
          >
            Invite Only
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
