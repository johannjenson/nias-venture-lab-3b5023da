
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import KanbanBoard from "../KanbanBoard";
import MembershipRequestsBoard from "../MembershipRequestsBoard";
import EventRequestsBoard from "../EventRequestsBoard";
import AllLeadsView from "../AllLeadsView";
import CRMFilters from "./CRMFilters";
import { IndustryType, LeadType } from "../types/contact";
import { supabase } from "@/integrations/supabase/client";
import { AIOptionsDropdown } from "./AIOptionsDropdown";

interface CRMTabsProps {
  leadTypeFilter: LeadType | 'all';
  onLeadTypeChange: (value: LeadType | 'all') => void;
  industryFilter: IndustryType | 'all';
  onIndustryChange: (value: IndustryType | 'all') => void;
}

const CRMTabs = ({ 
  leadTypeFilter, 
  onLeadTypeChange,
  industryFilter,
  onIndustryChange,
}: CRMTabsProps) => {
  const [pendingMembershipCount, setPendingMembershipCount] = useState(0);
  const [pendingEventCount, setPendingEventCount] = useState(0);

  useEffect(() => {
    fetchPendingCounts();

    const channel = supabase
      .channel('request_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'membership_requests' 
      }, () => {
        fetchPendingCounts();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'forum_requests' 
      }, () => {
        fetchPendingCounts();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'dinner_requests' 
      }, () => {
        fetchPendingCounts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPendingCounts = async () => {
    // Get pending membership requests count
    const { count: membershipCount } = await supabase
      .from('membership_requests')
      .select('*', { count: 'exact', head: true })
      .eq('request_status', 'pending');

    setPendingMembershipCount(membershipCount || 0);

    // Get total pending event requests count (forum + dinner)
    const [forumResponse, dinnerResponse] = await Promise.all([
      supabase
        .from('forum_requests')
        .select('*', { count: 'exact', head: true })
        .eq('request_status', 'pending'),
      supabase
        .from('dinner_requests')
        .select('*', { count: 'exact', head: true })
        .eq('request_status', 'pending')
    ]);

    const totalEventCount = (forumResponse.count || 0) + (dinnerResponse.count || 0);
    setPendingEventCount(totalEventCount);
  };

  return (
    <Tabs defaultValue="pipeline" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="membership" className="flex items-center gap-2">
            Membership
            {pendingMembershipCount > 0 && (
              <Badge variant="destructive" className="h-5 px-2">
                {pendingMembershipCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            Events
            {pendingEventCount > 0 && (
              <Badge variant="destructive" className="h-5 px-2">
                {pendingEventCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all-leads">All</TabsTrigger>
        </TabsList>
        <div className="flex items-center">
          <CRMFilters
            leadTypeFilter={leadTypeFilter}
            onLeadTypeChange={onLeadTypeChange}
            industryFilter={industryFilter}
            onIndustryChange={onIndustryChange}
          />
          <AIOptionsDropdown />
        </div>
      </div>
      <TabsContent value="pipeline">
        <KanbanBoard 
          viewType="user"
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
      <TabsContent value="all-leads">
        <AllLeadsView />
      </TabsContent>
    </Tabs>
  );
};

export default CRMTabs;

