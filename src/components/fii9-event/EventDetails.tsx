import { CalendarIcon, Clock, MapPin, Users, Bus } from "lucide-react";
import fii9Organizers from "@/assets/fii9-organizers.png";
import east40Logo from "@/assets/east40-logo.webp";
import avraLogo from "@/assets/avra-logo.png";
import ntdpLogo from "@/assets/ntdp-logo.png";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        Following the Future Investment Initiative, we invite you to an exclusive celebration 
        of entrepreneurship and innovation. This intimate gathering brings together global founders 
        from avra's program, Saudi government leaders, global operators, and key ecosystem builders 
        for an evening of meaningful connection.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <CalendarIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">When</h3>
            <p className="text-gray-600">Tuesday, October 29, 2025</p>
            <p className="text-gray-600">5:00 PM - 7:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Programme</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• 5:00 PM - Arrival & Welcome Reception</li>
              <li>• 5:30 PM - Brief Welcome Addresses</li>
              <li>• 5:45 PM - Evening Networking & Discussions</li>
              <li>• 7:00 PM - Conclusion</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Venue</h3>
            <p className="text-gray-600">Private Venue, Riyadh</p>
            <p className="text-gray-600 text-sm">(Location details shared with confirmed guests)</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Bus className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Transportation</h3>
            <p className="text-gray-600">Transfer bus for Future Investment Initiative (FII) participants. Departing from the Via Riyadh at 4:30 PM.</p>
            <p className="text-gray-600 text-sm mt-1">Golf carts are available to take you from the Ritz Carlton to Via Riyadh throughout FII.</p>
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
          <li>• Coffee cart and pastries</li>
          <li>• Intimate networking in an exclusive Majlis setting</li>
          <li>• Exclusive access to global innovation leaders</li>
        </ul>
      </div>

      <div className="mt-8 bg-white border-l-4 border-primary p-6 rounded-lg">
        <p className="text-gray-700 mb-4">Warm regards,</p>
        <p className="text-gray-700 font-semibold">Ibrahim Neyaz, Anu Hariharan, & Khalid Bin Bader Al Saud</p>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Event Sponsors</h4>
          <div className="flex items-center gap-6 flex-wrap">
            <img src={ntdpLogo} alt="NTDP" className="h-11 w-auto" />
            <img src={avraLogo} alt="avra" className="h-11 w-auto" />
            <img src={east40Logo} alt="EAST40" className="h-11 w-auto invert" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-3">Event Organizers</h4>
          <img src={fii9Organizers} alt="Event Organizers: NIAS.io and INFNT" className="h-[60px] w-auto" />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
