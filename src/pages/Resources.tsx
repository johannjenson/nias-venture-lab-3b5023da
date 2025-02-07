
import { useState } from "react";
import Footer from "@/components/Footer";
import IndustryCard from "@/components/resources/IndustryCard";
import SearchAndFilter from "@/components/resources/SearchAndFilter";
import { industries } from "@/data/industries";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import RequestInviteModal from "@/components/RequestInviteModal";
import { Link } from "react-router-dom";
import { UserCheck } from "lucide-react";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filteredAndSortedIndustries = industries
    .filter(industry => 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.keyAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
      industry.leaders.some(leader => leader.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "score") {
        return b.score - a.score;
      } else if (sortBy === "investment") {
        return parseFloat(b.investment.replace(/[^0-9.]/g, '')) - 
               parseFloat(a.investment.replace(/[^0-9.]/g, ''));
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link 
            to="/resources/inbound-contacts"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <UserCheck className="h-4 w-4" />
            View Inbound Contacts
          </Link>
          <Button
            onClick={() => setShowRequestModal(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Join the Nias Network
          </Button>
        </div>
      </div>

      <BackButton />

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">Vision 2030 Investment Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8">
            Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. 
            Below are the top industries with the highest potential for international businesses 
            seeking market entry.
          </p>

          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="space-y-8">
            {filteredAndSortedIndustries.map((industry) => (
              <IndustryCard key={industry.name} industry={industry} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal}
      />
    </div>
  );
};

export default Resources;
