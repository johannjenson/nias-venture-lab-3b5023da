const COLUMNS = [
  {
    title: "GCC-native framework",
    body: "Every assessment is benchmarked against regional deal precedents, not Silicon Valley comps.",
  },
  {
    title: "Vision 2030 alignment",
    body: "Regulatory context, Saudization requirements, and sovereign priority sectors built into every report.",
  },
  {
    title: "Arabic-language support",
    body: "Full bilingual output. Share with Saudi counterparts in either language.",
  },
];

const GCCContext = () => {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 px-6 overflow-hidden">
      {/* Arabian Peninsula SVG texture */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <svg viewBox="0 0 400 400" className="w-[600px] h-[600px]" fill="none" stroke="#c9a84c" strokeWidth="0.5">
          <path d="M200 80 L260 120 L280 180 L300 240 L280 300 L240 340 L200 360 L160 340 L140 300 L120 260 L140 200 L160 140 Z" />
          <path d="M220 100 L260 140 L270 180 L260 220 L240 260 L220 280 L200 300 L180 280 L160 240 L150 200 L160 160 L180 120 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a84c] mb-6">
          Why NIAS
        </p>
        <h2
          className="text-[40px] md:text-[56px] leading-[1.1] text-[#f5f3ef] mb-16"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Built in the Kingdom.
          <br />
          For the Kingdom.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.title} className="text-center">
              <div className="w-12 h-px bg-[#c9a84c] mx-auto mb-6" />
              <h3 className="text-[15px] font-semibold text-[#f5f3ef] mb-3">
                {col.title}
              </h3>
              <p className="text-[14px] text-[#9ca3af] leading-[1.65]">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GCCContext;
