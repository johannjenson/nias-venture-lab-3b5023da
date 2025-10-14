import { Building2, Scale, Briefcase, Users2 } from "lucide-react";

const GuestsOfHonor = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-primary mb-8">Event Program</h2>
      
      <div className="space-y-6">
        <div className="border-l-4 border-primary pl-6 py-2">
          <div className="flex items-start gap-3 mb-2">
            <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary text-lg">Opening Keynote</h3>
              <p className="text-sm text-gray-500 mb-2">"Beyond Buildings: Real Estate as a Cultural Asset Class"</p>
              <p className="text-gray-600 font-medium">Mark Wadhwa</p>
              <p className="text-sm text-gray-500">Founder of 180 Studios (home to Soho House HQ & LVMH Creative)</p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-primary pl-6 py-2">
          <div className="flex items-start gap-3 mb-2">
            <Users2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary text-lg">Panel I</h3>
              <p className="text-sm text-gray-500 mb-2">"Capital Meets Culture: Financing the New Urban Renaissance"</p>
              <p className="text-gray-600 text-sm">How investors, developers, and sovereign entities are building high-value districts where art, culture, and commerce converge.</p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-primary pl-6 py-2">
          <div className="flex items-start gap-3 mb-2">
            <Scale className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary text-lg">Panel II</h3>
              <p className="text-sm text-gray-500 mb-2">"Structures of Trust: Cross-Border Deals, Regulation & Governance"</p>
              <p className="text-gray-600 text-sm">How legal, tax, and financial engineering underpin the world's most successful property transactions.</p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-primary pl-6 py-2">
          <div className="flex items-start gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-primary text-lg">Roundtable Sessions</h3>
              <p className="text-sm text-gray-500 mb-2">"From Vision to Term Sheet"</p>
              <p className="text-gray-600 text-sm">Invite-only working sessions connecting investors, developers, and advisors around live opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
