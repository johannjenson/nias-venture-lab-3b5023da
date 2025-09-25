import { CalendarIcon, Clock, MapPin, Users, TrendingUp, Zap } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">The Future of Mobility: From Financial Inclusion to Autonomous Vehicles</h2>
        <p className="text-gray-600 mb-8">
          This is a unique opportunity to explore the transformation of urban transportation with Ladi Delano, Co-Founder and Co-CEO of Moove. From democratizing vehicle ownership in emerging markets to pioneering autonomous vehicle operations with Waymo, discover how mobility innovation is reshaping cities and creating new economic opportunities globally.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">When</h3>
            <p className="text-gray-600">October 7th, 2025</p>
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
            <p className="text-gray-600">Leaders in mobility, technology, and sustainable finance</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Innovation Journey</h3>
            <p className="text-gray-600">From startup to market leader in just four years</p>
            <p className="text-gray-600">Achieving profitability while expanding globally</p>
            <p className="text-gray-600">Operating across 12+ markets in three continents</p>
            <p className="text-gray-600">Preparing for the next chapter with Series C</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Technology Leadership</h3>
            <p className="text-gray-600">Pioneer in credit-scoring for emerging markets</p>
            <p className="text-gray-600">Strategic partnerships with Waymo and Uber</p>
            <p className="text-gray-600">Building autonomous-ready fleet infrastructure</p>
            <p className="text-gray-600">Leading vehicle-as-a-service innovation</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-primary mb-4">About Moove</h3>
        <p className="text-gray-600 mb-4">
          Founded in 2020 by Ladi Delano and Jide Odunsi, Moove has become one of the fastest-growing mobility companies globally. Operating across UAE, Mexico, India, Japan, the US, and other key markets, Moove enables drivers to access vehicle financing through innovative credit-scoring while building the infrastructure for tomorrow's autonomous transportation.
        </p>
        <p className="text-gray-600">
          As both a fintech and mobility company, Moove represents a new paradigm in transportation - one where financial inclusion, technological innovation, and sustainable mobility converge to create lasting impact in emerging markets and beyond.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;