import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Database } from "@/integrations/supabase/types";

type ContactStage = Database["public"]["Enums"]["contact_stage"];

interface ContactDetailsDialogProps {
  contact: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    title: string;
    stage: ContactStage;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

interface ChecklistItem {
  id: string;
  contact_id: string | null;
  stage: ContactStage;
  item_text: string;
  completed: boolean;
}

const stages: { id: ContactStage; label: string }[] = [
  { id: 'new_lead', label: 'New Lead' },
  { id: 'qualifying', label: 'Qualifying' },
  { id: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { id: 'proposal_sent', label: 'Proposal Sent' },
  { id: 'negotiating', label: 'Negotiating' },
  { id: 'closed_won', label: 'Closed Won' },
  { id: 'closed_lost', label: 'Closed Lost' },
];

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

    if (existingItems.length === 0) {
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
      setChecklist(existingItems);
    }
  };

  const updateStage = async (newStage: ContactStage) => {
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
  };

  const toggleChecklistItem = async (itemId: string, completed: boolean) => {
    const { error } = await supabase
      .from('checklist_items')
      .update({ completed })
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
      item.id === itemId ? { ...item, completed } : item
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {contact.first_name} {contact.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Contact Details</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Company:</span> {contact.company}</p>
                <p><span className="text-gray-500">Title:</span> {contact.title}</p>
                <p><span className="text-gray-500">Email:</span> {contact.email}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Stage</h4>
              <div className="space-y-2">
                {stages.map((stage) => (
                  <Button
                    key={stage.id}
                    variant={contact.stage === stage.id ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => updateStage(stage.id)}
                  >
                    {stage.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <h4 className="font-medium mb-4">Stage Checklist</h4>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={(checked) => 
                      toggleChecklistItem(item.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={item.id}
                    className={`text-sm ${
                      item.completed ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {item.item_text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsDialog;