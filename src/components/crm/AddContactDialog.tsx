
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import ContactForm from "./components/ContactForm";
import { createContact } from "./services/contactService";
import { ContactFormData } from "./types/contact";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddContactDialog = ({ open, onOpenChange }: AddContactDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    title: "",
    lead_type: "other",
    industry: "technology"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error adding contact",
          description: "You must be logged in to add contacts",
          variant: "destructive",
        });
        return;
      }

      await createContact(formData, user.id);

      toast({
        title: "Contact added",
        description: "The contact has been successfully added.",
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        company: "",
        title: "",
        lead_type: "other",
        industry: "technology"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error adding contact",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <ContactForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
