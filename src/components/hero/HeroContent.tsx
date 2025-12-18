import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  onRequestInvite: () => void;
}

const HeroContent = ({ onRequestInvite }: HeroContentProps) => {
  return (
    <div className="flex-1 flex items-center bg-background pt-32 md:pt-16">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-olive border border-olive/30 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide mb-8">
            Private Membership Network
          </span>
          <h1 className="text-4xl md:text-6xl font-display tracking-tight text-foreground mb-6 leading-tight">
            Do Good Things<br />For Good People
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            NIAS is a private network for frontier tech, energy, sports, art, and entertainment companies from around the world looking to do business in the Kingdom with reputable founders, partners, advisors, and government representatives.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Button
              asChild
              className="bg-foreground hover:bg-foreground/90 text-background px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full md:w-auto rounded-full"
            >
              <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                For Founders <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full md:w-auto rounded-full"
            >
              <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                For Investors
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
