const ASSETS = [
  { num: "I", name: "Growth Stage Company", desc: "Revenue-stage businesses scaling into new markets" },
  { num: "II", name: "Early Stage Company", desc: "Pre-revenue startups with defensible technology or GTM" },
  { num: "III", name: "PE Fund", desc: "Buyout and growth equity vehicles seeking LP capital" },
  { num: "IV", name: "VC Fund", desc: "Venture mandates across emerging and established markets" },
  { num: "V", name: "Real Estate Fund", desc: "Diversified or specialised property vehicles" },
  { num: "VI", name: "Private Credit", desc: "Direct lending, mezzanine, and structured credit mandates" },
  { num: "VII", name: "Hedge Fund", desc: "Liquid alternatives across long/short and macro strategies" },
  { num: "VIII", name: "Fund of Funds", desc: "Multi-manager allocations with layered portfolio exposure" },
];

const AssetClasses = () => {
  return (
    <section className="bg-[#111111] py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#6b6b6b] mb-6">
          What You Can Assess
        </p>
        <h2
          className="text-[36px] md:text-[44px] leading-[1.1] text-[#f5f3ef] mb-14 max-w-[600px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Built for every
          <br />
          instrument in your portfolio.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSETS.map((asset) => (
            <div
              key={asset.num}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 hover:border-[#c9a84c]/50 hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="text-[12px] text-[#c9a84c] tracking-wider">{asset.num}</span>
              <h3 className="text-[15px] font-semibold text-[#f5f3ef] mt-2 mb-1.5">
                {asset.name}
              </h3>
              <p className="text-[12px] text-[#6b6b6b] leading-[1.5]">{asset.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetClasses;
