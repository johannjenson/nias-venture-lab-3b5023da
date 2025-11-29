import { Industry } from "@/types/industry";

export const energyIndustry: Industry = {
  name: "Renewable Energy",
  score: 91,
  description: "Solar, wind, and green hydrogen projects as part of the Saudi Green Initiative.",
  investment: "$850+ billion",
  keyAreas: ["Solar Power", "Wind Energy", "Green Hydrogen"],
  tam: "$2 trillion",
  techTailwinds: ["Smart Grid Technology", "Energy Storage", "AI Energy Management", "IoT Monitoring"],
  leaders: [
    { name: "ACWA Power", marketCap: "$62.7B" },
    { name: "First Solar", marketCap: "$8.5B" },
    { name: "Siemens Gamesa", marketCap: "$12.0B" },
    { name: "Vestas", marketCap: "$9.2B" },
    { name: "Saudi Electricity Company", marketCap: "$25.3B" },
    { name: "Desert Technologies", marketCap: "$1.8B" }
  ]
};