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
              A candid conversation among a small group of senior principals. Where the region is heading, what the coming months signal, and how the people in the room are thinking about what lies ahead.
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
              Senior principals from business and investment, assembled personally. The kind of gathering where the table itself is the value.
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
              Before the season fills up and schedules tighten, this is a rare window to gather without agenda, arrive ahead of the noise, and meet the people who will matter most in the months to come.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-l-2 border-border pl-6">
        <p className="text-base text-muted-foreground italic leading-relaxed">
          "The best conversations in Riyadh happen before the season starts. After that, everyone is already somewhere else."
        </p>
      </div>
    </div>
  );
};

export default WhatToExpect;
