
import { useToast } from "@/components/ui/use-toast";
import { createContactAndUpdateRequest } from "../services/pipelineService";

interface UsePipelineMovementProps {
  request: any;
  type: 'membership' | 'event';
  onUpdate: () => void;
  onOpenChange: (open: boolean) => void;
  status: string;
}

export const usePipelineMovement = ({
  request,
  type,
  onUpdate,
  onOpenChange,
  status
}: UsePipelineMovementProps) => {
  const { toast } = useToast();

  const handleMoveToContact = async () => {
    if (status !== 'approved') {
      toast({
        title: "Cannot move to pipeline",
        description: "Request must be approved first",
        variant: "destructive",
      });
      return;
    }

    // Determine first and last name based on request type
    let firstName, lastName;
    if (type === 'membership') {
      firstName = request.first_name;
      lastName = request.last_name;
    } else {
      const nameParts = request.name?.split(' ') || [];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    try {
      await createContactAndUpdateRequest(
        Number(request.id),
        {
          first_name: firstName,
          last_name: lastName,
          email: request.email,
          phone_number: request.phone_number,
          company: request.company,
          title: request.title,
          industry: request.industry,
          linkedin_url: request.linkedin_url,
          source: type === 'membership' ? 'network_request' : 'event_request',
          source_id: request.id.toString(),
          stage: 'mql_lead'
        },
        type
      );

      toast({
        title: "Success",
        description: "Request has been moved to the pipeline",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error in handleMoveToContact:', error);
      toast({
        title: "Error moving to pipeline",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { handleMoveToContact };
};

