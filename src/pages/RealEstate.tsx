import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Building2, TrendingUp, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import turkiImage from "@/assets/turki-alshubaki.jpg";
import mohammedImage from "@/assets/mohammed-khalid-ibn-salamah.jpg";

const RealEstate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-real-estate-inquiry', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Our team will be in touch with you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at realestate@nias.io",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const team = [
    {
      name: "Turki AlShubaiki",
      image: turkiImage,
      bio: "With over eight years of experience across residential, commercial, and industrial real estate, I specialize in helping investors, buyers, and tenants identify the right opportunities and make well-informed decisions. Over the years, I've built a strong network of developers, landowners, contractors, and investors, allowing me to provide exclusive access, market insights, and brokerage support across Riyadh's most promising areas."
    },
    {
      name: "Mohammed Ibn Salamah",
      image: mohammedImage,
      bio: "Growing up between Khobar and Riyadh with over 10 years of experience in the real estate sector, I specialize in building strong relationships with leading real estate companies, and working across land acquisitions, residential units of all types, and contractor partnerships. My experience allows me to connect clients with the right opportunities and provide tailored insights to support their investment and development goals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Real Estate Opportunities in Saudi Arabia | NIAS Network</title>
        <meta name="description" content="Discover exclusive real estate investment opportunities in Riyadh and Khobar. Connect with our experienced team for market insights, property acquisition, and development consultations." />
        <meta property="og:title" content="Real Estate Opportunities in Saudi Arabia | NIAS Network" />
        <meta property="og:description" content="Access off-market properties and investment opportunities in Saudi Arabia's most dynamic markets." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="hover:opacity-80 transition-opacity"
          >
            <Waves className="h-8 w-8 text-primary" />
          </button>
          <Button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Real Estate Opportunities in the Kingdom of Saudi Arabia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Unlock exclusive access to Riyadh and Khobar's most promising property markets. 
              From residential developments to commercial investments, we connect you with the right opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Prime Locations</CardTitle>
                <CardDescription>
                  Access to exclusive properties in Riyadh and Khobar's most sought-after areas
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>
                  Expert analysis and strategic guidance backed by years of local market experience
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Building2 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Off-Market Deals</CardTitle>
                <CardDescription>
                  Exclusive access to off-market opportunities through our extensive developer network
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Your Real Estate Experts</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-primary/20"
                    />
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-4">NIAS Real Estate</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Start Your Real Estate Journey</CardTitle>
              <CardDescription className="text-center text-base">
                Whether you're exploring investment opportunities or seeking market insights, 
                we're here to help. Fill out the form below and our team will reach out within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your interest *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="What type of property or opportunity are you looking for?"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-sm text-muted-foreground mb-4">Or reach out directly:</p>
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href="mailto:realestate@nias.io" 
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    realestate@nias.io
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;
