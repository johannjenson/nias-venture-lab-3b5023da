import { Helmet } from "react-helmet";

interface Person {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  linkedIn?: string;
}

interface PersonSchemaProps {
  people: Person[];
}

const PersonSchema = ({ people }: PersonSchemaProps) => {
  const schema = people.map(person => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "image": person.image,
    "worksFor": {
      "@type": "Organization",
      "name": "NIAS",
      "url": "https://nias.io"
    },
    ...(person.linkedIn && { "sameAs": [person.linkedIn] })
  }));

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default PersonSchema;
