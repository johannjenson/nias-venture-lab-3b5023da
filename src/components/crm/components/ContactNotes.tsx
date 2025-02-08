
import React, { useState, useEffect } from "react";
import { useTimeline } from "../hooks/useTimeline";
import { useNotes } from "../hooks/useNotes";
import AddNoteForm from "./notes/AddNoteForm";
import Timeline from "./notes/Timeline";

interface ContactNotesProps {
  contactId: string;
  onChecklistUpdate: () => void;
}

const ContactNotes = ({ contactId, onChecklistUpdate }: ContactNotesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    timelineItems,
    isRefreshing,
    fetchTimelineItems,
    handleRefresh,
    toggleChecklistItem
  } = useTimeline(contactId, onChecklistUpdate);

  const {
    newNote,
    setNewNote,
    addNote
  } = useNotes(contactId, fetchTimelineItems);

  useEffect(() => {
    fetchTimelineItems();
  }, [contactId]);

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

