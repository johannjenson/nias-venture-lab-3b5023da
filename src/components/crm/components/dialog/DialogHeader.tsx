
import { DialogHeader as BaseDialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface DialogHeaderProps {
  firstName: string;
  lastName: string;
  goal: string;
  onGoalChange: (value: string) => void;
  onGoalUpdate: () => void;
}

const DialogHeader = ({ 
  firstName, 
  lastName, 
  goal, 
  onGoalChange, 
  onGoalUpdate 
}: DialogHeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onGoalUpdate();
    }
  };

  return (
    <BaseDialogHeader className="p-6 pb-2">
      <div className="flex justify-between items-start">
        <DialogTitle className="pb-[10px]">
          {firstName} {lastName}
        </DialogTitle>
      </div>
      <div className="mt-4 flex items-center gap-6">
        <Target className="w-6 h-6 text-gray-500 p-1" />
        <Input
          placeholder="Set a target for this lead... (press Enter to save)"
          value={goal}
          onChange={(e) => onGoalChange(e.target.value)}
          onBlur={onGoalUpdate}
          onKeyDown={handleKeyDown}
          className="mt-2"
        />
      </div>
    </BaseDialogHeader>
  );
};

export default DialogHeader;
