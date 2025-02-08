
import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { ContactStage } from "../types/kanban";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StageHeaderProps {
  label: string;
  description: string;
  count: number;
  stage: ContactStage;
}

const StageHeader = ({ label, count, stage }: StageHeaderProps) => {
  const [checklistItems, setChecklistItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchDefaultChecklist = async () => {
      try {
        const { data, error } = await supabase
          .from('checklist_items')
          .select('item_text')
          .is('contact_id', null)
          .eq('stage', stage);

        if (error) {
          console.error('Error fetching checklist items:', error);
          return;
        }

        if (data) {
          setChecklistItems(data.map(item => item.item_text));
        }
      } catch (error) {
        console.error('Error in fetchDefaultChecklist:', error);
      }
    };

    fetchDefaultChecklist();
  }, [stage]);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">{label}</h3>
        {checklistItems.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  {checklistItems.map((item, index) => (
                    <p key={index} className="text-sm">• {item}</p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center justify-end mt-2">
        <span className="text-sm text-gray-500">{count}</span>
      </div>
    </div>
  );
};

export default StageHeader;

