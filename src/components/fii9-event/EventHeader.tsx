import { Button } from "@/components/ui/button";
import { Waves, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/fii9-hero.png";

interface EventHeaderProps {
  onRequestClick: () => void;
}

const EventHeader = ({ onRequestClick }: EventHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">
            <Waves className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>

      <section className="pt-28 pb-16 bg-gradient-to-br from-[#F8F3E8] to-[#F5EEE0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="FII9 Recap celebration event in Riyadh"
                className="w-full h-full max-h-[500px] rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                NTDP × avra × EAST40: Bringing Together Global Founders and Saudi's Startup Ecosystem
              </h1>
              <p className="text-xl text-gray-600 mb-6 animate-fade-in">
                Join us for a memorable evening with 25+ AI & emerging technology founders from Silicon Valley hosted by NTDP, avra, and EAST40. An exclusive evening honoring avra's latest cohort and the visionaries shaping the future of entrepreneurship in the Kingdom.
              </p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p className="font-semibold">Hosted by NTDP, avra, and EAST40</p>
                <p>October 29, 2025 • 5:00 PM - 7:00 PM</p>
                <p>Private Venue, Riyadh</p>
              </div>
              <Button 
                onClick={onRequestClick}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" 
              >
                RSVP
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
