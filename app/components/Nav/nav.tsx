import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "~/assets/cc-electric-high-resolution-logo.png";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials"},
    { id: "contact", label: "Contact" },
  ];

  // Track scroll position for dynamic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    const sectionElements = sections.map((section) =>
      document.getElementById(section.id)
    );
    
    sectionElements.forEach((el) => el && observer.observe(el));
    
    return () => {
      sectionElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [sections]);

  // Scroll to section handler
  const scrollToSection = (id) => {
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/90 backdrop-blur-md shadow-lg py-2" 
        : "bg-black/70 py-4"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top bar with phone number */}
        <div className="hidden md:flex justify-end items-center text-yellow-400 py-1">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-medium">Call Today: (555) 123-4567</span>
          </div>
        </div>

        <nav className="flex justify-between items-center py-2">
          {/* Logo and Company Name */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={logo}
              alt="C&C Electrical Logo"
              className={`transition-all duration-300 ${
                scrolled ? "h-12 w-auto" : "h-16 w-auto"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-yellow-400 font-bold text-lg md:text-xl">C&C Electrical</span>
              <span className="text-gray-300 text-xs hidden sm:block">Quality Electrical Services</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative group ${
                  activeSection === section.id 
                    ? "text-yellow-400" 
                    : "text-gray-200 hover:text-yellow-300"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                <span className="text-sm font-medium">{section.label}</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                  activeSection === section.id ? "w-full" : ""
                }`}></span>
              </a>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-black text-sm font-bold transition-all"
              onClick={() => scrollToSection("contact")}
            >
              Get Estimate
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Mobile Phone Button */}
            <a 
              href="tel:5551234567" 
              className="p-2 text-yellow-400 hover:text-yellow-300"
              aria-label="Call us"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            
            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-yellow-500 hover:text-yellow-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden bg-black/95 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3 border-b border-gray-800">
            <div className="flex items-center space-x-2 text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:5551234567" className="text-sm font-medium">(555) 123-4567</a>
            </div>
          </div>
          
          <ul className="py-4 space-y-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block py-2 px-4 border-l-2 ${
                    activeSection === section.id 
                      ? "border-yellow-400 text-yellow-400" 
                      : "border-transparent text-gray-300 hover:text-yellow-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="py-4 flex justify-center">
            <button
              className="w-full py-3 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-sm"
              onClick={() => scrollToSection("contact")}
            >
              Request an Estimate
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
