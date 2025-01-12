import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="mt-4 ml-4"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};