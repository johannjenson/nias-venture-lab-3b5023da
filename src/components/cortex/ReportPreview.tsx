const CHIPS = [
  "Asset-class specific criteria",
  "Vision 2030 alignment check",
  "Competitive benchmarking",
  "Market sizing",
  "Management assessment",
  "Red flag index",
];

const ReportPreview = () => {
  return (
    <section className="bg-[#0f0f0f] py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left copy — 3 columns */}
          <div className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c] mb-6">
              The Output
            </p>
            <h2
              className="text-[36px] md:text-[48px] leading-[1.1] text-[#f5f3ef] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A full due diligence brief,
              <br />
              not a summary card.
            </h2>
            <div className="space-y-5 text-[15px] text-[#9ca3af] leading-[1.7] max-w-[520px]">
              <p>
                Cortex structures your document across the criteria that matter most for your asset class.
                Whether that is a growth-stage company, a PE fund, or a real estate vehicle.
              </p>
              <p>
                Each section is scored, sourced, and cross-referenced against live GCC market data.
                Red flags are surfaced. Opportunities are named.
              </p>
              <p>
                The output is formatted for immediate use: share with your IC, annotate it, or export it as a PDF with one click.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="text-[12px] text-[#9ca3af] border border-[#2a2a2a] rounded-full px-4 py-1.5"
                >
                  {chip}
                </span>
              ))}
            </div>

            <a
              href="https://access.nias.io/cortex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-[13px] text-[#c9a84c] hover:text-[#d4b65c] transition-colors"
            >
              See a sample report →
            </a>
          </div>

          {/* Right — report mockup */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-1 shadow-2xl transform lg:rotate-1">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#2a2a2a]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                <span className="text-[10px] text-[#5a5a5a] ml-3 font-mono">access.nias.io/cortex</span>
              </div>
              {/* Fake report content */}
              <div className="bg-[#faf9f7] rounded-b-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#0f0f0f] tracking-wider uppercase">NIAS Cortex Assessment</span>
                  <span className="text-[10px] text-[#c9a84c] font-medium">HIGH CONVICTION</span>
                </div>
                <div className="h-px bg-[#e5e3df]" />
                {["Market Opportunity", "Financial Analysis", "Management Team", "Saudi Strategic Fit", "Risk Assessment"].map((label) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] text-[#374151]">{label}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          className={`w-3 h-1.5 rounded-sm ${
                            n <= 4 ? "bg-[#c9a84c]" : "bg-[#e5e3df]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="h-px bg-[#e5e3df]" />
                <div className="space-y-1">
                  <div className="h-2 bg-[#e5e3df] rounded w-full" />
                  <div className="h-2 bg-[#e5e3df] rounded w-4/5" />
                  <div className="h-2 bg-[#e5e3df] rounded w-3/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPreview;
