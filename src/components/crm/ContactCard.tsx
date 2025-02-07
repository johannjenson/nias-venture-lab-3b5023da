
import { useState } from "react";
import { MoreHorizontal, UserCheck, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact, ContactStage } from "./types/kanban";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ContactDetailsDialog from "./ContactDetailsDialog";

interface ContactCardProps {
  contact: Contact;
  onUpdate: () => void;
}

const ContactCard = ({ contact, onUpdate }: ContactCardProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const handleMoveContact = async (newStage: ContactStage) => {
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

  const handleHeatRatingChange = async (newRating: number) => {
    const { error } = await supabase
      .from('contacts')
      .update({ heat_rating: newRating })
      .eq('id', contact.id);

    if (error) {
      toast({
        title: "Error updating heat rating",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
  };

  return (
    <>
      <div 
        className={cn(
          "bg-white p-4 rounded-lg shadow space-y-2 cursor-pointer",
          isMoving && "opacity-50"
        )}
        onClick={() => setShowDetails(true)}
      >
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking dropdown
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleMoveContact('mql_lead')}>
                Move to MQL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveContact('sql_qualification')}>
                Move to SQL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveContact('sqo_discovery')}>
                Move to SQO
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveContact('evaluation')}>
                Move to Evaluation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveContact('closed_won')}>
                Move to Won
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveContact('closed_lost')}>
                Move to Lost
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-gray-600">
          <p>{contact.title}</p>
          <p>{contact.company}</p>
          <div 
            className="flex gap-0.5 mt-1" 
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking rating
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleHeatRatingChange(rating === contact.heat_rating ? 0 : rating)}
                className="hover:scale-110 transition-transform"
              >
                <Flame 
                  className={cn(
                    "h-4 w-4",
                    rating <= contact.heat_rating ? "text-red-500" : "text-gray-300"
                  )}
                  aria-label={`Heat rating ${rating} out of 5`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

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

