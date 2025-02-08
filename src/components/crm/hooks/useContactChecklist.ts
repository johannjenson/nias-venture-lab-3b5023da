
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChecklistItem, Contact } from "../types/contact-details";
import { ContactStage } from "../types/kanban";

export const useContactChecklist = (contactId: string, stage: ContactStage) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
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

  const fetchChecklist = async () => {
    const actualContactId = await getActualContactId(contactId);
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
      .eq('stage', stage);

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
      .eq('stage', stage);

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

  return {
    checklist,
    fetchChecklist,
    toggleChecklistItem,
    getActualContactId
  };
};
