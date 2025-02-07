
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import ContactDetailsDialog from "./ContactDetailsDialog";
import { Database } from "@/integrations/supabase/types";

type ContactStage = Database["public"]["Enums"]["contact_stage"];

interface ContactCardProps {
  contact: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    title: string;
    stage: ContactStage;
    source?: string;
    source_id?: string;
  };
  onUpdate: () => void;
}

const ContactCard = ({ contact, onUpdate }: ContactCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium">
                {contact.first_name} {contact.last_name}
              </h4>
              <p className="text-sm text-gray-500">{contact.company}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDetails(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">{contact.title}</p>
            <p className="text-gray-500 truncate">{contact.email}</p>
            {contact.source === 'network_request' && (
              <p className="text-blue-600 text-xs mt-2">Network Join Request</p>
            )}
          </div>
        </div>
      </Card>

      <ContactDetailsDialog
        contact={contact}
        open={showDetails}
        onOpenChange={setShowDetails}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ContactCard;
