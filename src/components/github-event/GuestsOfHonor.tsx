
import { Github, Users, Users2 } from "lucide-react";

const GuestsOfHonor = () => {
  return (
    <div className="bg-[#F8F3E8] p-8 rounded-lg mb-8">
      <h3 className="text-2xl font-bold text-primary mb-4">Guests of Honor</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Github className="h-5 w-5 text-gray-800" />
            <h4 className="text-lg font-semibold text-primary">Tom Preston-Werner</h4>
          </div>
          <p className="text-gray-600 mb-4">Tom Preston-Werner is the cofounder and former CEO of GitHub, acquired by Microsoft for $7.5 billion. A visionary technologist who originally came up with the idea for GitHub, he's the creator of Gravatar and author of the Semantic Versioning specification. Currently, Tom is focused on building collaboration software for media, gaming, and entertainment industries.</p>
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
            <h4 className="text-lg font-semibold text-primary">You - The Visionary</h4>
          </div>
          <p className="text-gray-600">This exclusive gathering is curated for pioneering leaders who are shaping the future of technology, investment, media, and real estate. We are seeking visionary individuals from:</p>
          <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Family Offices & Private Wealth Management</li>
            <li>Government Innovation Departments</li>
            <li>Tech Venture Capital & Angel Investors</li>
            <li>Strategic Business Executives</li>
            <li>Emerging Technology Entrepreneurs</li>
            <li>Media and Entertainment Innovation Leaders</li>
            <li>Real Estate and Infrastructure Innovators</li>
          </ul>
          <p className="text-gray-600 mt-2 italic">
            If you are a forward-thinking leader committed to driving meaningful connections and transformative collaborations, this evening is designed for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestsOfHonor;
