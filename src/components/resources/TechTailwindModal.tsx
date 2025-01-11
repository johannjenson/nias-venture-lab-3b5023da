import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TechTailwindModalProps {
  isOpen: boolean;
  onClose: () => void;
  techTailwind: string;
  description: string;
}

const TechTailwindModal = ({ isOpen, onClose, techTailwind, description }: TechTailwindModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">{techTailwind}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TechTailwindModal;