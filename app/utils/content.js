import { Zap, Building, Factory, Car, Sun } from "lucide-react";

// hero section

// Services

export function returnServices() {
  const services = [
    {
      title: "Residential Electrical",
      description: "Complete electrical services for homes including wiring, panel upgrades, and smart home installations.",
      icon: <Zap className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
      detailedInfo: {
        overview: "Our residential electrical services ensure your home is safe, efficient, and up to modern standards.",
        services: [
          "Complete home rewiring and electrical upgrades",
          "Electrical panel installations and upgrades",
          "Smart home automation systems",
          "GFCI outlet installation and safety inspections",
          "Ceiling fan and lighting fixture installation",
          "Electrical troubleshooting and repairs",
          "Code compliance and safety inspections"
        ],
        benefits: [
          "Licensed and insured electricians",
          "Warranty on all work performed",
          "Free estimates and consultations"
        ]
      }
    },
    {
      title: "Commercial Electrical",
      description: "Professional electrical solutions for businesses, offices, and commercial properties.",
      icon: <Building className="w-12 h-12" />,
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
      detailedInfo: {
        overview: "Comprehensive commercial electrical services designed to keep your business running smoothly and safely.",
        services: [
          "Office building electrical systems",
          "Retail store lighting and power systems",
          "Emergency lighting and exit signs",
          "Commercial panel and switchgear installation",
          "Data center electrical infrastructure",
          "Security system electrical work",
          "Energy-efficient lighting retrofits"
        ],
        benefits: [
          "Minimal disruption to business operations",
          "Code compliant installations",
          "Energy efficiency consultations",
          "Preventive maintenance programs"
        ]
      }
    },
    {
      title: "Industrial Electrical",
      description: "Heavy-duty electrical systems for manufacturing, warehouses, and industrial facilities.",
      icon: <Factory className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
      detailedInfo: {
        overview: "Specialized industrial electrical services for complex manufacturing and industrial environments.",
        services: [
          "High-voltage electrical systems",
          "Motor control and automation",
          "Industrial panel fabrication",
          "Conveyor system electrical work",
          "Process control wiring",
          "Emergency power systems",
          "Electrical maintenance programs"
        ],
        benefits: [
          "Experienced with industrial standards",
          "Minimize production downtime",
          "Safety-first approach",
          "Custom solutions for unique needs"
        ]
      }
    },
    {
      title: "EV Installations",
      description: "Electric vehicle charging station installation for homes and businesses.",
      icon: <Car className="w-12 h-12" />,
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
      detailedInfo: {
        overview: "Professional EV charging solutions to support your electric vehicle lifestyle and business needs.",
        services: [
          "Residential EV charger installation",
          "Commercial charging station setup",
          "Level 2 and DC fast charging options",
          "Electrical panel upgrades for EV charging",
          "Smart charging system integration",
          "Fleet charging solutions",
          "Permit and inspection coordination"
        ],
        benefits: [
          "Certified EV installation specialists",
          "All major charger brands supported",
          "Rebate and incentive assistance",
          "Future-ready electrical infrastructure"
        ]
      }
    },
    {
      title: "Solar Panel Installation",
      description: "Complete solar energy systems from design to installation and maintenance.",
      icon: <Sun className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
      detailedInfo: {
        overview: "Turn sunlight into savings with our comprehensive solar panel installation and maintenance services.",
        services: [
          "Custom solar system design",
          "Residential and commercial installations",
          "Battery backup system integration",
          "Grid-tie and off-grid solutions",
          "Solar panel maintenance and cleaning",
          "System monitoring and optimization",
          "Permit and utility interconnection"
        ],
        benefits: [
          "Significant energy cost savings",
          "Increase property value",
          "Environmental impact reduction",
          "Tax credits and incentive maximization"
        ]
      }
    }
  ];
  return services;
}

// About Us
export const milestones = [
  { title: "Consultation", description: "Lets schedule a free consultation to discuss your project goals, timeline and budget." },
  { title: "Site Visits & Estimating", description: "We’ll visit your location to make our assessments, gather details and take measurements." },
  { title: "Planning & Scheduling", description: "We pull permits! And schedule a start date that works for you." },
  { title: "We Get To Work", description: "Staying steady , we maintain a clean job site and keep you informed throughout the entire process. Once the project is complete, a final walk through!  To ensure safe and secure results." },
];
