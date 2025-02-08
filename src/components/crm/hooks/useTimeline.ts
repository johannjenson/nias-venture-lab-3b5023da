
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TimelineItem } from "../types/contact-details";
import { useActualContactId } from "./useActualContactId";

export const useTimeline = (contactId: string, onChecklistUpdate: () => void) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const getActualContactId = useActualContactId();

  const fetchTimelineItems = async () => {
    const actualContactId = await getActualContactId(contactId);
    if (!actualContactId) {
      toast({
        title: "Error fetching notes",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { data: notesData, error: notesError } = await supabase
      .from('contact_notes')
      .select(`
        *,
        profiles:user_id (
          email,
          first_name,
          last_name
        )
      `)
      .eq('contact_id', actualContactId)
      .order('created_at', { ascending: false });

    if (notesError) {
      toast({
        title: "Error fetching notes",
        description: notesError.message,
        variant: "destructive",
      });
      return;
    }

    const { data: checklistData, error: checklistError } = await supabase
      .from('checklist_items')
      .select(`
        *,
        profiles:completed_by (
          email,
          first_name,
          last_name
        )
      `)
      .eq('contact_id', actualContactId)
      .eq('completed', true)
      .not('completed_at', 'is', null)
      .order('completed_at', { ascending: false });

    if (checklistError) {
      toast({
        title: "Error fetching checklist items",
        description: checklistError.message,
        variant: "destructive",
      });
      return;
    }

    const noteItems: TimelineItem[] = (notesData || []).map((note): TimelineItem => ({
      id: note.id,
      type: 'note',
      timestamp: note.created_at,
      content: note.content,
      user: note.profiles ? {
        email: note.profiles.email || '',
        first_name: note.profiles.first_name || '',
        last_name: note.profiles.last_name || ''
      } : null
    }));

    const checklistItems: TimelineItem[] = (checklistData || []).map((item): TimelineItem => ({
      id: item.id,
      type: 'checklist',
      timestamp: item.completed_at!,
      content: item.item_text,
      stage: item.stage,
      completed: true,
      completed_by: item.profiles ? {
        email: item.profiles.email || '',
        first_name: item.profiles.first_name || '',
        last_name: item.profiles.last_name || ''
      } : null
    }));

    const allItems = [...noteItems, ...checklistItems].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setTimelineItems(allItems);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTimelineItems();
    setIsRefreshing(false);
    toast({
      title: "Timeline refreshed",
      description: "The timeline has been updated with the latest changes.",
    });
  };

  const toggleChecklistItem = async (itemId: string) => {
    const itemToRemove = timelineItems.find(i => i.id === itemId);
    if (!itemToRemove) return;
    
    setTimelineItems(prevItems => prevItems.filter(i => i.id !== itemId));

    const { error } = await supabase
      .from('checklist_items')
      .update({ 
        completed: false,
        completed_at: null,
        completed_by: null
      })
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Error updating checklist item",
        description: error.message,
        variant: "destructive",
      });
      await fetchTimelineItems();
      return;
    }

    onChecklistUpdate();
    await fetchTimelineItems();
  };

  return {
    timelineItems,
    isRefreshing,
    fetchTimelineItems,
    handleRefresh,
    toggleChecklistItem
  };
};
