import { Calendar, MapPin, Users, Target } from "lucide-react";

const EventDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-4">Why It Matters</h2>
        <div className="space-y-4 text-gray-600">
          <p className="leading-relaxed">
            <strong>Capital flows are changing:</strong> Global family offices, sovereigns, and institutional investors are shifting from passive property allocations to active, thematic real-estate strategies.
          </p>
          <p className="leading-relaxed">
            <strong>Creative placemaking is ascendant:</strong> Assets anchored by culture, design, content, and community consistently outperform traditional developments.
          </p>
          <p className="leading-relaxed">
            <strong>Structures define success:</strong> The difference between a vision and a deal is the architecture of capital, regulation, and governance — from SPVs and joint ventures to Shariah-compliant funds.
          </p>
          <p className="leading-relaxed">
            Nias is uniquely positioned to host this conversation — bridging creative capital and institutional finance, and connecting global opportunities to Gulf capital and policy priorities.
          </p>
        </div>
      </div>

      <div className="border-t pt-8 space-y-6">
        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">When</h3>
            <p className="text-gray-600">November 18, 2025</p>
            <p className="text-sm text-gray-500">During Cityscape Riyadh</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">Venue</h3>
            <p className="text-gray-600">Riyadh, Saudi Arabia</p>
            <p className="text-sm text-gray-500">Location details provided upon confirmation</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">Audience</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Sovereign wealth funds & government investment arms</li>
              <li>• Family offices (MENA, Europe, Asia)</li>
              <li>• Global developers and REITs</li>
              <li>• Institutional investors (pension, insurance, endowments)</li>
              <li>• Banks, law firms, tax & structuring advisors</li>
              <li>• Urban design, architecture, and creative district developers</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-2">Format</h3>
            <p className="text-gray-600">Opening keynote, two expert panels, and invite-only roundtable sessions for deal-making and partnership discussions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
