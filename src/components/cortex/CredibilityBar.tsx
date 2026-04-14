const FACTS = [
  { number: "8", label: "Asset Classes Covered" },
  { number: "—", label: "GCC-Native Context" },
  { number: "IC", label: "Ready Output Format" },
  { number: "عربي", label: "Arabic + English" },
];

const CredibilityBar = () => {
  return (
    <section className="bg-[#141414] border-t border-b border-[#222] py-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col items-center text-center ${
                i < FACTS.length - 1 ? "md:border-r md:border-[#2a2a2a]" : ""
              }`}
            >
              <span className="text-[20px] font-medium text-[#c9a84c]">
                {fact.number}
              </span>
              <span className="text-[12px] uppercase tracking-[0.15em] text-[#6b6b6b] mt-1">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityBar;
