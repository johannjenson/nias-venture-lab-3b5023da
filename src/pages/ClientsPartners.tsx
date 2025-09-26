import React from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";

const ClientsPartners = () => {
  const clients = [
    {
      name: "180 Studios",
      website: "180Studios.com",
      url: "https://180studios.com",
      description: "London's creative powerhouse and premier immersive arts venue"
    },
    {
      name: "Moove",
      website: "Moove.io", 
      url: "https://moove.io",
      description: "Mobility-as-a-Service platform transforming urban transportation"
    }
  ];

  const partners = [
    {
      name: "The Diwan",
      website: "The-Diwan.com",
      url: "https://the-diwan.com", 
      description: "Strategic advisory and investment platform"
    },
    {
      name: "Infnt",
      website: "infntsolutions.com",
      url: "https://infntsolutions.com",
      description: "Innovative technology solutions and digital transformation"
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

      <div className="min-h-screen bg-background">
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
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ClientsPartners;