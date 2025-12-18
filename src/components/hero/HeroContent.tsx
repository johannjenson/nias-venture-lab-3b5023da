import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  onRequestInvite: () => void;
}

const HeroContent = ({ onRequestInvite }: HeroContentProps) => {
  return (
    <div className="flex-1 flex flex-col bg-secondary/30 pt-32 md:pt-24">
      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-block text-olive border border-olive/30 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide mb-8">
              Saudi Founders Network
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Do Good Things<br />For Good People
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              NIAS Access is a private network for frontier tech, energy, sports, art, and entertainment companies from around the world looking to do business in the Kingdom with reputable founders, partners, advisors, and government representatives.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                asChild
                className="bg-foreground hover:bg-foreground/90 text-background px-8 py-6 text-base font-medium rounded-lg"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  Request Access <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border text-foreground hover:bg-muted px-8 py-6 text-base font-medium rounded-lg"
              >
                <a href="#network">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-foreground text-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">300+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Network Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">200+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Introductions Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">10+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">4</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Focus Sectors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
