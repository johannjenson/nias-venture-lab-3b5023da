import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import RequestInviteModal from "@/components/RequestInviteModal";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (searchParams.get('join') === 'true') {
      setShowRequestModal(true);
    }
  }, [searchParams]);

  // Handle newsletter confirmation
  useEffect(() => {
    if (searchParams.get('confirmed') === 'true') {
      toast({
        title: "Subscription Confirmed!",
        description: "Thank you for confirming your subscription. You'll receive our guide and updates soon.",
        duration: 6000,
      });
      // Clean up the URL
      navigate('/', { replace: true });
    }
  }, [searchParams, toast, navigate]);

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
