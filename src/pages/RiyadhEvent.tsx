import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SocialProof from "@/components/SocialProof";
import { useState } from "react";
import RequestInviteModal from "@/components/RequestInviteModal";

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

      {/* Header Section */}
      <header className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
              Nias Business Forum
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Join us for an exclusive gathering of global business leaders and investors
              on February 20th, 2024 in Riyadh
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
              onClick={() => setShowRequestModal(true)}
            >
              Request an Invite
            </Button>
          </div>
        </div>
      </header>

      {/* Event Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                A Transformative Business Experience
              </h2>
              <p className="text-gray-600 mb-6">
                The Nias Business Forum brings together visionary leaders, innovative entrepreneurs, 
                and strategic investors for a day of meaningful connections and opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Strategic Networking</h3>
                    <p className="text-gray-600">Connect with decision-makers and industry leaders in an intimate setting.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Market Insights</h3>
                    <p className="text-gray-600">Gain valuable perspectives on the Saudi market and Vision 2030 opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Deal Flow</h3>
                    <p className="text-gray-600">Explore partnerships and investment opportunities with vetted businesses.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">Event Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">Date & Time</h4>
                  <p className="text-gray-600">February 20th, 2024 | 9:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Location</h4>
                  <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                  <p className="text-gray-600 text-sm">(Exact venue details shared upon registration)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Format</h4>
                  <p className="text-gray-600">Curated networking, panel discussions, and 1:1 meetings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Who Should Attend</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-lg bg-white">
              <h3 className="text-xl font-semibold text-primary mb-4">Business Leaders</h3>
              <p className="text-gray-600 mb-6">
                CEOs, founders, and executives looking to expand their operations into Saudi Arabia.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-white">
              <h3 className="text-xl font-semibold text-primary mb-4">Investors</h3>
              <p className="text-gray-600 mb-6">
                VCs, private equity firms, and strategic investors seeking opportunities aligned with Vision 2030.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-white">
              <h3 className="text-xl font-semibold text-primary mb-4">Industry Experts</h3>
              <p className="text-gray-600 mb-6">
                Advisors and professionals with deep expertise in Saudi market entry and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Registration Section */}
      <section id="register" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Request Your Invitation
            </h2>
            <p className="text-gray-600 mb-8">
              This exclusive event is limited to qualified business leaders and investors.
              Submit your details to request an invitation.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={() => setShowRequestModal(true)}
            >
              Request an Invite
            </Button>
          </div>
        </div>
      </section>

      {/* Request Invite Modal */}
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default RiyadhEvent;