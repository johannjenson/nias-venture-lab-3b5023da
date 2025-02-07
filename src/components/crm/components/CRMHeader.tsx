
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddContactDialog from "../AddContactDialog";
import { useState } from "react";

const CRMHeader = () => {
  const [showAddContact, setShowAddContact] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
        <p className="text-muted-foreground">
          Manage your contacts and leads
        </p>
      </div>
      <div>
        <Button onClick={() => setShowAddContact(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      <AddContactDialog
        open={showAddContact}
        onOpenChange={setShowAddContact}
      />
    </div>
  );
};

export default CRMHeader;
