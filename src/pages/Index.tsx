
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";
import RequestInviteModal from "@/components/RequestInviteModal";
import { useLocation, useSearchParams } from "react-router-dom";

const Index = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if the URL has a 'join=true' parameter
    if (searchParams.get('join') === 'true') {
      setShowRequestModal(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Hero openRequestModal={() => setShowRequestModal(true)} />
      <ValueProps openRequestModal={() => setShowRequestModal(true)} />
      <Footer />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Index;
