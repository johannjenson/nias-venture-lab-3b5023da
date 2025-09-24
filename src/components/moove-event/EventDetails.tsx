import { CalendarIcon, Clock, MapPin, Users, TrendingUp, DollarSign } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">The Future of Autonomous Mobility</h2>
        <p className="text-gray-600 leading-relaxed">
          Moove is revolutionizing urban transportation with the world's largest autonomous ride-hailing fleet. 
          Backed by Uber, Mubadala, BlackRock, and Prosus, the company is raising $300M at a $2.0-2.6B valuation 
          to scale autonomous vehicle operations across global markets.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <CalendarIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">When</h3>
            <p className="text-gray-600">October 7th, 2024 • 7:00 PM - 10:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Venue</h3>
            <p className="text-gray-600">Private Residence, Al Amaaria, Riyadh</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Audience</h3>
            <p className="text-gray-600">Family offices, sovereign wealth funds, and government leaders</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Market Opportunity</h3>
            <p className="text-gray-600">$2 trillion autonomous vehicle market with AV margins exceeding 50% by 2026</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <DollarSign className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Investment Highlights</h3>
            <p className="text-gray-600">Projected $11.6B revenue by 2030 • 39,000+ vehicle fleet • Strategic partnerships with Waymo, Uber, Bolt, and Grab</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="font-semibold text-primary mb-3">About Moove</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Moove is a global mobility fintech providing vehicle financing for ride-hailing drivers across 29 cities. 
          The company operates over 39,000 vehicles and has raised $400M+ from marquee investors including 
          Uber, Mubadala, BlackRock, and Prosus. Moove's strategic expansion into autonomous vehicles positions 
          it as a key infrastructure layer for the future of urban transportation.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;