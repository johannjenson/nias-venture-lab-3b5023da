import { TechTailwindDescription } from "../types";

export const financeTailwinds: Record<string, TechTailwindDescription> = {
  "Open Banking APIs": {
    description: "Standardized application programming interfaces that enable secure data sharing between financial institutions and third-party providers, fostering innovation and competition in financial services.",
    applications: [
      "Account aggregation services",
      "Payment initiation platforms",
      "Credit scoring and lending decisioning",
      "Personal financial management tools"
    ],
    impact: [
      "3x increase in fintech innovation",
      "Enhanced customer choice and control",
      "Reduced switching costs between banks",
      "Accelerated financial inclusion"
    ]
  },
  "AI Risk Assessment": {
    description: "Machine learning algorithms that analyze vast datasets to assess credit risk, detect fraud, and evaluate investment opportunities with greater accuracy and speed than traditional methods.",
    applications: [
      "Credit scoring and underwriting",
      "Fraud detection and prevention",
      "Anti-money laundering (AML) monitoring",
      "Portfolio risk management"
    ],
    impact: [
      "50% reduction in loan default rates",
      "80% faster credit approval processes",
      "90% improvement in fraud detection",
      "Enhanced regulatory compliance"
    ]
  },
  "Blockchain Settlement": {
    description: "Distributed ledger technology enabling real-time, secure settlement of financial transactions without intermediaries, reducing costs and settlement times while increasing transparency.",
    applications: [
      "Cross-border payment settlement",
      "Securities and derivatives clearing",
      "Trade finance documentation",
      "Digital asset custody and transfer"
    ],
    impact: [
      "Settlement time reduced from days to seconds",
      "60-80% reduction in transaction costs",
      "Enhanced transaction transparency",
      "Reduced counterparty risk"
    ]
  },
  "Digital Payments": {
    description: "Cashless payment technologies including mobile wallets, contactless payments, and instant payment systems, accelerating Saudi Arabia's transition toward a cashless economy.",
    applications: [
      "Mobile wallet and QR code payments",
      "Contactless card and NFC payments",
      "Instant peer-to-peer transfers",
      "Embedded payment solutions"
    ],
    impact: [
      "70% growth in digital transaction volume",
      "Reduced cash handling costs",
      "Enhanced financial inclusion",
      "Improved merchant efficiency"
    ]
  }
};
