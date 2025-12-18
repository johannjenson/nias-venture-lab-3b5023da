import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const AudienceCTAs = () => {
  const pastGatherings = [
    {
      title: "Doers Summit Dubai Panel",
      date: "November 26, 2025",
      location: "Dubai",
      href: "/gatherings/doers-summit-dubai-panel",
    },
    {
      title: "US-Saudi VIP Dinner",
      date: "November 18, 2025",
      location: "Washington D.C.",
      href: "/gatherings/us-saudi-forum-dinner",
    },
    {
      title: "Biban25 Art Gala",
      date: "November 7, 2025",
      location: "Riyadh",
      href: "/gatherings/biban25-art-gala-dinner",
    },
    {
      title: "FII9 Night Caps",
      date: "October 29, 2025",
      location: "Riyadh",
      href: "/gatherings/night-cap",
    },
    {
      title: "180 Studios Evening",
      date: "September 18, 2025",
      location: "Riyadh",
      href: "/gatherings/studios180",
    },
    {
      title: "GitHub Founder Dinner",
      date: "April 10, 2025",
      location: "Riyadh",
      href: "/gatherings/github-founder-dinner",
    },
  ];

  return (
    <div className="bg-background">
      {/* Gatherings Section */}
      <div id="gatherings" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-5 tracking-tight">
              Gather
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Exclusive gatherings bringing together our network of founders, investors, and industry leaders.
            </p>
          </div>

          {/* Upcoming Gatherings */}
          <div className="mb-16">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-4">Upcoming Gatherings</h3>
            <p className="text-sm text-muted-foreground">
              Join the <a href="#network" className="text-foreground underline underline-offset-2 hover:text-foreground/80 transition-colors">Network</a> to find out about upcoming gatherings.
            </p>
          </div>

          {/* Past Gatherings */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-8">Past Gatherings</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pastGatherings.map((event) => (
                <Link 
                  key={event.title}
                  to={event.href}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block p-5 bg-secondary/40 border border-border/30 hover:border-border/60 transition-colors group"
                >
                  <h4 className="text-sm font-medium text-foreground mb-2 group-hover:text-foreground/80 transition-colors">{event.title}</h4>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    <span>{event.date}</span>
                    <span className="block mt-0.5">{event.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Work with NIAS Section */}
      <div className="py-24 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-5 tracking-tight">
              Work with <span className="font-medium">NIAS</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              We provide comprehensive support for top tier founders and funds looking to establish and grow their presence in Saudi Arabia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center bg-foreground">
                <svg className="h-6 w-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-foreground mb-3 tracking-tight">Smooth Landing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Navigate regulatory requirements and local partnerships with confidence.</p>
            </div>
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center bg-foreground">
                <svg className="h-6 w-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-foreground mb-3 tracking-tight">Trusted Advisors</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Connect with experienced professionals who understand your needs.</p>
            </div>
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-14 w-14 items-center justify-center bg-foreground">
                <svg className="h-6 w-6 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-foreground mb-3 tracking-tight">Strategic Financing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Access funding opportunities aligned with Vision 2030.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild className="bg-foreground hover:bg-foreground/90 text-background h-11 px-8 text-sm font-medium">
              <Link to="/work-with-nias" onClick={() => window.scrollTo(0, 0)}>
                Work with NIAS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Network Section */}
      <div id="network" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-5 tracking-tight">
              Network
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              A carefully curated community of founders, investors, advisors, and leaders united by a shared interest in the Saudi market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* NIAS Access - Green theme */}
            <div className="p-8 bg-secondary/40 border border-nias-green/30 hover:border-nias-green/60 transition-colors">
              <h3 className="text-lg font-medium text-foreground mb-3 tracking-tight">NIAS <span className="text-nias-green">Access</span></h3>
              <p className="mb-8 text-muted-foreground text-sm leading-relaxed">For founders, executives, and operators looking to expand into the Kingdom.</p>
              <Button 
                asChild
                className="w-full bg-nias-green hover:bg-nias-green/90 text-nias-green-foreground h-11 text-sm font-medium"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  Request Access <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            {/* NIAS Private - Blue theme */}
            <div className="p-8 bg-secondary/40 border border-nias-blue/30 hover:border-nias-blue/60 transition-colors">
              <h3 className="text-lg font-medium text-foreground mb-3 tracking-tight">NIAS <span className="text-nias-blue">Private</span></h3>
              <p className="mb-8 text-muted-foreground text-sm leading-relaxed">For qualified investors seeking deal flow and co-investment opportunities in the GCC.</p>
              <Button 
                asChild
                className="w-full bg-nias-blue hover:bg-nias-blue/90 text-nias-blue-foreground h-11 text-sm font-medium"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  Request Membership <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            {/* NIAS Family Office - Black and Gold theme */}
            <div className="p-8 bg-nias-dark border border-nias-gold/30">
              <h3 className="text-lg font-medium text-nias-dark-foreground mb-3 tracking-tight">NIAS <span className="text-nias-gold">Family Office</span></h3>
              <p className="mb-8 text-nias-dark-foreground/70 text-sm leading-relaxed">For family offices seeking bespoke advisory and exclusive investment access.</p>
              <Button 
                disabled
                className="w-full bg-nias-gold/20 text-nias-gold border border-nias-gold/30 cursor-not-allowed h-11 text-sm font-medium"
              >
                <Lock className="mr-2 h-3.5 w-3.5" /> Invite Only
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div id="opportunities" className="py-24 md:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-5 tracking-tight">
              Explore
            </h2>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Explore investment opportunities aligned with Saudi Vision 2030.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <Link 
              to="/resources"
              onClick={() => window.scrollTo(0, 0)}
              className="block p-8 bg-background border border-border/30 hover:border-border/60 transition-colors group"
            >
              <h3 className="text-lg font-medium text-foreground mb-3 flex items-center justify-between tracking-tight">
                Vision 2030
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Explore sector-by-sector investment opportunities aligned with the Kingdom's transformation.</p>
            </Link>
            <Link 
              to="/real-estate"
              onClick={() => window.scrollTo(0, 0)}
              className="block p-8 bg-background border border-border/30 hover:border-border/60 transition-colors group"
            >
              <h3 className="text-lg font-medium text-foreground mb-3 flex items-center justify-between tracking-tight">
                Real Estate
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Discover exclusive property opportunities in Riyadh and Khobar.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Expansion Capital Section with Form */}
      <div className="py-24 md:py-32 bg-nias-dark">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-nias-dark-foreground mb-5 tracking-tight">
              Curious about <span className="text-nias-gold">Expansion Capital</span>?
            </h2>
            <p className="text-base text-nias-dark-foreground/70 max-w-lg mx-auto mb-10 leading-relaxed">
              Download our guide focused on Saudi Arabia & Kuwait
            </p>
            <ExpansionCapitalForm />
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline form component for expansion capital section
const ExpansionCapitalForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const nameParts = fullName.trim().split(' ');
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(' ') || '';

      const { data: existingContact } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', email.trim())
        .single();

      if (existingContact) {
        await supabase.from('contacts').update({
          first_name,
          last_name,
          phone: phone.trim() || null
        }).eq('email', email.trim());
      } else {
        await supabase.from('contacts').insert({
          first_name,
          last_name,
          email: email.trim(),
          phone: phone.trim() || null,
          lead_source: 'expansion_capital',
          stage: 'mql_lead'
        });
      }

      await supabase.functions.invoke('send-newsletter-confirmation', {
        body: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null
        }
      });

      setFullName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="flex-1 bg-nias-dark-foreground/10 text-nias-dark-foreground placeholder:text-nias-dark-foreground/50 border border-nias-gold/20 h-11 px-4 text-sm"
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-nias-dark-foreground/10 text-nias-dark-foreground placeholder:text-nias-dark-foreground/50 border border-nias-gold/20 h-11 px-4 text-sm"
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="tel"
          placeholder="Phone Number (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 bg-nias-dark-foreground/10 text-nias-dark-foreground placeholder:text-nias-dark-foreground/50 border border-nias-gold/20 h-11 px-4 text-sm"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-nias-gold text-nias-dark hover:bg-nias-gold/90 px-8 h-11 text-sm font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AudienceCTAs;
