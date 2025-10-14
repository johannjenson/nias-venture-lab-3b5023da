import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Waves, Lock, Building2 } from "lucide-react";
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
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Private Summit
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Cityscape Riyadh
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-4 animate-fade-in flex items-center gap-4">
              <Building2 className="h-12 w-12" />
              Capital & Culture: Structuring the Future of Cities
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 animate-fade-in font-medium">
              Where creativity meets capital, and global deals shape the next generation of urban living.
            </p>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in">
              An exclusive summit during Cityscape Riyadh (November 18) convening the most influential players in global real estate — family offices, sovereign wealth funds, institutional investors, developers, banks, and legal advisors — for a day of insight, connection, and deal-making.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={onRequestClick}>
              Request Your Invitation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
