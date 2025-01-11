interface TechTailwindDescription {
  description: string;
  applications: string[];
  impact: string[];
}

export const techTailwindsDescriptions: Record<string, TechTailwindDescription> = {
  "Industry 4.0": {
    description: "The fourth industrial revolution, characterized by the integration of smart digital technology with industrial production systems.",
    applications: [
      "Smart manufacturing systems",
      "Digital supply chain optimization",
      "Automated quality control",
      "Real-time production monitoring"
    ],
    impact: [
      "30-40% reduction in machine downtime",
      "20-30% increase in production efficiency",
      "Significant reduction in operational costs",
      "Enhanced product quality and consistency"
    ]
  },
  "IoT Integration": {
    description: "Implementation of connected devices and sensors to collect and analyze data for improved decision-making and automation.",
    applications: [
      "Smart factory monitoring",
      "Predictive maintenance",
      "Asset tracking",
      "Environmental monitoring"
    ],
    impact: [
      "25% reduction in maintenance costs",
      "Improved equipment lifespan",
      "Real-time operational insights",
      "Enhanced safety and compliance"
    ]
  },
  "Robotics": {
    description: "Advanced robotic systems and automation solutions for manufacturing and industrial processes.",
    applications: [
      "Assembly line automation",
      "Warehouse operations",
      "Quality inspection",
      "Hazardous environment operations"
    ],
    impact: [
      "40% increase in production speed",
      "Reduced human error in operations",
      "Improved workplace safety",
      "24/7 operational capability"
    ]
  },
  "Digital Twin Technology": {
    description: "Virtual replicas of physical assets, processes, and systems that enable simulation, monitoring, and optimization.",
    applications: [
      "Process optimization",
      "Predictive maintenance",
      "Training and simulation",
      "Risk assessment"
    ],
    impact: [
      "15-30% reduction in maintenance costs",
      "Improved decision-making accuracy",
      "Faster product development cycles",
      "Enhanced operational efficiency"
    ]
  },
  "5G Networks": {
    description: "Next-generation wireless technology enabling ultra-fast, low-latency connectivity for industrial and consumer applications.",
    applications: [
      "Smart city infrastructure",
      "Industrial automation",
      "Remote operations",
      "Connected vehicles"
    ],
    impact: [
      "10x faster data speeds than 4G",
      "Sub-millisecond latency",
      "Massive IoT device connectivity",
      "Enhanced mobile broadband"
    ]
  },
  "Edge Computing": {
    description: "Distributed computing architecture that brings computation and data storage closer to the location where it is needed.",
    applications: [
      "Real-time data processing",
      "IoT device management",
      "Content delivery",
      "Autonomous systems"
    ],
    impact: [
      "Reduced latency in data processing",
      "Lower bandwidth costs",
      "Enhanced data security",
      "Improved application performance"
    ]
  },
  "Blockchain": {
    description: "Distributed ledger technology enabling secure, transparent, and immutable record-keeping and transactions.",
    applications: [
      "Supply chain tracking",
      "Smart contracts",
      "Digital identity management",
      "Secure payments"
    ],
    impact: [
      "Enhanced transparency",
      "Reduced fraud risk",
      "Automated contract execution",
      "Improved traceability"
    ]
  },
  "AI Diagnostics": {
    description: "Artificial intelligence systems for medical diagnosis, predictive analytics, and healthcare decision support.",
    applications: [
      "Disease detection",
      "Treatment planning",
      "Patient monitoring",
      "Drug discovery"
    ],
    impact: [
      "Earlier disease detection",
      "Reduced diagnostic errors",
      "Personalized treatment plans",
      "Accelerated research"
    ]
  }
};