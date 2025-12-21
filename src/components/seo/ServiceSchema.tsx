import { Helmet } from "react-helmet";

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string[];
}

const ServiceSchema = ({
  name,
  description,
  url,
  provider = "NIAS",
  areaServed = ["Saudi Arabia", "Gulf Cooperation Council"]
}: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://nias.io"
    },
    "areaServed": areaServed.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "serviceType": "Business Advisory"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default ServiceSchema;
