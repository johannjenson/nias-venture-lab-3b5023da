
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Note, TimelineItem } from "../types/contact-details";
import { MessageSquare, CheckSquare } from "lucide-react";

interface ContactNotesProps {
  contactId: string;
}

const ContactNotes = ({ contactId }: ContactNotesProps) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  React.useEffect(() => {
    fetchTimelineItems();
  }, [contactId]);

  const fetchTimelineItems = async () => {
    // Fetch notes
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

    // Fetch completed checklist items
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

    // Convert notes to timeline items
    const noteItems: TimelineItem[] = notesData.map((note): TimelineItem => ({
      id: note.id,
      type: 'note',
      timestamp: note.created_at,
      content: note.content,
      user: note.profiles
    }));

    // Convert checklist items to timeline items
    const checklistItems: TimelineItem[] = checklistData.map((item): TimelineItem => ({
      id: item.id,
      type: 'checklist',
      timestamp: item.completed_at!,
      content: item.item_text,
      stage: item.stage
    }));

    // Combine and sort all timeline items by timestamp
    const allItems = [...noteItems, ...checklistItems].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setTimelineItems(allItems);
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
    fetchTimelineItems();
  };

  const renderTimelineItem = (item: TimelineItem) => {
    if (item.type === 'note') {
      return (
        <div className="flex items-start gap-2">
          <MessageSquare className="h-4 w-4 mt-1 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm mb-2">{item.content}</p>
            <p className="text-xs text-gray-500">
              Added by {item.user?.first_name && item.user?.last_name 
                ? `${item.user.first_name} ${item.user.last_name}`
                : item.user?.email} on {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-start gap-2">
          <CheckSquare className="h-4 w-4 mt-1 text-green-500" />
          <div className="flex-1">
            <p className="text-sm mb-2">Completed: {item.content}</p>
            <p className="text-xs text-gray-500">
              Stage: {item.stage} - Completed on {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-4">Timeline</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={addNote}
            disabled={!newNote.trim()}
            className="w-full"
          >
            Add Note
          </Button>
        </div>

        <div className="space-y-3">
          {timelineItems.map((item) => (
            <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
              {renderTimelineItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactNotes;

