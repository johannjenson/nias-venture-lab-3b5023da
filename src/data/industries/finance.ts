import { Industry } from "@/types/industry";

export const financeIndustry: Industry = {
  name: "Financial Services",
  score: 88,
  description: "Rapid growth of innovative FinTech solutions including digital wallets and payment platforms, transformation of banking through comprehensive digital services and mobile-first approaches, and advancement of Islamic finance innovations that combine Sharia-compliant principles with modern financial technology to serve regional and global markets.",
  investment: "$320+ billion",
  keyAreas: ["FinTech", "Digital Banking", "Islamic Finance"],
  tam: "$650 billion",
  techTailwinds: ["Digital Wallets", "Blockchain", "AI in Risk Management"],
  leaders: [
    { name: "Al Rajhi Bank", marketCap: "$20.0B" },
    { name: "National Commercial Bank", marketCap: "$25.0B" },
    { name: "Samba Financial Group", marketCap: "$10.0B" },
    { name: "Riyad Bank", marketCap: "$15.0B" },
    { name: "Arab National Bank", marketCap: "$5.0B" },
    { name: "Alinma Bank", marketCap: "$8.0B" }
  ],
  ministry: "Ministry of Finance",
  regulatoryAgencies: ["SAMA (Saudi Central Bank)", "CMA (Capital Market Authority)", "SFDA (Saudi Financial Development Authority)"]
};