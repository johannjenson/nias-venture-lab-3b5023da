
import { useState } from "react";
import MainNav from "./MainNav";
import RequestInviteModal from "./RequestInviteModal";
import EventBanner from "./hero/EventBanner";
import HeroContent from "./hero/HeroContent";
import AudienceCTAs from "./hero/AudienceCTAs";

interface HeroProps {
  openRequestModal: () => void;
}

const Hero = ({ openRequestModal }: HeroProps) => {
  console.log("Rendering Hero component");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleRequestInvite = () => {
    setShowRequestModal(true);
    openRequestModal();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBanner />
      <MainNav />
      <HeroContent onRequestInvite={handleRequestInvite} />
      <AudienceCTAs onRequestInvite={handleRequestInvite} />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Hero;
