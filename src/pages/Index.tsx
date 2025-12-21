import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import RequestInviteModal from "@/components/RequestInviteModal";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";

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
      <Helmet>
        <title>NIAS - Do Good Things For Good People | Saudi Arabia Business Network</title>
        <meta name="description" content="NIAS is a private network for frontier tech, energy, sports, art, and entertainment companies from around the world looking to do business in Saudi Arabia." />
        <meta property="og:title" content="NIAS - Do Good Things For Good People" />
        <meta property="og:description" content="A private network for frontier tech, energy, sports, art, and entertainment companies expanding into Saudi Arabia and the Gulf region." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nias.io" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NIAS - Do Good Things For Good People" />
        <meta name="twitter:description" content="A private network for frontier tech, energy, sports, art, and entertainment companies expanding into Saudi Arabia." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io" />
      </Helmet>
      <OrganizationSchema />
      <WebsiteSchema />
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
