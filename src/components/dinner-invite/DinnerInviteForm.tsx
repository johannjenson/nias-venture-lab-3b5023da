
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DinnerFormData, IndustryType } from "./types";
import { industries } from "@/data/industries";

interface DinnerInviteFormProps {
  formData: DinnerFormData;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (value: string) => void;
  onIndustryChange: (value: IndustryType) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DinnerInviteForm = ({
  formData,
  isSubmitting,
  onInputChange,
  onRoleChange,
  onIndustryChange,
  onSubmit,
}: DinnerInviteFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Your Role</Label>
        <Select
          name="role"
          value={formData.role}
          onValueChange={onRoleChange}
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
          onValueChange={onIndustryChange}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => {
              const enumValue = industry.name.toLowerCase()
                .replace(/[\s&]+/g, '_')
                .replace(/[^a-z0-9_]/g, '') as IndustryType;
              
              return (
                <SelectItem 
                  key={enumValue}
                  value={enumValue}
                >
                  {industry.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">What interests you most about this dinner?</Label>
        <Input
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={onInputChange}
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
  );
};

export default DinnerInviteForm;
