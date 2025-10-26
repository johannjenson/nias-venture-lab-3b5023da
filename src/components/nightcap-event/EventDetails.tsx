import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import diwanLogo from "@/assets/diwan-logo.avif";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
      
      <p className="text-gray-600 mb-8 leading-relaxed">
        An informal evening gathering for meaningful conversations and connections. 
        Join us for a relaxed night at Al Mahdiya, where innovation meets tradition.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <CalendarIcon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">When</h3>
            <p className="text-gray-600">Sunday, October 27, 2025</p>
            <p className="text-gray-600">Monday, October 28, 2025</p>
            <p className="text-gray-600 mt-2 font-semibold">8:00 PM - 2:00 AM</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Venue</h3>
            <p className="text-gray-600">Al Mahdiya</p>
            <p className="text-gray-600 text-sm">20 minutes from The Ritz, Riyadh</p>
            <p className="text-gray-600 text-sm mt-1">(Exact location details shared with confirmed guests)</p>
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
            <p className="text-gray-600 text-sm mt-1">Intimate gathering • Limited capacity</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[#F8F3E8] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">What to Expect</h3>
        <ul className="text-gray-600 space-y-2">
          <li>• Relaxed, informal atmosphere</li>
          <li>• Refreshments and beverages</li>
          <li>• Open conversations with innovators and leaders</li>
          <li>• Traditional Riyadh hospitality</li>
          <li>• Special guests (to be announced)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Hosts</h4>
        <div className="flex items-center gap-6 flex-wrap">
          <img src={diwanLogo} alt="The Diwan" className="h-11 w-auto" />
          <div className="text-gray-600">
            <p className="font-semibold">Nias.io</p>
            <p className="text-sm">Johann Jenson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
