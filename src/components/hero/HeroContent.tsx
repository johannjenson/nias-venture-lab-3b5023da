import { Button } from "@/components/ui/button";
import { ArrowRight, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import saudiTimesLogo from "@/assets/saudi-times-logo.png";
import diwanLogo from "@/assets/diwan-logo.png";

const regions = ["Saudi Arabia", "Kuwait", "the GCC"];

const HeroContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % regions.length);
        setIsVisible(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-secondary/30">
      {/* News Ticker */}
      <div className="bg-nias-gold/10 border-b border-nias-gold/20 py-2 px-4 mt-[88px] md:mt-[52px]">
        <a
          href="https://mof.gov.sa/en/budget/2026/Pages/Home.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 group"
        >
          <span className="text-[10px] md:text-xs text-foreground/70 uppercase tracking-[0.1em]">
            Just Announced
          </span>
          <span className="text-[10px] md:text-xs font-medium text-foreground group-hover:text-nias-gold transition-colors">
            Saudi Arabia 2026 Budget
          </span>
          <ArrowRight className="w-3 h-3 text-nias-gold group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center py-20 md:py-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Wave Icon */}
            <Waves className="h-10 w-10 md:h-12 md:w-12 text-foreground mx-auto mt-6 md:mt-0 mb-6 md:mb-12" strokeWidth={2} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 leading-[1.15]">
              Land & Expand<br />in{" "}
              <span 
                className={`font-medium inline-block transition-all duration-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {regions[currentIndex]}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Uniting top tier frontier tech, energy, sports, art, and entertainment companies with the Kingdom's most influential entrepreneurs, government leaders, strategic investors, and acquisitive funds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="w-full sm:w-56 bg-nias-blue hover:bg-nias-blue/90 text-nias-blue-foreground h-12 text-sm font-medium tracking-wide"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  For Capital Allocators <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-56 border-nias-green text-nias-green hover:bg-nias-green hover:text-nias-green-foreground h-12 text-sm font-medium tracking-wide"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  For Founders & Advisors
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-56 border-foreground/20 text-foreground hover:bg-foreground hover:text-background h-12 text-sm font-medium tracking-wide"
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
                <img src={diwanLogo} alt="The Diwan" className="h-24 md:h-[7.5rem] w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
