
import { supabase } from "@/integrations/supabase/client";
import { MembershipRequest } from "../hooks/useMembershipRequests";

export const updateRequestStatus = async (
  requestId: string,
  status: string,
  request: MembershipRequest
) => {
  if (status === 'approved') {
    if (!request.email || !request.first_name) {
      throw new Error("Missing required information for account creation");
    }

    // Create user account
    const { data, error: createAccountError } = await supabase.functions.invoke('create-approved-member', {
      body: {
        requestId,
        email: request.email,
        firstName: request.first_name,
        lastName: request.last_name || '',
      },
    });

    if (createAccountError) {
      throw createAccountError;
    }

    // If account already exists, we don't need to send the approval email
    if (data?.status === 'account_exists') {
      return;
    }

    // Send status notification email
    const { error: emailError } = await supabase.functions.invoke('send-membership-status', {
      body: {
        requestId,
        status: 'approved',
        recipient: {
          email: request.email,
          firstName: request.first_name,
          lastName: request.last_name,
        },
      },
    });

    if (emailError) {
      console.error('Error sending status notification:', emailError);
    }
  } else {
    // For other status updates
    const { error: updateError } = await supabase
      .from('membership_requests')
      .update({ request_status: status })
      .eq('id', requestId);

    if (updateError) {
      throw updateError;
    }

    // Send status notification for waitlist and rejected statuses
    if (['waitlist', 'rejected'].includes(status)) {
      const { error: emailError } = await supabase.functions.invoke('send-membership-status', {
        body: {
          requestId,
          status: status as 'waitlist' | 'rejected',
          recipient: {
            email: request.email,
            firstName: request.first_name,
            lastName: request.last_name,
          },
        },
      });

      if (emailError) {
        console.error('Error sending status notification:', emailError);
      }
    }
  }
};
