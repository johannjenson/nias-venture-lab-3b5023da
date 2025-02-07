
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistItem, Note, ContactDetailsDialogProps } from "./types/contact-details";
import ContactInfo from "./components/ContactInfo";
import StageSelector from "./components/StageSelector";
import ContactChecklist from "./components/ContactChecklist";
import ContactNotes from "./components/ContactNotes";
import ContactAttachments from "./components/ContactAttachments";

const ContactDetailsDialog = ({ 
  contact, 
  open, 
  onOpenChange,
  onUpdate 
}: ContactDetailsDialogProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchChecklist();
    }
  }, [open, contact.stage]);

  const fetchChecklist = async () => {
    // First, get existing completed items for this contact
    const { data: existingItems, error: existingError } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('contact_id', contact.id);

    if (existingError) {
      toast({
        title: "Error fetching checklist",
        description: existingError.message,
        variant: "destructive",
      });
      return;
    }

    // Get default items for the current stage
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
      // No existing items, create new ones from defaults
      const newItems = defaultItems.map(({ item_text, stage }) => ({
        id: crypto.randomUUID(),
        contact_id: contact.id,
        stage,
        item_text,
        completed: false,
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
      // Merge existing items with any new default items for the current stage
      const existingTexts = new Set(existingItems.map(item => item.item_text));
      const newDefaultItems = defaultItems
        .filter(item => !existingTexts.has(item.item_text))
        .map(({ item_text, stage }) => ({
          id: crypto.randomUUID(),
          contact_id: contact.id,
          stage,
          item_text,
          completed: false,
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
    fetchChecklist(); // This will add any new checklist items for the new stage
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {contact.first_name} {contact.last_name}
          </DialogTitle>
          <DialogDescription>
            View and manage contact details, attachments, and progress
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 space-y-4">
                <ContactInfo contact={contact} />
                <StageSelector currentStage={contact.stage} onStageChange={updateStage} />
              </div>

              <div className="col-span-2 space-y-6">
                <ContactChecklist 
                  checklist={checklist} 
                  onToggleItem={toggleChecklistItem} 
                />
                <ContactNotes contactId={contact.id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attachments">
            <ContactAttachments contactId={contact.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsDialog;
