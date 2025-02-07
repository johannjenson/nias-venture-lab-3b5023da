
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCheck, MailOpen } from "lucide-react";
import { LeadEntry } from "../types/contact";
import { Button } from "@/components/ui/button";

interface LeadsTableProps {
  leads: LeadEntry[];
  onLeadClick: (lead: LeadEntry) => void;
  onCreateAccount: (lead: LeadEntry) => void;
}

const LeadsTable = ({ leads, onLeadClick, onCreateAccount }: LeadsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow 
            key={lead.id}
            className="cursor-pointer hover:bg-muted/50"
          >
            <TableCell onClick={() => onLeadClick(lead)}>
              <div className="flex items-center gap-2">
                {lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`}
                {lead.has_account && (
                  <UserCheck 
                    className="h-4 w-4 text-green-500" 
                    aria-label="Has user account" 
                  />
                )}
              </div>
            </TableCell>
            <TableCell onClick={() => onLeadClick(lead)}>{lead.title}</TableCell>
            <TableCell onClick={() => onLeadClick(lead)}>{lead.email}</TableCell>
            <TableCell onClick={() => onLeadClick(lead)}>{lead.company}</TableCell>
            <TableCell onClick={() => onLeadClick(lead)}>{lead.industry}</TableCell>
            <TableCell onClick={() => onLeadClick(lead)} className="max-w-xs truncate">
              {lead.additional_info}
            </TableCell>
            <TableCell onClick={() => onLeadClick(lead)}>
              {lead.type === 'contact' ? lead.stage : lead.request_status}
            </TableCell>
            <TableCell>
              {!lead.has_account && lead.type === 'membership' && lead.request_status === 'approved' && (
                <Button
                  onClick={() => onCreateAccount(lead)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  <MailOpen className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
