import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { techTailwindsDescriptions } from "@/data/techTailwindsDescriptions";
import { Industry } from "@/types/industry";

interface TechTailwindModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  techTailwind: string;
  industries: Industry[];
}

const TechTailwindModal = ({ open, onOpenChange, techTailwind, industries }: TechTailwindModalProps) => {
  const relatedIndustries = industries.filter((industry) =>
    industry.techTailwinds.includes(techTailwind)
  );

  const techInfo = techTailwindsDescriptions[techTailwind];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-2">
            {techTailwind}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {techInfo && (
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{techInfo.description}</p>
              
              <h4 className="text-md font-semibold text-primary mb-2">Key Applications</h4>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {techInfo.applications.map((application, index) => (
                  <li key={index} className="text-gray-600">{application}</li>
                ))}
              </ul>

              <h4 className="text-md font-semibold text-primary mb-2">Business Impact</h4>
              <ul className="list-disc pl-5 space-y-1">
                {techInfo.impact.map((impact, index) => (
                  <li key={index} className="text-gray-600">{impact}</li>
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
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                      {industry.score} Score
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TechTailwindModal;