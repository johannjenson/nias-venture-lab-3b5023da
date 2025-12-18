import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const AudienceCTAs = () => {
  const upcomingGatherings = [
    {
      title: "180 Studios Evening",
      date: "June 24, 2025",
      location: "Riyadh",
      href: "/events/studios180-event",
      description: "Dinner and conversation with Tim Robinson from London's creative powerhouse.",
    },
  ];

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
  ];

  return (
    <div className="bg-background">
      {/* Network Section */}
      <div id="network" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              The NIAS Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A carefully curated community of founders, investors, advisors, and leaders united by a shared interest in the Saudi market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">NIAS Access</h3>
              <p className="mb-6 text-muted-foreground">For founders, executives, and operators looking to expand into the Kingdom with strategic introductions and market intelligence.</p>
              <Button 
                asChild
                className="bg-foreground hover:bg-foreground/90 text-background"
              >
                <a href="https://access.nias.io/" target="_blank" rel="noopener noreferrer">
                  Request Access <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50">
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">NIAS Private</h3>
              <p className="mb-6 text-muted-foreground">For qualified investors seeking deal flow, co-investment opportunities, and access to off-market opportunities in the GCC.</p>
              <Button 
                asChild
                className="bg-foreground hover:bg-foreground/90 text-background"
              >
                <a href="https://access.nias.io/investors" target="_blank" rel="noopener noreferrer">
                  Request Membership <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gatherings Section */}
      <div className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6">
              Gatherings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exclusive events bringing together our network of founders, investors, and industry leaders.
            </p>
          </div>

          {/* Upcoming */}
          {upcomingGatherings.length > 0 && (
            <div className="mb-16">
              <h3 className="text-sm uppercase tracking-widest text-olive font-medium mb-6">Upcoming</h3>
              <div className="space-y-4">
                {upcomingGatherings.map((event) => (
                  <Link 
                    key={event.title}
                    to={event.href}
                    className="block p-6 md:p-8 rounded-xl bg-background border border-border hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h4 className="text-xl md:text-2xl font-medium text-foreground mb-2">{event.title}</h4>
                        <p className="text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-foreground hidden md:block" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-6">Past Gatherings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {pastGatherings.map((event) => (
                <Link 
                  key={event.title}
                  to={event.href}
                  className="block p-6 rounded-xl bg-background border border-border hover:border-foreground/20 transition-colors"
                >
                  <h4 className="text-lg font-medium text-foreground mb-2">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/events">
                  View All Past Gatherings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="py-20 md:py-28">
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
              className="block p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50 hover:border-foreground/20 transition-colors group"
            >
              <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4 flex items-center justify-between">
                Vision 2030
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground">Explore sector-by-sector investment opportunities aligned with the Kingdom's transformation.</p>
            </Link>
            <Link 
              to="/real-estate"
              className="block p-8 md:p-10 rounded-xl bg-secondary/50 border border-border/50 hover:border-foreground/20 transition-colors group"
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
    </div>
  );
};

export default AudienceCTAs;
