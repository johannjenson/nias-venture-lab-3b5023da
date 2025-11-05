import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">About the Event</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Join us for an exclusive evening with founders, investors, and industry leaders shaping the future of Saudi Arabia's innovation ecosystem.
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          This intimate gathering brings together 100 carefully selected investors, industry leaders, and unique founders for an evening of fine dining, art appreciation, and meaningful connections.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-primary mb-4">Agenda</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Reception & Welcoming</p>
              <p className="text-gray-600 text-sm">Arrive and connect with fellow attendees</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Opening Remarks</p>
              <p className="text-gray-600 text-sm">Welcome address and event overview</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Dinner</p>
              <p className="text-gray-600 text-sm">Enjoy an exquisite dining experience</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Art Gallery & Museum Tour</p>
              <p className="text-gray-600 text-sm">Guided tour of the venue's art collection</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
            <div>
              <p className="font-semibold text-gray-900">Networking</p>
              <p className="text-gray-600 text-sm">Open networking and connections</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 pt-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Date</p>
            <p className="text-gray-600">November 7, 2025</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Time</p>
            <p className="text-gray-600">9:00 PM - 1:00 AM</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Venue</p>
            <a 
              href="https://maps.app.goo.gl/4fmP6waZRS42afua8?g_st=ipc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shamalat Art Co.
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900">Capacity</p>
            <p className="text-gray-600">100 Attendees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
