import { Button } from "@/components/ui/button";
import heroImage from "@/assets/doers-summit/saudi-playbook-hero.png";

interface RequestInvitationProps {
  onAttendClick: () => void;
}

const RequestInvitation = ({ onAttendClick }: RequestInvitationProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src={heroImage} 
              alt="Saudi Arabia Expansion" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Join NIAS at Doers Summit Dubai
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Don't miss this opportunity to learn from founders and operators who have successfully expanded into Saudi Arabia and the GCC.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={onAttendClick}
            >
              View Full Summit Agenda
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestInvitation;
