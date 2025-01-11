import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KeyAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyArea: string;
  description: string;
}

const KeyAreaModal = ({ isOpen, onClose, keyArea, description }: KeyAreaModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">{keyArea}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default KeyAreaModal;