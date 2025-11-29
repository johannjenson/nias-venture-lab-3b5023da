import { Target, Building2, MapPin, TrendingUp, Handshake } from "lucide-react";

const WhatToExpect = () => {
  const playbook = [
    {
      title: "Align",
      description: "Understand the GCC market dynamics and align your business model with regional priorities and opportunities.",
      icon: Target,
    },
    {
      title: "Incorporate",
      description: "Navigate the legal and regulatory requirements to establish your business entity in Saudi Arabia and the GCC.",
      icon: Building2,
    },
    {
      title: "Localize",
      description: "Adapt your operations, products, and services to meet local market needs and cultural expectations.",
      icon: MapPin,
    },
    {
      title: "Capitalize",
      description: "Secure investment and funding from regional investors, VCs, and government initiatives.",
      icon: TrendingUp,
    },
    {
      title: "Partner",
      description: "Build strategic relationships with local partners, distributors, and government entities for sustainable growth.",
      icon: Handshake,
    },
  ];

  return (
    <div className="pt-8 border-t border-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Saudi Expansion Playbook</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A framework for successfully entering and scaling in the Saudi market
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        {playbook.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatToExpect;
