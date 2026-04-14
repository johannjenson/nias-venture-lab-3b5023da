import { Shield, Lock, CheckCircle, Users } from "lucide-react";

const POINTS = [
  {
    icon: Shield,
    title: "No training on your data",
    body: "Your uploaded documents are used solely to generate your report. Never used to train models or shared with third parties.",
  },
  {
    icon: Lock,
    title: "Institutional-grade confidentiality",
    body: "Your reports are accessible only to you. No third-party access, no data sharing without your consent.",
  },
  {
    icon: CheckCircle,
    title: "No hallucinated sources",
    body: "Market data is sourced live at the time of your assessment. Claims are referenced, not invented.",
  },
  {
    icon: Users,
    title: "Built by practitioners",
    body: "NIAS is a Saudi-based advisory network at the intersection of capital, government, and technology.",
  },
];

const TrustArchitecture = () => {
  return (
    <section className="bg-[#111] py-24 md:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#6b6b6b] mb-6">
          Privacy &amp; Process
        </p>
        <h2
          className="text-[36px] md:text-[48px] leading-[1.1] text-[#f5f3ef] mb-14 max-w-[560px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your documents
          <br />
          stay yours.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
            >
              <point.icon className="w-5 h-5 text-[#c9a84c] mb-4" strokeWidth={1.5} />
              <h3 className="text-[15px] font-semibold text-[#f5f3ef] mb-2">
                {point.title}
              </h3>
              <p className="text-[14px] text-[#9ca3af] leading-[1.65]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustArchitecture;
