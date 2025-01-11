import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MainNav from "./MainNav";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-secondary">
      {/* Navigation */}
      <MainNav />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-[#221F26] mb-6">
            LAND & EXPAND IN KSA
          </h1>
          <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
            Empowering international companies to grow in alignment with Vision 2030.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Button
              className="bg-[#16A7D5] hover:bg-[#16A7D5]/90 text-white px-8 py-6 text-lg"
              onClick={() => {
                const formElement = document.getElementById("signup-form");
                formElement?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request to Join
            </Button>
            <a 
              href="#learn-more" 
              className="text-lg text-[#333333] font-medium flex items-center gap-2 hover:text-[#16A7D5] transition-colors"
            >
              Learn more <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Event Banner */}
      <div className="absolute top-0 left-0 right-0 bg-[#221F26] text-white text-center py-2 px-4">
        Join us in Riyadh on 20 February 2025.{" "}
        <a href="#request" className="underline font-medium hover:text-white/90">
          Request Your Invite
        </a>
      </div>
    </div>
  );
};

export default Hero;