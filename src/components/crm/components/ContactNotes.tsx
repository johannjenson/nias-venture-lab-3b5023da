
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

  const getActualContactId = async (prefixedId: string) => {
    if (prefixedId.startsWith('event_')) {
      const eventId = prefixedId.replace('event_', '');
      const { data: eventRequest } = await supabase
        .from('event_requests')
        .select('uuid_id')
        .eq('id', eventId)
        .single();
      return eventRequest?.uuid_id;
    }
    return prefixedId;
  };

  React.useEffect(() => {
    fetchTimelineItems();
  }, [contactId]);

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
        profiles (
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
      completed: true,
      completed_by: item.profiles
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

    const actualContactId = await getActualContactId(contactId);
    if (!actualContactId) {
      toast({
        title: "Error adding note",
        description: "Could not find the contact ID",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('contact_notes')
      .insert({
        contact_id: actualContactId,
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
      await fetchTimelineItems(); // Refresh if there was an error
      return;
    }

    onChecklistUpdate();
    await fetchTimelineItems(); // Always refresh after successful toggle
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
