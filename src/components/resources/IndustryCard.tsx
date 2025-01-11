import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Industry } from "@/types/industry";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IndustryCardProps {
  industry: Industry;
}

const IndustryCard = ({ industry }: IndustryCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-primary">{industry.name}</h3>
            <p className="text-gray-600 mt-1">{industry.description}</p>
          </div>
          <div className="flex flex-col items-end ml-4">
            <div className="bg-secondary/20 rounded-lg px-4 py-2 text-center">
              <div className="text-3xl font-bold text-primary">{industry.score}</div>
              <div className="text-sm font-medium text-gray-600 whitespace-nowrap">Nias Potential Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Expected Investment</div>
            <div className="text-lg font-semibold text-primary">{industry.investment}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium text-gray-500 mb-2">Total Addressable Market</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Total Addressable Market (TAM) represents the total market demand for this industry sector in Saudi Arabia by 2030, based on Vision 2030 projections and industry analysis from McKinsey & Company.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-lg font-semibold text-primary">{industry.tam}</div>
          </div>
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

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Tech Tailwinds</div>
          <div className="flex flex-wrap gap-2">
            {industry.techTailwinds.map((tech) => (
              <Badge key={tech} variant="outline" className="border-primary/20 text-primary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryCard;