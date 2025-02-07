
import React from "react";
import { MessageSquare, CheckSquare } from "lucide-react";
import { TimelineItem } from "../../types/contact-details";

interface TimelineItemRendererProps {
  item: TimelineItem;
  onToggleChecklistItem: (itemId: string) => void;
}

const TimelineItemRenderer = ({ item, onToggleChecklistItem }: TimelineItemRendererProps) => {
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
  }

  return (
    <div className="flex items-start gap-2">
      <CheckSquare 
        className="h-4 w-4 mt-1 text-green-500 cursor-pointer" 
        onClick={() => onToggleChecklistItem(item.id)} 
      />
      <div className="flex-1">
        <p className="text-sm mb-2">Completed: {item.content}</p>
        <p className="text-xs text-gray-500">
          Stage: {item.stage} - Completed on {new Date(item.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TimelineItemRenderer;
