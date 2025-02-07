
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormData } from "./types";

interface AdditionalInfoFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AdditionalInfoForm = ({ formData, onInputChange, onBack, onSubmit }: AdditionalInfoFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input
          id="linkedinUrl"
          name="linkedinUrl"
          type="url"
          value={formData.linkedinUrl}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          placeholder="Tell us more about yourself and what you hope to gain from the Nias Network"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="w-full" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default AdditionalInfoForm;
