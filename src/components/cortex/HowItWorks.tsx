import { trackEvent } from "@/lib/analytics";

const STEPS = [
  {
    num: "01",
    title: "Select the asset class",
    copy: "Cortex applies the right evaluation framework for your deal type. Not a generic checklist.",
  },
  {
    num: "02",
    title: "Upload your document",
    copy: "Any PDF. Pitch deck, fund memo, CIM, or information memorandum. The system handles the rest.",
  },
  {
    num: "03",
    title: "Receive your assessment",
    copy: "A structured report in under 5 minutes. Share, export, or apply for NIAS membership to unlock the full suite.",
  },
];

const HowItWorks = () => {
  const handleCTA = () => {
    trackEvent("assess_deal_click", {
      category: "cta_click",
      cta_name: "request_access",
      cta_location: "event_page",
      destination: "https://access.nias.io/cortex",
    });
  };

  return (
    <section className="bg-[#f5f3ef] py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#9a9a9a] mb-6">
          The Process
        </p>
        <h2
          className="text-[40px] md:text-[52px] leading-[1.1] text-[#0f0f0f] mb-16"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Three steps.
          <br />
          No onboarding call.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="relative">
              {/* Watermark number */}
              <span
                className="absolute -top-4 -left-2 text-[120px] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(201,168,76,0.08)" }}
              >
                {step.num}
              </span>
              <div className="relative z-10">
                <span className="text-[12px] text-[#c9a84c] tracking-wider font-medium">
                  {step.num}
                </span>
                <h3 className="text-[20px] font-semibold text-[#0f0f0f] mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#374151] leading-[1.65]">
                  {step.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://access.nias.io/cortex"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTA}
            className="inline-block bg-[#0f0f0f] text-white h-[48px] px-[24px] rounded-[4px] text-[14px] font-semibold leading-[48px] hover:bg-[#1a1a1a] transition-colors duration-200"
          >
            Assess Your Deal →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
