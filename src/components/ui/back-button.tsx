import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-24 md:top-20 left-4 z-50"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};