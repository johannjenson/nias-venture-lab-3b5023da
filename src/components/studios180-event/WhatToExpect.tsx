
import { Flame } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div className="bg-[#F8F3E8] p-8 rounded-lg shadow-sm border border-[#E8E4D9]">
      <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
        <Flame className="h-5 w-5 text-primary" />
        What to Expect
      </h3>
      <ul className="space-y-4 text-gray-600">
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Insights from Tim Robinson on creative industry innovation and the future of immersive experiences</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Discussion on investment opportunities in media, creative industries, and experiential venues with industry leaders</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Dining in an elegant and intimate setting</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Connections with key decision-makers from family offices, government agencies, and creative sectors</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Strategic conversations about emerging trends in creative industries and cross-sector collaboration opportunities</p>
        </li>
      </ul>
      <p className="text-gray-600 italic mt-6 border-t border-[#E8E4D9] pt-4">
        "An opportunity to forge meaningful relationships with creative innovators and local leaders shaping the future of media, entertainment, and experiential design."
      </p>
    </div>
  );
};

export default WhatToExpect;
