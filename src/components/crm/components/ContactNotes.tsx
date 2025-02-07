
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TimelineItem } from "../types/contact-details";
import AddNoteForm from "./notes/AddNoteForm";
import Timeline from "./notes/Timeline";

interface ContactNotesProps {
  contactId: string;
  onChecklistUpdate: () => void;
}

const ContactNotes = ({ contactId, onChecklistUpdate }: ContactNotesProps) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchTimelineItems();
  }, [contactId]);

  const fetchTimelineItems = async () => {
    const { data: notesData, error: notesError } = await supabase
      .from('contact_notes')
      .select(`
        *,
        profiles (
          email,
          first_name,
          last_name
        )
      `)
      .eq('contact_id', contactId)
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
      .select('*')
      .eq('contact_id', contactId)
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

    const noteItems: TimelineItem[] = notesData.map((note): TimelineItem => ({
      id: note.id,
      type: 'note',
      timestamp: note.created_at,
      content: note.content,
      user: note.profiles
    }));

    const checklistItems: TimelineItem[] = checklistData.map((item): TimelineItem => ({
      id: item.id,
      type: 'checklist',
      timestamp: item.completed_at!,
      content: item.item_text,
      stage: item.stage,
      completed: true
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

  const addNote = async () => {
    if (!newNote.trim()) return;

    const { error } = await supabase
      .from('contact_notes')
      .insert({
        contact_id: contactId,
        content: newNote.trim(),
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (error) {
      toast({
        title: "Error adding note",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewNote('');
    await fetchTimelineItems();
  };

  const toggleChecklistItem = async (itemId: string) => {
    setTimelineItems(prevItems => prevItems.filter(i => i.id !== itemId));

    const { error } = await supabase
      .from('checklist_items')
      .update({ 
        completed: false,
        completed_at: null
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
  };

  return (
    <div>
      <AddNoteForm
        newNote={newNote}
        onNoteChange={setNewNote}
        onAddNote={addNote}
      />
      <Timeline
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        timelineItems={timelineItems}
        onToggleChecklistItem={toggleChecklistItem}
      />
    </div>
  );
};

export default ContactNotes;
