import React, { useState, useEffect } from "react";
import { Zap, Building, Factory, Car, Sun, X } from "lucide-react";

type servicesPropTypes = {
  scrollToSection: any;
}

export default function Services({ scrollToSection }: servicesPropTypes) {
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
    },
    {
      title: "Commercial Electrical",
      description: "Professional electrical solutions for businesses, offices, and commercial properties.",
      icon: <Building className="w-12 h-12" />,
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
    {
      title: "Industrial Electrical",
      description: "Heavy-duty electrical systems for manufacturing, warehouses, and industrial facilities.",
      icon: <Factory className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
    {
      title: "EV Installations",
      description: "Electric vehicle charging station installation for homes and businesses.",
      icon: <Car className="w-12 h-12" />,
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
    {
      title: "Solar Panel Installation",
      description: "Complete solar energy systems from design to installation and maintenance.",
      icon: <Sun className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
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
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%)] bg-[length:40px_40px]" />

        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-20 bottom-40 w-80 h-80 rounded-full bg-yellow-600/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/2 top-1/3 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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

          <p className="text-gray-300 text-center max-w-xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
            Discover our comprehensive range of electrical services designed to meet your specific needs with professionalism and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-500/20 shadow-xl shadow-yellow-600/10 transition-all duration-300 hover:-translate-y-2 animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                    onClick={() => scrollToSection('contact')}
                    className="relative overflow-hidden cursor-pointer group px-6 py-2 rounded-full bg-black text-yellow-400 font-medium text-sm flex items-center border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-yellow-500 hover:text-black transition-all duration-400"
                  >
                    <span className="relative z-10">Get an Estimate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-slideUp" style={{ animationDelay: '0.6s' }}>
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
