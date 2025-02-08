
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useActualContactId } from "./useActualContactId";

export const useNotes = (contactId: string, onNoteAdded: () => void) => {
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();
  const getActualContactId = useActualContactId();

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
    onNoteAdded();
  };

  return {
    newNote,
    setNewNote,
    addNote
  };
};

