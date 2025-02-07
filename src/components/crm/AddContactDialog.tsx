
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LeadType = 'founder_executive' | 'investor_buyer' | 'advisor_broker' | 'other';

const AddContactDialog = ({ open, onOpenChange }: AddContactDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    title: "",
    lead_type: 'other' as LeadType
  });

  const leadTypes = [
    { id: 'founder_executive' as const, label: 'Founders & Executives' },
    { id: 'investor_buyer' as const, label: 'Investors & Buyers' },
    { id: 'advisor_broker' as const, label: 'Advisors & Brokers' },
    { id: 'other' as const, label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error adding contact",
        description: "You must be logged in to add contacts",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // First, create the company in the leads table
    const { data: newCompany, error: createCompanyError } = await supabase
      .from('leads')
      .insert({
        company: formData.company,
        stage: 'mql_lead',
        user_id: user.id,
        lead_type: formData.lead_type
      })
      .select('id')
      .single();

    if (createCompanyError) {
      toast({
        title: "Error creating company",
        description: createCompanyError.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Now create the contact with reference to the company
    const { error: contactError } = await supabase
      .from('contacts')
      .insert({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        company: formData.company,
        title: formData.title,
        stage: 'mql_lead',
        user_id: user.id,
        company_id: newCompany.id,
        lead_type: formData.lead_type
      });

    setLoading(false);

    if (contactError) {
      toast({
        title: "Error adding contact",
        description: contactError.message,
        variant: "destructive",
      });
      return;
    }

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
      lead_type: "other"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead_type">Lead Type</Label>
            <Select
              value={formData.lead_type}
              onValueChange={(value: LeadType) => setFormData({ ...formData, lead_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lead type" />
              </SelectTrigger>
              <SelectContent>
                {leadTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
