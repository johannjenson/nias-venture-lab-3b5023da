import { Button } from "@/components/ui/button";

interface AudienceCTAsProps {
  onRequestInvite: () => void;
}

const AudienceCTAs = ({ onRequestInvite }: AudienceCTAsProps) => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Founders & Executives</h3>
            <p className="mb-6 text-gray-600">Take your business to the next level.</p>
            <Button 
              variant="outline" 
              className="hover:bg-primary hover:text-white w-full md:w-auto"
              onClick={onRequestInvite}
            >
              Request to Join
            </Button>
          </div>
          <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Buyers & Investors</h3>
            <p className="mb-6 text-gray-600">Discover new opportunities.</p>
            <Button 
              variant="outline" 
              className="hover:bg-primary hover:text-white w-full md:w-auto"
              onClick={onRequestInvite}
            >
              Request to Join
            </Button>
          </div>
          <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Advisors & Brokers</h3>
            <p className="mb-6 text-gray-600">Join our network of trusted partners.</p>
            <Button 
              variant="outline" 
              className="hover:bg-primary hover:text-white w-full md:w-auto"
              onClick={onRequestInvite}
            >
              Request to Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceCTAs;