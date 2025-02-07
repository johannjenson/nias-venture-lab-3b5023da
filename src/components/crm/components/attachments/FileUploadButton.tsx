
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadButtonProps {
  contactId: string;
  onUploadSuccess: () => void;
}

const FileUploadButton = ({ contactId, onUploadSuccess }: FileUploadButtonProps) => {
  const { toast } = useToast();

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

    onUploadSuccess();
    toast({
      title: "File uploaded successfully",
      description: file.name,
    });
  };

  return (
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
  );
};

export default FileUploadButton;

