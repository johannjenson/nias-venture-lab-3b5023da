import { Target, Building2, MapPin, TrendingUp, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WhatToExpect = () => {
  const navigate = useNavigate();
  
  const playbook = [
    {
      title: "Align",
      description: "Understand market dynamics and regional priorities.",
      icon: Target,
    },
    {
      title: "Incorporate",
      description: "Navigate legal and regulatory requirements.",
      icon: Building2,
    },
    {
      title: "Localize",
      description: "Adapt to local market needs and culture.",
      icon: MapPin,
    },
    {
      title: "Capitalize",
      description: "Secure investment from regional investors.",
      icon: TrendingUp,
    },
    {
      title: "Partner",
      description: "Build strategic local relationships.",
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
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
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
      
      <div className="text-center">
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          onClick={() => navigate('/work-with-nias')}
        >
          Apply to Work with NIAS
        </Button>
      </div>
    </div>
  );
};

export default WhatToExpect;
