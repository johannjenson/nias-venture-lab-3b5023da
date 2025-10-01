import { Presentation, TrendingUp, Users } from "lucide-react";

const WhatToExpect = () => {
  return (
    <div className="bg-secondary/30 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-primary mb-6">Evening Programme</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Presentation className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Panel 1: From Al-Kharj to the Vatican</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            Explore the evolution of Saudi contemporary art with Othman Al-Khozaim and Ahmed Mater. Discover how Saudi artists are bridging tradition and modernity, gaining international recognition, and shaping the Kingdom's cultural narrative on the global stage.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Panel 2: Art as Asset</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            Jennifer Wines, Nidaa Hanifa, and Sarah Albaiz lead a discussion on stewarding cultural wealth—how art serves as both heritage preservation and investment asset. Learn strategies for building meaningful collections, navigating the art market, and integrating fine art into comprehensive wealth management portfolios.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Panel 3: Building Cultural Legacy</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            A deep dive into how family offices and institutional collectors can build enduring cultural legacies through strategic art acquisition. Explore the intersection of patronage, preservation, and portfolio diversification in the context of Saudi Arabia's cultural transformation.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-6 w-6 text-primary" />
            <h4 className="text-lg font-semibold text-primary">Networking Reception</h4>
          </div>
          <p className="text-gray-600 ml-9 text-sm">
            Connect with fellow collectors, artists, wealth managers, and cultural leaders over curated refreshments in the distinctive atmosphere of J17. An opportunity to forge relationships at the nexus of culture and capital.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatToExpect;
