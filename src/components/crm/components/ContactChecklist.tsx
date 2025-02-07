
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChecklistItem } from "../types/contact-details";

interface ContactChecklistProps {
  checklist: ChecklistItem[];
  onToggleItem: (itemId: string, completed: boolean) => void;
}

const ContactChecklist = ({ checklist, onToggleItem }: ContactChecklistProps) => {
  // Only show uncompleted items
  const uncompletedItems = checklist.filter(item => !item.completed);

  return (
    <div>
      <h4 className="font-medium mb-4">Current Stage Checklist</h4>
      <div className="space-y-3">
        {uncomplletedItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={(checked) => 
                onToggleItem(item.id, checked as boolean)
              }
            />
            <label
              htmlFor={item.id}
              className="text-sm"
            >
              {item.item_text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactChecklist;

