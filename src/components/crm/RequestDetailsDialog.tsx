
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RequestDetailsDialogProps } from "./types/request-details";
import { useRequestStatus } from "./hooks/useRequestStatus";
import { usePipelineMovement } from "./hooks/usePipelineMovement";
import { useRequestDeletion } from "./hooks/useRequestDeletion";
import { RequestDetailsForm } from "./components/request-details/RequestDetailsForm";
import { RequestControls } from "./components/request-details/RequestControls";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";
import { IndustryType } from "./types/contact";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const RequestDetailsDialog = ({ 
  request, 
  type,
  open, 
  onOpenChange,
  onUpdate 
}: RequestDetailsDialogProps) => {
  const { toast } = useToast();
  const {
    status,
    setStatus,
    industry,
    setIndustry,
    handleStatusChange,
    handleIndustryChange,
  } = useRequestStatus({
    requestId: Number(request.id),
    type,
    onUpdate,
    initialStatus: request.request_status || 'pending',
    initialIndustry: request.industry as IndustryType | null || null,
  });

  const { handleMoveToContact } = usePipelineMovement({
    request,
    type,
    onUpdate,
    onOpenChange,
    status,
  });

  const { handleDelete } = useRequestDeletion({
    requestId: Number(request.id),
    type,
    onUpdate,
    onOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Request Details - {type === 'membership' ? 
              `${request.first_name} ${request.last_name}` : 
              request.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <RequestDetailsForm request={request} type={type} />
          
          <RequestControls
            status={status}
            industry={industry}
            onStatusChange={handleStatusChange}
            onIndustryChange={handleIndustryChange}
            onMoveToContact={handleMoveToContact}
          />

          <div className="flex space-x-2 pt-4">
            <DeleteRequestDialog 
              contactId={request.id.toString()} 
              onDelete={handleDelete}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
