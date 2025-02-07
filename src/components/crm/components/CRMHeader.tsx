
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CRMHeaderProps {
  onAddLead: () => void;
}

const CRMHeader = ({ onAddLead }: CRMHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-transparent"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Relationship Management</h1>
        </div>
        <Button onClick={onAddLead}>
          <Plus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </div>
    </div>
  );
};

export default CRMHeader;

