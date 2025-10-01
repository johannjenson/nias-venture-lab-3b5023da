import { Calendar, Clock, MapPin, Users, Presentation } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
      <p className="text-gray-600 mb-8">
        An intimate gathering where Saudi Arabia's most prominent contemporary artists meet global wealth management leaders to explore art as cultural heritage, investment asset, and catalyst for the Kingdom's creative renaissance.
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">When</div>
            <div className="text-gray-600">October 25, 2025</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Time</div>
            <div className="text-gray-600">7:00 PM - 11:00 PM</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Venue</div>
            <div className="text-gray-600">J17, JAX District, Riyadh</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Audience</div>
            <div className="text-gray-600">Art collectors, wealth managers, family offices, cultural leaders, and investors</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Presentation className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Format</div>
            <div className="text-gray-600">
              Three curated panel discussions followed by networking reception
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
