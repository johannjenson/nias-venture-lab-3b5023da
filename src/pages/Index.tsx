
import React from "react";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="min-h-screen bg-white">
      <div>
        <Hero />
      </div>
      <div>
        <ValueProps />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
