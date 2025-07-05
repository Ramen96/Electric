import React, { useState } from "react";
import { Zap, Building, Factory, Car, Sun, X } from "lucide-react";

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

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

  const closePopup = () => {
    setSelectedService(null);
  };

  const openServiceInfo = (service) => {
    setSelectedService(service);
  };

  return (
    <section
      id="services"
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%)] bg-[length:40px_40px]" />
        
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-20 bottom-40 w-80 h-80 rounded-full bg-yellow-600/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute left-1/2 top-1/3 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-4 animate-fadeIn">
            <span className="text-yellow-400 font-medium">What We Offer</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-4 text-center animate-slideUp">
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
              Our Expert Services
            </span>
          </h2>
          
          <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6 w-20 animate-expandWidth" />
          
          <p className="text-gray-300 text-center max-w-xl animate-slideUp" style={{animationDelay: '0.3s'}}>
            Discover our comprehensive range of electrical services designed to meet your specific needs with professionalism and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-500/20 shadow-xl shadow-yellow-600/10 transition-all duration-300 hover:-translate-y-2 animate-slideUp"
              style={{animationDelay: `${index * 0.1}s`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} transition-opacity duration-500 ${hoveredCard === index ? 'opacity-15' : 'opacity-0'}`}
              />

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl ${service.bgLight} border border-yellow-500/20 shadow-lg shadow-yellow-600/10 transition-transform duration-300 group-hover:scale-110`}>
                    <div className={`${service.textColor} transition-transform duration-600 group-hover:rotate-12`}>
                      {service.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-center text-yellow-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => openServiceInfo(service)}
                    className="relative overflow-hidden cursor-pointer group px-6 py-2 rounded-full bg-black text-yellow-400 font-medium text-sm flex items-center border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-500 hover:text-black transition-all duration-400"
                  >
                    <span className="relative z-10">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-slideUp" style={{animationDelay: '0.6s'}}>
          <button 
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }} 
            className="relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-500 hover:text-black transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              Get an Estimate
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Service Info Popup */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500/20 shadow-2xl shadow-yellow-600/20 animate-scaleIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${selectedService.bgLight} border border-yellow-500/20 mr-4`}>
                    <div className={selectedService.textColor}>
                      {selectedService.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400">
                    {selectedService.title}
                  </h3>
                </div>
                <button 
                  onClick={closePopup}
                  className="text-gray-400 hover:text-yellow-400 transition-colors p-2 hover:bg-yellow-500/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Overview</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedService.detailedInfo.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Our Services Include:</h4>
                  <ul className="space-y-2">
                    {selectedService.detailedInfo.services.map((service, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Why Choose Us:</h4>
                  <ul className="space-y-2">
                    {selectedService.detailedInfo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <button 
                    onClick={() => {
                      closePopup();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-3 px-6 rounded-xl hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center"
                  >
                    Get an Estimate
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 80px; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.7s ease-out;
        }
        
        .animate-expandWidth {
          animation: expandWidth 0.7s ease-out 0.4s both;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}