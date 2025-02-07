
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanbanBoard from "../KanbanBoard";
import MembershipRequestsBoard from "../MembershipRequestsBoard";
import EventRequestsBoard from "../EventRequestsBoard";
import CRMFilters from "./CRMFilters";
import { IndustryType, LeadType } from "../types/contact";
import { useState } from "react";

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
  const [showMembershipRequests, setShowMembershipRequests] = useState(true);
  const [showEventRequests, setShowEventRequests] = useState(true);

  return (
    <Tabs defaultValue="pipeline" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          {showMembershipRequests && <TabsTrigger value="membership">Membership Requests</TabsTrigger>}
          {showEventRequests && <TabsTrigger value="events">Event Requests</TabsTrigger>}
        </TabsList>
        <CRMFilters
          leadTypeFilter={leadTypeFilter}
          onLeadTypeChange={onLeadTypeChange}
          industryFilter={industryFilter}
          onIndustryChange={onIndustryChange}
          viewByCompany={viewByCompany}
          onViewTypeChange={onViewTypeChange}
          showMembershipRequests={showMembershipRequests}
          onShowMembershipRequestsChange={setShowMembershipRequests}
          showEventRequests={showEventRequests}
          onShowEventRequestsChange={setShowEventRequests}
        />
      </div>
      <TabsContent value="pipeline">
        <KanbanBoard 
          viewType={viewByCompany ? "company" : "user"}
          leadTypeFilter={leadTypeFilter}
          industryFilter={industryFilter}
        />
      </TabsContent>
      {showMembershipRequests && (
        <TabsContent value="membership">
          <MembershipRequestsBoard />
        </TabsContent>
      )}
      {showEventRequests && (
        <TabsContent value="events">
          <EventRequestsBoard />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default CRMTabs;
