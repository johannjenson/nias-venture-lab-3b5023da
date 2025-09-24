import { CalendarIcon, Clock, MapPin, Users, TrendingUp, DollarSign } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">Join us for a conversation about revolutionizing mobility and the future of autonomous vehicles</h2>
        <p className="text-gray-600 mb-8">
          This is a unique opportunity to hear directly from Ladi Delano, Co-CEO of Moove, as he shares their vision for scaling one of the world's largest autonomous ride-hailing fleets. Moove partners with Waymo, Uber, Bolt, and Grab to finance and operate vehicles across emerging markets, with AV margins projected to exceed 50% by 2026.
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
            <p className="text-gray-600">8:30 PM - Presentation by Ladi Delano</p>
            <p className="text-gray-600">9:30 PM - Dining and networking</p>
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
            <h3 className="font-semibold text-primary">Market Opportunity</h3>
            <p className="text-gray-600">Leading mobility fintech in emerging markets</p>
            <p className="text-gray-600">39,000+ vehicle fleet scaling to EVs and AVs</p>
            <p className="text-gray-600">Operating across 29 cities globally</p>
            <p className="text-gray-600">Soon kicking off Series C funding round</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Strategic Advantages</h3>
            <p className="text-gray-600">Backed by Uber, Mubadala, BlackRock, and Prosus</p>
            <p className="text-gray-600">Exclusive partnerships with Waymo, Uber, Bolt, and Grab</p>
            <p className="text-gray-600">Projected AV margins exceeding 50% by 2026</p>
            <p className="text-gray-600">Pioneering vehicle-as-a-service model in emerging markets</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-primary mb-4">About Moove</h3>
        <p className="text-gray-600 mb-4">
          Moove is a global mobility fintech that democratizes vehicle ownership by partnering with platforms 
          like Uber, Bolt, and Grab to provide revenue-based vehicle financing. The company operates one of 
          the world's largest autonomous-ready fleets and is pioneering the transition to electric and 
          autonomous vehicles in emerging markets.
        </p>
        <p className="text-gray-600">
          With exclusive partnerships across the mobility ecosystem, Moove is uniquely positioned to capitalize 
          on the autonomous vehicle revolution, combining financial technology with operational expertise to 
          scale sustainable transportation solutions globally.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;