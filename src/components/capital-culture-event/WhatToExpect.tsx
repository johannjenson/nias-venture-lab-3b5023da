import { Presentation, Scale, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WhatToExpect = () => {
  return (
    <div className="bg-secondary/30 rounded-xl p-8 mt-8">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h3 className="text-2xl font-bold text-primary">Evening Programme</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap shrink-0">
          Invitation Only
        </Badge>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Presentation className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Opening Keynote with Mark Wadhwa</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            A deep dive into how cultural programming, design, and creative ecosystems are now core drivers of property value and urban competitiveness. Drawing from 180 Studios' transformation of a former television studio into a thriving creative hub hosting Soho House and LVMH.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Panel 1: Capital Meets Culture</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            How investors, developers, and sovereign entities are building high-value districts where art, culture, and commerce converge. Explore the ROI of creative-led developments and lessons from global creative hubs including London, Riyadh, Seoul, and LA.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Scale className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Panel 2: Structures of Trust</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            How legal, tax, and financial engineering underpin the world's most successful property transactions. Navigate Shariah compliance, cross-border structuring, REITs, joint ventures, and governance models for multi-stakeholder projects.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Roundtable Sessions</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            Invite-only working sessions connecting investors, developers, and advisors around live opportunities—from Saudi megaproject partnerships to European regeneration districts. An opportunity for direct deal-making and partnership discussions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatToExpect;
