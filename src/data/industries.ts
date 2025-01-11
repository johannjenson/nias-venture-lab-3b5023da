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
      { name: "Ma'aden", marketCap: "$42.3B" },
      { name: "Sipchem", marketCap: "$15.1B" },
      { name: "Tasnee", marketCap: "$8.4B" },
      { name: "Saudi Ceramic", marketCap: "$2.1B" }
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
      { name: "Elm", marketCap: "$12.8B" },
      { name: "Zain", marketCap: "$10.5B" },
      { name: "Saudi Telecom Company", marketCap: "$20.0B" },
      { name: "Axiom Telecom", marketCap: "$1.2B" }
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
      { name: "Saudi Entertainment Ventures", marketCap: "$3.5B" },
      { name: "Makkah Construction", marketCap: "$2.0B" },
      { name: "Al Othaim Holding", marketCap: "$1.5B" },
      { name: "Red Sea Global", marketCap: "$1.0B" }
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
      { name: "Tamer Group", marketCap: "$2.0B" },
      { name: "Al-Dawaa Pharmacies", marketCap: "$1.0B" },
      { name: "Saudi German Hospital", marketCap: "$0.8B" },
      { name: "Mawhiba", marketCap: "$0.5B" }
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
      { name: "Siemens Gamesa", marketCap: "$12.0B" },
      { name: "Vestas", marketCap: "$9.2B" },
      { name: "Saudi Electricity Company", marketCap: "$25.3B" },
      { name: "Desert Technologies", marketCap: "$1.8B" }
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
      { name: "Rio Tinto", marketCap: "$120.0B" },
      { name: "Alamos Gold", marketCap: "$5.0B" },
      { name: "Newmont Corporation", marketCap: "$50.0B" },
      { name: "Anglo American", marketCap: "$40.0B" }
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
      { name: "Aramex", marketCap: "$3.0B" },
      { name: "FedEx", marketCap: "$80.0B" },
      { name: "UPS", marketCap: "$100.0B" },
      { name: "Saudi Railway Company", marketCap: "$2.5B" }
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
      { name: "Noon Academy", marketCap: "$0.8B" },
      { name: "Mawhiba", marketCap: "$0.6B" },
      { name: "Qurtuba International School", marketCap: "$0.4B" },
      { name: "International Schools Group", marketCap: "$0.7B" }
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
      { name: "Samba Financial Group", marketCap: "$10.0B" },
      { name: "Riyad Bank", marketCap: "$15.0B" },
      { name: "Arab National Bank", marketCap: "$5.0B" },
      { name: "Alinma Bank", marketCap: "$8.0B" }
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
      { name: "Saudi Real Estate Company", marketCap: "$3.0B" },
      { name: "JLL", marketCap: "$10.0B" },
      { name: "Colliers International", marketCap: "$8.0B" },
      { name: "Knight Frank", marketCap: "$6.0B" }
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
      { name: "Saudi Agricultural and Livestock Investment Company", marketCap: "$2.0B" },
      { name: "Al-Faisaliah Group", marketCap: "$1.5B" },
      { name: "Al-Jazeera Agricultural Company", marketCap: "$1.0B" },
      { name: "Al-Othaim Foods", marketCap: "$0.8B" }
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
      { name: "Suez", marketCap: "$12.0B" },
      { name: "Saudi Water Partnership Company", marketCap: "$2.5B" },
      { name: "National Water Company", marketCap: "$3.0B" },
      { name: "Al-Khodari Sons Company", marketCap: "$1.0B" }
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
      { name: "Raytheon Technologies", marketCap: "$80.0B" },
      { name: "Northrop Grumman", marketCap: "$70.0B" },
      { name: "BAE Systems", marketCap: "$60.0B" },
      { name: "General Dynamics", marketCap: "$50.0B" }
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
      { name: "Saudi Entertainment Ventures", marketCap: "$3.5B" },
      { name: "Al-Hilal FC", marketCap: "$0.8B" },
      { name: "Al-Nassr FC", marketCap: "$0.7B" },
      { name: "Saudi Arabian Football Federation", marketCap: "$0.5B" }
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
      { name: "Airbus", marketCap: "$100.0B" },
      { name: "Lockheed Martin", marketCap: "$100.0B" },
      { name: "Northrop Grumman", marketCap: "$70.0B" },
      { name: "Raytheon Technologies", marketCap: "$80.0B" }
    ]
  },
  {
    name: "Retail",
    score: 84,
    description: "Modern retail development including e-commerce platforms, smart stores, and luxury retail.",
    investment: "$550+ billion",
    keyAreas: ["E-commerce", "Smart Retail", "Luxury Market"],
    tam: "$800 billion",
    techTailwinds: ["Digital Payments", "AI Analytics", "IoT in Retail", "AR Shopping"],
    leaders: [
      { name: "Fawaz Al Hokair Group", marketCap: "$4.2B" },
      { name: "Jarir Marketing", marketCap: "$3.8B" },
      { name: "BinDawood Holding", marketCap: "$2.5B" },
      { name: "Al Othaim Markets", marketCap: "$2.1B" },
      { name: "Extra", marketCap: "$1.2B" },
      { name: "Panda Retail Company", marketCap: "$0.9B" }
    ]
  },
  {
    name: "Creative Industries",
    score: 82,
    description: "Development of film, gaming, and digital content creation industries.",
    investment: "$240+ billion",
    keyAreas: ["Film Production", "Gaming Development", "Digital Content"],
    tam: "$400 billion",
    techTailwinds: ["Virtual Production", "Cloud Gaming", "Digital Distribution", "XR Content"],
    leaders: [
      { name: "MBC Group", marketCap: "$2.8B" },
      { name: "Rotana Media", marketCap: "$1.5B" },
      { name: "Saudi Research & Media", marketCap: "$1.2B" },
      { name: "Manga Productions", marketCap: "$0.8B" },
      { name: "Nebras Films", marketCap: "$0.4B" },
      { name: "Saudi Gaming", marketCap: "$0.3B" }
    ]
  },
  {
    name: "Biotechnology",
    score: 85,
    description: "Development of biotechnology research, pharmaceuticals, and medical innovations.",
    investment: "$380+ billion",
    keyAreas: ["Biomedical Research", "Drug Development", "Genomics"],
    tam: "$600 billion",
    techTailwinds: ["Gene Editing", "Precision Medicine", "Bioinformatics", "Synthetic Biology"],
    leaders: [
      { name: "SPIMACO", marketCap: "$1.8B" },
      { name: "Jamjoom Pharma", marketCap: "$1.2B" },
      { name: "Dallah Healthcare", marketCap: "$1.0B" },
      { name: "Saudi Pharmaceutical", marketCap: "$0.9B" },
      { name: "Biotech Corp", marketCap: "$0.7B" },
      { name: "Advanced Pharma", marketCap: "$0.5B" }
    ]
  },
  {
    name: "Smart Construction",
    score: 83,
    description: "Advanced construction technologies, sustainable building materials, and smart infrastructure.",
    investment: "$420+ billion",
    keyAreas: ["Sustainable Materials", "Smart Buildings", "Construction Tech"],
    tam: "$900 billion",
    techTailwinds: ["3D Printing", "Modular Construction", "IoT Integration", "Digital Twins"],
    leaders: [
      { name: "Saudi Ceramics", marketCap: "$2.1B" },
      { name: "Arabian Cement", marketCap: "$1.8B" },
      { name: "Saudi Steel Pipe", marketCap: "$1.2B" },
      { name: "Red Sea International", marketCap: "$0.9B" },
      { name: "Construction Products Holding", marketCap: "$0.8B" },
      { name: "Advanced Construction", marketCap: "$0.6B" }
    ]
  },
  {
    name: "Ocean Economy",
    score: 81,
    description: "Development of marine resources, aquaculture, and coastal tourism.",
    investment: "$175+ billion",
    keyAreas: ["Marine Tourism", "Aquaculture", "Port Development"],
    tam: "$300 billion",
    techTailwinds: ["Marine Tech", "Sustainable Fishing", "Ocean Data", "Clean Energy"],
    leaders: [
      { name: "National Shipping", marketCap: "$3.2B" },
      { name: "Red Sea Gateway Terminal", marketCap: "$2.5B" },
      { name: "Saudi Fisheries", marketCap: "$0.8B" },
      { name: "Marine Development", marketCap: "$0.6B" },
      { name: "Coastal Tourism Co", marketCap: "$0.5B" },
      { name: "Blue Economy Corp", marketCap: "$0.4B" }
    ]
  }
];
