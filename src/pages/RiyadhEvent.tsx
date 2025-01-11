import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
      {/* Event Banner */}
      <div className="bg-[#221F26] text-white text-center py-2 px-4">
        Join us for an exclusive gathering of global business leaders and investors
        on February 20th, 2024 in Riyadh.{" "}
      </div>

      {/* Back to Home */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-14 left-4 z-50"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Event Components */}
      <EventHero onRequestInvite={() => setShowRequestModal(true)} />
      <EventOverview />
      <EventAudience />
      <EventRegistration onRequestInvite={() => setShowRequestModal(true)} />

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Worked with companies from</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">23 countries</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Revenue generated</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$700M</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Raised and deployed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$1.7B</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Request Invite Modal */}
      <EventInviteModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
      />
    </div>
  );
};

export default RiyadhEvent;