import { CalendarIcon, Clock, MapPin, Ticket, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Celebrating Technology Visionaries, Media Innovators, & Strategic Capital</h2>
      <p className="text-gray-600 mb-8">Join us for a curated gathering at our Irqah Farmhouse, where technology leaders, media innovators, and strategic investors — alongside family office principals, sovereign funds, and senior government leaders — come together for open, meaningful conversation.

This is a night to celebrate bold innovation, shared vision, and the future of media technology — from the platforms that revolutionize production workflows to the stories that shape culture.</p>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">When</h3>
            <p className="text-gray-600">Date to be announced</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Programme</h3>
            <p className="text-gray-600">7:30 PM - Reception and welcoming of guests</p>
            <p className="text-gray-600">8:30 PM - Dining with live music</p>
            <p className="text-gray-600">9:30 PM - Networking</p>
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
            <p className="text-gray-600">Limited to 25 guests</p>
            <p className="text-gray-600 text-sm">Waitlist available upon request</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-primary mb-4">180 Studios Overview</h3>
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
          <iframe
            src="https://www.youtube.com/embed/qgJO1T4qv9E"
            title="180 Studios Overview"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/D7t2usTZUTc"
            title="180 Studios Video"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
