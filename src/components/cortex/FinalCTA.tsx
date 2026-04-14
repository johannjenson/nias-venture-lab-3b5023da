import { trackEvent } from "@/lib/analytics";

const FinalCTA = () => {
  const handleCTA = () => {
    trackEvent("assess_deal_click", {
      category: "cta_click",
      cta_name: "request_access",
      cta_location: "event_page",
      destination: "https://access.nias.io/cortex",
    });
  };

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        {/* Gold rule */}
        <div className="w-24 h-px bg-[#c9a84c] mx-auto mb-16" />

        <h2
          className="text-[36px] md:text-[64px] leading-[1.05] text-[#f5f3ef] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Upload your first deal.
          <br />
          No account required.
        </h2>

        <p className="text-[16px] text-[#9ca3af] max-w-[480px] mx-auto leading-[1.65] mb-10">
          NIAS Cortex is free for your first assessment.
          Apply for membership to unlock the full due diligence suite.
        </p>

        <a
          href="https://access.nias.io/cortex"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTA}
          className="inline-block bg-[#c9a84c] text-[#0f0f0f] h-[56px] px-[24px] rounded-[4px] text-[14px] font-semibold leading-[56px] hover:bg-[#d4b65c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Assess Your Deal
        </a>

        <p className="text-[11px] font-mono text-[#5a5a5a] mt-4">
          access.nias.io/cortex
        </p>

        <a
          href="https://access.nias.io/investors"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-[13px] text-[#6b6b6b] hover:text-[#9ca3af] transition-colors"
        >
          Learn about NIAS membership →
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
