
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useActualContactId } from "../../hooks/useActualContactId";

interface DeleteRequestDialogProps {
  onDelete: () => void;
  contactId: string;
}

export const DeleteRequestDialog = ({ onDelete, contactId }: DeleteRequestDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const getActualContactId = useActualContactId();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Get the actual UUID from the potentially prefixed ID
      const actualContactId = await getActualContactId(contactId);
      
      if (!actualContactId) {
        throw new Error("Could not find contact ID");
      }

      // Delete all associated checklist items
      await supabase
        .from('checklist_items')
        .delete()
        .eq('contact_id', actualContactId);

      // Delete all associated notes
      await supabase
        .from('contact_notes')
        .delete()
        .eq('contact_id', actualContactId);

      // Delete all associated attachments
      await supabase
        .from('contact_attachments')
        .delete()
        .eq('contact_id', actualContactId);

      // Finally, delete the contact
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', actualContactId);

      if (error) throw error;

      toast({
        title: "Contact deleted",
        description: "The contact has been successfully removed.",
      });

      onDelete();
    } catch (error: any) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error deleting contact",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Contact
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the contact
            and all associated data (notes, checklist items, and attachments)
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
