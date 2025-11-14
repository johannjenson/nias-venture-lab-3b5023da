import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/us-saudi-forum-hero.jpg";

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
                alt="US-Saudi Investment Forum" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                VIP Dinner: US-Saudi Investment Forum
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 animate-fade-in">
                An exclusive gathering for select business leaders, investors, and government officials on the eve of the US-Saudi Investment Forum in Washington D.C.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" 
                onClick={onRequestClick}
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
