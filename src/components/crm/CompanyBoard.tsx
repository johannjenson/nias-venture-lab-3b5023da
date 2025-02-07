
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LeadStage = Database["public"]["Enums"]["lead_stage"];

type Lead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  stage: LeadStage;
  expected_value: number | null;
  expected_close_date: string | null;
};

const stages: { id: LeadStage; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { id: 'proposal_sent', label: 'Proposal Sent' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'closed_won', label: 'Closed Won' },
  { id: 'closed_lost', label: 'Closed Lost' },
];

const CompanyBoard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel('leads_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'leads' 
      }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching leads",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setLeads(data || []);
  };

  const updateLeadStage = async (leadId: string, stage: LeadStage) => {
    const { error } = await supabase
      .from('leads')
      .update({ stage })
      .eq('id', leadId);

    if (error) {
      toast({
        title: "Error updating lead",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    fetchLeads();
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageLeads = leads.filter(l => l.stage === stage.id);
        
        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{stage.label}</h3>
                <span className="text-sm text-gray-500">
                  {stageLeads.length}
                </span>
              </div>
              <div className="space-y-4">
                {stageLeads.map(lead => (
                  <Card key={lead.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{lead.company}</h4>
                        <p className="text-sm text-gray-500">
                          {lead.first_name} {lead.last_name}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            {stage.label} <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {stages.map((s) => (
                            <DropdownMenuItem
                              key={s.id}
                              onClick={() => updateLeadStage(lead.id, s.id)}
                            >
                              {s.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">{lead.title}</p>
                      <p className="text-gray-500 truncate">{lead.email}</p>
                      {lead.expected_value && (
                        <p className="text-green-600 mt-2">
                          ${lead.expected_value.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyBoard;
