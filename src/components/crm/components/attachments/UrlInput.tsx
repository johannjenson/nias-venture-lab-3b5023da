
import { LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UrlInputProps {
  contactId: string;
  onUrlAdded: () => void;
}

const UrlInput = ({ contactId, onUrlAdded }: UrlInputProps) => {
  const [newUrl, setNewUrl] = useState('');
  const { toast } = useToast();

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
      onUrlAdded();
    } catch (e) {
      return;
    }
  };

  const handleUrlInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUrlAdd(newUrl);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Add URL and press Enter"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        onKeyDown={handleUrlInputKeyDown}
        className="flex-1"
      />
      <LinkIcon className="h-5 w-5 text-gray-400 mt-2" />
    </div>
  );
};

export default UrlInput;

