import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const NewsletterSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(' ') || '';

      // Check if contact already exists
      const {
        data: existingContact
      } = await supabase.from('contacts').select('id').eq('email', email.trim()).single();
      if (existingContact) {
        // Update existing contact
        const {
          error
        } = await supabase.from('contacts').update({
          first_name,
          last_name,
          phone: phone.trim() || null
        }).eq('email', email.trim());
        if (error) {
          throw error;
        }
      } else {
        // Insert new contact
        const {
          error
        } = await supabase.from('contacts').insert({
          first_name,
          last_name,
          email: email.trim(),
          phone: phone.trim() || null,
          lead_source: 'newsletter',
          stage: 'mql_lead'
        });
        if (error) {
          throw error;
        }
      }
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for signing up for our newsletter."
      });

      // Send confirmation email to johann@nias.io
      try {
        await supabase.functions.invoke('send-newsletter-confirmation', {
          body: {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim() || null
          }
        });
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the whole process if email fails
      }

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Thumbnail */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <img src="/lovable-uploads/6f6f8013-6ce7-4925-a141-f2fa66cad892.png" alt="2025 Nias Expansion Capital Guide" className="w-64 object-contain rounded-lg shadow-2xl" />
          </div>
          
          {/* Content */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-white mb-6">Curious about Nias & Expansion Capital?</h2>
            
            
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl lg:max-w-none">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="text" placeholder="Your Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12" disabled={isLoading} />
            <Input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12" disabled={isLoading} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="tel" placeholder="Your Phone Number (Optional)" value={phone} onChange={e => setPhone(e.target.value)} className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12" disabled={isLoading} />
            <Button type="submit" className="bg-white text-black hover:bg-gray-100 px-8 h-12 font-medium" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
         </form>
          </div>
        </div>
      </div>
    </section>;
};
export default NewsletterSignup;