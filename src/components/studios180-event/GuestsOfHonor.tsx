import { Building, Users, Users2 } from "lucide-react";

const GuestsOfHonor = () => {
  return (
    <div className="bg-[#F8F3E8] p-8 rounded-lg mb-8">
      <h3 className="text-2xl font-bold text-primary mb-4">Guests of Honor</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Building className="h-5 w-5 text-gray-800" />
            <h4 className="text-lg font-semibold text-primary">Tim Robinson</h4>
          </div>
          <p className="text-gray-600 mb-4">Tim Robinson is one of the owners of 180 Studios, London's premier creative hub and event space. 180 Strand hosts London Fashion Week and serves as creative headquarters for global brands including LVMH, TikTok, and IKEA. Tim brings extensive expertise in creative industries, venue operations, commercial real estate, and building platforms that connect artists, innovators, and industry leaders.</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users2 className="h-5 w-5 text-gray-800" />
            <h4 className="text-lg font-semibold text-primary">Rodrigo Ponce de Leon</h4>
          </div>
          <p className="text-gray-600">Rodrigo Ponce de Leon is a partner at 180 Studios Holding, the HQ of Soho House and a key hub for London's creative scene. He has managed three high-performing VC funds and brings seasoned expertise in venture capital, media, and real estate development.</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-gray-800" />
            <h4 className="text-lg font-semibold text-primary">You - The Technology Visionary</h4>
          </div>
          <p className="text-gray-600">This exclusive gathering is curated for pioneering leaders who are shaping the future of technology, media production, and strategic investment. We are seeking visionary individuals from:</p>
          <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Technology & Media Production Platforms</li>
            <li>Software Development & Engineering</li>
            <li>Creative Technologies & Innovation</li>
            <li>Family Offices & Private Wealth Management</li>
            <li>Government Technology & Economic Development</li>
            <li>Media Venture Capital & Angel Investors</li>
            <li>Strategic Business Executives</li>
            <li>Real Estate and Venue Development</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">
            If you are a forward-thinking leader committed to driving meaningful connections and transformative collaborations in the technology and media ecosystem, this evening is designed for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
