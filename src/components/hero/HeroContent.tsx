import { Button } from "@/components/ui/button";
import { ArrowRight, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import saudiTimesLogo from "@/assets/saudi-times-logo.png";
import diwanLogo from "@/assets/diwan-logo.png";

const HeroContent = () => {
  return (
    <div className="flex-1 flex flex-col bg-secondary/30">
      {/* Hero Section */}
      <div className="flex-1 flex items-center py-20 md:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Wave Icon */}
            <Waves className="h-10 w-10 md:h-12 md:w-12 text-foreground mx-auto mb-12" strokeWidth={2} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 leading-[1.15]">
              Land & Expand<br />in <span className="font-medium">Saudi Arabia</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Uniting top tier frontier tech, energy, sports, art, and entertainment companies with the Kingdom's most influential entrepreneurs, government leaders, strategic investors, and acquisitive funds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="bg-nias-blue hover:bg-nias-blue/90 text-nias-blue-foreground px-8 h-12 text-sm font-medium tracking-wide"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  For Investors <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-nias-green text-nias-green hover:bg-nias-green hover:text-nias-green-foreground px-8 h-12 text-sm font-medium tracking-wide"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  For Founders
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-8 h-12 text-sm font-medium tracking-wide"
              >
                <Link to="/resources">
                  View Opportunities
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-foreground text-background py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-2">$500B+</div>
              <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-background/50 font-medium">Network AUM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-2">300+</div>
              <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-background/50 font-medium">Network Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-2">100+</div>
              <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-background/50 font-medium">Deals Sourced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light tracking-tight mb-2">15+</div>
              <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-background/50 font-medium">Annual Gatherings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="bg-background py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-8">In Partnership With</p>
            <div className="flex items-center justify-center gap-12 md:gap-16">
              <a 
                href="https://thesauditimes.net/en/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={saudiTimesLogo} alt="The Saudi Times" className="h-8 md:h-10 w-auto" />
              </a>
              <a 
                href="https://www.the-diwan.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={diwanLogo} alt="The Diwan" className="h-16 md:h-20 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
