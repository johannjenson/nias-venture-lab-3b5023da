
import { useState } from "react";
import EventInviteModal from "@/components/event-invite/EventInviteModal";
import Footer from "@/components/Footer";
import { BackButton } from "@/components/ui/back-button";
import EventHero from "@/components/event/EventHero";
import EventOverview from "@/components/event/EventOverview";
import EventAudience from "@/components/event/EventAudience";
import EventRegistration from "@/components/event/EventRegistration";

const RiyadhEvent = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 bg-secondary border-b z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center px-6">
          <BackButton />
        </div>
      </div>

      <main className="pt-16">
        <EventHero
          onRequestInvite={() => setShowRequestModal(true)}
        />
        <EventOverview />
        <EventAudience />
        <EventRegistration 
          onRequestInvite={() => setShowRequestModal(true)}
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

export default RiyadhEvent;
