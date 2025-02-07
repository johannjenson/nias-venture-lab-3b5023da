
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanbanBoard from "../KanbanBoard";
import MembershipRequestsBoard from "../MembershipRequestsBoard";
import EventRequestsBoard from "../EventRequestsBoard";
import CRMFilters from "./CRMFilters";
import { IndustryType, LeadType } from "../types/contact";

interface CRMTabsProps {
  leadTypeFilter: LeadType | 'all';
  onLeadTypeChange: (value: LeadType | 'all') => void;
  industryFilter: IndustryType | 'all';
  onIndustryChange: (value: IndustryType | 'all') => void;
  viewByCompany: boolean;
  onViewTypeChange: (checked: boolean) => void;
}

const CRMTabs = ({ 
  leadTypeFilter, 
  onLeadTypeChange,
  industryFilter,
  onIndustryChange,
  viewByCompany, 
  onViewTypeChange 
}: CRMTabsProps) => {
  return (
    <Tabs defaultValue="pipeline" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="membership">Membership Requests</TabsTrigger>
          <TabsTrigger value="events">Event Requests</TabsTrigger>
        </TabsList>
        <CRMFilters
          leadTypeFilter={leadTypeFilter}
          onLeadTypeChange={onLeadTypeChange}
          industryFilter={industryFilter}
          onIndustryChange={onIndustryChange}
          viewByCompany={viewByCompany}
          onViewTypeChange={onViewTypeChange}
        />
      </div>
      <TabsContent value="pipeline">
        <KanbanBoard 
          viewType={viewByCompany ? "company" : "user"}
          leadTypeFilter={leadTypeFilter}
          industryFilter={industryFilter}
        />
      </TabsContent>
      <TabsContent value="membership">
        <MembershipRequestsBoard />
      </TabsContent>
      <TabsContent value="events">
        <EventRequestsBoard />
      </TabsContent>
    </Tabs>
  );
};

export default CRMTabs;
