import { CalendarIcon, Clock, MapPin, Ticket, Users } from "lucide-react";
const EventDetails = () => {
  return <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Celebrating Builders, Technologists, &amp; Visionary Capital Allocators</h2>
      <p className="text-gray-600 mb-8">Join us for a curated gathering at our Irqah Farmhouse, where pioneering builders, founders, and technologists — alongside family office principals, sovereign investors, and senior government leaders — come together for open, meaningful conversation.

This is a night to celebrate bold ideas, shared values, and the future of creation — from the code that powers innovation to the stories that shape culture.</p>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">When</h3>
            <p className="text-gray-600">Sunday, April 20th, 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Programme</h3>
            <p className="text-gray-600">7:30 PM - Reception and welcoming of guests</p>
            <p className="text-gray-600">8:30 PM - Dining</p>
            <p className="text-gray-600">9:30 PM - A conversation with Tom Preston-Werner and Rodrigo Ponce de Leon moderated by Johann Jenson</p>
            <p className="text-gray-600">11:30 PM - Conclusion of the evening</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Venue</h3>
            <p className="text-gray-600">Nias Irqah Farmhouse, Riyadh, Kingdom of Saudi Arabia</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Ticket className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Attendance</h3>
            <p className="text-gray-600">By invitation only</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Capacity</h3>
            <p className="text-gray-600">Limited to 50 guests</p>
            <p className="text-gray-600 text-sm">Waitlist available upon request</p>
          </div>
        </div>
      </div>
    </div>;
};
export default EventDetails;