import { useState, useEffect, useCallback } from "react";
import { FileSearch, BarChart3, Globe, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  {
    icon: FileSearch,
    label: "Reading Document",
    description: "Uploading pitch deck...",
  },
  {
    icon: BarChart3,
    label: "Structuring Analysis",
    description: "Analyzing the deal...",
  },
  {
    icon: Globe,
    label: "Researching Market",
    description: "Market context...",
  },
  {
    icon: Sparkles,
    label: "Generating Report",
    description: "Synthesizing memo...",
  },
];

const ROTATING_WORDS = ["the first call.", "the term sheet.", "the next IC.", "the wire."];

const CortexHero = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    trackEvent("assess_deal_click", {
      category: "cta_click",
      cta_name: "request_access",
      cta_location: "event_page",
      destination: "https://access.nias.io/cortex",
    });
  };

  const currentStep = STEPS[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Gold accent line top */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mb-16" />

        {/* H1 */}
        <h1
          className="text-[44px] md:text-[56px] lg:text-[88px] leading-[1.1] font-normal text-[#f5f3ef] mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your next deal,{" "}
          <br className="hidden md:block" />
          pressure-tested before{" "}
          <br className="hidden md:block" />
          <span className="inline-block relative">
            {/* Invisible longest word to reserve space */}
            <span className="invisible">the investment committee.</span>
            <span
              className="absolute left-0 top-0 w-full transition-all duration-500"
              style={{ opacity: wordVisible ? 1 : 0, transform: wordVisible ? "translateY(0)" : "translateY(8px)" }}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        {/* Animated Cortex Meter — icon + label + dots */}
        <div className="flex flex-col items-center mb-10">
          {/* Pulsing icon circle */}
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full border border-[#2a2a2a] bg-[#1a1a1a]" />
            <div
              className="absolute inset-0 rounded-full border border-[#c9a84c]/20 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon
                className="w-8 h-8 text-[#c9a84c] transition-all duration-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Step label */}
          <p className="text-[13px] md:text-[15px] text-[#9ca3af] mb-1 transition-all duration-500 h-5">
            {currentStep.description}
          </p>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-3">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeStep
                    ? "w-6 bg-[#c9a84c]"
                    : i < activeStep
                    ? "w-1.5 bg-[#c9a84c]/40"
                    : "w-1.5 bg-[#3a3a3a]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Subhead */}
        <p className="text-[16px] md:text-[18px] text-[#9ca3af] max-w-[600px] mx-auto leading-[1.65] mb-10">
          Upload a pitch deck or fund memo. NIAS Cortex returns a structured due diligence assessment.
          Benchmarked against GCC precedents, aligned to Vision 2030, and ready for your investment committee.
        </p>

        {/* CTA */}
        <a
          href="https://access.nias.io/cortex"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTA}
          className="inline-block bg-[#c9a84c] text-[#0f0f0f] h-[48px] px-[20px] rounded-[4px] text-[14px] font-semibold leading-[48px] hover:bg-[#d4b65c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Assess Your Deal
        </a>

        {/* Micro-copy */}
        <p className="text-[11px] text-[#5a5a5a] mt-4">
          No account required. Results in under 3 minutes.
        </p>

        {/* Gold accent line bottom */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent mt-16" />
      </div>
    </section>
  );
};

export default CortexHero;
