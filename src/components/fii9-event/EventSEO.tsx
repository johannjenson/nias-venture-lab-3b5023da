import { Helmet } from "react-helmet";

const EventSEO = () => {
  return (
    <Helmet>
      <title>FII9 Recap: Celebrating Saudi Innovation - Exclusive Private Gathering in Riyadh</title>
      <meta name="description" content="Join us for an exclusive FII9 recap celebration at The Majlis, The Garage on October 29th. Hosted by EAST40, Avra, and NTDP, featuring global innovation leaders including H.H. Prince Khalid Bin Bader Al Saud and Ibrahim Neaz." />
      <meta property="og:title" content="FII9 Recap: Celebrating Saudi Innovation" />
      <meta property="og:description" content="Exclusive private gathering celebrating Avra's cohort and Saudi Arabia's innovation ecosystem. Intimate networking with global founders and Saudi leaders." />
      <meta property="og:type" content="event" />
      <meta property="og:url" content="https://nias.io/events/fii9-recap" />
      <meta property="og:image" content="https://nias.io/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="FII9 Recap: Celebrating Saudi Innovation" />
      <meta name="twitter:description" content="Exclusive private gathering celebrating Avra's cohort and Saudi Arabia's innovation ecosystem at The Garage, Riyadh." />
      <meta name="twitter:image" content="https://nias.io/og-image.png" />
    </Helmet>
  );
};

export default EventSEO;
