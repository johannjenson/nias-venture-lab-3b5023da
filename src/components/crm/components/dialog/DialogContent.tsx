
import { TabsContent } from "@/components/ui/tabs";
import ContactInfo from "../ContactInfo";
import HeatRating from "../HeatRating";
import StageSelector from "../StageSelector";
import ContactChecklist from "../ContactChecklist";
import ContactNotes from "../ContactNotes";
import ContactAttachments from "../ContactAttachments";
import { Contact, ChecklistItem } from "../../types/contact-details";

interface DialogContentProps {
  activeTab: string;
  contact: Contact;
  checklist: ChecklistItem[];
  onHeatRatingChange: (rating: number) => void;
  onStageChange: (stage: typeof contact.stage) => void;
  onToggleChecklistItem: (itemId: string, completed: boolean) => void;
  onChecklistUpdate: () => void;
}

const DialogContent = ({
  activeTab,
  contact,
  checklist,
  onHeatRatingChange,
  onStageChange,
  onToggleChecklistItem,
  onChecklistUpdate,
}: DialogContentProps) => {
  return (
    <>
      <TabsContent value="details" className="mt-0">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-4">
            <ContactInfo contact={contact} />
            <HeatRating 
              currentRating={contact.heat_rating} 
              onRatingChange={onHeatRatingChange}
            />
            <StageSelector 
              currentStage={contact.stage} 
              onStageChange={onStageChange} 
            />
          </div>

          <div className="col-span-2 space-y-6">
            <ContactChecklist 
              checklist={checklist} 
              onToggleItem={onToggleChecklistItem} 
            />
            <ContactNotes 
              contactId={contact.id} 
              onChecklistUpdate={onChecklistUpdate}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="attachments" className="mt-0">
        <ContactAttachments contactId={contact.id} />
      </TabsContent>
    </>
  );
};

export default DialogContent;
