
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import IndustryCard from "@/components/resources/IndustryCard";
import SearchAndFilter from "@/components/resources/SearchAndFilter";
import IndustryStats from "@/components/resources/IndustryStats";
import IndustryBubbleChart from "@/components/resources/IndustryBubbleChart";
import { industries } from "@/data/industries";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RequestInviteModal from "@/components/RequestInviteModal";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [minScore, setMinScore] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Show toast when filters are applied
  useEffect(() => {
    if (minScore > 0 || searchTerm) {
      const count = filteredAndSortedIndustries.length;
      toast({
        title: "Filters Applied",
        description: `Showing ${count} ${count === 1 ? 'industry' : 'industries'} matching your criteria`,
        duration: 3000,
      });
    }
  }, [minScore, searchTerm]);

  const filteredAndSortedIndustries = industries
    .filter(industry => {
      const matchesSearch = 
        industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        industry.keyAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
        industry.leaders.some(leader => leader.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesScore = industry.score >= minScore;
      
      return matchesSearch && matchesScore;
    })
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

  const handleExport = () => {
    // Create CSV content
    const headers = ['Industry', 'Score', 'Investment', 'TAM', 'Description', 'Key Areas'];
    const rows = filteredAndSortedIndustries.map(industry => [
      industry.name,
      industry.score,
      industry.investment,
      industry.tam,
      industry.description,
      industry.keyAreas.join('; ')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vision-2030-industries-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success toast
    toast({
      title: "Export Successful! 🎉",
      description: `Downloaded ${filteredAndSortedIndustries.length} industries as CSV`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Helmet>
        <title>Vision 2030 Market Opportunity Analysis | NIAS Network</title>
        <meta name="description" content="Explore Saudi Arabia's $3 trillion Vision 2030 sector opportunities across key industries with high potential for international businesses seeking market entry." />
        <meta property="og:title" content="Vision 2030 Market Opportunity Analysis | NIAS Network" />
        <meta property="og:description" content="Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. Discover the top industries with the highest potential for international businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/resources" />
        <meta property="og:image" content="https://nias.io/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vision 2030 Market Opportunity Analysis | NIAS Network" />
        <meta name="twitter:description" content="Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. Discover the top industries with the highest potential for international businesses." />
        <meta name="twitter:image" content="https://nias.io/og-image.png" />
      </Helmet>

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <Button
            onClick={() => navigate('/work-with-nias')}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Work with NIAS
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">Vision 2030 Market Opportunity Analysis</h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
            Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. 
            Below are the top industries with the highest potential for international businesses 
            seeking market entry.
          </p>

          <IndustryStats
            totalIndustries={filteredAndSortedIndustries.length}
            avgScore={
              filteredAndSortedIndustries.length > 0
                ? filteredAndSortedIndustries.reduce((sum, ind) => sum + ind.score, 0) / filteredAndSortedIndustries.length
                : 0
            }
            totalInvestment="$3+ trillion"
          />

          <IndustryBubbleChart 
            industries={filteredAndSortedIndustries}
            onBubbleClick={(industryName) => {
              const element = document.getElementById(
                `industry-${industryName.toLowerCase().replace(/\s+/g, '-')}`
              );
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          />

          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            minScore={minScore}
            setMinScore={setMinScore}
            onExport={handleExport}
            totalResults={filteredAndSortedIndustries.length}
          />

          <div className="space-y-8">
            {filteredAndSortedIndustries.map((industry, index) => (
              <IndustryCard key={industry.name} industry={industry} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-primary/10 to-secondary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to Expand into Saudi Arabia?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join the NIAS Network and connect with founders, operators, advisors, and ecosystem leaders to support your growth in the Kingdom.
            </p>
            <Button
              onClick={() => navigate('/#network')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              Request to Join
            </Button>
          </div>

          {/* Disclaimer and Data Sources */}
          <div className="mt-16 pt-8 border-t border-gray-200 space-y-4">
            <p className="text-sm text-gray-500 text-center italic">
              This analysis is provided for informational and strategic planning purposes only and does not constitute investment advice, an offer, or solicitation of any investment.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Last updated: September 2025 • Data sources: Vision 2030 Annual Report, McKinsey Saudi Arabia Analysis, market research
            </p>
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
