
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";
import { ContactDetailsDialogProps } from "./types/contact-details";
import { useContactChecklist } from "./hooks/useContactChecklist";
import { useContactUpdates } from "./hooks/useContactUpdates";
import ContactDialogHeader from "./components/dialog/ContactDialogHeader";
import CustomDialogContent from "./components/dialog/DialogContent";
import StageChangeAlert from "./components/dialog/StageChangeAlert";

const ContactDetailsDialog = ({ 
  contact, 
  open, 
  onOpenChange,
  onUpdate 
}: ContactDetailsDialogProps) => {
  const [showStageAlert, setShowStageAlert] = useState(false);
  const [pendingStageChange, setPendingStageChange] = useState<typeof contact.stage | null>(null);
  const [goal, setGoal] = useState(contact.goal || '');

  const { checklist, fetchChecklist, toggleChecklistItem, getActualContactId } = useContactChecklist(contact.id, contact.stage);
  const { updateHeatRating, updateGoal, updateStage } = useContactUpdates(onUpdate);

  useEffect(() => {
    if (open) {
      fetchChecklist();
      setGoal(contact.goal || '');
    }
  }, [open, contact.stage, contact.goal]);

  const handleStageUpdate = async (newStage: typeof contact.stage) => {
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
    if (!actualContactId) return;

    const success = await updateStage(actualContactId, newStage);
    if (success) {
      fetchChecklist();
      setPendingStageChange(null);
    }
  };

  const handleGoalUpdate = async () => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) return;
    await updateGoal(actualContactId, goal);
  };

  const handleHeatRatingUpdate = async (rating: number) => {
    const actualContactId = await getActualContactId(contact.id);
    if (!actualContactId) return;
    await updateHeatRating(actualContactId, rating);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col">
          <ContactDialogHeader 
            firstName={contact.first_name}
            lastName={contact.last_name}
            goal={goal}
            onGoalChange={setGoal}
            onGoalUpdate={handleGoalUpdate}
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
                onHeatRatingChange={handleHeatRatingUpdate}
                onStageChange={handleStageUpdate}
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
