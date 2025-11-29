import { Industry } from "@/types/industry";

export const healthcareIndustry: Industry = {
  name: "Healthcare",
  score: 82,
  description: "Healthcare infrastructure, biotechnology, and pharmaceutical manufacturing.",
  investment: "$350+ billion",
  keyAreas: ["Medical Technology", "Pharmaceuticals", "Healthcare Services"],
  tam: "$650 billion",
  techTailwinds: ["Telemedicine", "AI Diagnostics", "Digital Health Records", "Biotech Innovation"],
  leaders: [
    { name: "Al Nahdi Medical Company", marketCap: "$3.2B" },
    { name: "Saudi Pharmaceutical Industries", marketCap: "$1.5B" },
    { name: "Tamer Group", marketCap: "$2.0B" },
    { name: "Al-Dawaa Pharmacies", marketCap: "$1.0B" },
    { name: "Saudi German Hospital", marketCap: "$0.8B" },
    { name: "Mawhiba", marketCap: "$0.5B" }
  ]
};