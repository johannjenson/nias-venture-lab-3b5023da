import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/doers-summit/saudi-playbook-hero.png";

interface EventHeaderProps {
  onAttendClick: () => void;
}

const EventHeader = ({ onAttendClick }: EventHeaderProps) => {
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

      <section className="pt-28 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Saudi Arabia Expansion" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  November 26, 2025
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Dubai, UAE
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Panel Discussion
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                The Playbook for Landing & Expanding in Saudi Arabia
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 animate-fade-in">
                The GCC is becoming the world's fastest-rising market for tech, capital, and frontier innovation. This panel unpacks real expansion journeys: how founders broke into the GCC & Saudi, secured investment, navigated regulation, and scaled from local to regional.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" 
                onClick={onAttendClick}
              >
                Attend Summit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
