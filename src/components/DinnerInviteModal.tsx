
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { DinnerInviteModalProps, DinnerFormData, IndustryType } from "./dinner-invite/types";
import DinnerInviteForm from "./dinner-invite/DinnerInviteForm";
import { submitDinnerInvite } from "./dinner-invite/dinnerInviteService";

const initialFormData: DinnerFormData = {
  name: "",
  phoneNumber: "",
  email: "",
  company: "",
  role: "",
  interests: "",
};

const DinnerInviteModal = ({ open, onOpenChange }: DinnerInviteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DinnerFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitDinnerInvite(formData);
      toast.success("Thank you for your interest in the Nias Network Dinner. We'll review your application and be in touch soon!");
      onOpenChange(false);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">Join us for Dinner</DialogTitle>
          <DialogDescription>
            Request your invitation to the Nias Network Dinner at LEAP on February 9th, 2025.
          </DialogDescription>
        </DialogHeader>
        <DinnerInviteForm
          formData={formData}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onRoleChange={handleRoleChange}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DinnerInviteModal;
