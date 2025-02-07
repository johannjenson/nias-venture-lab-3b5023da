
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import KanbanBoard from "@/components/crm/KanbanBoard";
import MembershipRequestsBoard from "@/components/crm/MembershipRequestsBoard";
import EventRequestsBoard from "@/components/crm/EventRequestsBoard";
import AddContactDialog from "@/components/crm/AddContactDialog";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LeadType = 'all' | 'founder_executive' | 'investor_buyer' | 'advisor_broker' | 'other';

const leadTypes = [
  { id: 'all', label: 'All Leads' },
  { id: 'founder_executive', label: 'Founders & Executives' },
  { id: 'investor_buyer', label: 'Investors & Buyers' },
  { id: 'advisor_broker', label: 'Advisors & Brokers' },
  { id: 'other', label: 'Other' },
];

const CRM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false);
  const [viewByCompany, setViewByCompany] = useState(false);
  const [leadTypeFilter, setLeadTypeFilter] = useState<LeadType>('all');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-transparent"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">CRM Dashboard</h1>
          </div>
          <Button onClick={() => setShowAddContact(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Lead
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="pipeline" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                <TabsTrigger value="membership">Membership Requests</TabsTrigger>
                <TabsTrigger value="events">Event Requests</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-4">
                <Select
                  value={leadTypeFilter}
                  onValueChange={(value: LeadType) => setLeadTypeFilter(value)}
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
                    onCheckedChange={setViewByCompany}
                  />
                </div>
              </div>
            </div>
            <TabsContent value="pipeline">
              <KanbanBoard 
                viewType={viewByCompany ? "company" : "user"}
                leadTypeFilter={leadTypeFilter}
              />
            </TabsContent>
            <TabsContent value="membership">
              <MembershipRequestsBoard />
            </TabsContent>
            <TabsContent value="events">
              <EventRequestsBoard />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AddContactDialog 
        open={showAddContact} 
        onOpenChange={setShowAddContact}
      />
      
      <Footer />
    </div>
  );
};

export default CRM;
