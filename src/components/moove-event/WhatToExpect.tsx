import { Target } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold text-primary">What to Expect</h3>
      </div>
      
      <div className="space-y-4">
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>Deep dive into Moove's $300M funding round and autonomous vehicle strategy</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>Exclusive insights into the $2 trillion autonomous mobility market opportunity</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>Strategic partnerships with Waymo, Uber, Bolt, and Grab for AV deployment</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>Financial inclusion initiatives across emerging markets</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>AI infrastructure requirements for autonomous fleet operations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>Intimate networking with regional mobility and fintech leaders</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p className="text-gray-700 italic text-sm leading-relaxed">
          "The transition to autonomous vehicles represents the largest infrastructure shift in transportation 
          since the automobile itself. We're not just financing vehicles—we're building the economic 
          foundation for a trillion-dollar mobility ecosystem."
        </p>
        <p className="text-blue-600 font-medium mt-2 text-sm">— Ladi Delano, Co-CEO of Moove</p>
      </div>
    </div>
  );
};

export default WhatToExpect;