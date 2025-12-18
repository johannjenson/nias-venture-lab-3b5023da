import { useState } from "react";
import RequestInviteModal from "./RequestInviteModal";
import EventBanner from "./hero/EventBanner";
import HeroContent from "./hero/HeroContent";
import AudienceCTAs from "./hero/AudienceCTAs";

const Hero = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBanner />
      <HeroContent />
      <AudienceCTAs />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Hero;
