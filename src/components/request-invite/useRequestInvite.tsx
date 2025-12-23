
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormData } from "./types";
import { IndustryType } from "../crm/types/contact";
import { PostgrestError } from "@supabase/supabase-js";
import { trackFormSubmit, trackFormStep, trackConversion } from "@/lib/analytics";

const initialFormData: FormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  company: "",
  title: "",
  industry: "technology",
  linkedinUrl: "",
  referredBy: "",
  additionalInfo: "",
};

export const useRequestInvite = (onCloseModal: (open: boolean) => void) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      const { error: dbError } = await supabase
        .from('Request')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            company: formData.company,
            title: formData.title,
            industry: formData.industry,
            linkedin_url: formData.linkedinUrl,
            referred_by: formData.referredBy,
            additional_info: formData.additionalInfo
          }
        ]);

      if (dbError) {
        const pgError = dbError as PostgrestError;
        
        // Handle duplicate email error
        if (pgError.code === '23505') {
          toast.error("An application with this email already exists. Our team will be in touch soon!");
          onCloseModal(false);
          setFormData(initialFormData);
          setStep(1);
          return;
        }
        throw pgError;
      }

      // Structure payload for Make.com webhook
      const makePayload = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        company: formData.company,
        title: formData.title,
        industry: formData.industry,
        linkedin_url: formData.linkedinUrl,
        referred_by: formData.referredBy,
        additional_info: formData.additionalInfo,
        tags: ["Network Request"],
        full_name: formData.fullName
      };

      // Push to Make.com
      const { error: makeError } = await supabase.functions.invoke('push-to-make', {
        body: makePayload
      });

      if (makeError) {
        console.error('Error pushing to Make:', makeError);
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-network-confirmation', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          title: formData.title,
        },
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      trackFormSubmit('network_request', true);
      trackConversion('NETWORK_REQUEST_SUBMITTED');
      toast.success("Thank you for your interest in joining the Nias Network. We'll review your application and be in touch soon!");
      onCloseModal(false);
      setFormData(initialFormData);
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      trackFormSubmit('network_request', false);
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormStep('network_request', 1, 'basic_info');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return {
    step,
    formData,
    handleSubmit,
    handleInputChange,
    handleNext,
    handleBack,
    isSubmitting,
    setFormData,
  };
};
