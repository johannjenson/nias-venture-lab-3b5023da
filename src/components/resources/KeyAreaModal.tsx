import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Industry } from "@/types/industry";
import { keyAreaDescriptions } from "@/data/keyAreaDescriptions";

interface KeyAreaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyArea: string;
  industries: Industry[];
}

const KeyAreaModal = ({ open, onOpenChange, keyArea, industries }: KeyAreaModalProps) => {
  const relatedIndustries = industries.filter((industry) =>
    industry.keyAreas.includes(keyArea)
  );

  const totalInvestment = relatedIndustries
    .map((industry) => {
      const value = industry.investment.match(/\d+/)?.[0];
      return value ? parseInt(value) : 0;
    })
    .reduce((a, b) => a + b, 0);

  const keyAreaInfo = keyAreaDescriptions[keyArea];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-2">
            {keyArea}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            This key area is present across {relatedIndustries.length} industries with a
            combined investment potential of ${totalInvestment}+ billion.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {keyAreaInfo && (
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{keyAreaInfo.description}</p>
              <h4 className="text-md font-semibold text-primary mb-2">Key Opportunities</h4>
              <ul className="list-disc pl-5 space-y-1">
                {keyAreaInfo.opportunities.map((opportunity, index) => (
                  <li key={index} className="text-gray-600">{opportunity}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Related Industries</h3>
            <div className="space-y-4">
              {relatedIndustries.map((industry) => (
                <div key={industry.name} className="p-4 bg-secondary/20 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-primary">{industry.name}</h4>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {industry.score} Score
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.techTailwinds.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-primary/20 text-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyAreaModal;