import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">Event Details</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join us for an intimate evening of dialogue and connection with key stakeholders shaping US-Saudi economic relations and technological collaboration. This exclusive dinner brings together a select group of investors, business leaders, and government officials for meaningful conversations on innovation, investment opportunities, and strategic partnerships ahead of the official forum.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">When</h3>
            <p className="text-gray-600">November 18, 2025</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Programme</h3>
            <p className="text-gray-600">
              5:00 PM - Welcome Drinks<br />
              6:00 PM - Dinner<br />
              7:00 PM - 9:00 PM - Networking
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Venue</h3>
            <p className="text-gray-600">
              A French Brasserie in Central DC<br />
              Washington D.C.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Capacity</h3>
            <p className="text-gray-600">Limited to 15 select attendees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
