import { MessageCircle, Users2, Globe } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-primary mb-8">What to Expect</h2>

      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Off-the-record dialogue</h3>
            <p className="text-muted-foreground leading-relaxed">
              A candid conversation among people who rarely share a table: where the region is heading, what the WEF agenda signals, and where the real opportunities lie in 2026 and beyond.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
            <Users2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">A curated guest list</h3>
            <p className="text-muted-foreground leading-relaxed">
              Senior principals from business, government, and the broader ecosystem, assembled personally.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">The right moment</h3>
            <p className="text-muted-foreground leading-relaxed">
              With global leaders converging on Jeddah for the WEF meeting, the city becomes a stage for meaningful connection. This dinner positions you ahead of that conversation, in the most genuine setting possible.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-l-2 border-border pl-6">
        <p className="text-base text-muted-foreground italic leading-relaxed">
          "The best conversations in the Gulf happen after midnight, over a table that wasn't planned. Just quietly arranged."
        </p>
      </div>
    </div>
  );
};

export default WhatToExpect;
