
import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { ContactStage } from "../types/kanban";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StageHeaderProps {
  label: string;
  description: string;
  count: number;
  stage: ContactStage;
}

const StageHeader = ({ label, count, stage }: StageHeaderProps) => {
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 p-0"
            onClick={() => setDialogOpen(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center justify-end mt-2">
        <span className="text-sm text-gray-500">{count}</span>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{label} Checklist</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {checklistItems.map((item, index) => (
              <p key={index} className="text-sm">• {item}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StageHeader;

