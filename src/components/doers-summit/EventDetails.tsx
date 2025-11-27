import { Clock, MapPin, Building } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Details</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Time</p>
              <p className="text-gray-600">12:40 PM - 1:00 PM GST</p>
              <p className="text-sm text-gray-500">Day 1 • November 26, 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Location</p>
              <p className="text-gray-600">Main Stage (Blackout)</p>
              <p className="text-sm text-gray-500">Doers Summit, Dubai, UAE</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Organized by</p>
              <p className="text-gray-600">NIAS.io</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
