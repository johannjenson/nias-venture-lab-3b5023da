import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import diwanLogo from "@/assets/diwan-logo.png";
import niasLogo from "@/assets/nias-logo.png";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Gathering Details</h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        Following the day's engagements at the Future Investment Initiative and other global forums, join us for an intimate evening gathering at a private villa. 
        Meaningful conversations with family offices, dignitaries, and select investors in a relaxed setting at Al Mahdiya, where strategic capital meets innovation.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <CalendarIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">When</h3>
            <p className="text-gray-600">Monday, October 27, 2025</p>
            <p className="text-gray-600">Tuesday, October 28, 2025</p>
            <p className="text-gray-600 mt-2 font-semibold">8:00 PM - 2:00 AM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Venue</h3>
            <p className="text-gray-600">Private Villa at Al Mahdiya</p>
            <p className="text-gray-600 text-sm">20 minutes from The Ritz, Riyadh</p>
            <p className="text-gray-600 text-sm mt-1">(Exact location details shared with confirmed guests)</p>
            <p className="text-gray-600 text-sm mt-2 font-semibold">Limited to 30 guests • Waitlist available</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Format</h3>
            <p className="text-gray-600">Informal evening gathering</p>
            <p className="text-gray-600">Open format for conversations and networking</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Attendance</h3>
            <p className="text-gray-600 font-semibold">By Invitation Only</p>
            <p className="text-gray-600 text-sm mt-1">Family offices, investors, and dignitaries</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#F8F3E8] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">What to Expect</h3>
        <ul className="text-gray-600 space-y-2">
          <li>• Relaxed, informal atmosphere in a private villa setting</li>
          <li>• Refreshments and beverages</li>
          <li>• Strategic conversations with investors and family offices</li>
          <li>• Connections with dignitaries and industry leaders</li>
          <li>• Traditional Riyadh hospitality</li>
          <li>• Special guests (to be announced)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-500 mb-4">Hosts</h4>
        <div className="flex items-center gap-12 flex-wrap">
          <a href="https://www.the-diwan.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity p-4">
            <img src={diwanLogo} alt="The Diwan" className="h-40 w-auto" />
          </a>
          <div className="p-4">
            <img src={niasLogo} alt="NIAS.io" className="h-16 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
