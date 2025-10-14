import { CalendarIcon, Clock, MapPin, Users, Bus } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        Following the Future Investment Initiative, we invite you to an exclusive celebration 
        of entrepreneurship and innovation. This intimate gathering brings together global founders 
        from Avra's portfolio, Saudi government leaders, and key ecosystem builders for an evening 
        of meaningful connections and collaborative opportunities.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <CalendarIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">When</h3>
            <p className="text-gray-600">Tuesday, October 29, 2025</p>
            <p className="text-gray-600">7:00 PM - 9:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Programme</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• 7:00 PM - Arrival & Welcome Reception</li>
              <li>• 7:30 PM - Brief Welcome Addresses</li>
              <li>• 7:45 PM - Evening Networking & Discussions</li>
              <li>• 9:00 PM - Conclusion</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Venue</h3>
            <p className="text-gray-600">The Majlis at The Garage</p>
            <p className="text-gray-600">Riyadh's Premier Innovation Hub</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Bus className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Transportation</h3>
            <p className="text-gray-600">Transfer bus for Future Investment Initiative (FII) participants</p>
            <p className="text-gray-600 font-semibold mt-1">Departing from the Ritz at 6:30 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Attendance</h3>
            <p className="text-gray-600 font-semibold">Strictly by Invitation Only</p>
            <p className="text-gray-600 text-sm mt-1">Limited capacity • Waiting list available</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#F8F3E8] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">Experience</h3>
        <ul className="text-gray-600 space-y-2">
          <li>• Artisanal canapes and refreshments</li>
          <li>• Curated mocktail bar</li>
          <li>• Intimate networking in The Garage's signature Majlis setting</li>
          <li>• Exclusive access to global innovation leaders</li>
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
