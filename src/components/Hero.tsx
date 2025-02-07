
import { useState } from "react";
import MainNav from "./MainNav";
import RequestInviteModal from "./request-invite/RequestInviteModal";
import EventBanner from "./hero/EventBanner";
import HeroContent from "./hero/HeroContent";
import AudienceCTAs from "./hero/AudienceCTAs";

const Hero = () => {
  console.log("Rendering Hero component");
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBanner />
      <MainNav />
      <HeroContent onRequestInvite={() => setShowRequestModal(true)} />
      <AudienceCTAs onRequestInvite={() => setShowRequestModal(true)} />
      {showRequestModal && (
        <RequestInviteModal 
          open={showRequestModal} 
          onOpenChange={setShowRequestModal} 
        />
      )}
    </div>
  );
};

export default Hero;
