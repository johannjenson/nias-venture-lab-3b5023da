import React from "react";
import { Helmet } from "react-helmet";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import diwanLogo from "@/assets/diwan-logo.avif";
import studiosLogo from "@/assets/180-studios-logo.png";
import infntLogo from "@/assets/infnt-logo.svg";
import jizaalLogo from "@/assets/jizaal-logo.jpg";
import saudiTimesLogo from "@/assets/saudi-times-logo.png";

const ClientsPartners = () => {
  const navigate = useNavigate();

  const clients = [
    {
      name: "180 Studios",
      website: "180Studios.com",
      url: "https://180studios.com",
      description: "Supporting global expansion including strategic partnerships, go-to-market planning, and research for their Riyadh location while connecting the 180's global team with the city's thriving Tech, Creative, Art, and Entertainment ecosystems",
      logo: studiosLogo
    }
  ];

  const partners = [
    {
      name: "The Saudi Times",
      website: "thesauditimes.net",
      url: "https://thesauditimes.net",
      description: "Partnering with this leading news publication to share insights and stories about business, innovation, and development in Saudi Arabia",
      logo: saudiTimesLogo
    },
    {
      name: "The Diwan",
      website: "The-Diwan.com",
      url: "https://the-diwan.com", 
      description: "Collaborating with this non-profit organization and their high-level government networks to support business expansion into other Gulf States including Kuwait and Qatar",
      logo: diwanLogo
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
    <>
      <Helmet>
        <title>Clients & Partners - Nias</title>
        <meta name="description" content="Discover our trusted clients and strategic partners who collaborate with Nias to drive innovation and growth across industries." />
        <meta name="keywords" content="Nias clients, Nias partners, 180 Studios, The Diwan, Infnt, strategic partnerships" />
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

        {/* Hero Section */}
        <section className="pt-28 pb-16 bg-[#F8F3E8]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6">
                Clients & Partners
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                We support ambitious companies expanding into the Gulf region by connecting them with family offices, exited entrepreneurs, strategic investors, and acquisitive funds across Saudi Arabia and the broader GCC.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Clients Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Our Clients
                </h2>
              </div>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                {clients.map((client) => (
                  <div key={client.name} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-24 h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                        <img 
                          src={client.logo} 
                          alt={`${client.name} logo`} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {client.name}
                        </h3>
                        <a 
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors mb-3 inline-block text-sm font-medium"
                        >
                          {client.website}
                        </a>
                        <p className="text-gray-600">
                          {client.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Partners Section */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Our Partners
                </h2>
              </div>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                {partners.map((partner) => (
                  <div key={partner.name} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-24 h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`} 
                          className={`max-w-full max-h-full object-contain ${partner.name === 'The Diwan' ? 'filter invert' : ''}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {partner.name}
                        </h3>
                        <a 
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors mb-3 inline-block text-sm font-medium"
                        >
                          {partner.website}
                        </a>
                        <p className="text-gray-600">
                          {partner.description}
                        </p>
                      </div>
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