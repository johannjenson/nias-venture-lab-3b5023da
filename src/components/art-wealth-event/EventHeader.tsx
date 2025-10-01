import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/art-wealth-hero.jpg";

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

      <section className="pt-28 pb-16 bg-[#F8F3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Contemporary art exhibition venue at JAX District"
                className="w-full h-auto rounded-lg shadow-lg object-cover object-bottom"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                Canvases & Capital: Art & Wealth in the New KSA
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Join us for an exclusive evening exploring the intersection of Saudi contemporary art and wealth management, featuring distinguished artists and industry leaders at J17 in JAX, Riyadh.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={onRequestClick}>
                Request Your Invitation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
