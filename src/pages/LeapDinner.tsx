
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DinnerInviteModal from "@/components/DinnerInviteModal";
import Footer from "@/components/Footer";
import { BackButton } from "@/components/ui/back-button";

const LeapDinner = () => {
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
        {/* Hero Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                Nias Network Dinner at LEAP
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                Join us for an exclusive dinner gathering of global business leaders and investors
                on February 9th, 2025 in Riyadh
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
                onClick={() => setShowRequestModal(true)}
              >
                Request an Invite
              </Button>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Connect with Industry Leaders
                </h2>
                <p className="text-gray-600 mb-8">
                  In the lead up to four days of innovation and technology at LEAP 2024, join the Nias Network
                  for an intimate dinner with fellow business leaders, investors, and industry experts.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">When</h3>
                    <p className="text-gray-600">February 9th, 2025 | 7:00 PM - 1:00 AM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Where</h3>
                    <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-600 text-sm">(Venue details shared upon registration)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Format</h3>
                    <p className="text-gray-600">
                      An evening of curated networking and meaningful conversations over dinner
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">About LEAP 2024</h3>
                <p className="text-gray-600 mb-4">
                  LEAP is one of the world's largest technology events, bringing together the global
                  technology community to discuss the latest trends, innovations, and opportunities
                  in the digital economy.
                </p>
                <p className="text-gray-600">
                  The Nias team will be attending LEAP's daytime sessions and evening events from
                  February 9-12.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <DinnerInviteModal
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
      />
    </div>
  );
};

export default LeapDinner;
