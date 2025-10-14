import { Button } from "@/components/ui/button";
import { Waves, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-white/50 backdrop-blur">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Invitation Only
                </Badge>
                <Badge variant="outline" className="bg-white/50 backdrop-blur">
                  FII9 Recap
                </Badge>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                Celebrating Saudi Arabia's Innovation Ecosystem
              </h1>
              <p className="text-xl text-gray-600 mb-6 animate-fade-in">
                An exclusive evening honoring Avra's latest cohort and the visionaries shaping the future of entrepreneurship in the Kingdom.
              </p>
              <div className="text-sm text-gray-500 mb-6 space-y-1">
                <p className="font-semibold">Hosted by EAST40, Avra, and NTDP</p>
                <p>October 29, 2025 • 7:00 PM - 9:00 PM</p>
                <p>The Majlis at The Garage, Riyadh</p>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" 
                onClick={onRequestClick}
              >
                Request Your Invitation
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-8 border border-white/50">
                <h3 className="text-2xl font-bold text-primary mb-4">Where Global Innovation Meets Saudi Opportunity</h3>
                <p className="text-gray-700 leading-relaxed">
                  Join an intimate gathering of global founders, pioneering entrepreneurs, and government leaders as we celebrate the achievements of Avra's cohort and explore the dynamic intersection of international innovation and Saudi Arabia's thriving entrepreneurial landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
