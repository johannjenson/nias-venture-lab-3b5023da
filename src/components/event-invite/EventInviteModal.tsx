
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EventInviteModalProps } from "./types";
import { EventInviteHeader } from "./EventInviteHeader";
import EventInviteForm from "./EventInviteForm";
import { useEventInviteForm } from "./useEventInviteForm";

const EventInviteModal = ({ open, onOpenChange }: EventInviteModalProps) => {
  const {
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
    setFormData
  } = useEventInviteForm(onOpenChange);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <EventInviteHeader />
        <EventInviteForm
          formData={formData}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onTitleChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventInviteModal;
