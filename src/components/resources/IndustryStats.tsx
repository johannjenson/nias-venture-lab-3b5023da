import { TrendingUp, DollarSign, Target } from "lucide-react";

interface IndustryStatsProps {
  totalIndustries: number;
  avgScore: number;
  totalInvestment: string;
}

const IndustryStats = ({ totalIndustries, avgScore, totalInvestment }: IndustryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-3">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Industries</p>
            <p className="text-2xl font-bold text-primary">{totalIndustries}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-3">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg Opportunity Score</p>
            <p className="text-2xl font-bold text-primary">{avgScore.toFixed(1)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-3">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-primary">{totalInvestment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryStats;
