
import { Card } from "@/components/ui/card";
import { ChevronDown, Check, Clock, XCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EventRequest, RequestType } from "@/types/event-requests";
import { useState } from "react";

export const statuses = [
  { value: 'pending', label: 'Pending Review', icon: Clock, color: 'text-yellow-500' },
  { value: 'waitlist', label: 'Waitlist', icon: Users, color: 'text-blue-500' },
  { value: 'approved', label: 'Approved', icon: Check, color: 'text-green-500' },
  { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500' },
];

interface RequestCardProps {
  request: EventRequest;
  type: RequestType;
  onUpdateStatus: (requestId: number, status: string, type: RequestType) => Promise<void>;
}

export const RequestCard = ({ request, type, onUpdateStatus }: RequestCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const currentStatusInfo = statuses.find(s => s.value === request.request_status) || statuses[0];
  const StatusIcon = currentStatusInfo.icon;

  const handleStatusUpdate = async (status: string) => {
    setIsLoading(true);
    try {
      await onUpdateStatus(request.id, status, type);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-[1fr,1fr,2fr,1fr] gap-4 flex-1 mr-4">
          <div>
            <h4 className="font-medium">{request.name}</h4>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              disabled={isLoading}
              className={cn(
                "min-w-[140px] transition-all bg-gray-100",
                currentStatusInfo.color,
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              aria-label={`Current status: ${currentStatusInfo.label}. Click to change status`}
            >
              <StatusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {currentStatusInfo.label}
              <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statuses.map((status) => {
              const Icon = status.icon;
              return (
                <DropdownMenuItem
                  key={status.value}
                  onClick={() => handleStatusUpdate(status.value)}
                  className={cn(
                    "flex items-center gap-2 bg-gray-100 hover:bg-gray-200",
                    status.color
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {status.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {request.interests && (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Interests:</p>
          <p>{request.interests}</p>
        </div>
      )}
    </Card>
  );
};
