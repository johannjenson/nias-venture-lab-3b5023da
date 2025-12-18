import { Button } from "@/components/ui/button";

const AudienceCTAs = () => {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6 md:p-8 rounded-lg bg-muted/50 border border-border/50">
            <h3 className="text-lg md:text-xl font-display text-foreground mb-4">Founders & Executives</h3>
            <p className="mb-6 text-muted-foreground">Take your business to the next level.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background w-full md:w-auto"
            >
              <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                Request to Join
              </a>
            </Button>
          </div>
          <div className="text-center p-6 md:p-8 rounded-lg bg-muted/50 border border-border/50">
            <h3 className="text-lg md:text-xl font-display text-foreground mb-4">Buyers & Investors</h3>
            <p className="mb-6 text-muted-foreground">Discover new opportunities.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background w-full md:w-auto"
            >
              <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                Request to Join
              </a>
            </Button>
          </div>
          <div className="text-center p-6 md:p-8 rounded-lg bg-muted/50 border border-border/50">
            <h3 className="text-lg md:text-xl font-display text-foreground mb-4">Advisors & Brokers</h3>
            <p className="mb-6 text-muted-foreground">Join our network of trusted partners.</p>
            <Button 
              asChild
              variant="outline" 
              className="hover:bg-foreground hover:text-background w-full md:w-auto"
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
