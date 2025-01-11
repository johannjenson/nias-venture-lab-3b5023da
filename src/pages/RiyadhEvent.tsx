import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import SocialProof from "@/components/SocialProof";
import EventInviteModal from "@/components/EventInviteModal";
import EventHero from "@/components/event/EventHero";
import EventOverview from "@/components/event/EventOverview";
import EventAudience from "@/components/event/EventAudience";
import EventRegistration from "@/components/event/EventRegistration";

const RiyadhEvent = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

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