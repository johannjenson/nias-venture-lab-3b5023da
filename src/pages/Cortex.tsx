import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CortexHero from "@/components/cortex/CortexHero";

import ReportPreview from "@/components/cortex/ReportPreview";
import AssetClasses from "@/components/cortex/AssetClasses";
import HowItWorks from "@/components/cortex/HowItWorks";
import DDAgentTeam from "@/components/cortex/DDAgentTeam";
import GCCContext from "@/components/cortex/GCCContext";
import TrustArchitecture from "@/components/cortex/TrustArchitecture";
import FinalCTA from "@/components/cortex/FinalCTA";
import Footer from "@/components/Footer";

const Cortex = () => {
  return (
    <>
      <Helmet>
        <title>NIAS Cortex — AI Due Diligence for GCC Capital Allocators</title>
        <meta
          name="description"
          content="Upload any pitch deck or fund memo. NIAS Cortex delivers a structured, GCC-contextualised due diligence assessment in minutes. Built for family offices, allocators, and founders operating in Saudi Arabia and the Gulf."
        />
        <meta property="og:title" content="NIAS Cortex — AI Due Diligence for GCC Capital Allocators" />
        <meta
          property="og:description"
          content="Upload any pitch deck or fund memo. NIAS Cortex delivers a structured, GCC-contextualised due diligence assessment in minutes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nias.io/nias-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NIAS Cortex — AI Due Diligence for GCC Capital Allocators" />
        <meta name="twitter:description" content="Upload any pitch deck or fund memo. Get a structured, GCC-contextualised due diligence assessment in minutes." />
        <meta name="twitter:image" content="https://nias.io/nias-og-image.png" />
        <link rel="canonical" href="https://nias.io/cortex" />
      </Helmet>

      <div className="cortex-page bg-[#0f0f0f] text-[#f5f3ef] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Link
          to="/"
          className="fixed top-6 left-6 z-50 flex items-center gap-1.5 text-[13px] text-[#5a5a5a] hover:text-[#f5f3ef] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>nias.io</span>
        </Link>
        <CortexHero />
        <ReportPreview />
        <AssetClasses />
        <HowItWorks />
        <DDAgentTeam />
        <GCCContext />
        <TrustArchitecture />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
};

export default Cortex;
