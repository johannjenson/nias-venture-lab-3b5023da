
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import AddContactDialog from "@/components/crm/AddContactDialog";
import CRMHeader from "@/components/crm/components/CRMHeader";
import CRMTabs from "@/components/crm/components/CRMTabs";
import { LeadType, IndustryType } from "@/components/crm/types/contact";

const CRM = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAddContact, setShowAddContact] = useState(false);
  const [leadTypeFilter, setLeadTypeFilter] = useState<LeadType | 'all'>('all');
  const [industryFilter, setIndustryFilter] = useState<IndustryType | 'all'>('all');

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
      <CRMHeader onAddLead={() => setShowAddContact(true)} />

      <main className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-7xl mx-auto">
          <CRMTabs
            leadTypeFilter={leadTypeFilter}
            onLeadTypeChange={setLeadTypeFilter}
            industryFilter={industryFilter}
            onIndustryChange={setIndustryFilter}
          />
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

