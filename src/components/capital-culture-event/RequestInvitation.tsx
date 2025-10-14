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
            Capital & Culture is a closed summit exclusively convening principals and senior decision-makers from leading sovereign wealth funds, global family offices, institutional investors, and premier real estate developers. Participation is strictly limited and by invitation only.
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
