import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import { useState } from "react";

const industries = [
  {
    name: "Manufacturing",
    score: 95,
    description: "Advanced manufacturing with focus on Industry 4.0, localization of military industries, and renewable energy equipment.",
    investment: "$450+ billion",
    keyAreas: ["Industrial automation", "Defense manufacturing", "Clean tech production"]
  },
  {
    name: "Technology",
    score: 90,
    description: "Digital infrastructure, smart cities, and emerging technologies including AI, IoT, and cloud computing.",
    investment: "$500+ billion",
    keyAreas: ["Artificial Intelligence", "Smart City Solutions", "Cloud Services"]
  },
  {
    name: "Tourism & Entertainment",
    score: 85,
    description: "Development of tourism destinations, cultural sites, and entertainment facilities.",
    investment: "$800+ billion",
    keyAreas: ["Hospitality", "Cultural Tourism", "Entertainment Venues"]
  },
  {
    name: "Healthcare",
    score: 80,
    description: "Healthcare infrastructure, biotechnology, and pharmaceutical manufacturing.",
    investment: "$250+ billion",
    keyAreas: ["Medical Technology", "Pharmaceuticals", "Healthcare Services"]
  },
  {
    name: "Renewable Energy",
    score: 88,
    description: "Solar, wind, and green hydrogen projects as part of the Saudi Green Initiative.",
    investment: "$700+ billion",
    keyAreas: ["Solar Power", "Wind Energy", "Green Hydrogen"]
  },
  {
    name: "Mining & Minerals",
    score: 82,
    description: "Exploration and processing of mineral resources, focusing on rare earth elements and phosphates.",
    investment: "$320+ billion",
    keyAreas: ["Mineral Processing", "Mining Technology", "Resource Exploration"]
  },
  {
    name: "Logistics & Transportation",
    score: 87,
    description: "Development of transportation infrastructure, ports, and logistics networks.",
    investment: "$400+ billion",
    keyAreas: ["Smart Logistics", "Port Development", "Transportation Networks"]
  },
  {
    name: "Education",
    score: 78,
    description: "Modernization of education system, e-learning platforms, and vocational training.",
    investment: "$150+ billion",
    keyAreas: ["EdTech", "Vocational Training", "Digital Learning"]
  },
  {
    name: "Financial Services",
    score: 86,
    description: "FinTech solutions, digital banking, and Islamic finance innovations.",
    investment: "$280+ billion",
    keyAreas: ["FinTech", "Digital Banking", "Islamic Finance"]
  },
  {
    name: "Real Estate",
    score: 84,
    description: "Development of smart cities, residential projects, and commercial spaces.",
    investment: "$1+ trillion",
    keyAreas: ["Smart Cities", "Residential Development", "Commercial Real Estate"]
  }
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");

  const filteredAndSortedIndustries = industries
    .filter(industry => 
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.keyAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
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
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">Vision 2030 Investment Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8">
            Saudi Arabia is investing $3 trillion across key industries as part of Vision 2030. 
            Below are the top industries with the highest potential for international businesses 
            seeking market entry.
          </p>

          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Search industries, descriptions, or key areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Sort by Nias Potential Score</SelectItem>
                <SelectItem value="investment">Sort by Investment</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-8">
            {filteredAndSortedIndustries.map((industry) => (
              <Card key={industry.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary">{industry.name}</h3>
                      <p className="text-gray-600 mt-1">{industry.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-3xl font-bold text-primary">{industry.score}</div>
                      <div className="text-sm text-gray-500">Nias Potential Score</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Expected Investment</div>
                    <div className="text-lg font-semibold text-primary">{industry.investment}</div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Key Areas</div>
                    <div className="flex flex-wrap gap-2">
                      {industry.keyAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="bg-secondary text-primary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;