
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TimelineItem } from "../types/contact-details";
import { MessageSquare, CheckSquare, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactNotesProps {
  contactId: string;
  onChecklistUpdate: () => void;
}

const ContactNotes = ({ contactId, onChecklistUpdate }: ContactNotesProps) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
    // Get the item details before updating
    const item = timelineItems.find(item => item.id === itemId);
    
    // First update the local state to remove the item from the timeline
    setTimelineItems(prevItems => prevItems.filter(i => i.id !== itemId));

    // Then update the database
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
      // If there was an error, refresh the timeline to ensure accurate state
      await fetchTimelineItems();
      return;
    }

    onChecklistUpdate();  // Refresh the checklist in the parent component
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
          <CheckSquare className="h-4 w-4 mt-1 text-green-500 cursor-pointer" onClick={() => toggleChecklistItem(item.id)} />
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

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between">
            <span>Timeline</span>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {timelineItems.map((item) => (
                <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                  {renderTimelineItem(item)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ContactNotes;

