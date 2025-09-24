import { User, Building2, Users } from "lucide-react";

const GuestsOfHonor = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">Distinguished Guests</h2>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">Ladi Delano</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Co-CEO & Co-Founder of Moove.io, leading the global expansion of autonomous vehicle infrastructure. 
              Previously scaled mobility platforms across emerging markets, now driving the transition to 
              autonomous ride-hailing fleets backed by Uber, Mubadala, BlackRock, and Prosus.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Building2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">Strategic Leadership</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Key representatives from sovereign wealth funds, family offices, and government entities 
              exploring opportunities in mobility infrastructure, autonomous vehicle deployment, 
              and next-generation transportation solutions.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">You - The Mobility Visionary</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              This exclusive gathering brings together forward-thinking leaders from:
            </p>
            <ul className="text-gray-600 text-sm space-y-1 ml-4">
              <li>• Sovereign wealth funds and family offices</li>
              <li>• Transportation and logistics companies</li>
              <li>• AI and autonomous vehicle technology</li>
              <li>• Financial services and fintech</li>
              <li>• Government and regulatory affairs</li>
              <li>• Urban planning and smart cities</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3 italic">
              "Together, we're shaping the infrastructure for tomorrow's mobility ecosystem."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;