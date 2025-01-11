import { Industry } from "@/types/industry";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IndustryMetricsProps {
  industry: Industry;
}

const IndustryMetrics = ({ industry }: IndustryMetricsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-sm font-medium text-gray-500">Expected Investment</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Expected investment represents the projected capital allocation for this sector by 2030, based on Vision 2030 initiatives and Saudi government announcements.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-lg font-semibold text-primary">{industry.investment}</div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="text-sm font-medium text-gray-500">Total Addressable Market</div>
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
  );
};

export default IndustryMetrics;