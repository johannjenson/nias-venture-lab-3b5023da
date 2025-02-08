
import { MembershipCard } from "../MembershipCard";
import { MembershipRequest } from "../hooks/useMembershipRequests";

interface MembershipRequestsListProps {
  requests: MembershipRequest[];
  onUpdateStatus: (requestId: string, status: string) => Promise<void>;
}

export const MembershipRequestsList = ({ requests, onUpdateStatus }: MembershipRequestsListProps) => {
  return (
    <div className="grid gap-4">
      {requests.map(request => (
        <MembershipCard 
          key={request.id} 
          request={request}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};
