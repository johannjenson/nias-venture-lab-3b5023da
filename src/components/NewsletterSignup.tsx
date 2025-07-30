import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert contact directly to contacts table
      const { error } = await supabase
        .from('contacts')
        .insert({
          first_name: firstName.trim(),
          email: email.trim(),
          lead_source: 'newsletter',
          stage: 'mql_lead'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for signing up for our newsletter.",
      });

      // Reset form
      setFirstName("");
      setEmail("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#1a2757]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          VT Angel Curriculum
        </h2>
        <div className="text-white text-lg mb-2">
          Curious about VT and Angel Investing?
        </div>
        <div className="text-white text-lg mb-8">
          Get the first instalment of our guide, <em>Why Angel Invest</em>, by registering.
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12"
            disabled={isLoading}
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-white text-black hover:bg-gray-100 px-8 h-12 font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;