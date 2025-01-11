import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-fadeIn">
            Land & Expand in Saudi Arabia
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-100 animate-slideUp">
            Empowering international companies to grow in alignment with Vision 2030.
            Join our network of founders, investors, and advisors.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slideUp">
            <Button
              className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg group transition-all duration-300"
              onClick={() => {
                const formElement = document.getElementById("signup-form");
                formElement?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request to Join
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-20">
        <img
          src="/lovable-uploads/001f9ae1-9f2f-4f69-96da-77ae7a562316.png"
          alt="Wave Pattern"
          className="h-full w-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default Hero;