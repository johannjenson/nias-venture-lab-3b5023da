
import React from "react";
import { Contact } from "../types/contact-details";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { EnvelopeOpenIcon } from "lucide-react";

interface ContactInfoProps {
  contact: Contact;
}

const ContactInfo = ({ contact }: ContactInfoProps) => {
  const handleInvite = async () => {
    // First update the contact status
    const { error: updateError } = await supabase
      .from('contacts')
      .update({
        invitation_sent_at: new Date().toISOString(),
        invitation_status: 'pending'
      })
      .eq('id', contact.id);

    if (updateError) {
      toast.error("Error updating contact status");
      return;
    }

    // Send the invitation email
    const { error: inviteError } = await supabase.functions.invoke('send-account-invitation', {
      body: {
        email: contact.email,
        firstName: contact.first_name,
        lastName: contact.last_name
      }
    });

    if (inviteError) {
      toast.error("Error sending invitation");
      return;
    }

    toast.success("Invitation sent successfully!");
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Contact Details</h4>
      <div className="space-y-2 text-sm">
        <p><span className="text-gray-500">Company:</span> {contact.company}</p>
        <p><span className="text-gray-500">Title:</span> {contact.title}</p>
        <p><span className="text-gray-500">Email:</span> {contact.email}</p>
        <div className="pt-4">
          <Button
            onClick={handleInvite}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={contact.invitation_status === 'sent'}
          >
            <EnvelopeOpenIcon className="w-4 h-4 mr-2" />
            {contact.invitation_status === 'sent' ? 'Invitation Sent' : 'Invite to Create Account'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
