import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChecklistItem, Note, ContactDetailsDialogProps } from "./types/contact-details";
import ContactInfo from "./components/ContactInfo";
import StageSelector from "./components/StageSelector";
import ContactChecklist from "./components/ContactChecklist";
import ContactNotes from "./components/ContactNotes";
import { Upload, FileIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Attachment {
  id: string;
  filename: string;
  file_path: string;
  content_type: string | null;
  size: number | null;
  created_at: string;
}

const ContactDetailsDialog = ({ 
  contact, 
  open, 
  onOpenChange,
  onUpdate 
}: ContactDetailsDialogProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchChecklist();
      fetchNotes();
      fetchAttachments();
    }
  }, [open, contact.stage]);

  const fetchAttachments = async () => {
    const { data, error } = await supabase
      .from('contact_attachments')
      .select('*')
      .eq('contact_id', contact.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching attachments",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setAttachments(data);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const filePath = `${crypto.randomUUID()}-${file.name}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('contact_attachments')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error uploading file",
        description: uploadError.message,
        variant: "destructive",
      });
      return;
    }

    // Save file metadata to database
    const { error: dbError } = await supabase
      .from('contact_attachments')
      .insert({
        contact_id: contact.id,
        filename: file.name,
        file_path: filePath,
        content_type: file.type,
        size: file.size,
        uploaded_by: (await supabase.auth.getUser()).data.user?.id
      });

    if (dbError) {
      toast({
        title: "Error saving file metadata",
        description: dbError.message,
        variant: "destructive",
      });
      return;
    }

    fetchAttachments();
    toast({
      title: "File uploaded successfully",
      description: file.name,
    });
  };

  const handleFileDownload = async (attachment: Attachment) => {
    const { data, error } = await supabase.storage
      .from('contact_attachments')
      .download(attachment.file_path);

    if (error) {
      toast({
        title: "Error downloading file",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // Create and trigger download
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileDelete = async (attachment: Attachment) => {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('contact_attachments')
      .remove([attachment.file_path]);

    if (storageError) {
      toast({
        title: "Error deleting file",
        description: storageError.message,
        variant: "destructive",
      });
      return;
    }

    // Delete metadata from database
    const { error: dbError } = await supabase
      .from('contact_attachments')
      .delete()
      .eq('id', attachment.id);

    if (dbError) {
      toast({
        title: "Error deleting file metadata",
        description: dbError.message,
        variant: "destructive",
      });
      return;
    }

    fetchAttachments();
    toast({
      title: "File deleted successfully",
    });
  };

  const fetchChecklist = async () => {
    const { data: existingItems, error: existingError } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('contact_id', contact.id);

    if (existingError) {
      toast({
        title: "Error fetching checklist",
        description: existingError.message,
        variant: "destructive",
      });
      return;
    }

    if (existingItems.length === 0) {
      const { data: defaultItems, error: defaultError } = await supabase
        .from('checklist_items')
        .select('*')
        .is('contact_id', null)
        .eq('stage', contact.stage);

      if (defaultError) {
        toast({
          title: "Error fetching default checklist",
          description: defaultError.message,
          variant: "destructive",
        });
        return;
      }

      const newItems = defaultItems.map(({ item_text, stage }) => ({
        id: crypto.randomUUID(),
        contact_id: contact.id,
        stage,
        item_text,
        completed: false,
      }));

      const { error: insertError } = await supabase
        .from('checklist_items')
        .insert(newItems);

      if (insertError) {
        toast({
          title: "Error creating checklist",
          description: insertError.message,
          variant: "destructive",
        });
        return;
      }

      setChecklist(newItems);
    } else {
      setChecklist(existingItems);
    }
  };

  const fetchNotes = async () => {
    const { data: notesData, error: notesError } = await supabase
      .from('contact_notes')
      .select(`
        *,
        profiles (
          email,
          first_name,
          last_name
        )
      `)
      .eq('contact_id', contact.id)
      .order('created_at', { ascending: false });

    if (notesError) {
      toast({
        title: "Error fetching notes",
        description: notesError.message,
        variant: "destructive",
      });
      return;
    }

    setNotes(notesData);
  };

  const updateStage = async (newStage: typeof contact.stage) => {
    const { error } = await supabase
      .from('contacts')
      .update({ stage: newStage })
      .eq('id', contact.id);

    if (error) {
      toast({
        title: "Error updating stage",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    onUpdate();
    fetchChecklist();
  };

  const toggleChecklistItem = async (itemId: string, completed: boolean) => {
    const { error } = await supabase
      .from('checklist_items')
      .update({ completed })
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Error updating checklist",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setChecklist(checklist.map(item => 
      item.id === itemId ? { ...item, completed } : item
    ));
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    const { error } = await supabase
      .from('contact_notes')
      .insert({
        contact_id: contact.id,
        content: newNote.trim(),
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (error) {
      toast({
        title: "Error adding note",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewNote('');
    fetchNotes();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {contact.first_name} {contact.last_name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1 space-y-4">
                <ContactInfo contact={contact} />
                <StageSelector currentStage={contact.stage} onStageChange={updateStage} />
              </div>

              <div className="col-span-2 space-y-6">
                <ContactChecklist 
                  checklist={checklist} 
                  onToggleItem={toggleChecklistItem} 
                />
                <ContactNotes
                  notes={notes}
                  newNote={newNote}
                  onNewNoteChange={setNewNote}
                  onAddNote={addNote}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attachments">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="w-full">
                  <label className="flex items-center gap-2 cursor-pointer w-full">
                    <Upload className="h-4 w-4" />
                    Upload File
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </Button>
              </div>

              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{attachment.filename}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(attachment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileDownload(attachment)}
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleFileDelete(attachment)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsDialog;
