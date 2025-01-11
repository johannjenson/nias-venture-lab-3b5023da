import { Industry } from "@/types/industry";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IndustryCardHeaderProps {
  industry: Industry;
}

const IndustryCardHeader = ({ industry }: IndustryCardHeaderProps) => {
  return (
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
  );
};

export default IndustryCardHeader;