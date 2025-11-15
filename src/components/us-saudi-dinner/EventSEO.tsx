import { Helmet } from "react-helmet";

const EventSEO = () => {
  return (
    <Helmet>
      <title>NIAS VIP Dinner: US-Saudi Investment Forum | Exclusive Evening in Washington D.C.</title>
      <meta name="description" content="Join NIAS for an exclusive VIP dinner on November 18, 2025, in Central DC. Limited to 15 select business leaders, investors, and government officials on the eve of the US-Saudi Investment Forum." />
      <meta property="og:title" content="NIAS VIP Dinner: US-Saudi Investment Forum" />
      <meta property="og:description" content="Exclusive dinner for business leaders, investors, and officials shaping US-Saudi economic relations. November 18, 2025, Washington D.C." />
      <meta property="og:type" content="event" />
      <meta property="og:url" content="https://nias.io/events/us-saudi-forum-dinner" />
      <meta property="og:image" content="https://nias.io/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NIAS VIP Dinner: US-Saudi Investment Forum" />
      <meta name="twitter:description" content="Exclusive dinner for business leaders, investors, and officials shaping US-Saudi economic relations. November 18, 2025, Washington D.C." />
      <meta name="twitter:image" content="https://nias.io/og-image.png" />
    </Helmet>
  );
};

export default EventSEO;
