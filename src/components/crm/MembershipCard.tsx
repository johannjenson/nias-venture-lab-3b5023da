
import { Card } from "@/components/ui/card";
import { MembershipStatusButton } from "./MembershipStatusButton";

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

export const MembershipCard = ({ request, onUpdateStatus }: MembershipCardProps) => (
  <Card className="p-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-medium">
          {request.first_name} {request.last_name}
        </h4>
        <p className="text-sm text-gray-500">{request.company}</p>
        <p className="text-sm text-gray-600">{request.title}</p>
        <p className="text-sm text-gray-500 truncate">{request.email}</p>
      </div>
      <MembershipStatusButton
        currentStatus={request.request_status}
        onUpdateStatus={(status) => onUpdateStatus(request.id, status)}
      />
    </div>
    {(request.linkedin_url || request.referred_by || request.additional_info) && (
      <div className="space-y-2 text-sm text-gray-600">
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
