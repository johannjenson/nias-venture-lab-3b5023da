
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
  
  // If the status is approved or account-related, show as Approved
  const effectiveStatus = currentStatus === 'account_exists' || currentStatus === 'account_created' 
    ? 'approved' 
    : currentStatus;
  
  const currentStatusInfo = statuses.find(s => s.value === effectiveStatus) || statuses[0];
  const StatusIcon = currentStatusInfo.icon;

  const handleStatusUpdate = async (status: string) => {
    setIsLoading(true);
    try {
      await onUpdateStatus(status);
    } finally {
      setIsLoading(false);
    }
  };

  // If status is approved or account related, display as non-interactive button
  if (currentStatus === 'approved' || currentStatus === 'account_exists' || currentStatus === 'account_created') {
    return (
      <Button 
        variant="outline" 
        size="sm"
        disabled
        className={cn(
          "min-w-[140px] transition-all bg-gray-100",
          currentStatusInfo.color
        )}
        aria-label={`Current status: ${currentStatusInfo.label}`}
      >
        <StatusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        {currentStatusInfo.label}
      </Button>
    );
  }

  return (
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
  );
};
