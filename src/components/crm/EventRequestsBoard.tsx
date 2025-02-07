
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestCard } from "./RequestCard";
import { useEventRequests } from "@/hooks/use-event-requests";

const EventRequestsBoard = () => {
  const { dinnerRequests, forumRequests, updateRequestStatus } = useEventRequests();

  return (
    <div className="space-y-4">
      <Tabs defaultValue="dinner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dinner">Dinner Requests</TabsTrigger>
          <TabsTrigger value="forum">Forum Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="dinner">
          <div className="grid gap-4">
            {dinnerRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                type="dinner"
                onUpdateStatus={updateRequestStatus}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <div className="grid gap-4">
            {forumRequests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                type="forum"
                onUpdateStatus={updateRequestStatus}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventRequestsBoard;
