import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistItem, Note, ContactDetailsDialogProps } from "./types/contact-details";
import ContactInfo from "./components/ContactInfo";
import StageSelector from "./components/StageSelector";
import ContactChecklist from "./components/ContactChecklist";
import ContactNotes from "./components/ContactNotes";
import ContactAttachments from "./components/ContactAttachments";
import { ScrollArea } from "@/components/ui/scroll-area";
import HeatRating from "./components/HeatRating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Target, Trash2 } from "lucide-react";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";

const ContactDetailsDialog = ({ 
  contact, 
  open, 
  onOpenChange,
  onUpdate 
}: ContactDetailsDialogProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [showStageAlert, setShowStageAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [pendingStageChange, setPendingStageChange] = useState<typeof contact.stage | null>(null);
  const [goal, setGoal] = useState(contact.goal || '');
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchChecklist();
      setGoal(contact.goal || '');
    }
  }, [open, contact.stage, contact.goal]);

  const fetchChecklist = async () => {
    const { data: existingItems, error: existingError } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('contact_id', contact.id)
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

    if (existingItems.length === 0) {
      const newItems: ChecklistItem[] = defaultItems.map(({ item_text, stage }) => ({
        id: crypto.randomUUID(),
        contact_id: contact.id,
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
          contact_id: contact.id,
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
    const { error } = await supabase
      .from('contacts')
      .update({ stage: newStage })
      .eq('id', contact.id);

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
    const { error } = await supabase
      .from('contacts')
      .update({ heat_rating: rating })
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

  const updateGoal = async () => {
    const { error } = await supabase
      .from('contacts')
      .update({ goal })
      .eq('id', contact.id);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateGoal();
    }
  };

  const handleDelete = async () => {
    try {
      await supabase
        .from('checklist_items')
        .delete()
        .eq('contact_id', contact.id);

      await supabase
        .from('contact_notes')
        .delete()
        .eq('contact_id', contact.id);

      await supabase
        .from('contact_attachments')
        .delete()
        .eq('contact_id', contact.id);

      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contact.id);

      if (error) throw error;

      toast({
        title: "Contact deleted",
        description: "The contact has been successfully removed from the pipeline",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error deleting contact",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl h-[90vh] p-0 flex flex-col">
          <DialogHeader className="p-6 pb-2">
            <div className="flex justify-between items-start">
              <DialogTitle className="pb-[10px]">
                {contact.first_name} {contact.last_name}
              </DialogTitle>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <Target className="w-6 h-6 text-gray-500 p-1" />
              <Input
                placeholder="Set a target for this lead... (press Enter to save)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onBlur={updateGoal}
                onKeyDown={handleKeyDown}
                className="mt-2"
              />
            </div>
          </DialogHeader>

          <Tabs defaultValue="details" className="flex flex-col flex-1">
            <TabsList className="px-6 mt-2">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="details" className="mt-0">
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-1 space-y-4">
                    <ContactInfo contact={contact} />
                    <HeatRating 
                      currentRating={contact.heat_rating} 
                      onRatingChange={updateHeatRating}
                    />
                    <StageSelector currentStage={contact.stage} onStageChange={updateStage} />
                  </div>

                  <div className="col-span-2 space-y-6">
                    <ContactChecklist 
                      checklist={checklist} 
                      onToggleItem={toggleChecklistItem} 
                    />
                    <ContactNotes 
                      contactId={contact.id} 
                      onChecklistUpdate={fetchChecklist}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="mt-0">
                <ContactAttachments contactId={contact.id} />
              </TabsContent>
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

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone, and all associated data (notes, checklist items, and attachments) will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showStageAlert} onOpenChange={setShowStageAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Incomplete Checklist Items</AlertDialogTitle>
            <AlertDialogDescription>
              There are incomplete checklist items for the current stage. Are you sure you want to proceed with moving this contact to the next stage?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowStageAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (pendingStageChange) {
                processStageUpdate(pendingStageChange);
                setShowStageAlert(false);
              }
            }}>
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContactDetailsDialog;
