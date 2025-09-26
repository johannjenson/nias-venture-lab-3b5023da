import React from "react";
import { Helmet } from "react-helmet";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import mooveLogo from "@/assets/moove-logo.png";
import diwanLogo from "@/assets/diwan-logo.avif";
import studiosLogo from "@/assets/180-studios-logo.png";
import infntLogo from "@/assets/infnt-logo.png";

const ClientsPartners = () => {
  const navigate = useNavigate();
  const clients = [
    {
      name: "180 Studios",
      website: "180Studios.com",
      url: "https://180studios.com",
      description: "London's creative powerhouse and premier immersive arts venue",
      logo: studiosLogo
    },
    {
      name: "Moove",
      website: "Moove.io", 
      url: "https://moove.io",
      description: "Mobility-as-a-Service platform transforming urban transportation",
      logo: mooveLogo
    }
  ];

  const partners = [
    {
      name: "The Diwan",
      website: "The-Diwan.com",
      url: "https://the-diwan.com", 
      description: "Strategic advisory and investment platform",
      logo: diwanLogo
    },
    {
      name: "Infnt",
      website: "infntsolutions.com",
      url: "https://infntsolutions.com",
      description: "Innovative technology solutions and digital transformation",
      logo: infntLogo
    }
  ];

  return (
    <>
      <Helmet>
        <title>Clients & Partners - Nias</title>
        <meta name="description" content="Discover our trusted clients and strategic partners who collaborate with Nias to drive innovation and growth across industries." />
        <meta name="keywords" content="Nias clients, Nias partners, 180 Studios, Moove, The Diwan, Infnt, strategic partnerships" />
        <link rel="canonical" href="https://nias.io/clients-partners" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
          <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
            <button 
              onClick={() => navigate('/')} 
              className="hover:opacity-80 transition-opacity"
            >
              <Waves className="h-8 w-8 text-primary" />
            </button>
          </div>
        </div>
        {/* Header */}
        <header className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Clients & Partners
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We collaborate with innovative organizations and strategic partners to create meaningful impact and drive sustainable growth.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Clients Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Clients
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Organizations that trust us to deliver exceptional results and transformative solutions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {clients.map((client) => (
                  <div key={client.name} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {client.name}
                      </h3>
                      <a 
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors mb-4 inline-block"
                      >
                        {client.website}
                      </a>
                      <p className="text-muted-foreground">
                        {client.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Partners Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Partners
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Strategic alliances that amplify our capabilities and extend our reach across markets.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {partners.map((partner) => (
                  <div key={partner.name} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {partner.name}
                      </h3>
                      <a 
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors mb-4 inline-block"
                      >
                        {partner.website}
                      </a>
                      <p className="text-muted-foreground">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Logos Section */}
            <section className="mt-20 mb-8">
              <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap max-w-4xl mx-auto">
                <div className="flex items-center justify-center h-16 w-32">
                  <img 
                    src={studiosLogo} 
                    alt="180 Studios" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img 
                    src={mooveLogo} 
                    alt="Moove" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img 
                    src={diwanLogo} 
                    alt="The Diwan" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-center h-16 w-32">
                  <img 
                    src={infntLogo} 
                    alt="Infnt" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ClientsPartners;