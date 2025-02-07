
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Contact } from "../../types/contact-details";

interface StageChangeAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingStage: typeof Contact.prototype.stage | null;
  onConfirm: (stage: typeof Contact.prototype.stage) => void;
}

const StageChangeAlert = ({
  open,
  onOpenChange,
  pendingStage,
  onConfirm,
}: StageChangeAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Incomplete Checklist Items</AlertDialogTitle>
          <AlertDialogDescription>
            There are incomplete checklist items for the current stage. Are you sure you want to proceed with moving this contact to the next stage?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (pendingStage) {
                onConfirm(pendingStage);
                onOpenChange(false);
              }
            }}
          >
            Proceed Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StageChangeAlert;
