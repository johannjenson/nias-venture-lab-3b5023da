import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-6">Gathering Details</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          NIAS hosts a small group of senior guests for a private Suhoor dinner in Riyadh in the middle of Ramadan. The evening arrives just before the city enters one of its busiest international seasons: a moment to arrive deliberately, connect quietly, and share perspective before the season begins.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">When</h3>
            <p className="text-muted-foreground">Tuesday, 3 March 2026</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Programme</h3>
            <p className="text-muted-foreground leading-relaxed">
              11:00 PM - Dinner starts<br />
              2:00 AM - Evening concludes
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">Venue</h3>
            <p className="text-muted-foreground">
              Riyadh, Saudi Arabia
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
          This gathering precedes a dense run of international activity: FII Miami at the end of March, WEF Jeddah, LEAP, and the World Petroleum Congress in April. An early moment, before the season accelerates.
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
