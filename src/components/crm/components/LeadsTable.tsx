
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserCheck } from "lucide-react";
import { LeadEntry } from "../types/contact";

interface LeadsTableProps {
  leads: LeadEntry[];
  onLeadClick: (lead: LeadEntry) => void;
}

const LeadsTable = ({ leads, onLeadClick }: LeadsTableProps) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow 
            key={lead.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onLeadClick(lead)}
          >
            <TableCell>
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
            <TableCell>{lead.title}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{lead.company}</TableCell>
            <TableCell>{lead.industry}</TableCell>
            <TableCell className="max-w-xs truncate">
              {lead.additional_info}
            </TableCell>
            <TableCell>
              {lead.type === 'contact' ? lead.stage : lead.request_status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeadsTable;
