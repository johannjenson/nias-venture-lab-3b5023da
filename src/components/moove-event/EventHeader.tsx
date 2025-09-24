import { Button } from "@/components/ui/button";
import { Car, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

      <section 
        className="pt-28 pb-16 relative bg-gradient-to-r from-slate-900/90 to-blue-900/90"
        style={{
          backgroundImage: "url('/moove-founders.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 animate-fade-in flex items-center gap-4">
              <Car className="h-10 w-10 md:h-12 md:w-12 text-blue-400" />
              An Evening with Moove Co-CEO Ladi Delano
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-6 animate-fade-in">
              Join us for an exclusive gathering with Ladi Delano, Co-CEO of Moove.io, the global mobility fintech scaling a 39,000+ vehicle fleet into autonomous vehicles across 29 cities.
            </p>
            <p className="text-base md:text-lg text-gray-200 mb-8 animate-fade-in">
              October 7th • Al Amaaria • Exploring the future of mobility, AI infrastructure, and financial inclusion
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg animate-fade-in shadow-xl" onClick={onRequestClick}>
              Request Your Invitation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;