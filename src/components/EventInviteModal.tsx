
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Loader2 } from "lucide-react";
import { industries } from "@/data/industries";

interface EventInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type IndustryType = 'manufacturing' | 'technology' | 'tourism' | 'healthcare' | 'energy' |
  'mining' | 'logistics' | 'education' | 'finance' | 'real_estate' | 'agriculture' |
  'water' | 'defense' | 'sports' | 'aerospace' | 'retail' | 'creative' | 'biotech' |
  'construction' | 'ocean';

const EventInviteModal = ({ open, onOpenChange }: EventInviteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    company: "",
    title: "",
    industry: "" as IndustryType,
    interests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('EventRequest')
        .insert({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          company: formData.company,
          title: formData.title,
          industry: formData.industry,
          interests: formData.interests
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
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        company: "",
        title: "",
        industry: "" as IndustryType,
        interests: "",
      });
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
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select
              name="industry"
              value={formData.industry}
              onValueChange={(value: IndustryType) =>
                setFormData((prev) => ({ ...prev, industry: value }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry.name.toLowerCase()} value={industry.name.toLowerCase()}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">What interests you most about this event?</Label>
            <Input
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleInputChange}
              placeholder="E.g., networking, investment opportunities, market insights"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventInviteModal;
