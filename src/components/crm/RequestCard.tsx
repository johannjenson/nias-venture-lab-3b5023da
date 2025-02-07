
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventRequest, RequestType } from "@/types/event-requests";

export const statuses = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'waitlist', label: 'Waitlist' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

interface RequestCardProps {
  request: EventRequest;
  type: RequestType;
  onUpdateStatus: (requestId: string, status: string, type: RequestType) => Promise<void>;
}

export const RequestCard = ({ request, type, onUpdateStatus }: RequestCardProps) => (
  <Card className="p-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-medium">{request.name}</h4>
        <p className="text-sm text-gray-500">{request.company}</p>
        <p className="text-sm text-gray-600">{request.title}</p>
        <p className="text-sm text-gray-500 truncate">{request.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {request.request_status || 'Pending'} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => onUpdateStatus(request.id, status.value, type)}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    {request.interests && (
      <div className="text-sm text-gray-600">
        <p className="font-medium">Interests:</p>
        <p>{request.interests}</p>
      </div>
    )}
  </Card>
);
