import { Industry } from "@/types/industry";

export const industries: Industry[] = [
  {
    name: "Manufacturing",
    score: 95,
    description: "Advanced manufacturing with focus on Industry 4.0, localization of military industries, and renewable energy equipment.",
    investment: "$450+ billion",
    keyAreas: ["Industrial automation", "Defense manufacturing", "Clean tech production"],
    tam: "$2.3 trillion",
    techTailwinds: ["Industry 4.0", "IoT Integration", "Robotics", "Digital Twin Technology"],
    leaders: [
      { name: "SABIC", marketCap: "$80.2B" },
      { name: "Saudi Aramco", marketCap: "$2.1T" },
      { name: "Ma'aden", marketCap: "$42.3B" }
    ]
  },
  {
    name: "Technology",
    score: 90,
    description: "Digital infrastructure, smart cities, and emerging technologies including AI, IoT, and cloud computing.",
    investment: "$500+ billion",
    keyAreas: ["Artificial Intelligence", "Smart City Solutions", "Cloud Services"],
    tam: "$1.8 trillion",
    techTailwinds: ["5G Networks", "Edge Computing", "Quantum Computing", "Blockchain"],
    leaders: [
      { name: "stc", marketCap: "$58.7B" },
      { name: "Mobily", marketCap: "$16.2B" },
      { name: "Elm", marketCap: "$12.8B" }
    ]
  },
  {
    name: "Tourism & Entertainment",
    score: 85,
    description: "Development of tourism destinations, cultural sites, and entertainment facilities.",
    investment: "$800+ billion",
    keyAreas: ["Hospitality", "Cultural Tourism", "Entertainment Venues"],
    tam: "$1 trillion",
    techTailwinds: ["AR/VR Experiences", "Digital Payments", "Smart Tourism", "IoT Integration"],
    leaders: [
      { name: "Al Habtoor Group", marketCap: "$5.0B" },
      { name: "Emaar Properties", marketCap: "$15.2B" },
      { name: "Saudi Entertainment Ventures", marketCap: "$3.5B" }
    ]
  },
  {
    name: "Healthcare",
    score: 80,
    description: "Healthcare infrastructure, biotechnology, and pharmaceutical manufacturing.",
    investment: "$250+ billion",
    keyAreas: ["Medical Technology", "Pharmaceuticals", "Healthcare Services"],
    tam: "$500 billion",
    techTailwinds: ["Telemedicine", "AI Diagnostics", "Digital Health Records", "Biotech Innovation"],
    leaders: [
      { name: "Al Nahdi Medical Company", marketCap: "$3.2B" },
      { name: "Saudi Pharmaceutical Industries", marketCap: "$1.5B" },
      { name: "Tamer Group", marketCap: "$2.0B" }
    ]
  },
  {
    name: "Renewable Energy",
    score: 88,
    description: "Solar, wind, and green hydrogen projects as part of the Saudi Green Initiative.",
    investment: "$700+ billion",
    keyAreas: ["Solar Power", "Wind Energy", "Green Hydrogen"],
    tam: "$1.5 trillion",
    techTailwinds: ["Smart Grid Technology", "Energy Storage", "AI Energy Management", "IoT Monitoring"],
    leaders: [
      { name: "ACWA Power", marketCap: "$10.0B" },
      { name: "First Solar", marketCap: "$8.5B" },
      { name: "Siemens Gamesa", marketCap: "$12.0B" }
    ]
  },
  {
    name: "Mining & Minerals",
    score: 82,
    description: "Exploration and processing of mineral resources, focusing on rare earth elements and phosphates.",
    investment: "$320+ billion",
    keyAreas: ["Mineral Processing", "Mining Technology", "Resource Exploration"],
    tam: "$600 billion",
    techTailwinds: ["Automation", "Data Analytics", "Sustainable Practices"],
    leaders: [
      { name: "Ma'aden", marketCap: "$42.3B" },
      { name: "Barrick Gold", marketCap: "$35.0B" },
      { name: "Rio Tinto", marketCap: "$120.0B" }
    ]
  },
  {
    name: "Logistics & Transportation",
    score: 87,
    description: "Development of transportation infrastructure, ports, and logistics networks.",
    investment: "$400+ billion",
    keyAreas: ["Smart Logistics", "Port Development", "Transportation Networks"],
    tam: "$700 billion",
    techTailwinds: ["AI Routing", "Blockchain for Supply Chain", "Autonomous Vehicles"],
    leaders: [
      { name: "Saudi Ports Authority", marketCap: "$10.0B" },
      { name: "DHL", marketCap: "$30.0B" },
      { name: "Aramex", marketCap: "$3.0B" }
    ]
  },
  {
    name: "Education",
    score: 78,
    description: "Modernization of education system, e-learning platforms, and vocational training.",
    investment: "$150+ billion",
    keyAreas: ["EdTech", "Vocational Training", "Digital Learning"],
    tam: "$300 billion",
    techTailwinds: ["E-Learning Platforms", "AI Tutors", "Gamification"],
    leaders: [
      { name: "Al-Falak", marketCap: "$1.0B" },
      { name: "Edraak", marketCap: "$0.5B" },
      { name: "Noon Academy", marketCap: "$0.8B" }
    ]
  },
  {
    name: "Financial Services",
    score: 86,
    description: "FinTech solutions, digital banking, and Islamic finance innovations.",
    investment: "$280+ billion",
    keyAreas: ["FinTech", "Digital Banking", "Islamic Finance"],
    tam: "$500 billion",
    techTailwinds: ["Digital Wallets", "Blockchain", "AI in Risk Management"],
    leaders: [
      { name: "Al Rajhi Bank", marketCap: "$20.0B" },
      { name: "National Commercial Bank", marketCap: "$25.0B" },
      { name: "Samba Financial Group", marketCap: "$10.0B" }
    ]
  },
  {
    name: "Real Estate",
    score: 84,
    description: "Development of smart cities, residential projects, and commercial spaces.",
    investment: "$1+ trillion",
    keyAreas: ["Smart Cities", "Residential Development", "Commercial Real Estate"],
    tam: "$1.2 trillion",
    techTailwinds: ["Smart Home Technology", "Sustainable Building Practices", "AI in Property Management"],
    leaders: [
      { name: "Emaar Properties", marketCap: "$15.2B" },
      { name: "Dar Al Arkan", marketCap: "$5.0B" },
      { name: "Saudi Real Estate Company", marketCap: "$3.0B" }
    ]
  },
  {
    name: "Agriculture & Food Security",
    score: 83,
    description: "Sustainable agriculture, food production, and agricultural technology initiatives.",
    investment: "$180+ billion",
    keyAreas: ["AgTech", "Food Production", "Sustainable Farming"],
    tam: "$400 billion",
    techTailwinds: ["Precision Agriculture", "Vertical Farming", "Biotechnology"],
    leaders: [
      { name: "Almarai", marketCap: "$8.0B" },
      { name: "Savola Group", marketCap: "$4.5B" },
      { name: "Saudi Agricultural and Livestock Investment Company", marketCap: "$2.0B" }
    ]
  },
  {
    name: "Water & Environment",
    score: 85,
    description: "Water management, desalination projects, and environmental conservation initiatives.",
    investment: "$230+ billion",
    keyAreas: ["Water Technology", "Environmental Solutions", "Waste Management"],
    tam: "$300 billion",
    techTailwinds: ["Smart Water Management", "IoT for Environmental Monitoring", "Recycling Technologies"],
    leaders: [
      { name: "ACWA Power", marketCap: "$10.0B" },
      { name: "Veolia", marketCap: "$15.0B" },
      { name: "Suez", marketCap: "$12.0B" }
    ]
  },
  {
    name: "Defense & Security",
    score: 89,
    description: "Military technology, cybersecurity, and defense manufacturing localization.",
    investment: "$290+ billion",
    keyAreas: ["Defense Manufacturing", "Cybersecurity", "Military Technology"],
    tam: "$600 billion",
    techTailwinds: ["Cybersecurity Solutions", "AI in Defense", "Drones and Robotics"],
    leaders: [
      { name: "Saudi Arabian Military Industries", marketCap: "$5.0B" },
      { name: "Lockheed Martin", marketCap: "$100.0B" },
      { name: "Raytheon Technologies", marketCap: "$80.0B" }
    ]
  },
  {
    name: "Sports & Entertainment",
    score: 81,
    description: "Sports facilities, entertainment venues, and cultural attractions development.",
    investment: "$200+ billion",
    keyAreas: ["Sports Infrastructure", "Entertainment Venues", "Cultural Facilities"],
    tam: "$300 billion",
    techTailwinds: ["Streaming Technology", "Smart Venues", "Fan Engagement Platforms"],
    leaders: [
      { name: "Saudi Sports Company", marketCap: "$1.5B" },
      { name: "Qiddiya Investment Company", marketCap: "$2.0B" },
      { name: "Saudi Entertainment Ventures", marketCap: "$3.5B" }
    ]
  },
  {
    name: "Aerospace",
    score: 86,
    description: "Aviation manufacturing, space technology, and aerospace research initiatives.",
    investment: "$350+ billion",
    keyAreas: ["Aviation Manufacturing", "Space Technology", "Aerospace R&D"],
    tam: "$500 billion",
    techTailwinds: ["Space Exploration Technologies", "Advanced Materials", "AI in Flight Operations"],
    leaders: [
      { name: "Saudi Arabian Airlines", marketCap: "$5.0B" },
      { name: "Boeing", marketCap: "$120.0B" },
      { name: "Airbus", marketCap: "$100.0B" }
    ]
  }
];
