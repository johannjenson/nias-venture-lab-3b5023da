const AGENTS = [
  { name: "Market & Strategy Analyst", focus: "Addressable market, competitive dynamics, and positioning" },
  { name: "Financial & Unit Economics Analyst", focus: "Revenue model, margins, capital efficiency, and projections" },
  { name: "Product & Technology Analyst", focus: "Defensibility, technical architecture, and product-market fit" },
  { name: "Management & Governance Analyst", focus: "Team quality, board composition, and governance structure" },
  { name: "Saudi Strategic Fit Analyst", focus: "Vision 2030 alignment, regulatory context, and local partnerships" },
];

const DDAgentTeam = () => {
  return (
    <section className="bg-[#0f0f0f] py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c] mb-6">
              For Members
            </p>
            <h2
              className="text-[40px] md:text-[52px] leading-[1.1] text-[#f5f3ef] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Five analysts.
              <br />
              One verdict.
            </h2>
            <div className="space-y-5 text-[15px] text-[#9ca3af] leading-[1.7] max-w-[480px]">
              <p>
                NIAS members run a full DD Agent Team against every deal.
                Five specialist analysts working in sequence, each delivering a structured verdict.
              </p>
              <p>
                The synthesis surfaces a final signal: High Conviction, Selective Fit, Monitor, or Pass.
              </p>
            </div>
            <a
              href="https://access.nias.io/investors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-[13px] text-[#c9a84c] hover:text-[#d4b65c] transition-colors"
            >
              Apply for Membership →
            </a>
          </div>

          {/* Right — stacked agent cards */}
          <div className="relative">
            <div className="space-y-[-8px]">
              {AGENTS.map((agent, i) => (
                <div
                  key={agent.name}
                  className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 shadow-lg"
                  style={{
                    marginLeft: `${i * 8}px`,
                    zIndex: AGENTS.length - i,
                  }}
                >
                  <h4 className="text-[13px] font-semibold text-[#f5f3ef]">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] text-[#6b6b6b] mt-1">{agent.focus}</p>
                </div>
              ))}
            </div>
            {/* Members only chip */}
            <div className="mt-4 flex justify-end">
              <span className="text-[10px] text-[#5a5a5a] bg-[#2a2a2a] px-3 py-1 rounded-full">
                Members only
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DDAgentTeam;
