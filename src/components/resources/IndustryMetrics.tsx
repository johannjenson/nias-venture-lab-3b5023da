import { Industry } from "@/types/industry";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface IndustryMetricsProps {
  industry: Industry;
}

const IndustryMetrics = ({ industry }: IndustryMetricsProps) => {
  const [showInvestmentInfo, setShowInvestmentInfo] = useState(false);
  const [showTamInfo, setShowTamInfo] = useState(false);

  return (
    <>
      {/* Ministry and Regulatory Agencies Section */}
      <div className="mt-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          Government Ministry
        </div>
        <div className="text-sm font-semibold text-gray-900 mb-3">
          {industry.ministry}
        </div>
        
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
          Key Regulatory Agencies
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          {industry.regulatoryAgencies.map((agency, index) => (
            <div key={index}>{agency}</div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm font-medium text-gray-500">Planned Allocation</div>
            <button onClick={() => setShowInvestmentInfo(true)}>
              <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          </div>
          <div className="text-lg font-semibold text-primary">{industry.investment}</div>

          <Dialog open={showInvestmentInfo} onOpenChange={setShowInvestmentInfo}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Planned Allocation</DialogTitle>
                <DialogDescription>
                  Planned allocation represents the projected capital allocation for this sector by 2030, based on Vision 2030 initiatives and Saudi government announcements.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm font-medium text-gray-500">Total Addressable Market</div>
            <button onClick={() => setShowTamInfo(true)}>
              <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          </div>
          <div className="text-lg font-semibold text-primary">{industry.tam}</div>

          <Dialog open={showTamInfo} onOpenChange={setShowTamInfo}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Total Addressable Market</DialogTitle>
                <DialogDescription>
                  Total Addressable Market (TAM) represents the total market demand for this industry sector in Saudi Arabia by 2030, based on Vision 2030 projections and industry analysis from McKinsey & Company.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default IndustryMetrics;