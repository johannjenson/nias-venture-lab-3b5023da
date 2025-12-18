import { Button } from "@/components/ui/button";
import { ArrowRight, Waves } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="flex-1 flex flex-col bg-secondary/30 pt-16 md:pt-16">
      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Wave Icon */}
            <Waves className="h-12 w-12 text-foreground mx-auto mb-8" strokeWidth={2} />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Land & Expand<br />in <span className="font-semibold">Saudi Arabia</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Bringing together exceptional frontier tech, sports & entertainment, art & lifestyle, and energy companies from around the world with serial entrepreneurs, government leaders, strategic investors, and acquisitive funds in the Kingdom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-foreground hover:bg-foreground/90 text-background px-8 py-6 text-base font-medium rounded-lg"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  For Founders <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border text-foreground hover:bg-muted px-8 py-6 text-base font-medium rounded-lg"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  For Investors
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
              <div className="text-3xl md:text-4xl font-light mb-2">$500B+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Network AUM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">300+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Network Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">100+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Deals Sourced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light mb-2">15+</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-background/60">Annual Gatherings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
