import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Building2, TrendingUp, MapPin, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import turkiImage from "@/assets/turki-alshubaki.jpg";
import mohammedImage from "@/assets/mohammed-khalid-ibn-salamah.jpg";
import heroBackground from "@/assets/riyadh-skyline.png";

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
      bio: "With over eight years of experience across residential, commercial, and industrial real estate, I specialize in providing market insight, sector context, and strategic guidance to clients evaluating the Saudi real estate landscape. Over the years, I've built a strong network of developers, landowners, contractors, and investors, allowing me to provide exclusive access, market insights, and brokerage support across Riyadh's most promising areas."
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
        <title>Real Estate Landscape & Development Trends in Saudi Arabia | NIAS Network</title>
        <meta name="description" content="Understand Riyadh and Khobar's evolving real estate landscape. NIAS provides market intelligence, policy context, and strategic guidance to support informed evaluation of Saudi property markets." />
        <meta property="og:title" content="Real Estate Landscape & Development Trends in Saudi Arabia | NIAS Network" />
        <meta property="og:description" content="Understand Riyadh and Khobar's evolving real estate landscape. NIAS provides market intelligence, policy context, and strategic guidance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/real-estate" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saudi Arabia Real Estate Market Insights | NIAS" />
        <meta name="twitter:description" content="Market intelligence and strategic guidance for Riyadh and Khobar real estate." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io/real-estate" />
      </Helmet>

      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/50 z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <Button
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <img 
          src={heroBackground}
          alt="Riyadh skyline"
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Waves className="h-12 w-12 text-primary mx-auto mb-8 animate-wave" />
            <h1 className="text-4xl md:text-5xl tracking-tight text-foreground mb-4">
              Real Estate Landscape & Development Trends in <span className="font-semibold">Saudi Arabia</span>
            </h1>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Understand Riyadh and Khobar's evolving real estate landscape. NIAS provides market intelligence, 
              policy context, and strategic guidance to support informed evaluation of Saudi property markets.
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
                <CardTitle className="text-xl tracking-tight">Prime Locations</CardTitle>
                <CardDescription>
                  Insight into priority districts and development zones in Riyadh and Khobar.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl tracking-tight">Market Insights</CardTitle>
                <CardDescription>
                  Expert analysis and strategic guidance backed by years of local market experience
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Building2 className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="text-xl tracking-tight">Developer & Market Context</CardTitle>
                <CardDescription>
                  Insight into development activity, stakeholder dynamics, and emerging property themes across key districts.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl tracking-tight text-center mb-12">
            Meet Your <span className="font-semibold">Real Estate Experts</span>
          </h2>
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
                    <h3 className="text-2xl font-semibold tracking-tight mb-2">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-4">NIAS Real Estate Consultant</p>
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
              <CardTitle className="text-2xl md:text-3xl tracking-tight text-center">
                Start Your <span className="font-semibold">Real Estate Journey</span>
              </CardTitle>
              <CardDescription className="text-center text-base">
                Whether you're evaluating the Saudi real estate market or seeking strategic insight, 
                our team can support your planning and exploration. Fill out the form below and our team will reach out within 24 hours.
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
                    placeholder="What type of real estate market, asset class, or development context are you exploring?"
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

              <p className="mt-6 text-xs text-muted-foreground text-center">
                NIAS provides strategic and market advisory services only and does not act as a real estate broker, agent, or intermediary, nor does it facilitate or execute property transactions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RealEstate;
