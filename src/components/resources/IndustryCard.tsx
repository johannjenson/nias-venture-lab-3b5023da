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

interface IndustryCardProps {
  industry: Industry;
}

const IndustryCard = ({ industry }: IndustryCardProps) => {
  const [selectedKeyArea, setSelectedKeyArea] = useState<string | null>(null);
  const [selectedTechTailwind, setSelectedTechTailwind] = useState<string | null>(null);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
  );
};

export default IndustryCard;