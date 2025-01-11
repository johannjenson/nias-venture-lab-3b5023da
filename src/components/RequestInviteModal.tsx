import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface RequestInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestInviteModal = ({ open, onOpenChange }: RequestInviteModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    company: "",
    title: "",
    linkedinUrl: "",
    referredBy: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      // Insert into Supabase
      const { error } = await supabase
        .from('Request')
        .insert([
          {
            first_name: firstName,
            last_name: lastName || null // If no last name provided, set to null
          }
        ]);

      if (error) throw error;

      toast.success("Thank you for your interest in joining the Nias Network. We'll review your application and be in touch soon!");
      onOpenChange(false);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        company: "",
        title: "",
        linkedinUrl: "",
        referredBy: "",
        additionalInfo: "",
      });
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your application. Please try again.");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold">Join the Nias Network</DialogTitle>
          <DialogDescription>
            Connect with Saudi investors, founders, and advisors to accelerate your business growth in the Kingdom.
          </DialogDescription>
        </DialogHeader>
        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Your Role</Label>
              <Select
                name="title"
                value={formData.title}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, title: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="advisor">Advisor</SelectItem>
                  <SelectItem value="broker">Broker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="e.g. linkedin.com/in/username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referredBy">Who referred you to the Nias Network?</Label>
              <Input
                id="referredBy"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleInputChange}
                placeholder="Enter the name of the person who referred you"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Anything else you would like to share with us?</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Tell us more about yourself and what you hope to gain from the Nias Network"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="w-full" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestInviteModal;