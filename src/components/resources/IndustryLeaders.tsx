import { IndustryLeader } from "@/types/industry";

interface IndustryLeadersProps {
  leaders: IndustryLeader[];
}

const IndustryLeaders = ({ leaders }: IndustryLeadersProps) => {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-500 mb-3">Notable Industry Leaders</h4>
      <div className="grid grid-cols-3 gap-4">
        {leaders.map((leader, index) => (
          <div key={index} className="bg-secondary/10 rounded-lg p-3">
            <div className="font-medium text-primary">{leader.name}</div>
            <div className="text-sm text-gray-600">Market Cap: {leader.marketCap}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryLeaders;