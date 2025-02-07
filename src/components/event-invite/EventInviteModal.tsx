
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EventInviteModalProps, EventFormData } from "./types";
import EventInviteForm from "./EventInviteForm";

const initialFormData: EventFormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  company: "",
  title: "",
  industry: "manufacturing",
  interests: "",
};

const EventInviteModal = ({ open, onOpenChange }: EventInviteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('event_requests')
        .insert({
          name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          company: formData.company,
          title: formData.title,
          industry: formData.industry,
          interests: formData.interests,
          event_type: 'forum'
        });

      if (error) throw error;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-event-confirmation', {
        body: {
          eventType: 'forum',
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
        },
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      toast.success("Thank you for your interest in the Nias Business Forum. We'll review your application and be in touch soon!");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">Join Us in Riyadh</DialogTitle>
          <DialogDescription>
            Request your invitation to the Nias Business Forum on February 20th, 2024.
          </DialogDescription>
        </DialogHeader>
        <EventInviteForm
          formData={formData}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onTitleChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
          onIndustryChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventInviteModal;
