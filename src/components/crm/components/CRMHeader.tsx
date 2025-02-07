
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddContactDialog from "../AddContactDialog";
import { useState } from "react";
import { InferIndustriesButton } from "./InferIndustriesButton";

const CRMHeader = () => {
  const [showAddContact, setShowAddContact] = useState(false);

  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Relationship Management</h2>
        <p className="text-muted-foreground mt-1">
          Manage your contacts and leads
        </p>
      </div>
      <div className="flex items-center gap-2">
        <InferIndustriesButton />
        <Button onClick={() => setShowAddContact(true)}>
          <Plus className="h-4 w-4" /> Add Leads
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
