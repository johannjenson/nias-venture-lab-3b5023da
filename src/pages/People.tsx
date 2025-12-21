import { useState } from "react";
import { Helmet } from "react-helmet";
import { Waves, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import johannImage from "@/assets/johann-jenson-new.png";
import richardImage from "@/assets/richard-schrems.png";
import ibrahimImage from "@/assets/ibrahim-alshuwaier.png";
import fahadImage from "@/assets/fahad-alsudairy-new.png";
import turkiImage from "@/assets/turki-alshubaki.jpg";
import mohammedImage from "@/assets/mohammed-khalid-ibn-salamah.jpg";
import ibrahimAlsemariImage from "@/assets/ibrahim-alsemari.png";
import lukasImage from "@/assets/lukas-gaebler.png";
import heroBackground from "@/assets/work-with-nias-hero.png";
import { Button } from "@/components/ui/button";
import PersonSchema from "@/components/seo/PersonSchema";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedIn?: string;
  calendarLink?: string;
  objectPosition?: string;
  scale?: number;
}

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      clipRule="evenodd"
    />
  </svg>
);

const PersonCard = ({ person, small = false }: { person: TeamMember; small?: boolean }) => {
  const baseScale = person.scale || 1;
  const [isActive, setIsActive] = useState(false);
  
  const handleTap = () => {
    setIsActive(!isActive);
  };
  
  return (
  <div className="group relative">
    <div 
      className={`relative overflow-hidden rounded-xl bg-white ${small ? 'aspect-square' : 'aspect-[4/5]'}`}
      onClick={handleTap}
    >
      <img
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ 
          objectPosition: person.objectPosition || 'top',
          transform: `scale(${baseScale})`,
        }}
        src={person.imageUrl}
        alt={person.name}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'} md:opacity-0 md:group-hover:opacity-100`} />
      
      {/* Actions (tap on mobile, hover on desktop) */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-full'} md:translate-y-full md:group-hover:translate-y-0`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {person.calendarLink && (
            <a
              href={person.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 bg-background text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-background/90 transition-colors w-full sm:w-auto"
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
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-full sm:w-10 h-10 bg-background/20 backdrop-blur-sm text-background rounded-lg hover:bg-background/30 transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
    
    <div className="mt-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`font-medium text-foreground tracking-tight ${small ? 'text-base' : 'text-lg'}`}>
            {person.name}
          </h3>
          <p className={`text-muted-foreground mt-1 ${small ? 'text-xs' : 'text-sm'}`}>{person.role}</p>
        </div>
      </div>
    </div>
  </div>
);
};

const TeamSection = ({ title, members, columns = 4, small = false }: { title: string; members: TeamMember[]; columns?: number; small?: boolean }) => (
  <div className="mb-20 md:mb-28">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    <div className={`grid grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6 md:gap-8`}>
      {members.map((person) => (
        <PersonCard key={person.name} person={person} small={small} />
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
      calendarLink: "https://calendar.app.google/RLMeAvPw8VHmKrwJ7",
      objectPosition: "center 5%",
    },
    {
      name: "Ibrahim Alshuwaier",
      role: "Business Development & Partnerships",
      imageUrl: ibrahimImage,
      linkedIn: "",
      calendarLink: "https://calendar.app.google/RLMeAvPw8VHmKrwJ7",
      scale: 1.1,
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
      objectPosition: "center -40px",
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

      {/* Sticky Header - matches Work with NIAS */}
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
            asChild
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link to="/work-with-nias">Work with NIAS</Link>
          </Button>
        </div>
      </div>

      {/* Hero Section - matches Work with NIAS layout */}
      <section className="relative pt-28 pb-10 md:pt-32 md:pb-12 px-6 overflow-hidden">
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
              Meet the <span className="font-semibold">NIAS Team</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Our team combines decades of experience in finance, technology, real estate, and business development across Saudi Arabia and the Gulf region.
            </p>
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <div className="py-10 md:py-16">
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
            small
          />
          
          <TeamSection 
            title="Counsel & Advisory" 
            members={counselSupport} 
            columns={4}
            small
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
            NIAS works with a curated set of global operators, institutional platforms, and senior advisors.
          </p>
          <Button
            asChild
            className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-sm font-medium tracking-wide"
          >
            <Link to="/work-with-nias">
              Work with NIAS
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default People;
