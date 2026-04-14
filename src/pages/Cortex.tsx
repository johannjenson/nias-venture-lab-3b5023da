import { Helmet } from "react-helmet";
import CortexHero from "@/components/cortex/CortexHero";

import ReportPreview from "@/components/cortex/ReportPreview";
import AssetClasses from "@/components/cortex/AssetClasses";
import HowItWorks from "@/components/cortex/HowItWorks";
import DDAgentTeam from "@/components/cortex/DDAgentTeam";
import GCCContext from "@/components/cortex/GCCContext";
import TrustArchitecture from "@/components/cortex/TrustArchitecture";
import FinalCTA from "@/components/cortex/FinalCTA";
import CortexFooter from "@/components/cortex/CortexFooter";

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
        <meta property="og:url" content="https://nias.io/cortex" />
        <link rel="canonical" href="https://nias.io/cortex" />
      </Helmet>

      <div className="cortex-page bg-[#0f0f0f] text-[#f5f3ef] min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
        <CortexHero />
        <ReportPreview />
        <AssetClasses />
        <HowItWorks />
        <DDAgentTeam />
        <GCCContext />
        <TrustArchitecture />
        <FinalCTA />
        <CortexFooter />
      </div>
    </>
  );
};

export default Cortex;
