import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SocialProof from "@/components/SocialProof";
import EventInviteModal from "@/components/EventInviteModal";
import EventHero from "@/components/event/EventHero";
import EventOverview from "@/components/event/EventOverview";
import EventAudience from "@/components/event/EventAudience";
import EventRegistration from "@/components/event/EventRegistration";

const RiyadhEvent = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <div className="bg-[#221F26] text-white text-center py-2 px-4">
        Limited spots available.{" "}
        <button 
          onClick={() => setShowRequestModal(true)}
          className="underline font-medium hover:text-white/90"
        >
          Request Your Invite
        </button>
      </div>

      {/* Back to Home */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Event Components */}
      <EventHero onRequestInvite={() => setShowRequestModal(true)} />
      <EventOverview />
      <EventAudience />
      <SocialProof />
      <EventRegistration onRequestInvite={() => setShowRequestModal(true)} />

      {/* Event Invite Modal */}
      <EventInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default RiyadhEvent;