
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, Lock } from "lucide-react";
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

      <section className="pt-28 pb-16 bg-[#F8F3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/lovable-uploads/9b26f755-15ed-4b3d-a18a-afffa45a500f.png" 
                alt="Evening gathering at Irqah Farmhouse with palm trees and guests"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Private Gathering
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                An Evening with London's creative powerhouse 180 Studios
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 animate-fade-in">Join us for an exclusive evening with 180 Studios — one of Central London's most profitable and culturally influential destinations. 

More than just a creative campus, 180 Studios is home to global powerhouses such as Soho House, TikTok, IMG Models, and the Financial Times, all operating under one roof in a space that blends culture, commerce, and technology.</p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={onRequestClick}>
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
