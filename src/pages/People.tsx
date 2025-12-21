import { Helmet } from "react-helmet";
import { Waves, Calendar, Linkedin, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import johannImage from "@/assets/johann-jenson.png";
import richardImage from "@/assets/richard-schrems.png";
import ibrahimImage from "@/assets/ibrahim-alshuwaier.png";
import fahadImage from "@/assets/fahad-alsudairy-new.png";
import turkiImage from "@/assets/turki-alshubaki.jpg";
import mohammedImage from "@/assets/mohammed-khalid-ibn-salamah.jpg";
import ibrahimAlsemariImage from "@/assets/ibrahim-alsemari.png";
import lukasImage from "@/assets/lukas-gaebler.png";
import { Button } from "@/components/ui/button";
import PersonSchema from "@/components/seo/PersonSchema";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedIn?: string;
  calendarLink?: string;
  bio?: string;
}

const PersonCard = ({ person }: { person: TeamMember }) => (
  <div className="group relative">
    <div className="relative overflow-hidden rounded-xl bg-muted">
      <img
        className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        src={person.imageUrl}
        alt={person.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Hover overlay with links */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-3">
          {person.calendarLink && (
            <a
              href={person.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/90 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Book Call
            </a>
          )}
          {person.linkedIn && (
            <a
              href={person.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-background/20 backdrop-blur-sm text-background rounded-lg hover:bg-background/30 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
    
    <div className="mt-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground tracking-tight">
            {person.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{person.role}</p>
        </div>
        {person.linkedIn && (
          <a
            href={person.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const TeamSection = ({ title, members, columns = 4 }: { title: string; members: TeamMember[]; columns?: number }) => (
  <div className="mb-20 md:mb-28">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-8 md:gap-10`}>
      {members.map((person) => (
        <PersonCard key={person.name} person={person} />
      ))}
    </div>
  </div>
);

const People = () => {
  const navigate = useNavigate();
  
  const foundingPartners: TeamMember[] = [
    {
      name: "Johann Jenson",
      role: "Finance & Platform",
      imageUrl: johannImage,
      linkedIn: "https://www.linkedin.com/in/johannjenson/",
      calendarLink: "https://calendar.app.google/uBmFhFXNBK6etNeH6",
    },
    {
      name: "Ibrahim Alshuwaier",
      role: "Business Development & Partnerships",
      imageUrl: ibrahimImage,
      linkedIn: "",
    },
  ];

  const associates: TeamMember[] = [
    {
      name: "Richard Schrems",
      role: "Operations",
      imageUrl: richardImage,
      linkedIn: "https://sa.linkedin.com/in/richardschrems",
    },
    {
      name: "Fahad Alsudairy",
      role: "Sports & Entertainment",
      imageUrl: fahadImage,
      linkedIn: "",
    },
    {
      name: "Turki Alshubaki",
      role: "Real Estate",
      imageUrl: turkiImage,
      linkedIn: "",
    },
    {
      name: "Mohammed Khalid Ibn Salamah",
      role: "Real Estate",
      imageUrl: mohammedImage,
      linkedIn: "",
    },
  ];

  const counselSupport: TeamMember[] = [
    {
      name: "Ibrahim AlSemari",
      role: "Finance",
      imageUrl: ibrahimAlsemariImage,
      linkedIn: "https://sa.linkedin.com/in/ibrahim-alsemari-cfa-cpa-3a3866162",
    },
    {
      name: "Lukas Gaebler",
      role: "Tech",
      imageUrl: lukasImage,
      linkedIn: "https://at.linkedin.com/in/lukas-gaebler",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Meet the NIAS Team | Founders, Associates & Advisors</title>
        <meta name="description" content="Meet the people behind NIAS. Our founding partners, associates, and advisors bring decades of experience in finance, technology, real estate, and business development across Saudi Arabia." />
        <meta property="og:title" content="Meet the NIAS Team | Founders, Associates & Advisors" />
        <meta property="og:description" content="Meet the people behind NIAS. Our team brings decades of experience helping companies expand into Saudi Arabia and the Gulf region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/people" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meet the NIAS Team" />
        <meta name="twitter:description" content="Meet the people behind NIAS helping companies expand into Saudi Arabia." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io/people" />
      </Helmet>
      
      <PersonSchema 
        people={[
          { name: "Johann Jenson", jobTitle: "Founding Partner - Finance & Platform", linkedIn: "https://www.linkedin.com/in/johannjenson/" },
          { name: "Ibrahim Alshuwaier", jobTitle: "Founding Partner - Business Development & Partnerships" },
          { name: "Richard Schrems", jobTitle: "Associate - Operations", linkedIn: "https://sa.linkedin.com/in/richardschrems" },
          { name: "Fahad Alsudairy", jobTitle: "Associate - Sports & Entertainment" },
          { name: "Turki Alshubaki", jobTitle: "Associate - Real Estate" },
          { name: "Mohammed Khalid Ibn Salamah", jobTitle: "Associate - Real Estate" },
          { name: "Ibrahim AlSemari", jobTitle: "Counsel & Advisory - Finance", linkedIn: "https://sa.linkedin.com/in/ibrahim-alsemari-cfa-cpa-3a3866162" },
          { name: "Lukas Gaebler", jobTitle: "Counsel & Advisory - Tech", linkedIn: "https://at.linkedin.com/in/lukas-gaebler" }
        ]}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <button 
            onClick={() => navigate('/')} 
            className="hover:opacity-80 transition-opacity"
          >
            <Waves className="h-8 w-8 text-foreground" />
          </button>
          <Link 
            to="/work-with-nias" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            Work With Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hero Section - Dark */}
      <div className="bg-foreground text-background pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Waves className="h-10 w-10 text-background/50 mb-8 animate-wave" strokeWidth={2} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
              Meet the<br />
              <span className="font-medium">NIAS Team</span>
            </h1>
            <p className="text-lg md:text-xl text-background/60 max-w-xl leading-relaxed">
              Our team combines decades of experience in finance, technology, real estate, and business development across Saudi Arabia and the Gulf region.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-nias-gold/10 border-b border-nias-gold/20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-1">8</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-1">50+</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-1">5</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Industries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-1">3</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">Continents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Sections */}
      <div className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <TeamSection 
            title="Founding Partners" 
            members={foundingPartners} 
            columns={2}
          />
          
          <TeamSection 
            title="Associates" 
            members={associates} 
            columns={4}
          />
          
          <TeamSection 
            title="Counsel & Advisory" 
            members={counselSupport} 
            columns={2}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
            Ready to work with us?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Whether you're a company looking to expand into Saudi Arabia, an investor seeking opportunities, or an advisor with relevant expertise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-sm font-medium tracking-wide"
            >
              <Link to="/work-with-nias">
                Partner With NIAS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto border-foreground/20 text-foreground hover:bg-foreground hover:text-background h-12 px-8 text-sm font-medium tracking-wide"
            >
              <a href="https://calendar.app.google/uBmFhFXNBK6etNeH6" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Waves className="h-6 w-6" />
              <span className="text-sm text-background/60">© 2024 NIAS. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-background/60 hover:text-background transition-colors">
                Home
              </Link>
              <Link to="/resources" className="text-sm text-background/60 hover:text-background transition-colors">
                Resources
              </Link>
              <Link to="/work-with-nias" className="text-sm text-background/60 hover:text-background transition-colors">
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
