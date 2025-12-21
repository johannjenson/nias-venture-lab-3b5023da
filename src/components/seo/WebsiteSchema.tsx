import { Helmet } from "react-helmet";

const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NIAS",
    "alternateName": "NIAS Network",
    "url": "https://nias.io",
    "description": "A private network for frontier tech, energy, sports, art, and entertainment companies expanding into Saudi Arabia and the Gulf region.",
    "publisher": {
      "@type": "Organization",
      "name": "NIAS",
      "url": "https://nias.io",
      "logo": "https://nias.io/nias-og-image.png"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nias.io/resources?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default WebsiteSchema;
