
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RequestDetailsDialogProps } from "./types/request-details";
import { useRequestStatus } from "./hooks/useRequestStatus";
import { usePipelineMovement } from "./hooks/usePipelineMovement";
import { useRequestDeletion } from "./hooks/useRequestDeletion";
import { RequestDetailsForm } from "./components/request-details/RequestDetailsForm";
import { RequestControls } from "./components/request-details/RequestControls";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";
import { IndustryType } from "./types/contact";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MailOpen } from "lucide-react";

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

  const handleCreateAccount = async () => {
    if (!request.email || !request.first_name || !request.last_name) {
      toast({
        title: "Missing Information",
        description: "First name, last name and email are required to create an account",
        variant: "destructive",
      });
      return;
    }

    // Check if email is from zid.sa domain
    if (request.email.endsWith('@zid.sa')) {
      toast({
        title: "Cannot Create Account",
        description: "Accounts cannot be created for @zid.sa email addresses",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('create-approved-member', {
        body: {
          requestId: request.id,
          email: request.email,
          firstName: request.first_name,
          lastName: request.last_name,
        },
      });

      if (error) throw error;

      toast({
        title: "Account Created",
        description: "User account has been created and an email has been sent with login instructions",
      });

      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error Creating Account",
        description: error.message || "An error occurred while creating the account",
        variant: "destructive",
      });
    }
  };

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
            {type === 'membership' && status === 'approved' && (
              <Button 
                onClick={handleCreateAccount}
                variant="secondary"
                className="flex-1"
              >
                <MailOpen className="w-4 h-4 mr-2" />
                Invite to Create Account
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
