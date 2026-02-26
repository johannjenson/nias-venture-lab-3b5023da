import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Lock, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/riyadh-suhoor-hero.jpg";

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

      <section className="pt-28 pb-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image left */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Riyadh Suhoor Dinner — NIAS Private Gathering"
                  className="w-full h-auto rounded-lg shadow-xl object-cover object-center"
                />
                {/* Crescent moon SVG overlay — centered above the lantern chain */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute"
                  style={{ top: '3%', left: '50%', transform: 'translateX(-50%)', width: '7%', opacity: 0.92 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 10 C30 10 15 27 15 48 C15 69 30 86 50 86 C38 78 30 64 30 48 C30 32 38 18 50 10Z"
                    fill="#c9a84c"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-border via-muted to-border rounded-b-lg opacity-60" />
              </div>
            </div>

            {/* Copy right */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <Badge variant="outline" className="bg-background text-foreground border-border flex items-center gap-1 text-xs tracking-wide">
                  <Moon className="h-3 w-3 text-primary" />
                  Ramadan Suhoor
                </Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 text-xs tracking-wide">
                  <Lock className="h-3 w-3" />
                  By Invitation Only
                </Badge>
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium mb-3">
                Riyadh · Tuesday, 3 March 2026
              </p>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-5 animate-fade-in leading-tight">
                A Private Suhoor Dinner<br className="hidden lg:block" /> in Riyadh
              </h1>

              <p className="text-lg text-muted-foreground mb-4 animate-fade-in leading-relaxed">
                A private dinner, ahead of the busy season to come.
              </p>

              <p className="text-base text-muted-foreground/70 mb-8 animate-fade-in italic">
                No panels. No agenda. Just conversation, context, and shared perspective.
              </p>

              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base animate-fade-in tracking-wide"
                onClick={onRequestClick}
              >
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
