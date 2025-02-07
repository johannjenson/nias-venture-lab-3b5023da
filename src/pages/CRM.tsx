
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

const CRM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false);

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
            <Plus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="pipeline" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pipeline">Contact Pipeline</TabsTrigger>
              <TabsTrigger value="membership">Membership Requests</TabsTrigger>
              <TabsTrigger value="events">Event Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="pipeline">
              <KanbanBoard />
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
