
import { useState } from "react";
import { Helmet } from "react-helmet";
import EventInviteModal from "@/components/event-invite/EventInviteModal";
import Footer from "@/components/Footer";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ForumHero from "@/components/event/EventHero";
import ForumOverview from "@/components/event/EventOverview";
import ForumAudience from "@/components/event/EventAudience";
import ForumRegistration from "@/components/event/EventRegistration";

const RiyadhForum = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();

  const handleRequestClick = () => {
    window.open('https://lu.ma/0zeu2i1e', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>NIAS Business Forum Riyadh | Exclusive Networking Event</title>
        <meta name="description" content="Join the NIAS Business Forum in Riyadh — an exclusive gathering for founders, investors, and business leaders exploring opportunities in Saudi Arabia." />
        <meta property="og:title" content="NIAS Business Forum Riyadh" />
        <meta property="og:description" content="Exclusive networking event for founders, investors, and business leaders in Riyadh." />
        <meta property="og:type" content="event" />
        <meta property="og:url" content="https://nias.io/events/nias-business-forum" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NIAS Business Forum Riyadh" />
        <meta name="twitter:description" content="Exclusive networking event for founders, investors, and business leaders in Riyadh." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io/events/nias-business-forum" />
      </Helmet>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <button 
            onClick={() => navigate('/')} 
            className="hover:opacity-80 transition-opacity"
          >
            <Waves className="h-8 w-8 text-primary" />
          </button>
        </div>
      </div>

      <main className="pt-16">
        <ForumHero
          onRequestInvite={handleRequestClick}
        />
        <ForumOverview />
        <ForumAudience />
        <ForumRegistration 
          onRequestInvite={handleRequestClick}
        />
      </main>

      <Footer />

      <EventInviteModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
      />
    </div>
  );
};

export default RiyadhForum;
