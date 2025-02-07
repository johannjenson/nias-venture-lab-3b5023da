
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import AddContactDialog from "../AddContactDialog";
import { useState } from "react";
import { InferIndustriesButton } from "./InferIndustriesButton";
import { useNavigate } from "react-router-dom";

const CRMHeader = () => {
  const [showAddContact, setShowAddContact] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </button>
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Relationships</h2>
          <p className="text-muted-foreground mt-2">
            Manage your contacts and leads
          </p>
        </div>
        <div className="flex items-center gap-4">
          <InferIndustriesButton />
          <Button onClick={() => setShowAddContact(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Leads
          </Button>
        </div>
      </div>

      <AddContactDialog
        open={showAddContact}
        onOpenChange={setShowAddContact}
      />
    </div>
  );
};

export default CRMHeader;
