import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  onRequestInvite: () => void;
}

const HeroContent = ({ onRequestInvite }: HeroContentProps) => {
  return (
    <div className="flex-1 flex items-center bg-secondary pt-32 md:pt-16">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#221F26] mb-6">
            Land & Expand in Saudi Arabia
          </h1>
          <p className="text-base md:text-lg text-[#555555] mb-8 md:mb-12 max-w-2xl mx-auto">
            Bringing together exceptional companies from around the world looking to do business in the Kingdom with serial and exited entrepreneurs, strategic investors, and acquisitive funds.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full md:w-auto"
              onClick={onRequestInvite}
            >
              Join the Nias Network
            </Button>
            <a 
              href="/resources"
              className="text-base md:text-lg text-[#333333] font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              View Opportunities <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;