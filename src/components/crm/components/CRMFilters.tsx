
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndustryType, LeadType, industryTypes, leadTypes } from "../types/contact";

interface CRMFiltersProps {
  leadTypeFilter: LeadType | 'all';
  onLeadTypeChange: (value: LeadType | 'all') => void;
  industryFilter: IndustryType | 'all';
  onIndustryChange: (value: IndustryType | 'all') => void;
}

const CRMFilters = ({ 
  leadTypeFilter, 
  onLeadTypeChange,
  industryFilter,
  onIndustryChange,
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
          <SelectItem value="all">Type</SelectItem>
          {leadTypes.map(type => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={industryFilter}
        onValueChange={(value: IndustryType | 'all') => onIndustryChange(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Industry</SelectItem>
          {industryTypes.map(type => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CRMFilters;

