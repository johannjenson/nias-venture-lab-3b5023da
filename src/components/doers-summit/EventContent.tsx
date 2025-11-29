import EventDetails from "./EventDetails";
import Speakers from "./Speakers";
import WhatToExpect from "./WhatToExpect";
import { ExternalLink } from "lucide-react";
import coverageThumb from "@/assets/doers-summit/summit-coverage-thumb.png";

const EventContent = () => {
  return (
    <section className="pt-0 pb-4 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div className="space-y-12">
            <EventDetails />
            
            {/* Pre-Coverage Article */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Media Coverage</h2>
              <a 
                href="https://thesauditimes.net/en/the-saudi-expansion-playbook-inside-the-summit-redefining-how-the-region-builds"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <img 
                    src={coverageThumb} 
                    alt="The Saudi Expansion Playbook" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white flex items-center gap-2">
                      <span className="font-semibold">Read the full article</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-4 group-hover:text-primary transition-colors">
                  The Saudi Expansion Playbook: Inside the Summit Redefining How the Region Builds
                </h3>
                <p className="text-sm text-gray-600 mt-2">The Saudi Times</p>
              </a>
            </div>
          </div>
          <Speakers />
        </div>
        
        {/* What to Expect - Full Width */}
        <WhatToExpect />
      </div>
    </section>
  );
};

export default EventContent;
