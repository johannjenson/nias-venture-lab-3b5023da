
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RequestDetailsDialogProps } from "./types/request-details";
import { stages } from "./types/kanban";

interface RequestDetailsFormProps {
  request: RequestDetailsDialogProps['request'];
  type: RequestDetailsDialogProps['type'];
}

export const RequestDetailsForm = ({ request, type }: RequestDetailsFormProps) => {
  const currentStage = stages.find(stage => stage.id === request.request_status);

  return (
    <div className="grid gap-4">
      {type === 'membership' ? (
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
      ) : (
        <div>
          <Label>Name</Label>
          <Input value={request.name || ''} readOnly />
        </div>
      )}

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

      <div>
        <Label>Status</Label>
        <div className="mt-1">
          <Badge variant={request.request_status === 'closed_won' ? 'default' : 'secondary'}>
            {currentStage?.label || request.request_status || 'Pending'}
          </Badge>
        </div>
      </div>
    </div>
  );
};

