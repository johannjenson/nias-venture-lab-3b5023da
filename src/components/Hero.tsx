import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-primary text-white py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-fadeIn">
            Land & Expand in Saudi Arabia
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 animate-slideUp">
            Empowering international companies to grow in alignment with Vision 2030.
            Join our network of founders, investors, and advisors.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slideUp">
            <Button
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              onClick={() => {
                const formElement = document.getElementById("signup-form");
                formElement?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request to Join
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1A365D,#2A4A7F)]" />
    </div>
  );
};

export default Hero;