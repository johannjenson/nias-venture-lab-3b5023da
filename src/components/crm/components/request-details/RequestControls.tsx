
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndustryType, industryTypes } from "../../types/contact";

interface RequestControlsProps {
  status: string;
  industry: IndustryType | '';
  onStatusChange: (status: string) => void;
  onIndustryChange: (industry: IndustryType) => void;
  onMoveToContact: () => void;
}

export const RequestControls = ({
  status,
  industry,
  onStatusChange,
  onIndustryChange,
  onMoveToContact,
}: RequestControlsProps) => {
  return (
    <div>
      <div>
        <Label>Industry</Label>
        <Select value={industry} onValueChange={onIndustryChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {industryTypes.map(type => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {status === 'approved' && (
          <Button
            onClick={onMoveToContact}
            className="ml-4"
          >
            Move to Pipeline
          </Button>
        )}
      </div>
    </div>
  );
};
