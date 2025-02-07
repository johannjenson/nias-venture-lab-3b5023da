
import { useState } from "react";
import { MoreHorizontal, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact } from "./types/kanban";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ContactCardProps {
  contact: Contact;
  onUpdate: () => void;
}

const ContactCard = ({ contact, onUpdate }: ContactCardProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const { toast } = useToast();

  const handleMoveContact = async (newStage: string) => {
    setIsMoving(true);
    
    const { error } = await supabase
      .from('contacts')
      .update({ stage: newStage })
      .eq('id', contact.id);

    if (error) {
      toast({
        title: "Error moving contact",
        description: error.message,
        variant: "destructive",
      });
    }

    setIsMoving(false);
    onUpdate();
  };

  return (
    <div className={cn(
      "bg-white p-4 rounded-lg shadow space-y-2",
      isMoving && "opacity-50"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">
            {contact.first_name} {contact.last_name}
          </h3>
          {contact.has_account && (
            <UserCheck 
              className="h-4 w-4 text-green-500" 
              aria-label="Has user account" 
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleMoveContact('new_lead')}>
              Move to New Lead
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMoveContact('mql_lead')}>
              Move to MQL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMoveContact('sql_lead')}>
              Move to SQL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMoveContact('opportunity')}>
              Move to Opportunity
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMoveContact('customer')}>
              Move to Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-sm text-gray-600">
        <p>{contact.title}</p>
        <p>{contact.company}</p>
      </div>
    </div>
  );
};

export default ContactCard;
