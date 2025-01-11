import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MainNav from "./MainNav";
import RequestInviteModal from "./RequestInviteModal";
import { useState } from "react";

const Hero = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Back Link */}
      <a href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900">
        Back
      </a>

      {/* Event Banner */}
      <div className="bg-[#221F26] text-white text-center py-2 px-4">
        Join us in Riyadh on 20 February 2025.{" "}
        <a 
          href="/events/riyadh"
          className="underline font-medium hover:text-white/90"
        >
          Learn More
        </a>
      </div>

      {/* Navigation */}
      <MainNav />

      {/* Hero Content */}
      <div className="flex-1 flex items-center bg-secondary">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight text-[#221F26] mb-6">
              Land & Expand in Saudi Arabia
            </h1>
            <p className="text-lg text-[#555555] mb-12 max-w-2xl mx-auto">
              Empowering international companies to grow in alignment with Vision 2030.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
              <a 
                href="#about" 
                className="text-lg text-[#333333] font-medium flex items-center gap-2 hover:text-primary transition-colors"
              >
                Learn More <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Audience CTAs */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-secondary/30">
              <h3 className="text-xl font-semibold text-[#221F26] mb-4">Founders & Executives</h3>
              <p className="mb-6 text-gray-600">Take your business to the next level.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
            </div>
            <div className="text-center p-8 rounded-lg bg-secondary/30">
              <h3 className="text-xl font-semibold text-[#221F26] mb-4">Buyers & Investors</h3>
              <p className="mb-6 text-gray-600">Discover new opportunities.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white"
                onClick={() => setShowRequestModal(true)}
              >
                Request to Join
              </Button>
            </div>
            <div className="text-center p-8 rounded-lg bg-secondary/30">
              <h3 className="text-xl font-semibold text-[#221F26] mb-4">Advisors & Brokers</h3>
              <p className="mb-6 text-gray-600">Join our network of trusted partners.</p>
              <Button 
                variant="outline" 
                className="hover:bg-primary hover:text-white"
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