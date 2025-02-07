
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddNoteFormProps {
  newNote: string;
  onNoteChange: (note: string) => void;
  onAddNote: () => void;
}

const AddNoteForm = ({ newNote, onNoteChange, onAddNote }: AddNoteFormProps) => {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Add a note..."
        value={newNote}
        onChange={(e) => onNoteChange(e.target.value)}
        className="min-h-[100px]"
      />
      <Button 
        onClick={onAddNote}
        disabled={!newNote.trim()}
        className="w-full"
      >
        Add Note
      </Button>
    </div>
  );
};

export default AddNoteForm;
