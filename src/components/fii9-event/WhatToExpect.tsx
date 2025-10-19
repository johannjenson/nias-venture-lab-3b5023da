import { Network, Handshake, Sparkles, Users } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div className="bg-[#F8F3E8] p-8 rounded-lg mt-8">
      <h3 className="text-2xl font-bold text-primary mb-6">What to Expect</h3>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-white rounded-full p-3">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Celebration of Innovation</h4>
            <p className="text-gray-600 text-sm">
              Honor Avra's latest cohort and their contributions to bridging global innovation with Saudi Arabia's entrepreneurial ecosystem.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white rounded-full p-3">
            <Network className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">World-Class Networking</h4>
            <p className="text-gray-600 text-sm">
              Connect with CEOs of multi-billion dollar companies, pioneering entrepreneurs, and Saudi government leaders in an intimate, exclusive setting.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white rounded-full p-3">
            <Handshake className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Strategic Partnerships</h4>
            <p className="text-gray-600 text-sm">
              Explore collaboration opportunities and discover synergies between global innovation and Saudi market potential in a relaxed atmosphere.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white rounded-full p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Exclusive Setting</h4>
            <p className="text-gray-600 text-sm">
              Experience an intimate gathering at a premier private venue, understanding NTDP's pivotal role in advancing Saudi Arabia's technology and entrepreneurship landscape.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-700 font-medium">
          This evening positions Riyadh as the global meeting point where international innovation converges with Saudi opportunity, creating meaningful connections that drive the Kingdom's entrepreneurial future.
        </p>
      </div>
    </div>
  );
};

export default WhatToExpect;
