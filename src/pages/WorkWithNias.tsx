import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TrendingUp, Waves, Users, Calendar, Building2, ArrowLeft } from "lucide-react";
import CompanyForm from "@/components/work-with-nias/CompanyForm";
import FundForm from "@/components/work-with-nias/FundForm";
import AdvisorForm from "@/components/work-with-nias/AdvisorForm";
import heroBackground from "@/assets/work-with-nias-hero.png";
import johannProfile from "@/assets/johann-jenson-profile.jpeg";

const WorkWithNias = () => {
  const navigate = useNavigate();
  const [applicationType, setApplicationType] = useState<"company" | "fund" | "advisor">("company");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Work with NIAS | Strategic Partnerships for Global Expansion</title>
        <meta 
          name="description" 
          content="NIAS partners with global companies and funds expanding into the Gulf. Submit your application to join our curated ecosystem of operators and investors." 
        />
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
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <img 
          src={heroBackground}
          alt="Saudi Arabia landscape"
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Waves className="h-12 w-12 text-primary mx-auto mb-8 animate-wave" />
            <h1 className="text-4xl md:text-5xl tracking-tight text-foreground mb-6">
              Work with <span className="font-semibold">NIAS</span>
            </h1>
            
            {/* Info Cards */}
            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="bg-background/90 backdrop-blur-sm border border-border/40 rounded-lg p-4 text-left">
                <Building2 className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Companies</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">&gt;$100M revenue, multinational footprint</p>
              </div>
              <div className="bg-background/90 backdrop-blur-sm border border-border/40 rounded-lg p-4 text-left">
                <TrendingUp className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Investment Funds</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Institutional-grade, Gulf relevance</p>
              </div>
              <div className="bg-background/90 backdrop-blur-sm border border-border/40 rounded-lg p-4 text-left">
                <Users className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Advisors</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Proven track record, strategic networks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="application-form" className="py-12 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Complete the relevant form below. Our team will review and respond within 7–10 days.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <ToggleGroup 
              type="single" 
              value={applicationType}
              onValueChange={(value) => value && setApplicationType(value as "company" | "fund" | "advisor")}
              className="bg-background p-1 rounded-lg border border-border/50 shadow-sm"
            >
              <ToggleGroupItem 
                value="company" 
                className="px-5 py-2.5 text-sm data-[state=on]:bg-muted data-[state=on]:shadow-sm rounded-md"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Companies
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="fund"
                className="px-5 py-2.5 text-sm data-[state=on]:bg-muted data-[state=on]:shadow-sm rounded-md"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Funds
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="advisor"
                className="px-5 py-2.5 text-sm data-[state=on]:bg-muted data-[state=on]:shadow-sm rounded-md"
              >
                <Users className="h-4 w-4 mr-2" />
                Advisors
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Forms */}
          <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8 shadow-sm">
            {applicationType === "company" && <CompanyForm />}
            {applicationType === "fund" && <FundForm />}
            {applicationType === "advisor" && <AdvisorForm />}
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
            After submission, NIAS will conduct an initial review. If aligned, our Partnerships Team will reach out to coordinate a deeper discussion.
          </p>
        </div>
      </section>

      {/* Meet & Greet Section */}
      <section className="py-14 px-6 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Prefer to chat first?</p>
          <h2 className="text-xl font-medium text-foreground mb-8">
            Book a 15-min Meet & Greet
          </h2>
          <div className="flex flex-col items-center">
            <img 
              src={johannProfile}
              alt="Johann Jenson"
              className="w-24 h-24 rounded-full object-cover grayscale mb-4 ring-2 ring-border/30"
            />
            <h3 className="text-base font-medium text-foreground">Johann Jenson</h3>
            <p className="text-sm text-muted-foreground mb-5">Founding Partner</p>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://calendar.app.google/uBmFhFXNBK6etNeH6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkWithNias;
