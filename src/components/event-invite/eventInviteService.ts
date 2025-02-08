
import { supabase } from "@/integrations/supabase/client";
import { EventFormData } from "./types";
import { toast } from "sonner";

export const submitEventInvite = async (formData: EventFormData) => {
  const { error } = await supabase
    .from('event_requests')
    .insert({
      name: formData.fullName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      company: formData.company,
      title: formData.title,
      interests: formData.interests,
      event_type: 'forum'
    });

  if (error) throw error;

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
};
