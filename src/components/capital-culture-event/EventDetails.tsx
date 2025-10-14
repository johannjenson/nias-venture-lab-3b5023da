import { Calendar, Clock, MapPin, Users, Presentation } from "lucide-react";

const EventDetails = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">An exclusive summit convening the most influential players in global real estate for a day of insight, connection, and deal-making.</h2>
      <p className="text-gray-600 mb-8">
        Hosted by Nias during Cityscape Riyadh, Capital & Culture explores how the world's most valuable urban projects are increasingly defined not just by square meters, but by cultural impact, creative placemaking, and sophisticated cross-border financial architecture.
      </p>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">When</div>
            <div className="text-gray-600">November 18, 2025</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Time</div>
            <div className="text-gray-600">7:00 PM - 11:30 PM</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Venue</div>
            <div className="text-gray-600">Private Residence, Riyadh</div>
            <div className="text-sm text-gray-500 mt-1">Location details provided upon confirmation</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Audience</div>
            <div className="text-gray-600 space-y-1 text-sm">
              <div>• Sovereign wealth funds & government investment arms</div>
              <div>• Family offices (MENA, Europe, Asia)</div>
              <div>• Global developers and REITs</div>
              <div>• Institutional investors (pension, insurance, endowments)</div>
              <div>• Banks, law firms, tax & structuring advisors</div>
              <div>• Urban design, architecture, and creative district developers</div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Presentation className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <div className="font-semibold text-primary mb-1">Format</div>
            <div className="text-gray-600">
              Opening keynote, two expert panels, and invite-only roundtable sessions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
