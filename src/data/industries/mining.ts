import { Industry } from "@/types/industry";

export const miningIndustry: Industry = {
  name: "Mining & Minerals",
  score: 84,
  description: "Exploration and processing of mineral resources, focusing on rare earth elements and phosphates.",
  investment: "$380+ billion",
  keyAreas: ["Mineral Processing", "Mining Technology", "Resource Exploration"],
  tam: "$700 billion",
  techTailwinds: ["Automation", "Data Analytics", "Sustainable Practices"],
  leaders: [
    { name: "Ma'aden", marketCap: "$42.3B" },
    { name: "Barrick Gold", marketCap: "$35.0B" },
    { name: "Rio Tinto", marketCap: "$120.0B" },
    { name: "Alamos Gold", marketCap: "$5.0B" },
    { name: "Newmont Corporation", marketCap: "$50.0B" },
    { name: "Anglo American", marketCap: "$40.0B" }
  ]
};