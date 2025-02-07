
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LeadType } from "../types/contact";

interface CRMFiltersProps {
  leadTypeFilter: LeadType | 'all';
  onLeadTypeChange: (value: LeadType | 'all') => void;
  viewByCompany: boolean;
  onViewTypeChange: (checked: boolean) => void;
}

const leadTypes = [
  { id: 'all' as const, label: 'All Leads' },
  { id: 'founder_executive' as const, label: 'Founders & Executives' },
  { id: 'investor_buyer' as const, label: 'Investors & Buyers' },
  { id: 'advisor_broker' as const, label: 'Advisors & Brokers' },
  { id: 'other' as const, label: 'Other' },
];

const CRMFilters = ({ 
  leadTypeFilter, 
  onLeadTypeChange, 
  viewByCompany, 
  onViewTypeChange 
}: CRMFiltersProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Select
        value={leadTypeFilter}
        onValueChange={(value: LeadType | 'all') => onLeadTypeChange(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {leadTypes.map(type => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2">
        <Label htmlFor="view-toggle" className="text-sm text-gray-600">
          {viewByCompany ? "Company View" : "User View"}
        </Label>
        <Switch
          id="view-toggle"
          checked={viewByCompany}
          onCheckedChange={onViewTypeChange}
        />
      </div>
    </div>
  );
};

export default CRMFilters;
