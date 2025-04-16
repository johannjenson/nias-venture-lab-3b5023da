
import { useState } from "react";
import Footer from "@/components/Footer";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const VSQRiyadhEvent = () => {
  const navigate = useNavigate();
  
  const handleRequestClick = () => {
    window.open('https://www.vntr.vc/events/riyadh-697', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>VentureSouq Riyadh Tech Week | Nias Network</title>
        <meta name="description" content="Join VentureSouq's founder dinner in Riyadh during Tech Week 2025 to connect with tech founders and investors." />
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
        {/* Hero Section */}
        <section className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-6 animate-fade-in">
                VentureSouq Tech Week Dinner
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in">
                An exclusive dinner for tech founders and investors during Riyadh Tech Week 2025
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
                onClick={handleRequestClick}
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
                  Join Us for an Evening of Connections
                </h2>
                <p className="text-gray-600 mb-8">
                  VentureSouq is hosting an exclusive dinner for tech founders and investors during Riyadh Tech Week 2025. This is an opportunity to connect with fellow entrepreneurs, share insights, and explore potential collaborations in the Saudi tech ecosystem.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">When</h3>
                    <p className="text-gray-600">October 14th, 2025 | 7:00 PM - 11:00 PM</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Where</h3>
                    <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-600 text-sm">(Venue details shared upon registration)</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Format</h3>
                    <p className="text-gray-600">
                      An intimate dinner with founders, investors, and industry experts
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">About VentureSouq</h3>
                <p className="text-gray-600 mb-4">
                  VentureSouq (VSQ) is a GCC-based venture capital firm with a portfolio of 200+ technology companies across the Middle East, North Africa, South Asia, and global emerging markets.
                </p>
                <p className="text-gray-600">
                  This dinner is part of VSQ's community initiatives to foster connections between founders and investors in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Request Your Invitation
              </h2>
              <p className="text-gray-600 mb-8">
                This exclusive dinner is limited to founders, investors, and selected industry leaders.
                Submit your details to request an invitation.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={handleRequestClick}
              >
                Request an Invite
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VSQRiyadhEvent;
