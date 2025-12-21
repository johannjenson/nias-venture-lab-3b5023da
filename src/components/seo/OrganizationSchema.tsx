import { Helmet } from "react-helmet";

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NIAS",
    "alternateName": "NIAS Network",
    "url": "https://nias.io",
    "logo": "https://nias.io/nias-og-image.png",
    "description": "A private network for frontier tech, energy, sports, art, and entertainment companies expanding into Saudi Arabia and the Gulf region.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Johann Jenson",
        "jobTitle": "Founding Partner",
        "sameAs": "https://www.linkedin.com/in/johannjenson/"
      },
      {
        "@type": "Person",
        "name": "Ibrahim Alshuwaier",
        "jobTitle": "Founding Partner"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      {
        "@type": "Place",
        "name": "Gulf Cooperation Council"
      }
    ],
    "knowsAbout": [
      "Saudi Arabia Business",
      "Vision 2030",
      "Gulf Market Entry",
      "Strategic Partnerships",
      "Investment Advisory"
    ],
    "sameAs": [
      "https://access.nias.io"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;
