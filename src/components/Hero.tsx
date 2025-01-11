import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MainNav from "./MainNav";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/0a595b97-47d4-4ec2-be6e-c3a80a516ad7.png"
          alt="Saudi Arabia Landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation */}
      <MainNav />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white/95 backdrop-blur-sm p-12 max-w-3xl rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            LAND & EXPAND IN KSA
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl">
            We bring together exceptional companies from around the world looking to do business in the Kingdom with serial and exited entrepreneurs, strategic investors, and acquisitive funds from the Kingdom.
          </p>
          <div className="flex items-center gap-6">
            <Button
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={() => {
                const formElement = document.getElementById("signup-form");
                formElement?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request to Join
            </Button>
            <a 
              href="#learn-more" 
              className="text-lg text-gray-900 font-medium flex items-center gap-2 hover:text-primary transition-colors"
            >
              Learn more <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Event Banner */}
      <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 px-4">
        Join us in Riyadh on 20 February 2025.{" "}
        <a href="#request" className="underline font-medium hover:text-white/90">
          Request Your Invite
        </a>
      </div>
    </div>
  );
};

export default Hero;