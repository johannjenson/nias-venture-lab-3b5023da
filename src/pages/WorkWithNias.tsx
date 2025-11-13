import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building2, TrendingUp, Waves, Users } from "lucide-react";
import CompanyForm from "@/components/work-with-nias/CompanyForm";
import FundForm from "@/components/work-with-nias/FundForm";
import AdvisorForm from "@/components/work-with-nias/AdvisorForm";
import heroBackground from "@/assets/work-with-nias-hero.png";

const WorkWithNias = () => {
  const navigate = useNavigate();
  const [applicationType, setApplicationType] = useState<"company" | "fund" | "advisor">("company");

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
      <div className="fixed top-0 left-0 right-0 bg-background border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="hover:opacity-80 transition-opacity"
          >
            <Waves className="h-8 w-8 text-primary" />
          </button>
          <Button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <img 
          src={heroBackground}
          alt="Saudi Arabia landscape"
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Work with NIAS
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              For Global Companies & Funds Expanding into the Gulf
            </p>
            
            {/* Info Cards - Moved into Hero */}
            <div className="mt-12 mb-8">
              <p className="text-sm text-foreground/70 mb-8 max-w-2xl mx-auto">
                NIAS.io works with a highly curated set of global operators and investment platforms.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-left">
                  <Building2 className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Companies</h3>
                  <p className="text-xs text-muted-foreground">&gt;$100M revenue, multinational footprint</p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-left">
                  <TrendingUp className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Investment Funds</h3>
                  <p className="text-xs text-muted-foreground">Institutional-grade, with Gulf relevance</p>
                </div>
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-left">
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1 text-sm">Advisors</h3>
                  <p className="text-xs text-muted-foreground">Trusted partners sharing quality dealflow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="application-form" className="py-12 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Please complete the relevant form below. Our team will review and respond within 7–10 days.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <ToggleGroup 
              type="single" 
              value={applicationType}
              onValueChange={(value) => value && setApplicationType(value as "company" | "fund" | "advisor")}
              className="bg-muted/50 p-1 rounded-lg border border-border shadow-sm"
            >
              <ToggleGroupItem 
                value="company" 
                className="px-6 py-3 data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Companies
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="fund"
                className="px-6 py-3 data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Funds
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="advisor"
                className="px-6 py-3 data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Advisors
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Forms */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-10 shadow-sm">
            {applicationType === "company" && <CompanyForm />}
            {applicationType === "fund" && <FundForm />}
            {applicationType === "advisor" && <AdvisorForm />}
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            After submission, NIAS will conduct an initial review. If aligned, our Partnerships Team will reach out to coordinate a deeper discussion.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkWithNias;
