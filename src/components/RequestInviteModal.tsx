
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import BasicInfoForm from "./request-invite/BasicInfoForm";
import AdditionalInfoForm from "./request-invite/AdditionalInfoForm";
import { useRequestInvite } from "./request-invite/useRequestInvite";

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
    setFormData,
  } = useRequestInvite(onOpenChange);

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
          <BasicInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            onTitleChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            onIndustryChange={(value) => setFormData(prev => ({ ...prev, industry: value as IndustryType }))}
            onNext={handleNext}
          />
        ) : (
          <AdditionalInfoForm
            formData={formData}
            onInputChange={handleInputChange}
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestInviteModal;
