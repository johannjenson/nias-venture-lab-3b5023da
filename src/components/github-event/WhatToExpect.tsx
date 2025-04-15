
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
          <p>Insights from Tom Preston-Werner on technological innovation and the future of collaborative software</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Discussion on investment opportunities in media, software, and real estate with industry leaders</p>
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
          <p>Connections with key decision-makers from family offices, government agencies, and business sectors</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="min-w-5 pt-0.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
          </div>
          <p>Strategic conversations about emerging trends and cross-sector collaboration opportunities</p>
        </li>
      </ul>
      <p className="text-gray-600 italic mt-6 border-t border-[#E8E4D9] pt-4">
        "An opportunity to forge meaningful relationships with global innovators and local leaders shaping the future of technology, media, and investment."
      </p>
    </div>
  );
};

export default WhatToExpect;
