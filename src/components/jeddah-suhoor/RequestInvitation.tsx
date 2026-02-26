import { Button } from "@/components/ui/button";

interface RequestInvitationProps {
  onRequestClick: () => void;
}

const RequestInvitation = ({ onRequestClick }: RequestInvitationProps) => {
  return (
    <section id="register" className="py-24 bg-[#F7F3EB] mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-medium mb-4">
            Invitation Only
          </p>
          <h2 className="text-3xl font-bold text-primary mb-6">
            Request Your Seat
          </h2>
          <p className="text-gray-600 mb-3 leading-relaxed">
            This dinner is limited to 20 guests, assembled personally. If you believe you belong at this table — or know someone who does — we welcome a conversation.
          </p>
          <p className="text-sm text-gray-400 mb-10 italic">
            Applications reviewed on a rolling basis. Attendance confirmed by the NIAS team.
          </p>
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base tracking-wide"
            onClick={onRequestClick}
          >
            Request Your Invitation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
