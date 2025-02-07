
import { supabase } from "@/integrations/supabase/client";
import { DinnerFormData } from "./types";

export const submitDinnerInvite = async (formData: DinnerFormData) => {
  const { error } = await supabase
    .from('dinner_invites')
    .insert([
      {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
      }
    ]);

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
  }
};
