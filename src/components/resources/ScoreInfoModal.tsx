import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScoreInfoModal = ({ isOpen, onClose }: ScoreInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Understanding the Nias Potential Score</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-left">
          <p className="text-gray-600">
            The Nias Potential Score is a comprehensive metric that evaluates industry sectors based on multiple factors to determine their investment and growth potential in Saudi Arabia.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Assessment Criteria:</h4>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Market Size & Growth Potential</div>
                <p className="text-gray-600 text-sm">Evaluation of current market size and projected growth trajectory based on local and regional demand patterns.</p>
              </div>
              <div>
                <div className="font-medium">Alignment with Saudi Vision 2030</div>
                <p className="text-gray-600 text-sm">How well the sector aligns with national development goals and strategic priorities outlined in Vision 2030.</p>
              </div>
              <div>
                <div className="font-medium">Competition Landscape</div>
                <p className="text-gray-600 text-sm">Analysis of existing market players, barriers to entry, and opportunities for new entrants.</p>
              </div>
              <div>
                <div className="font-medium">Regulatory Environment</div>
                <p className="text-gray-600 text-sm">Assessment of current regulations, incentives, and potential policy changes that could impact the sector.</p>
              </div>
              <div>
                <div className="font-medium">Available Talent Pool</div>
                <p className="text-gray-600 text-sm">Evaluation of local workforce capabilities and access to required skills and expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreInfoModal;