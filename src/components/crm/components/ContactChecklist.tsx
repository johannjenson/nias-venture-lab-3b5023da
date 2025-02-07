
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChecklistItem } from "../types/contact-details";

interface ContactChecklistProps {
  checklist: ChecklistItem[];
  onToggleItem: (itemId: string, completed: boolean) => void;
}

const ContactChecklist = ({ checklist, onToggleItem }: ContactChecklistProps) => {
  return (
    <div>
      <h4 className="font-medium mb-4">Stage Checklist</h4>
      <div className="space-y-3">
        {checklist.map((item) => (
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
              className={`text-sm ${
                item.completed ? "text-gray-500 line-through" : ""
              }`}
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
