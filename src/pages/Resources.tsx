
import { useState } from "react";
import Footer from "@/components/Footer";
import IndustryCard from "@/components/resources/IndustryCard";
import SearchAndFilter from "@/components/resources/SearchAndFilter";
import { industries } from "@/data/industries";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RequestInviteModal from "@/components/RequestInviteModal";
import { Helmet } from "react-helmet";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();

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
      <Helmet>
        <title>Vision 2030 Investment Opportunities | NIAS Network</title>
        <meta name="description" content="Explore Saudi Arabia's $3 trillion Vision 2030 investment opportunities across key industries with high potential for international businesses seeking market entry." />
        <meta property="og:title" content="Vision 2030 Investment Opportunities | NIAS Network" />
        <meta property="og:description" content="Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. Discover the top industries with the highest potential for international businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/resources" />
        <meta property="og:image" content="https://nias.io/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vision 2030 Investment Opportunities | NIAS Network" />
        <meta name="twitter:description" content="Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. Discover the top industries with the highest potential for international businesses." />
        <meta name="twitter:image" content="https://nias.io/og-image.png" />
      </Helmet>

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="hover:opacity-80 transition-opacity"
          >
            <Waves className="h-8 w-8 text-primary" />
          </button>
          <Button
            onClick={() => setShowRequestModal(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Join the Nias Network
          </Button>
        </div>
      </div>

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
