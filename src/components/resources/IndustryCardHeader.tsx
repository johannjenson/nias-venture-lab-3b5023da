import { Industry } from "@/types/industry";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreInfoModal from "./ScoreInfoModal";
import ProgressRing from "./ProgressRing";

interface IndustryCardHeaderProps {
  industry: Industry;
}

const IndustryCardHeader = ({ industry }: IndustryCardHeaderProps) => {
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const navigate = useNavigate();
  
  const isRealEstate = industry.name === "Real Estate";

  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div className="flex-1">
        {isRealEstate ? (
          <h3 
            className="text-2xl font-semibold text-primary cursor-pointer hover:underline"
            onClick={() => navigate('/real-estate')}
          >
            {industry.name}
          </h3>
        ) : (
          <h3 className="text-2xl font-semibold text-primary">{industry.name}</h3>
        )}
        <p className="text-gray-600 mt-1">{industry.description}</p>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowScoreInfo(true)}
          className="hover:scale-105 transition-transform"
        >
          <ProgressRing score={industry.score} size={100} />
        </button>
        <div className="text-xs text-gray-500 mt-2 text-center whitespace-nowrap">
          NIAS Readiness Score
        </div>
      </div>

      <ScoreInfoModal 
        isOpen={showScoreInfo} 
        onClose={() => setShowScoreInfo(false)} 
      />
    </div>
  );
};

export default IndustryCardHeader;