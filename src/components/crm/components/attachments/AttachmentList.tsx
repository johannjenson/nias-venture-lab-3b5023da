
import { FileIcon, LinkIcon, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface AttachmentListProps {
  attachments: Attachment[];
  onAttachmentDeleted: () => void;
}

const AttachmentList = ({ attachments, onAttachmentDeleted }: AttachmentListProps) => {
  const { toast } = useToast();

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

    onAttachmentDeleted();
    toast({
      title: "File deleted successfully",
    });
  };

  return (
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
  );
};

export default AttachmentList;

