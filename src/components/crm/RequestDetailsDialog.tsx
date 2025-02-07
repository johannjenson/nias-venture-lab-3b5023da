import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RequestDetailsDialogProps } from "./types/request-details";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { industryTypes, IndustryType } from "./types/contact";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

const RequestDetailsDialog = ({ 
  request, 
  type,
  open, 
  onOpenChange,
  onUpdate 
}: RequestDetailsDialogProps) => {
  const [status, setStatus] = useState(request.request_status || 'pending');
  const [industry, setIndustry] = useState<IndustryType | ''>(request.industry || '');
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    const table = type === 'membership' ? 'Request' : 'EventRequest';
    const id = type === 'membership' ? 
      parseInt(request.id.replace('membership_', '')) : 
      parseInt(request.id.replace('event_', ''));

    const { error } = await supabase
      .from(table)
      .update({ request_status: newStatus })
      .eq('id', id);

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
    if (type !== 'event') return; // Only event requests have industry field

    const { error } = await supabase
      .from('EventRequest')
      .update({ industry: newIndustry })
      .eq('id', parseInt(request.id.replace('event_', '')));

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
      description: `Industry updated to ${industryTypes.find(i => i.id === newIndustry)?.label || newIndustry}`,
    });
  };

  const handleDelete = async () => {
    const table = type === 'membership' ? 'Request' : 'EventRequest';
    const id = type === 'membership' ? 
      parseInt(request.id.replace('membership_', '')) : 
      parseInt(request.id.replace('event_', ''));

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

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
          <DialogTitle>Request Details - {request.first_name} {request.last_name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input value={request.first_name || ''} readOnly />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input value={request.last_name || ''} readOnly />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input value={request.email || ''} readOnly />
          </div>

          <div>
            <Label>Phone</Label>
            <Input value={request.phone_number || ''} readOnly />
          </div>

          <div>
            <Label>Company</Label>
            <Input value={request.company || ''} readOnly />
          </div>

          <div>
            <Label>Title</Label>
            <Input value={request.title || ''} readOnly />
          </div>

          {request.linkedin_url && (
            <div>
              <Label>LinkedIn URL</Label>
              <Input value={request.linkedin_url} readOnly />
            </div>
          )}

          {request.interests && (
            <div>
              <Label>Interests</Label>
              <Textarea value={request.interests} readOnly />
            </div>
          )}

          {request.additional_info && (
            <div>
              <Label>Additional Information</Label>
              <Textarea value={request.additional_info} readOnly />
            </div>
          )}

          {request.referred_by && (
            <div>
              <Label>Referred By</Label>
              <Input value={request.referred_by} readOnly />
            </div>
          )}

          {type === 'event' && (
            <div>
              <Label>Industry</Label>
              <Select value={industry} onValueChange={handleIndustryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industryTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the request
                    from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
