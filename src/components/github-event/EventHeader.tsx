
import { Button } from "@/components/ui/button";
import { Github, Waves } from "lucide-react";
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

      <section className="pt-24 pb-24 bg-[#F8F3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in flex items-center gap-4">
              <Github className="h-12 w-12 text-black" />
              An Evening with GitHub Cofounder Tom Preston-Werner
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">Enjoy a relaxed gathering with key figures from Saudi Arabia's tech, government, and investor communities in the serene setting of our Irqah Farmhouse in Riyadh.</p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in" onClick={onRequestClick}>
              Request an Invitation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHeader;
