
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelineItem } from "../../types/contact-details";
import TimelineItemRenderer from "./TimelineItemRenderer";

interface TimelineProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  timelineItems: TimelineItem[];
  onToggleChecklistItem: (itemId: string) => void;
}

const Timeline = ({
  isOpen,
  onOpenChange,
  isRefreshing,
  onRefresh,
  timelineItems,
  onToggleChecklistItem
}: TimelineProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange} className="mt-4">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex-1 flex justify-between mr-2">
            <span>Timeline</span>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <CollapsibleContent className="mt-4">
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {timelineItems.map((item) => (
              <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                <TimelineItemRenderer 
                  item={item}
                  onToggleChecklistItem={onToggleChecklistItem}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Timeline;
