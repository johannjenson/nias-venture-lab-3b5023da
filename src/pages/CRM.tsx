
import { useState } from "react";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import AddContactDialog from "@/components/crm/AddContactDialog";
import CRMHeader from "@/components/crm/components/CRMHeader";
import CRMTabs from "@/components/crm/components/CRMTabs";
import { LeadType, IndustryType } from "@/components/crm/types/contact";

const CRM = () => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [leadTypeFilter, setLeadTypeFilter] = useState<LeadType | 'all'>('all');
  const [industryFilter, setIndustryFilter] = useState<IndustryType | 'all'>('all');

  return (
    <div className="min-h-screen bg-white">
      <CRMHeader onAddLead={() => setShowAddContact(true)} />

      <main className="container mx-auto px-4 py-4 mt-28">
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
