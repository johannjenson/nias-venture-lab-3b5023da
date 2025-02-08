
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMembershipRequests } from "./hooks/useMembershipRequests";
import { updateRequestStatus } from "./services/membershipRequestService";
import { MembershipRequestsList } from "./components/MembershipRequestsList";

const MembershipRequestsBoard = () => {
  const { requests, filterRequests, fetchRequests } = useMembershipRequests();
  const { toast } = useToast();

  const handleUpdateStatus = async (requestId: string, status: string) => {
    try {
      const request = requests.find(r => r.id === requestId);
      if (!request) {
        throw new Error('Request not found');
      }

      await updateRequestStatus(requestId, status, request);
      
      toast({
        title: "Status updated",
        description: `Request status has been updated to ${status}`,
      });

      fetchRequests();
    } catch (error: any) {
      toast({
        title: "Error updating request status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 bg-[#F5F2EB] p-6 rounded-lg">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MembershipRequestsList 
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
          />
        </TabsContent>

        {['pending', 'waitlist', 'approved', 'rejected'].map(status => (
          <TabsContent key={status} value={status}>
            <MembershipRequestsList 
              requests={filterRequests(status)}
              onUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MembershipRequestsBoard;
