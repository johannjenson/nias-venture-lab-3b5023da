
import React from "react";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";

type ContactStage = Database["public"]["Enums"]["contact_stage"];

interface StageSelectorProps {
  currentStage: ContactStage;
  onStageChange: (stage: ContactStage) => void;
}

const stages: { id: ContactStage; label: string }[] = [
  { id: 'mql_lead', label: 'MQL Lead' },
  { id: 'sql_qualification', label: 'SQL Qualification' },
  { id: 'sqo_discovery', label: 'SQO Discovery' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'closed_won', label: 'Closed Won' },
  { id: 'closed_lost', label: 'Closed Lost' },
];

const StageSelector = ({ currentStage, onStageChange }: StageSelectorProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Stage</h4>
      <div className="space-y-2">
        {stages.map((stage) => (
          <Button
            key={stage.id}
            variant={currentStage === stage.id ? "default" : "outline"}
            size="sm"
            className="w-full justify-start"
            onClick={() => onStageChange(stage.id)}
          >
            {stage.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StageSelector;
