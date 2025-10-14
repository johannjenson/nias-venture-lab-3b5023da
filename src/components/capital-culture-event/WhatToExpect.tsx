import { Lightbulb, Network, Handshake, Award } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">What to Expect</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Deep Industry Insights</h3>
            <p className="text-gray-600 text-sm">Learn how cultural programming and creative ecosystems drive property value and urban competitiveness from global leaders</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Network className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Strategic Connections</h3>
            <p className="text-gray-600 text-sm">Meet the most influential decision-makers in global real estate, from sovereign wealth funds to family offices and institutional investors</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Handshake className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Deal-Making Opportunities</h3>
            <p className="text-gray-600 text-sm">Participate in curated roundtable sessions connecting around live opportunities from Saudi megaproject partnerships to European regeneration districts</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Technical Excellence</h3>
            <p className="text-gray-600 text-sm">Understand the legal, tax, and financial structures that underpin successful cross-border real estate transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatToExpect;
