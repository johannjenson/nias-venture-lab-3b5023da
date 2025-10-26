import { Helmet } from "react-helmet";

const EventSEO = () => {
  return (
    <Helmet>
      <title>Night Cap at The Greek Villa - Private Gathering for Investors | Riyadh</title>
      <meta name="description" content="Join us for Night Cap at The Greek Villa, an exclusive evening gathering on October 27-28, 2025. Hosted by The Diwan (Saad Altami) and Nias.io (Johann Jenson), connecting family offices, investors, and dignitaries." />
      <meta property="og:title" content="Night Cap at The Greek Villa - Private Gathering for Investors" />
      <meta property="og:description" content="An intimate evening gathering at The Greek Villa. Connect with family offices, investors, and dignitaries from 8pm to 2am." />
      <meta property="og:type" content="event" />
      <meta property="og:url" content="https://nias.io/events/night-cap" />
      <meta property="og:image" content="https://nias.io/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Night Cap at The Greek Villa - Private Gathering for Investors" />
      <meta name="twitter:description" content="An intimate evening gathering at The Greek Villa. Connect with family offices, investors, and dignitaries." />
      <meta name="twitter:image" content="https://nias.io/og-image.png" />
    </Helmet>
  );
};

export default EventSEO;
