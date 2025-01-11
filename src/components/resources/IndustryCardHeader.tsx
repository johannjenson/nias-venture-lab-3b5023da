import { Industry } from "@/types/industry";
import { useState } from "react";
import ScoreInfoModal from "./ScoreInfoModal";

interface IndustryCardHeaderProps {
  industry: Industry;
}

const IndustryCardHeader = ({ industry }: IndustryCardHeaderProps) => {
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-2xl font-semibold text-primary">{industry.name}</h3>
        <p className="text-gray-600 mt-1">{industry.description}</p>
      </div>
      <div className="flex flex-col items-end ml-4">
        <button
          onClick={() => setShowScoreInfo(true)}
          className="bg-secondary/20 rounded-lg px-4 py-2 text-center hover:bg-secondary/30 transition-colors"
        >
          <div className="text-3xl font-bold text-primary">{industry.score}</div>
          <div className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Nias Potential Score
          </div>
        </button>
      </div>

      <ScoreInfoModal 
        isOpen={showScoreInfo} 
        onClose={() => setShowScoreInfo(false)} 
      />
    </div>
  );
};

export default IndustryCardHeader;