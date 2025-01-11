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
          <div className="text-sm font-medium text-gray-600 whitespace-nowrap flex items-center gap-1">
            Nias Potential Score
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-gray-500 hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-3">
                  <p>The Nias Potential Score (1-10) is calculated based on:</p>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Market size and growth potential</li>
                    <li>Alignment with Saudi Vision 2030</li>
                    <li>Current competition landscape</li>
                    <li>Regulatory environment</li>
                    <li>Available talent pool</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCardHeader;