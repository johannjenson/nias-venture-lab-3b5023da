
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";
import { Contact, ChecklistItem, ContactDetailsDialogProps } from "./types/contact-details";
import DialogHeader from "./components/dialog/DialogHeader";
import DialogContent as CustomDialogContent from "./components/dialog/DialogContent";
import StageChangeAlert from "./components/dialog/StageChangeAlert";

const ContactDetailsDialog = ({ 
  contact, 
  open, 
  onOpenChange,
  onUpdate 
}: ContactDetailsDialogProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [showStageAlert, setShowStageAlert] = useState(false);
  const [pendingStageChange, setPendingStageChange] = useState<typeof contact.stage | null>(null);
  const [goal, setGoal] = useState(contact.goal || '');
  const { toast } = useToast();

  const getActualContactId = async (prefixedId: string) => {
    if (prefixedId.startsWith('event_')) {
      const eventId = parseInt(prefixedId.replace('event_', ''), 10);
      const { data: eventRequest } = await supabase
        .from('event_requests')
        .select('uuid_id')
        .eq('id', eventId)
        .single();
      return eventRequest?.uuid_id;
    }
    return prefixedId;
  };

  useEffect(() => {
    if (open) {
      fetchChecklist();
      setGoal(contact.goal || '');
    }
  }, [open, contact.stage, contact.goal]);

  const fetchChecklist = async () => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) {
      toast({
        title: "Error fetching checklist",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { data: existingItems, error: existingError } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('contact_id', actualContactId)
      .eq('stage', contact.stage);

    if (existingError) {
      toast({
        title: "Error fetching checklist",
        description: existingError.message,
        variant: "destructive",
      });
      return;
    }

    const { data: defaultItems, error: defaultError } = await supabase
      .from('checklist_items')
      .select('*')
      .is('contact_id', null)
      .eq('stage', contact.stage);

    if (defaultError) {
      toast({
        title: "Error fetching default checklist",
        description: defaultError.message,
        variant: "destructive",
      });
      return;
    }

    if (existingItems.length === 0 && defaultItems.length > 0) {
      const newItems: ChecklistItem[] = defaultItems.map(({ item_text, stage }) => ({
        id: crypto.randomUUID(),
        contact_id: actualContactId,
        stage,
        item_text,
        completed: false,
        completed_at: null
      }));

      const { error: insertError } = await supabase
        .from('checklist_items')
        .insert(newItems);

      if (insertError) {
        toast({
          title: "Error creating checklist",
          description: insertError.message,
          variant: "destructive",
        });
        return;
      }

      setChecklist(newItems);
    } else {
      const existingTexts = new Set(existingItems.map(item => item.item_text));
      const newDefaultItems: ChecklistItem[] = defaultItems
        .filter(item => !existingTexts.has(item.item_text))
        .map(({ item_text, stage }) => ({
          id: crypto.randomUUID(),
          contact_id: actualContactId,
          stage,
          item_text,
          completed: false,
          completed_at: null
        }));

      if (newDefaultItems.length > 0) {
        const { error: insertError } = await supabase
          .from('checklist_items')
          .insert(newDefaultItems);

        if (insertError) {
          toast({
            title: "Error adding new checklist items",
            description: insertError.message,
            variant: "destructive",
          });
          return;
        }
      }

      setChecklist([...existingItems, ...newDefaultItems]);
    }
  };

  const updateStage = async (newStage: typeof contact.stage) => {
    const hasIncompleteItems = checklist.some(item => !item.completed);
    
    if (hasIncompleteItems) {
      setPendingStageChange(newStage);
      setShowStageAlert(true);
      return;
    }

    await processStageUpdate(newStage);
  };

  const processStageUpdate = async (newStage: typeof contact.stage) => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) {
      toast({
        title: "Error updating stage",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('contacts')
      .update({ stage: newStage })
      .eq('id', actualContactId);

    if (error) {
      toast({
        title: "Error updating stage",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
    fetchChecklist();
    setPendingStageChange(null);
  };

  const toggleChecklistItem = async (itemId: string, completed: boolean) => {
    const { error } = await supabase
      .from('checklist_items')
      .update({ 
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Error updating checklist",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setChecklist(checklist.map(item => 
      item.id === itemId ? { ...item, completed, completed_at: completed ? new Date().toISOString() : null } : item
    ));
  };

  const updateHeatRating = async (rating: number) => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) {
      toast({
        title: "Error updating heat rating",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('contacts')
      .update({ heat_rating: rating })
      .eq('id', actualContactId);

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

  const updateGoal = async () => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) {
      toast({
        title: "Error updating target",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('contacts')
      .update({ goal })
      .eq('id', actualContactId);

    if (error) {
      toast({
        title: "Error updating target",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
    toast({
      title: "Target updated",
      description: "The contact's target has been updated successfully.",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col">
          <DialogHeader 
            firstName={contact.first_name}
            lastName={contact.last_name}
            goal={goal}
            onGoalChange={setGoal}
            onGoalUpdate={updateGoal}
          />

          <Tabs defaultValue="details" className="flex flex-col flex-1">
            <TabsList className="px-6 mt-2">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 p-6">
              <CustomDialogContent
                activeTab="details"
                contact={contact}
                checklist={checklist}
                onHeatRatingChange={updateHeatRating}
                onStageChange={updateStage}
                onToggleChecklistItem={toggleChecklistItem}
                onChecklistUpdate={fetchChecklist}
              />
            </ScrollArea>

            <div className="p-6 pt-2 border-t">
              <DeleteRequestDialog 
                contactId={contact.id} 
                onDelete={() => {
                  onUpdate();
                  onOpenChange(false);
                }}
              />
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      <StageChangeAlert
        open={showStageAlert}
        onOpenChange={setShowStageAlert}
        pendingStage={pendingStageChange}
        onConfirm={processStageUpdate}
      />
    </>
  );
};

export default ContactDetailsDialog;
