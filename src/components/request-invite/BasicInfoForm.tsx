
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormData } from "./types";

interface BasicInfoFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (value: string) => void;
  onNext: (e: React.FormEvent) => void;
}

const BasicInfoForm = ({ formData, onInputChange, onTitleChange, onNext }: BasicInfoFormProps) => {
  return (
    <form onSubmit={onNext} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
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
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Your Role</Label>
        <Select
          name="title"
          value={formData.title}
          onValueChange={onTitleChange}
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
  );
};

export default BasicInfoForm;
