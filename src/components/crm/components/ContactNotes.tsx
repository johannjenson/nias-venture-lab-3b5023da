
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "../types/contact-details";

interface ContactNotesProps {
  notes: Note[];
  newNote: string;
  onNewNoteChange: (value: string) => void;
  onAddNote: () => void;
}

const ContactNotes = ({ notes, newNote, onNewNoteChange, onAddNote }: ContactNotesProps) => {
  return (
    <div>
      <h4 className="font-medium mb-4">Notes</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
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
