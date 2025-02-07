
import { ContactStage } from "../types/kanban";

interface StageHeaderProps {
  label: string;
  description: string;
  count: number;
}

const StageHeader = ({ label, description, count }: StageHeaderProps) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{label}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="flex items-center justify-end mt-2">
        <span className="text-sm text-gray-500">{count}</span>
      </div>
    </div>
  );
};

export default StageHeader;
