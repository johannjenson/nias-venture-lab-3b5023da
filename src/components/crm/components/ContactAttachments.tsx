
import { useState } from "react";
import { Upload, FileIcon, Trash2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [newUrl, setNewUrl] = useState('');
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const filePath = `${crypto.randomUUID()}-${file.name}`;

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

    const { error: dbError } = await supabase
      .from('contact_attachments')
      .insert({
        contact_id: contactId,
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
    if (attachment.file_path !== 'url-attachment') {
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
    }

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

  const handleUrlAdd = async (url: string) => {
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      new URL(url);

      const { error: dbError } = await supabase
        .from('contact_attachments')
        .insert({
          contact_id: contactId,
          external_url: url,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
          file_path: 'url-attachment',
          filename: 'external-url'
        });

      if (dbError) {
        toast({
          title: "Error saving URL",
          description: dbError.message,
          variant: "destructive",
        });
        return;
      }

      setNewUrl('');
      fetchAttachments();
    } catch (e) {
      return;
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(e.target.value);
  };

  const handleUrlInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUrlAdd(newUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button variant="outline" className="w-full py-8 text-lg">
          <label className="flex items-center gap-2 cursor-pointer w-full justify-center">
            <Upload className="h-6 w-6" />
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </Button>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add URL and press Enter"
            value={newUrl}
            onChange={handleUrlInputChange}
            onKeyDown={handleUrlInputKeyDown}
            className="flex-1"
          />
          <LinkIcon className="h-5 w-5 text-gray-400 mt-2" />
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              {attachment.file_path === 'url-attachment' ? (
                <LinkIcon className="h-5 w-5 text-green-500" />
              ) : (
                <FileIcon className="h-5 w-5 text-blue-500" />
              )}
              <div>
                {attachment.file_path === 'url-attachment' ? (
                  <>
                    <p className="font-medium">External Link</p>
                    <p className="text-sm text-blue-500 hover:text-blue-600">
                      <a 
                        href={attachment.external_url!} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        {attachment.external_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{attachment.filename}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(attachment.created_at).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {attachment.file_path !== 'url-attachment' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileDownload(attachment)}
                >
                  Download
                </Button>
              )}
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
  );
};

export default ContactAttachments;
