import { Button } from "@/components/ui/button";

interface RequestInvitationProps {
  onAttendClick: () => void;
}

const RequestInvitation = ({ onAttendClick }: RequestInvitationProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Join NIAS at Doers Summit Dubai
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Learn from founders and operators who have successfully expanded into Saudi Arabia and the GCC.
        </p>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          onClick={onAttendClick}
        >
          View Full Summit Agenda
        </Button>
      </div>
    </section>
  );
};

export default RequestInvitation;
