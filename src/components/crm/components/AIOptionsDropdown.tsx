
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InferIndustriesButton } from "./InferIndustriesButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AIOptionsDropdown = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  const handleUploadTranscript = async () => {
    try {
      const { error } = await supabase
        .from('ai_transcripts')
        .insert([
          { transcript_text: transcript }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "AI transcript uploaded successfully",
      });
      setIsUploadOpen(false);
      setTranscript("");
    } catch (error) {
      console.error('Error uploading transcript:', error);
      toast({
        title: "Error",
        description: "Failed to upload transcript. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sparkles className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <InferIndustriesButton />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsUploadOpen(true)}>
            Upload AI Transcript
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload AI Transcript</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="transcript">AI Transcript</Label>
              <Textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your AI transcript here..."
                className="h-40"
              />
            </div>
            <Button onClick={handleUploadTranscript} className="w-full">
              Upload Transcript
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
