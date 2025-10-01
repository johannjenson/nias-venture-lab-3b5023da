import { Helmet } from "react-helmet";

const EventSEO = () => {
  return (
    <Helmet>
      <title>Canvases & Capital: Art & Wealth - Exclusive Event in Riyadh</title>
      <meta name="description" content="Join us for an exclusive evening exploring Saudi contemporary art and wealth management with Jennifer Wines, Othman Al-Khozaim, Ahmed Mater, Nidaa Hanifa, and Sarah Albaiz at J17 in JAX, Riyadh on October 25th." />
      <meta property="og:title" content="Canvases & Capital: Art & Wealth" />
      <meta property="og:description" content="Exclusive gathering featuring distinguished artists and wealth management leaders. Three panels exploring Saudi contemporary art and art as investment asset." />
      <meta property="og:type" content="event" />
      <meta property="og:url" content="https://nias.io/events/art-wealth-management" />
      <meta property="og:image" content="https://nias.io/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Canvases & Capital: Art & Wealth" />
      <meta name="twitter:description" content="Exclusive gathering featuring distinguished artists and wealth management leaders at J17 in JAX, Riyadh." />
      <meta name="twitter:image" content="https://nias.io/og-image.png" />
    </Helmet>
  );
};

export default EventSEO;
