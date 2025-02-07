
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { RequestDetailsDialogProps } from "./types/request-details";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { IndustryType } from "./types/contact";
import { RequestDetailsForm } from "./components/request-details/RequestDetailsForm";
import { RequestControls } from "./components/request-details/RequestControls";
import { DeleteRequestDialog } from "./components/request-details/DeleteRequestDialog";

const RequestDetailsDialog = ({ 
  request, 
  type,
  open, 
  onOpenChange,
  onUpdate 
}: RequestDetailsDialogProps) => {
  const [status, setStatus] = useState(request.request_status || 'pending');
  const [industry, setIndustry] = useState<IndustryType | ''>(request.industry as IndustryType || '');
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    const table = type === 'membership' ? 'Request' : 'event_requests';
    const { error } = await supabase
      .from(table)
      .update({ request_status: newStatus })
      .eq('id', parseInt(request.id));

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
      .eq('id', parseInt(request.id));

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
      // For event requests, split the full name
      const nameParts = request.name?.split(' ') || [];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    // Update the moved_to_pipeline flag
    const table = type === 'membership' ? 'Request' : 'event_requests';
    const { error: updateError } = await supabase
      .from(table)
      .update({ moved_to_pipeline: true })
      .eq('id', parseInt(request.id));

    if (updateError) {
      toast({
        title: "Error updating request",
        description: updateError.message,
        variant: "destructive",
      });
      return;
    }

    // Insert into contacts table
    const { error: contactError } = await supabase
      .from('contacts')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: request.email,
          phone: request.phone_number,
          company: request.company,
          title: request.title,
          industry: request.industry,
          linkedin_url: request.linkedin_url,
          source: type === 'membership' ? 'network_request' : 'event_request',
          source_id: request.id.toString(),
          stage: 'mql_lead'
        }
      ]);

    if (contactError) {
      toast({
        title: "Error creating contact",
        description: contactError.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Request has been moved to the pipeline",
    });

    onUpdate();
    onOpenChange(false);
  };

  const handleDelete = async () => {
    const table = type === 'membership' ? 'Request' : 'event_requests';
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', parseInt(request.id));

    if (error) {
      toast({
        title: "Error deleting request",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request deleted",
      description: "The request has been successfully deleted",
    });

    onOpenChange(false);
    onUpdate();
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

          <div className="flex justify-end pt-4">
            <DeleteRequestDialog onDelete={handleDelete} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
