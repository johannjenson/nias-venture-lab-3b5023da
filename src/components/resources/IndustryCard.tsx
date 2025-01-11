import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Industry } from "@/types/industry";

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

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Expected Investment</div>
          <div className="text-lg font-semibold text-primary">{industry.investment}</div>
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
      </CardContent>
    </Card>
  );
};

export default IndustryCard;