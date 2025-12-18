import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import RequestInviteModal from "@/components/RequestInviteModal";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    if (searchParams.get('join') === 'true') {
      setShowRequestModal(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <NewsletterSignup />
      <Footer />
      <RequestInviteModal 
        open={showRequestModal} 
        onOpenChange={setShowRequestModal} 
      />
    </div>
  );
};

export default Index;
