
import { useState, useEffect } from "react";
import { ContactStage } from "../types/kanban";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from('checklist_items')
        .select('item_text')
        .is('contact_id', null)
        .eq('stage', stage);

      if (error) {
        console.error('Error fetching checklist items:', error);
        return;
      }

      setChecklistItems(data.map(item => item.item_text));
    };

    fetchDefaultChecklist();
  }, [stage]);

  return (
    <div className="mb-4">
      <h3 className="font-semibold">{label}</h3>
      <div className="mt-2 space-y-1">
        {checklistItems.map((item, index) => (
          <p key={index} className="text-sm text-gray-500">• {item}</p>
        ))}
      </div>
      <div className="flex items-center justify-end mt-2">
        <span className="text-sm text-gray-500">{count}</span>
      </div>
    </div>
  );
};

export default StageHeader;

