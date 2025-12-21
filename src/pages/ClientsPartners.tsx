import { Helmet } from "react-helmet";
import { Waves, ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import diwanLogo from "@/assets/diwan-logo.avif";
import studiosLogo from "@/assets/180-studios-logo.png";
import infntLogo from "@/assets/infnt-logo.svg";
import jizaalLogo from "@/assets/jizaal-logo.jpg";
import saudiTimesLogo from "@/assets/saudi-times-logo.png";
import heroBackground from "@/assets/work-with-nias-hero.png";

interface Partner {
  name: string;
  website: string;
  url: string;
  description: string;
  logo: string;
  invertLogo?: boolean;
}

const PartnerCard = ({ partner }: { partner: Partner }) => (
  <div className="bg-card rounded-xl p-6 md:p-8 border border-border/50 hover:border-border hover:shadow-md transition-all duration-300 group">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <div className="flex-shrink-0 w-20 h-20 bg-white rounded-lg border border-border/30 flex items-center justify-center p-3">
        <img 
          src={partner.logo} 
          alt={`${partner.name} logo`} 
          className={`max-w-full max-h-full object-contain ${partner.invertLogo ? 'filter invert' : ''}`}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-foreground mb-1 tracking-tight">
          {partner.name}
        </h3>
        <a 
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors mb-3 inline-flex items-center gap-1 text-sm"
        >
          {partner.website}
          <ExternalLink className="h-3 w-3" />
        </a>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {partner.description}
        </p>
      </div>
    </div>
  </div>
);

const Section = ({ title, items }: { title: string; items: Partner[] }) => (
  <div className="mb-16 md:mb-20">
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    <div className="space-y-4">
      {items.map((item) => (
        <PartnerCard key={item.name} partner={item} />
      ))}
    </div>
  </div>
);

const ClientsPartners = () => {
  const navigate = useNavigate();

  const clients: Partner[] = [
    {
      name: "180 Studios",
      website: "180Studios.com",
      url: "https://180studios.com",
      description: "Supporting global expansion including strategic partnerships, go-to-market planning, and research for their Riyadh location while connecting the 180's global team with the city's thriving Tech, Creative, Art, and Entertainment ecosystems",
      logo: studiosLogo
    }
  ];

  const partners: Partner[] = [
    {
      name: "The Saudi Times",
      website: "thesauditimes.net",
      url: "https://thesauditimes.net",
      description: "A leading bilingual news publication covering business, innovation, and economic development in Saudi Arabia and the wider Gulf region",
      logo: saudiTimesLogo
    },
    {
      name: "The Diwan",
      website: "The-Diwan.com",
      url: "https://the-diwan.com", 
      description: "Collaborating with this non-profit organization and their high-level government networks to support business expansion into other Gulf States including Kuwait and Qatar",
      logo: diwanLogo,
      invertLogo: true
    },
    {
      name: "Jizaal",
      website: "jizaal.com",
      url: "https://jizaal.com",
      description: "Engaging at the intersection of culture, digital experience, and the Kingdom's vision to diversify its visitor economy",
      logo: jizaalLogo
    },
    {
      name: "Infnt",
      website: "infntsolutions.com",
      url: "https://infntsolutions.com",
      description: "Our technology and events partner, supporting our digital infrastructure while helping orchestrate our exclusive gatherings and networking events across the region",
      logo: infntLogo
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Clients & Partners | NIAS Network</title>
        <meta name="description" content="Discover our trusted clients and strategic partners who collaborate with NIAS to drive innovation and growth across Saudi Arabia and the Gulf region." />
        <meta name="keywords" content="NIAS clients, NIAS partners, 180 Studios, The Diwan, Infnt, strategic partnerships, Saudi Arabia business" />
        <meta property="og:title" content="Clients & Partners | NIAS Network" />
        <meta property="og:description" content="Discover our trusted clients and strategic partners who collaborate with NIAS to drive innovation and growth in the Gulf region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io/clients-partners" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clients & Partners | NIAS Network" />
        <meta name="twitter:description" content="Discover our trusted clients and strategic partners collaborating with NIAS." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io/clients-partners" />
      </Helmet>

      {/* Sticky Header - matches Team/Work with NIAS */}
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

      {/* Hero Section - matches Team/Work with NIAS layout */}
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
              Clients & <span className="font-semibold">Partners</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We support ambitious companies expanding into the Gulf region by connecting them with family offices, exited entrepreneurs, strategic investors, and acquisitive funds across Saudi Arabia and the broader GCC.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Section title="Our Clients" items={clients} />
          <Section title="Our Partners" items={partners} />
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

export default ClientsPartners;
