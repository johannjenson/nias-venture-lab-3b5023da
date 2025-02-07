
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRequestInvite } from "./useRequestInvite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface RequestInviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestInviteModal = ({ open, onOpenChange }: RequestInviteModalProps) => {
  const {
    step,
    formData,
    handleSubmit,
    handleInputChange,
    handleNext,
    handleBack,
    isSubmitting,
  } = useRequestInvite(onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <h2 className="text-lg font-semibold">Request to Join Nias Network</h2>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Additional Information</h2>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium mb-1">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="referredBy" className="block text-sm font-medium mb-1">
                  Referred By
                </label>
                <Input
                  id="referredBy"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
                  Additional Information
                </label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestInviteModal;
