
import { Button } from "@/components/ui/button";
import { ChevronDown, Check, Clock, XCircle, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const statuses = [
  { value: 'pending', label: 'Pending Review', icon: Clock, color: 'text-yellow-500' },
  { value: 'waitlist', label: 'Waitlist', icon: Users, color: 'text-blue-500' },
  { value: 'approved', label: 'Approved', icon: Check, color: 'text-green-500' },
  { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500' },
];

interface MembershipStatusButtonProps {
  currentStatus: string | null;
  onUpdateStatus: (status: string) => Promise<void>;
}

export const MembershipStatusButton = ({ currentStatus, onUpdateStatus }: MembershipStatusButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const currentStatusInfo = statuses.find(s => s.value === currentStatus) || statuses[0];
  const StatusIcon = currentStatusInfo.icon;

  const handleStatusUpdate = async (status: string) => {
    setIsLoading(true);
    try {
      await onUpdateStatus(status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={isLoading}
          className={cn(
            "min-w-[140px] transition-all",
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
                "flex items-center gap-2",
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
  );
};

