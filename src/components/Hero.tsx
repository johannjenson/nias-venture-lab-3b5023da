import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import MainNav from "./MainNav";
import RequestInviteModal from "./RequestInviteModal";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Event Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#221F26] text-white text-center py-3 px-4">
          <div className="relative max-w-7xl mx-auto">
            <span className="text-sm md:text-base">
              On February 20th, 2025, join us for an exclusive gathering of global business leaders and investors in Riyadh.{" "}
              <a 
                href="/events/riyadh"
                className="underline font-medium hover:text-white/90"
              >
                Learn More
              </a>
            </span>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <MainNav />

      {/* Hero Content */}
      <div className="flex-1 flex items-center bg-secondary pt-32 md:pt-16">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#221F26] mb-6">
              Land & Expand in Saudi Arabia
            </h1>
            <p className="text-base md:text-lg text-[#555555] mb-8 md:mb-12 max-w-2xl mx-auto">
              Bringing together exceptional companies from around the world looking to do business in the Kingdom with serial and exited entrepreneurs, strategic investors, and acquisitive funds.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg w-full md:w-auto"
                onClick={() => setShowRequestModal(true)}
              >
                Join the Nias Network
              </Button>
              <a 
                href="/resources"
                className="text-base md:text-lg text-[#333333] font-medium flex items-center gap-2 hover:text-primary transition-colors"
              >
                View Opportunities <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Audience CTAs */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
              <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Founders & Executives</h3>
              <p className="mb-6 text-gray-600">Take your business to the next level.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white w-full md:w-auto"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
            </div>
            <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
              <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Buyers & Investors</h3>
              <p className="mb-6 text-gray-600">Discover new opportunities.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white w-full md:w-auto"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
            </div>
            <div className="text-center p-6 md:p-8 rounded-lg bg-secondary/30">
              <h3 className="text-lg md:text-xl font-semibold text-[#221F26] mb-4">Advisors & Brokers</h3>
              <p className="mb-6 text-gray-600">Join our network of trusted partners.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white w-full md:w-auto"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Invite Modal */}
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Hero;