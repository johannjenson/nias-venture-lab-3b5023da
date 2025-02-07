
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import FileUploadButton from "./attachments/FileUploadButton";
import UrlInput from "./attachments/UrlInput";
import AttachmentList from "./attachments/AttachmentList";

interface Attachment {
  id: string;
  filename: string;
  file_path: string;
  content_type: string | null;
  size: number | null;
  created_at: string;
  external_url: string | null;
}

interface ContactAttachmentsProps {
  contactId: string;
}

const ContactAttachments = ({ contactId }: ContactAttachmentsProps) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();

  const fetchAttachments = async () => {
    const { data, error } = await supabase
      .from('contact_attachments')
      .select('*')
      .eq('contact_id', contactId)
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

  useEffect(() => {
    fetchAttachments();
  }, [contactId]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FileUploadButton 
          contactId={contactId} 
          onUploadSuccess={fetchAttachments} 
        />
        <UrlInput 
          contactId={contactId} 
          onUrlAdded={fetchAttachments} 
        />
      </div>
      <AttachmentList 
        attachments={attachments}
        onAttachmentDeleted={fetchAttachments}
      />
    </div>
  );
};

export default ContactAttachments;

