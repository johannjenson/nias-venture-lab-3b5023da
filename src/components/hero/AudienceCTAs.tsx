import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const AudienceCTAs = () => {
  const pastGatherings = [
    {
      title: "Doers Summit Dubai Panel",
      date: "November 26, 2024",
      location: "Dubai",
      href: "/events/doers-summit-dubai-panel",
    },
    {
      title: "US-Saudi VIP Dinner",
      date: "November 18, 2024",
      location: "Washington D.C.",
      href: "/events/us-saudi-forum-dinner",
    },
    {
      title: "Biban25 Art Gala",
      date: "November 7, 2024",
      location: "Riyadh",
      href: "/events/biban25-art-gala-dinner",
    },
    {
      title: "FII9 Night Caps",
      date: "October 29, 2024",
      location: "Riyadh",
      href: "/events/night-cap",
    },
    {
      title: "180 Studios Evening",
      date: "September 18, 2024",
      location: "Riyadh",
      href: "/events/studios180-event",
    },
    {
      title: "GitHub Founder Dinner",
      date: "April 10, 2024",
      location: "Riyadh",
      href: "/events/github-founder-dinner",
    },
  ];

  return (
    <div className="bg-background">
      {/* Network Section */}
      <div id="network" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              The <span className="font-semibold">NIAS</span> Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A carefully curated community of founders, investors, advisors, and leaders united by a shared interest in the Saudi market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-secondary/50 border border-border/50">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">NIAS Access</h3>
              <p className="mb-6 text-muted-foreground text-sm">For founders, executives, and operators looking to expand into the Kingdom.</p>
              <Button 
                asChild
                className="w-full bg-foreground hover:bg-foreground/90 text-background"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  Request Access <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="p-8 rounded-xl bg-secondary/50 border border-border/50">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">NIAS Private</h3>
              <p className="mb-6 text-muted-foreground text-sm">For qualified investors seeking deal flow and co-investment opportunities in the GCC.</p>
              <Button 
                asChild
                className="w-full bg-foreground hover:bg-foreground/90 text-background"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  Request Membership <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="p-8 rounded-xl bg-secondary/50 border border-border/50">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">NIAS Family Office</h3>
              <p className="mb-6 text-muted-foreground text-sm">For family offices seeking bespoke advisory and exclusive investment access.</p>
              <Button 
                disabled
                className="w-full bg-muted text-muted-foreground cursor-not-allowed"
              >
                <Lock className="mr-2 h-4 w-4" /> Invite Only
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What is NIAS Section */}
      <div className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              What is <span className="font-semibold">NIAS</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive support for top tier founders and funds looking to establish and grow their presence in Saudi Arabia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-foreground">
                <svg className="h-8 w-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Smooth Landing</h3>
              <p className="text-muted-foreground">Navigate regulatory requirements and local partnerships with confidence.</p>
            </div>
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-foreground">
                <svg className="h-8 w-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Trusted Advisors</h3>
              <p className="text-muted-foreground">Connect with experienced professionals who understand your needs.</p>
            </div>
            <div className="text-center">
              <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-foreground">
                <svg className="h-8 w-8 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">Strategic Financing</h3>
              <p className="text-muted-foreground">Access funding opportunities aligned with Vision 2030.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild className="bg-foreground hover:bg-foreground/90 text-background">
              <Link to="/work-with-nias">
                Work with NIAS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Gatherings Section */}
      <div id="gatherings" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              Gatherings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exclusive events bringing together our network of founders, investors, and industry leaders.
            </p>
          </div>

          {/* Past Gatherings */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-6">Past Gatherings</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {pastGatherings.map((event) => (
                <Link 
                  key={event.title}
                  to={event.href}
                  className="block p-6 rounded-xl bg-secondary/50 border border-border/50 hover:border-foreground/20 transition-colors"
                >
                  <h4 className="text-base font-medium text-foreground mb-2">{event.title}</h4>
                  <div className="text-sm text-muted-foreground">
                    <span>{event.date}</span>
                    <span className="block">{event.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <div id="opportunities" className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore investment opportunities aligned with Saudi Vision 2030.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
              to="/resources"
              className="block p-8 md:p-10 rounded-xl bg-background border border-border/50 hover:border-foreground/20 transition-colors group"
            >
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 flex items-center justify-between">
                Vision 2030
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground">Explore sector-by-sector investment opportunities aligned with the Kingdom's transformation.</p>
            </Link>
            <Link 
              to="/real-estate"
              className="block p-8 md:p-10 rounded-xl bg-background border border-border/50 hover:border-foreground/20 transition-colors group"
            >
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 flex items-center justify-between">
                Real Estate
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground">Discover exclusive property opportunities in Riyadh and Khobar.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Expansion Capital Section with Form */}
      <div className="py-20 md:py-28 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-background mb-6">
              Curious about <span className="font-semibold">NIAS</span> & Expansion Capital?
            </h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto mb-8">
              Get the first instalment of our guide focused on Saudi Arabia and Kuwait
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="flex-1 bg-background text-foreground placeholder:text-muted-foreground border-0 h-12 px-4 rounded-md"
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background text-foreground placeholder:text-muted-foreground border-0 h-12 px-4 rounded-md"
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="tel"
          placeholder="Your Phone Number (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 bg-background text-foreground placeholder:text-muted-foreground border-0 h-12 px-4 rounded-md"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-background text-foreground hover:bg-background/90 px-8 h-12 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AudienceCTAs;
