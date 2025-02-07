
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { IndustryType, LeadType, industryTypes, leadTypes } from "../types/contact";
import { Separator } from "@/components/ui/separator";

interface CRMFiltersProps {
  leadTypeFilter: LeadType | 'all';
  onLeadTypeChange: (value: LeadType | 'all') => void;
  industryFilter: IndustryType | 'all';
  onIndustryChange: (value: IndustryType | 'all') => void;
  viewByCompany: boolean;
  onViewTypeChange: (checked: boolean) => void;
  showMembershipRequests: boolean;
  onShowMembershipRequestsChange: (checked: boolean) => void;
  showEventRequests: boolean;
  onShowEventRequestsChange: (checked: boolean) => void;
}

const CRMFilters = ({ 
  leadTypeFilter, 
  onLeadTypeChange,
  industryFilter,
  onIndustryChange,
  viewByCompany, 
  onViewTypeChange,
  showMembershipRequests,
  onShowMembershipRequestsChange,
  showEventRequests,
  onShowEventRequestsChange
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
          <SelectItem value="all">All Lead Types</SelectItem>
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
          <SelectItem value="all">All Industries</SelectItem>
          {industryTypes.map(type => (
            <SelectItem key={type.id} value={type.id}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center space-x-4">
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

        <div className="flex items-center space-x-2">
          <Label htmlFor="membership-toggle" className="text-sm text-gray-600">
            Show Membership Requests
          </Label>
          <Switch
            id="membership-toggle"
            checked={showMembershipRequests}
            onCheckedChange={onShowMembershipRequestsChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="events-toggle" className="text-sm text-gray-600">
            Show Event Requests
          </Label>
          <Switch
            id="events-toggle"
            checked={showEventRequests}
            onCheckedChange={onShowEventRequestsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CRMFilters;
