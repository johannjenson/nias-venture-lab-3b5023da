import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import RequestInviteModal from "@/components/RequestInviteModal";
import { useSearchParams, useLocation } from "react-router-dom";

const Index = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  useEffect(() => {
    if (searchParams.get('join') === 'true') {
      setShowRequestModal(true);
    }
  }, [searchParams]);

  // Handle hash navigation (e.g., /#network)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Footer />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Index;
