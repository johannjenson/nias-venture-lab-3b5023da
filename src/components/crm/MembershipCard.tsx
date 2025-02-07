
import { Card } from "@/components/ui/card";
import { MembershipStatusButton } from "./MembershipStatusButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface MembershipRequest {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  title: string | null;
  linkedin_url: string | null;
  referred_by: string | null;
  additional_info: string | null;
  request_status: string | null;
}

interface MembershipCardProps {
  request: MembershipRequest;
  onUpdateStatus: (requestId: string, status: string) => Promise<void>;
}

export const MembershipCard = ({ request, onUpdateStatus }: MembershipCardProps) => {
  const { toast } = useToast();

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      const oldStatus = request.request_status;
      
      // First update the status
      await onUpdateStatus(requestId, newStatus);

      // Only send notification if changing from pending to a different status
      if (oldStatus === 'pending' && ['approved', 'waitlist', 'rejected'].includes(newStatus)) {
        const { error } = await supabase.functions.invoke('send-membership-status', {
          body: {
            requestId,
            status: newStatus,
            recipient: {
              email: request.email,
              firstName: request.first_name,
              lastName: request.last_name
            }
          }
        });

        if (error) {
          console.error('Error sending status notification:', error);
          toast({
            title: "Error sending notification email",
            description: "The status was updated but we couldn't send the notification email.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the membership request status.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-[1fr,1fr,2fr,1fr] gap-4 flex-1 mr-4">
          <div>
            <h4 className="font-medium">
              {request.first_name} {request.last_name}
            </h4>
          </div>
          <div>
            <p className="text-sm text-gray-500">{request.company}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 truncate">{request.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{request.title}</p>
          </div>
        </div>
        <MembershipStatusButton
          currentStatus={request.request_status}
          onUpdateStatus={(status) => handleStatusUpdate(request.id, status)}
        />
      </div>
      {(request.linkedin_url || request.referred_by || request.additional_info) && (
        <div className="mt-4 space-y-2 text-sm text-gray-600 border-t pt-4">
          {request.linkedin_url && (
            <p>
              <span className="font-medium">LinkedIn:</span>{" "}
              <a href={request.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                View Profile
              </a>
            </p>
          )}
          {request.referred_by && (
            <p>
              <span className="font-medium">Referred by:</span> {request.referred_by}
            </p>
          )}
          {request.additional_info && (
            <div>
              <p className="font-medium">Additional Information:</p>
              <p>{request.additional_info}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
