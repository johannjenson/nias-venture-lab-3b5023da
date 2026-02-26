import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">Gathering Details</h2>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          Abdul Latif Jameel hosts a small group of senior decision-makers for a private Suhoor dinner on the Red Sea coast during Ramadan. The evening is designed for unhurried dialogue: the kind of conversation that only happens when the table is the right size and the guest list is carefully composed.
        </p>
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          With the World Economic Forum bringing global attention to Jeddah just weeks later, this is a timely moment to convene the people shaping what comes next for the region and for the relationships that will define it.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">When</h3>
            <p className="text-muted-foreground">Wednesday, 4 March 2026</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Programme</h3>
            <p className="text-muted-foreground leading-relaxed">
              11:00 PM - Guests arrive, welcome<br />
              12:30 AM - Suhoor is served<br />
              2:00 AM - Evening concludes
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Venue</h3>
            <p className="text-muted-foreground">
              A private residence on the Red Sea<br />
              Jeddah, Saudi Arabia
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1 italic">Exact address shared upon confirmation</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Capacity</h3>
            <p className="text-muted-foreground">Limited to 20 guests</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-secondary rounded-lg p-5 border border-border">
        <p className="text-sm text-foreground/70 italic leading-relaxed">
          This evening precedes the World Economic Forum's Global Collaboration and Growth Meeting: Building Common Ground and Reviving Growth, hosted by Saudi Arabia in Jeddah on April 22-23, 2026.
        </p>
      </div>

    </div>
  );
};

export default EventDetails;
