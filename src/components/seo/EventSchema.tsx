import { Helmet } from "react-helmet";

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  url: string;
  image?: string;
  organizer?: string;
  eventStatus?: "EventScheduled" | "EventCancelled" | "EventPostponed" | "EventRescheduled";
  eventAttendanceMode?: "OfflineEventAttendanceMode" | "OnlineEventAttendanceMode" | "MixedEventAttendanceMode";
}

const EventSchema = ({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  image = "https://nias.io/nias-og-image.png",
  organizer = "NIAS",
  eventStatus = "EventScheduled",
  eventAttendanceMode = "OfflineEventAttendanceMode"
}: EventSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate || startDate,
    "eventStatus": `https://schema.org/${eventStatus}`,
    "eventAttendanceMode": `https://schema.org/${eventAttendanceMode}`,
    "location": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address,
        "addressLocality": location.city,
        "addressCountry": location.country
      }
    },
    "image": image,
    "url": url,
    "organizer": {
      "@type": "Organization",
      "name": organizer,
      "url": "https://nias.io"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InviteOnly",
      "validFrom": new Date().toISOString()
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

export default EventSchema;
