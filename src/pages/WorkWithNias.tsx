import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { TrendingUp, Waves, Users, Calendar, Building2, ArrowLeft, BarChart3, FileText, ArrowRight } from "lucide-react";
import CompanyForm from "@/components/work-with-nias/CompanyForm";
import FundForm from "@/components/work-with-nias/FundForm";
import AdvisorForm from "@/components/work-with-nias/AdvisorForm";
import heroBackground from "@/assets/work-with-nias-hero.png";
import johannProfile from "@/assets/johann-jenson-profile.jpeg";
import ibrahimProfile from "@/assets/ibrahim-alshuwaier.png";
import ServiceSchema from "@/components/seo/ServiceSchema";

const WorkWithNias = () => {
  const navigate = useNavigate();
  const [applicationType, setApplicationType] = useState<"company" | "fund" | "advisor">("company");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Work with NIAS | Partner with Us for Gulf Expansion</title>
        <meta 
          name="description" 
          content="Apply to partner with NIAS. We work with global companies ($50M+ revenue), institutional investment funds, and strategic advisors expanding into Saudi Arabia and the Gulf region." 
        />
        <meta property="og:title" content="Work with NIAS | Partner with Us for Gulf Expansion" />
        <meta property="og:description" content="Join NIAS's curated ecosystem of operators, fund managers, and advisors. Apply now for strategic partnership opportunities in Saudi Arabia and the Gulf." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/work-with-nias" />
        <meta property="og:image" content="https://nias.io/work-with-nias-og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work with NIAS | Partner with Us for Gulf Expansion" />
        <meta name="twitter:description" content="Apply to partner with NIAS. We work with global companies, investment funds, and advisors expanding into Saudi Arabia and the Gulf." />
        <meta name="twitter:image" content="https://nias.io/work-with-nias-og.png" />
      </Helmet>
      <ServiceSchema
        name="NIAS Partnership & Market Entry Services"
        description="Strategic advisory services for global companies, institutional funds, and advisors expanding into Saudi Arabia and the Gulf region."
        url="https://nias.io/work-with-nias"
      />
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
      <section className="relative pt-28 pb-0 px-6 overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl tracking-tight text-foreground mb-4">
              Work with <span className="font-semibold">NIAS</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              NIAS works with a curated set of global operators, institutional platforms, and senior advisors.{" "}
              <a 
                href="https://access.nias.io/client" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Learn more →
              </a>
            </p>

            {/* NIAS Cortex Banner */}
            <div className="mt-10 mb-10">
              <a
                href="https://access.nias.io/cortex"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-primary/95 backdrop-blur-sm rounded-xl p-6 md:p-8 text-left hover:bg-primary transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="h-4 w-4 text-primary-foreground/70" />
                      <span className="text-[11px] uppercase tracking-[0.15em] text-primary-foreground/70 font-medium">NIAS Cortex</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-primary-foreground mb-2">
                      NIAS Cortex <span className="text-xs font-medium bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full ml-2 align-middle">BETA</span>
                    </h3>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xl">
                      Upload your pitch deck and receive a structured NIAS Cortex analysis — AI-powered due diligence, multi-agent deep research, and a readiness assessment for Gulf capital markets.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <span className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
                        <FileText className="h-3.5 w-3.5" /> Full DD Report
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
                        <BarChart3 className="h-3.5 w-3.5" /> 8 Asset Classes
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-primary-foreground/60">
                        <TrendingUp className="h-3.5 w-3.5" /> GCC Readiness Score
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-5 py-3 rounded-lg text-sm font-medium group-hover:shadow-md transition-shadow">
                      Start Assessment <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Prefer to chat first */}
            <div className="flex flex-col items-center mt-8 mb-14">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Prefer to chat first?</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Johann Jenson */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <img 
                    src={johannProfile}
                    alt="Johann Jenson"
                    className="w-20 h-20 rounded-full object-cover grayscale ring-2 ring-border/30"
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-base font-medium text-foreground">Johann Jenson</p>
                    <p className="text-sm text-muted-foreground mb-3">Founding Partner</p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href="https://calendar.app.google/RLMeAvPw8VHmKrwJ7"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book a Call
                      </a>
                    </Button>
                  </div>
                </div>
                {/* Ibrahim Alshuwaier */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border/30">
                    <img 
                      src={ibrahimProfile}
                      alt="Ibrahim Alshuwaier"
                      className="w-full h-full object-cover object-top grayscale scale-110"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-base font-medium text-foreground">Ibrahim Alshuwaier</p>
                    <p className="text-sm text-muted-foreground mb-3">Founding Partner</p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href="https://calendar.app.google/RLMeAvPw8VHmKrwJ7"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book a Call
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Selectable Cards */}
            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <button
                onClick={() => {
                  setApplicationType("company");
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-background/90 backdrop-blur-sm border rounded-lg p-4 text-left transition-all hover:border-primary/50 hover:shadow-md ${
                  applicationType === "company" ? "border-primary ring-1 ring-primary/20" : "border-border/40"
                }`}
              >
                <Building2 className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Companies</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">&gt;$50M revenue, multinational footprint</p>
              </button>
              <button
                onClick={() => {
                  setApplicationType("fund");
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-background/90 backdrop-blur-sm border rounded-lg p-4 text-left transition-all hover:border-primary/50 hover:shadow-md ${
                  applicationType === "fund" ? "border-primary ring-1 ring-primary/20" : "border-border/40"
                }`}
              >
              <TrendingUp className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Institutional Platforms</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Institutional groups with Gulf relevance</p>
              </button>
              <button
                onClick={() => {
                  setApplicationType("advisor");
                  document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`bg-background/90 backdrop-blur-sm border rounded-lg p-4 text-left transition-all hover:border-primary/50 hover:shadow-md ${
                  applicationType === "advisor" ? "border-primary ring-1 ring-primary/20" : "border-border/40"
                }`}
              >
                <Users className="h-4 w-4 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1 text-sm">Advisors</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Proven track record, strategic networks</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="application-form" className="pt-6 pb-12 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto">

          {/* Forms */}
          <div className="bg-card border border-border/50 rounded-xl p-6 lg:p-8 shadow-sm">
            {applicationType === "company" && <CompanyForm />}
            {applicationType === "fund" && <FundForm />}
            {applicationType === "advisor" && <AdvisorForm />}
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              Our team will review and respond within 7–10 days.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkWithNias;
