import { Button } from "@/components/ui/button";

const AudienceCTAs = () => {
  return (
    <div id="network" className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
            The NIAS Access Network
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A carefully curated community of founders, advisors, and leaders united by a shared interest in the Saudi market.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50">
            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">Founders & Executives</h3>
            <p className="mb-8 text-muted-foreground">Entrepreneurs building innovative companies and seeking access to the Saudi market.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background"
            >
              <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                Request to Join
              </a>
            </Button>
          </div>
          <div className="text-center p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50">
            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">Buyers & Investors</h3>
            <p className="mb-8 text-muted-foreground">Fund managers seeking deal flow, co-investment opportunities, and strategic partnerships.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background"
            >
              <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                Request to Join
              </a>
            </Button>
          </div>
          <div className="text-center p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50">
            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">Advisors & Operators</h3>
            <p className="mb-8 text-muted-foreground">Industry experts and consultants guiding companies through GCC market entry.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background"
            >
              <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                Request to Join
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceCTAs;
