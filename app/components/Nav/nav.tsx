import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "~/assets/cc-electrical.png";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const mobileServicesRef = useRef(null);
  
  // Left side menu items
  const leftSections = [
    { id: "hero", label: "Home" },
    { 
      id: "services", 
      label: "Our Services",
      hasDropdown: true,
      dropdownItems: [
        { id: "residential", label: "Residential Electrical" },
        { id: "commercial", label: "Commercial Electrical" },
        { id: "industrial", label: "Industrial Electrical" },
        { id: "ev-installations", label: "EV Installations" },
        { id: "solar", label: "Solar Panel Installation" }
      ]
    },
    { id: "projects", label: "Portfolio" },
    { id: "testimonials", label: "Testimonials" },
  ];

  // Right side menu items
  const rightSections = [
    { id: "team", label: "Team" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
    { id: "careers", label: "Careers" },
  ];

  // All sections for mobile menu
  const allSections = [...leftSections.filter(item => !item.hasDropdown), ...rightSections];
  const allServicesItems = leftSections.find(item => item.id === "services")?.dropdownItems || [];

  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (mobileServicesRef.current && !mobileServicesRef.current.contains(event.target)) {
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Intersection Observer for active section highlighting with improved transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add smooth transition to active section change
            setTimeout(() => {
              setActiveSection(entry.target.id);
            }, 100);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );
    
    // Adding both individual sections and service subsections
    const sectionIds = [
      ...allSections.map(section => section.id), 
      ...allServicesItems.map(item => item.id),
      "services" // Make sure we're explicitly observing the services section
    ];
    
    // Remove duplicates in case there are any
    const uniqueSectionIds = [...new Set(sectionIds)];
    
    const sectionElements = uniqueSectionIds.map(id => document.getElementById(id));
    
    sectionElements.forEach((el) => el && observer.observe(el));
    
    return () => {
      sectionElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [allSections, allServicesItems]);

  const scrollToSection = (id, keepMobileMenuOpen = false) => {
    console.log(`Attempting to scroll to section: ${id}`);
    const targetSection = document.getElementById(id);
    if (targetSection) {
      console.log(`Found section: ${id}`);
      targetSection.scrollIntoView({ behavior: "smooth" });
      if (!keepMobileMenuOpen) {
        setTimeout(() => {
          setMobileMenuOpen(false);
          setServicesDropdownOpen(false);
          setMobileServicesOpen(false);
        }, 300);
      }
    } else {
      console.log(`Section not found: ${id}`);
    }
  };

  // Check if service section or any of its subsections is active
  const isServicesActive = () => {
    if (activeSection === "services") return true;
    return allServicesItems.some(item => item.id === activeSection);
  };

  // Button animation variants
  const buttonVariants = {
    initial: {
      boxShadow: "0 0 0 rgba(234, 179, 8, 0)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(234, 179, 8, 0.7)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        },
        boxShadow: {
          duration: 0.3
        }
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(234, 179, 8, 0.9)",
    }
  };

  // Enhanced button animation with transition for active state
  const enhancedButtonVariants = {
    ...buttonVariants,
    active: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(234, 179, 8, 0.9)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        },
        boxShadow: {
          duration: 0.4
        }
      }
    },
    inactive: {
      scale: 1,
      boxShadow: "0 0 0 rgba(234, 179, 8, 0)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 15
        },
        boxShadow: {
          duration: 0.3
        }
      }
    }
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  // Mobile dropdown animation variants
  const mobileDropdownVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  // Render menu button for each section
  const renderNavButton = (section) => {
    // Special handling for services with dropdown
    if (section.hasDropdown) {
      return (
        <div key={section.id} className="relative" ref={servicesDropdownRef}>
          <motion.button
            variants={enhancedButtonVariants}
            initial="initial"
            animate={isServicesActive() ? "active" : "inactive"}
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-md transition-all duration-300 text-xl font-bold cursor-pointer flex items-center gap-2 ${
              isServicesActive() || servicesDropdownOpen
                ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black"
                : "bg-black/50 text-white hover:bg-yellow-500/80 hover:text-black"
            }`}
            onClick={() => {
              // Navigate to services section when clicking the main button
              scrollToSection(section.id);
              // Toggle dropdown when clicking the arrow icon
              setServicesDropdownOpen(!servicesDropdownOpen);
            }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
          >
            <span>{section.label}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when clicking just the arrow
                setServicesDropdownOpen(!servicesDropdownOpen);
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
          
          <AnimatePresence>
            {servicesDropdownOpen && (
              <motion.div
                className="absolute left-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-black/90 backdrop-blur-md border border-yellow-500/30 z-50"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {section.dropdownItems.map((item) => (
                  <motion.a
                    key={item.id}
                    variants={dropdownItemVariants}
                    className={`block px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "text-gray-200 hover:bg-yellow-500/10 hover:text-yellow-300"
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    
    // Regular button without dropdown
    return (
      <motion.button
        key={section.id}
        variants={enhancedButtonVariants}
        initial="initial"
        animate={activeSection === section.id ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
        className={`px-4 py-2 rounded-md transition-all duration-300 text-xl font-bold cursor-pointer ${
          activeSection === section.id
            ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black"
            : "bg-black/50 text-white hover:bg-yellow-500/80 hover:text-black"
        }`}
        onClick={() => scrollToSection(section.id)}
      >
        {section.label}
      </motion.button>
    );
  };

  // Contact icons for desktop navbar
  const renderContactIcons = () => {
    return (
      <div className="flex items-center gap-3 ml-4">
        <motion.a
          href="tel:5551234567"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
          aria-label="Call us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </motion.a>
        <motion.a
          href="mailto:info@ccelectrical.com"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
          aria-label="Email us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.a>
      </div>
    );
  };

  return (
    <header
      className={`border-yellow-500/25 border fixed top-6 left-0 right-0 mx-auto w-11/12 max-w-screen-2xl z-50 transition-all duration-300 rounded-xl ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-xl py-2"
          : "bg-black/80 backdrop-blur-sm shadow-2xl py-3"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex flex-col md:flex-row items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center w-full">
            {/* Left side menu */}
            <div className="flex items-center space-x-4 flex-1 justify-end pr-8">
              {leftSections.map(renderNavButton)}
            </div>

            {/* Logo in center */}
            <motion.div
              className="flex items-center justify-center mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("hero")}
            >
              <motion.div 
                className="inline-block overflow-visible"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 0, 2, 0],
                  transition: { 
                    rotate: { 
                      repeat: Infinity, 
                      repeatType: "mirror", 
                      duration: 0.5 
                    },
                    scale: { duration: 0.3 }
                  }
                }}
              >
                <img
                  src={logo}
                  alt="C&C Electrical Logo"
                  className={`
                    transition-all duration-300 cursor-pointer rounded-full glow-yellow border-yellow-600 border-2
                    ${scrolled ? "h-24 w-auto" : "h-32 w-auto"}
                  `}
                  style={{
                    boxShadow: "0 0 20px rgba(234, 179, 8, 0.4)"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right side menu and contact icons */}
            <div className="flex items-center space-x-4 flex-1 pl-8">
              {rightSections.map(renderNavButton)}
              {renderContactIcons()}
            </div>
          </div>

          {/* Mobile version */}
          <div className="flex w-full md:hidden justify-between items-center">
            {/* Logo on left */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => scrollToSection("hero")}
            >
              <img
                src={logo}
                alt="C&C Electrical Logo"
                className="h-14 w-auto transition-all duration-300 rounded-full glow-yellow border-yellow-600 border-2"
                style={{
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.4)"
                }}
              />
            </motion.div>
            
            {/* Contact icons and hamburger on right - rearranged */}
            <div className="flex items-center gap-2">
              <motion.a
                href="tel:5551234567"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
                aria-label="Call us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:info@ccelectrical.com"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
                aria-label="Email us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
              {/* Mobile Menu Button */}
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-yellow-500 hover:text-yellow-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4">
                <div className="py-4 space-y-3">
                  {allSections.map((section) => (
                    <motion.button
                      key={section.id}
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full py-2 rounded-md transition-all duration-300 ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black"
                          : "bg-black/50 text-white hover:bg-yellow-500/80 hover:text-black"
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.label}
                    </motion.button>
                  ))}
                  
                  {/* Services Section with dropdown in Mobile */}
                  <div className="relative" ref={mobileServicesRef}>
                    <motion.button
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full py-2 rounded-md transition-all duration-300 flex items-center justify-between ${
                        isServicesActive() || mobileServicesOpen
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black"
                          : "bg-black/50 text-white hover:bg-yellow-500/80 hover:text-black"
                      }`}
                      onClick={() => {
                        // Just toggle the dropdown, don't navigate yet
                        setMobileServicesOpen(!mobileServicesOpen);
                      }}
                    >
                      <span>Our Services</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          variants={mobileDropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="overflow-hidden"
                        >
                          {/* Services Dropdown Items in Mobile */}
                          <motion.button
                            key="services-main"
                            variants={dropdownItemVariants}
                            className={`w-full py-2 pl-8 text-left rounded-md transition-all duration-300 ${
                              activeSection === "services"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-black/30 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-300"
                            }`}
                            onClick={() => scrollToSection("services")}
                          >
                            All Services
                          </motion.button>
                          {allServicesItems.map((item) => (
                            <motion.button
                              key={item.id}
                              variants={dropdownItemVariants}
                              className={`w-full py-2 pl-8 text-left rounded-md transition-all duration-300 ${
                                activeSection === item.id
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-black/30 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-300"
                              }`}
                              onClick={() => scrollToSection(item.id)}
                            >
                              {item.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}