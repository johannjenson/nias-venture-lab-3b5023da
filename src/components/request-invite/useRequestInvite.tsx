
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormData } from "./types";

const initialFormData: FormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  company: "",
  title: "",
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
      console.log('Checking if user account exists for:', formData.email);
      const { data: hasAccount, error: checkError } = await supabase
        .rpc('has_user_account', {
          email_address: formData.email
        });

      if (checkError) {
        console.error('Error checking account:', checkError);
        toast.error("Error checking account status. Please try again.");
        setIsSubmitting(false);
        return;
      }

      console.log('Has account result:', hasAccount);
      if (hasAccount) {
        toast.error("An account already exists with this email. Please login or reset your password.");
        setIsSubmitting(false);
        return;
      }

      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      console.log('Inserting request:', { firstName, lastName, ...formData });
      // Insert into Supabase
      const { error: dbError } = await supabase
        .from('Request')
        .insert([
          {
            first_name: firstName,
            last_name: lastName || null,
            phone_number: formData.phoneNumber,
            email: formData.email,
            company: formData.company,
            title: formData.title,
            linkedin_url: formData.linkedinUrl,
            referred_by: formData.referredBy,
            additional_info: formData.additionalInfo
          }
        ]);

      if (dbError) {
        console.error('Error inserting request:', dbError);
        throw dbError;
      }

      console.log('Sending confirmation email');
      // Send confirmation email using the client SDK without auth
      const { error: emailError } = await supabase.functions.invoke('send-network-confirmation', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          title: formData.title
        }
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
        throw emailError;
      }

      toast.success("Thank you for your interest in joining the Nias Network. We'll review your application and be in touch soon!");
      onCloseModal(false);
      setFormData(initialFormData);
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
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
    setFormData
  };
};
