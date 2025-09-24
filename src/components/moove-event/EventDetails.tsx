import { CalendarIcon, Clock, MapPin, Users, TrendingUp, DollarSign } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">Join us for a conversation about revolutionizing mobility and financial inclusion</h2>
        <p className="text-gray-600 mb-8">
          This is a unique opportunity to hear directly from Ladi Delano, Co-Founder and Co-CEO of Moove, as he shares insights into building one of Africa's most valuable startups. From $50 million to nearly $400 million in annualized revenue while achieving profitability, Moove is pioneering vehicle-as-a-service across emerging markets and scaling autonomous vehicle operations with Waymo.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">When</h3>
            <p className="text-gray-600">October 7th, 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Programme</h3>
            <p className="text-gray-600">7:30 PM - Reception and welcoming of guests</p>
            <p className="text-gray-600">8:30 PM - Fireside chat with Ladi Delano</p>
            <p className="text-gray-600">9:30 PM - Networking dinner</p>
            <p className="text-gray-600">11:00 PM - Conclusion of the evening</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Venue</h3>
            <p className="text-gray-600">Private Residence, Al Amaaria, Riyadh</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Audience</h3>
            <p className="text-gray-600">Family offices, sovereign wealth funds, and government leaders</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Growth Story</h3>
            <p className="text-gray-600">From $50M to $400M annualized revenue in one year</p>
            <p className="text-gray-600">Achieved EBITDA profitability in September 2024</p>
            <p className="text-gray-600">Operating across 12+ markets globally</p>
            <p className="text-gray-600">Currently raising at $2B+ valuation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Strategic Positioning</h3>
            <p className="text-gray-600">Backed by Uber, Mubadala, BlackRock, and Prosus</p>
            <p className="text-gray-600">Exclusive partnerships with Waymo for autonomous vehicles</p>
            <p className="text-gray-600">$1B+ debt facility secured for fleet expansion</p>
            <p className="text-gray-600">Leading vehicle-as-a-service in emerging markets</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-primary mb-4">About Moove</h3>
        <p className="text-gray-600 mb-4">
          Founded in 2020 by Ladi Delano and Jide Odunsi, Moove is a mobility fintech that democratizes vehicle ownership through innovative credit-scoring and revenue-based financing. Operating across UAE, Mexico, India, and other key markets, Moove enables drivers to access vehicle financing for ride-hailing, logistics, and deliveries while repaying through a percentage of their weekly income.
        </p>
        <p className="text-gray-600">
          As one of Africa's most valuable startups, Moove represents the new wave of fintech innovation combining financial inclusion with mobility infrastructure. The company's partnership with Waymo positions it uniquely at the forefront of the autonomous vehicle revolution in emerging markets.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;