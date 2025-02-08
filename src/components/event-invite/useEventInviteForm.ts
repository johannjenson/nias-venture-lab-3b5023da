
import { useState } from "react";
import { EventFormData } from "./types";
import { submitEventInvite } from "./eventInviteService";
import { toast } from "sonner";

const initialFormData: EventFormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  company: "",
  title: "",
  interests: "",
};

export const useEventInviteForm = (onOpenChange: (open: boolean) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitEventInvite(formData);
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

  return {
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
    setFormData
  };
};
