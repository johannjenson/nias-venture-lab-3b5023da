import { Helmet } from "react-helmet";

const EventSEO = () => {
  return (
    <Helmet>
      <title>Night Cap - Informal Evening Gathering at Al Mahdiya | Riyadh</title>
      <meta name="description" content="Join us for Night Cap, an informal evening gathering at Al Mahdiya on October 27-28, 2025. Hosted by The Diwan and Nias.io, featuring special guests and meaningful connections." />
      <meta property="og:title" content="Night Cap - Informal Evening Gathering at Al Mahdiya" />
      <meta property="og:description" content="An intimate evening gathering at Al Mahdiya in Riyadh. Join innovators and leaders for relaxed conversations from 8pm to 2am." />
      <meta property="og:type" content="event" />
      <meta property="og:url" content="https://nias.io/events/night-cap" />
      <meta property="og:image" content="https://nias.io/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Night Cap - Informal Evening Gathering at Al Mahdiya" />
      <meta name="twitter:description" content="An intimate evening gathering at Al Mahdiya in Riyadh. Join innovators and leaders for relaxed conversations." />
      <meta name="twitter:image" content="https://nias.io/og-image.png" />
    </Helmet>
  );
};

export default EventSEO;
