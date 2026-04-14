import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  "Reading Document",
  "Structuring Analysis",
  "Researching Market",
  "Generating Report",
];

const CortexHero = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= STEPS.length - 1) {
          setDone(true);
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 750);
    return () => clearInterval(timer);
  }, [done]);

  const handleCTA = () => {
    trackEvent("assess_deal_click", {
      category: "cta_click",
      cta_name: "request_access",
      cta_location: "event_page",
      destination: "https://access.nias.io/cortex",
    });
  };

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

        {/* Eyebrow */}
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9a84c] mb-8">
          NIAS Cortex
        </p>

        {/* H1 */}
        <h1
          className="text-[44px] md:text-[56px] lg:text-[88px] leading-[1.1] font-normal text-[#f5f3ef] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your next deal,{" "}
          <br className="hidden md:block" />
          pressure-tested before{" "}
          <br className="hidden md:block" />
          the first meeting.
        </h1>

        {/* Cortex Meter */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2 md:gap-4">
              <span
                className={`text-[11px] md:text-[13px] tracking-wide transition-colors duration-500 ${
                  i <= activeStep ? "text-[#c9a84c]" : "text-[#3a3a3a]"
                }`}
              >
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span className="text-[#2a2a2a] text-[10px]">→</span>
              )}
            </div>
          ))}
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
