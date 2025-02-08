
import { supabase } from "@/integrations/supabase/client";
import { DinnerFormData } from "./types";

export const submitDinnerInvite = async (formData: DinnerFormData) => {
  // Insert the event request into the database
  const { error } = await supabase
    .from('event_requests')
    .insert({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      title: formData.role,
      phone_number: formData.phoneNumber,
      interests: formData.interests,
      event_type: 'dinner'
    });

  if (error) throw error;

  // Send confirmation email
  const { error: emailError } = await supabase.functions.invoke('send-event-confirmation', {
    body: {
      eventType: 'dinner',
      fullName: formData.name,
      email: formData.email,
      company: formData.company,
    },
  });

  if (emailError) {
    console.error('Error sending confirmation email:', emailError);
    throw emailError;
  }
};
