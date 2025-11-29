import { Card, CardContent } from "@/components/ui/card";
import { Industry } from "@/types/industry";
import { useState } from "react";
import KeyAreaModal from "./KeyAreaModal";
import TechTailwindModal from "./TechTailwindModal";
import { keyAreaDescriptions } from "@/data/keyAreaDescriptions";
import { techTailwindsDescriptions } from "@/data/techTailwindsDescriptions";
import IndustryCardHeader from "./IndustryCardHeader";
import IndustryMetrics from "./IndustryMetrics";
import IndustryTags from "./IndustryTags";
import IndustryLeaders from "./IndustryLeaders";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface IndustryCardProps {
  industry: Industry;
  index?: number;
}

const IndustryCard = ({ industry, index = 0 }: IndustryCardProps) => {
  const [selectedKeyArea, setSelectedKeyArea] = useState<string | null>(null);
  const [selectedTechTailwind, setSelectedTechTailwind] = useState<string | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={elementRef}
      id={`industry-${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6">
          <IndustryCardHeader industry={industry} />
          <IndustryMetrics industry={industry} />
          
          <IndustryTags
            title="Key Areas"
            tags={industry.keyAreas}
            variant="secondary"
            onTagClick={setSelectedKeyArea}
          />

          <IndustryTags
            title="Tech Tailwinds"
            tags={industry.techTailwinds}
            variant="outline"
            onTagClick={setSelectedTechTailwind}
          />

          <IndustryLeaders leaders={industry.leaders} />
        </CardContent>

        {selectedKeyArea && (
          <KeyAreaModal
            isOpen={!!selectedKeyArea}
            onClose={() => setSelectedKeyArea(null)}
            keyArea={selectedKeyArea}
            description={keyAreaDescriptions[selectedKeyArea]?.description || "Description not available"}
          />
        )}

        {selectedTechTailwind && (
          <TechTailwindModal
            isOpen={!!selectedTechTailwind}
            onClose={() => setSelectedTechTailwind(null)}
            techTailwind={selectedTechTailwind}
            description={techTailwindsDescriptions[selectedTechTailwind]?.description || "Description not available"}
          />
        )}
      </Card>
    </div>
  );
};

export default IndustryCard;