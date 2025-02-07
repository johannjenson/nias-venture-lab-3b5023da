
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const statuses = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'waitlist', label: 'Waitlist' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

interface MembershipStatusButtonProps {
  currentStatus: string | null;
  onUpdateStatus: (status: string) => Promise<void>;
}

export const MembershipStatusButton = ({ currentStatus, onUpdateStatus }: MembershipStatusButtonProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        {currentStatus || 'Pending'} <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {statuses.map((status) => (
        <DropdownMenuItem
          key={status.value}
          onClick={() => onUpdateStatus(status.value)}
        >
          {status.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
