import { MessageCircle, Users2, Handshake } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">What to Expect</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Strategic Dialogue</h3>
            <p className="text-gray-600">
              Engage in meaningful conversations about investment opportunities, bilateral trade, 
              and the future of US-Saudi economic partnership.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Elite Network</h3>
            <p className="text-gray-600">
              Connect with C-suite executives, government officials, and family office principals 
              shaping cross-border investment flows between the US and Saudi Arabia.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Handshake className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Exclusive Setting</h3>
            <p className="text-gray-600">
              An intimate dinner environment designed for authentic relationship building 
              and high-level business discussions in Washington D.C.'s premier French brasserie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatToExpect;
