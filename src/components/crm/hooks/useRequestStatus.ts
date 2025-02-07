
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { IndustryType } from "../types/contact";

interface UseRequestStatusProps {
  requestId: number;
  type: 'membership' | 'event';
  onUpdate: () => void;
  initialStatus?: string;
  initialIndustry?: IndustryType | null;
}

export const useRequestStatus = ({ 
  requestId, 
  type, 
  onUpdate,
  initialStatus = 'pending',
  initialIndustry = null
}: UseRequestStatusProps) => {
  const [status, setStatus] = useState<string>(initialStatus);
  const [industry, setIndustry] = useState<IndustryType | null>(initialIndustry);
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    const table = type === 'membership' ? 'Request' : 'event_requests';
    const { error } = await supabase
      .from(table)
      .update({ request_status: newStatus })
      .eq('id', requestId);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setStatus(newStatus);
    onUpdate();

    toast({
      title: "Status updated",
      description: `Request status updated to ${newStatus}`,
    });
  };

  const handleIndustryChange = async (newIndustry: IndustryType) => {
    const table = type === 'membership' ? 'Request' : 'event_requests';
    
    const { error } = await supabase
      .from(table)
      .update({ industry: newIndustry })
      .eq('id', requestId);

    if (error) {
      toast({
        title: "Error updating industry",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setIndustry(newIndustry);
    onUpdate();

    toast({
      title: "Industry updated",
      description: `Industry updated to ${newIndustry}`,
    });
  };

  return {
    status,
    setStatus,
    industry,
    setIndustry,
    handleStatusChange,
    handleIndustryChange,
  };
};
