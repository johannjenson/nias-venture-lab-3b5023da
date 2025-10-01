import { Calendar, Clock, MapPin, Users, Presentation } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
      <p className="text-gray-600 mb-8">
        An intimate gathering where Saudi Arabia's most prominent contemporary artists meet global wealth management leaders, collectors, and family offices to explore art as cultural heritage, investment asset, and catalyst for the Kingdom's creative renaissance. This exclusive evening brings together the visionaries shaping Saudi Arabia's contemporary art scene with the stewards of cultural wealth, creating meaningful dialogue at the intersection of artistic expression and strategic wealth preservation.
      </p>
      <p className="text-gray-600 mb-8">
        As Saudi Arabia emerges as a cultural powerhouse on the global stage, this gathering offers a rare opportunity to understand how contemporary Saudi art is gaining international recognition while exploring sophisticated approaches to art as an alternative asset class. Through intimate panel discussions and curated networking, attendees will gain insights into building meaningful collections that serve both as cultural legacy and strategic financial instruments.
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
