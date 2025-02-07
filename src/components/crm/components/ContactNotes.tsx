
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Note } from "../types/contact-details";

interface ContactNotesProps {
  contactId: string;
}

const ContactNotes = ({ contactId }: ContactNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  React.useEffect(() => {
    fetchNotes();
  }, [contactId]);

  const fetchNotes = async () => {
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

    setNotes(notesData);
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
    fetchNotes();
  };

  return (
    <div>
      <h4 className="font-medium mb-4">Notes</h4>
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
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm mb-2">{note.content}</p>
              <p className="text-xs text-gray-500">
                Added by {note.profiles?.first_name && note.profiles?.last_name 
                  ? `${note.profiles.first_name} ${note.profiles.last_name}`
                  : note.profiles?.email} on {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactNotes;

