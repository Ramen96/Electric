import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import logo from "~/assets/cncelectricco-logo.png"
import ConstructionBanner from "../ConstructionBanner/constructionBanner.tsx";

export default function Nav({ scrollToSection, setSelectedService }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef(null);

  // Left side menu items
  const leftSections = [
    { id: "hero", label: "Home" },
    {
      id: "services",
      label: "Services",
      hasDropdown: true,
      dropdownItems: [
        { id: "residential", label: "Residential", serviceIndex: 0 },
        { id: "commercial", label: "Commercial", serviceIndex: 1 },
        { id: "industrial", label: "Industrial", serviceIndex: 2 },
        { id: "ev-installations", label: "EV Installations", serviceIndex: 3 },
        { id: "solar", label: "Solar Panels", serviceIndex: 4 },
      ],
    },
    { id: "projects", label: "Portfolio" },
    { id: "testimonials", label: "Testimonials" },
  ];

  // Right side menu items
  const rightSections = [
    { id: "team", label: "Team" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    {
      id: "careers",
      label: "Careers",
      isExternalRoute: true,
      path: "/careers",
    },
  ];

  // All sections for mobile menu
  const allSections = [
    ...leftSections.filter((item) => !item.hasDropdown),
    ...rightSections.filter((item) => !item.isExternalRoute),
  ];
  const allServicesItems =
    leftSections.find((item) => item.id === "services")?.dropdownItems || [];

  // Get all section IDs for scroll tracking
  const getAllSectionIds = () => {
    const sections = [];
    leftSections.forEach(section => {
      if (section.hasDropdown) {
        sections.push(section.id);
        sections.push(...section.dropdownItems.map(item => item.id));
      } else {
        sections.push(section.id);
      }
    });
    rightSections.forEach(section => {
      if (!section.isExternalRoute) {
        sections.push(section.id);
      }
    });
    return sections;
  };

  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Get all section IDs
      const sectionIds = getAllSectionIds();
      
      // Find the current active section
      let currentSection = "hero"; // default
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      if (window.scrollY < 100) {
        currentSection = "hero";
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSectionWithService = (id, serviceIndex = null) => {
    if (serviceIndex !== null) {
      setSelectedService(serviceIndex);
    } else {
      setSelectedService(null);
    }
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setTimeout(() => {
      scrollToSection(id);
    }, 100); // Delay to ensure menu closes before scrolling
  };

  const isServicesActive = () => {
    if (activeSection === "services") return true;
    return allServicesItems.some((item) => item.id === activeSection);
  };

  const renderNavButton = (section, isMobile = false) => {
    const baseClasses = isMobile
      ? "block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 hover:bg-yellow-400/10 border-b border-gray-800 transition-all duration-300"
      : "px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 relative";

    const activeClasses = isMobile
      ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
      : "text-yellow-400";

    if (section.hasDropdown) {
      return (
        <div key={section.id} className={isMobile ? "" : "relative"} ref={!isMobile ? servicesDropdownRef : null}>
          <button
            className={`${baseClasses} ${
              isServicesActive() ? activeClasses : ""
            } ${isMobile ? "flex items-center justify-between" : "flex items-center gap-2"}`}
            onClick={() => {
              if (isMobile) {
                setServicesDropdownOpen(!servicesDropdownOpen);
              } else {
                scrollToSectionWithService(section.id);
              }
            }}
            onMouseEnter={() => !isMobile && setServicesDropdownOpen(true)}
            onMouseLeave={() => !isMobile && setServicesDropdownOpen(false)}
          >
            {isMobile ? (
              <>
                <span
                  className="text-base font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSectionWithService("services");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Services
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            ) : (
              <span className="text-base font-medium">{section.label}</span>
            )}
          </button>

          {!isMobile && (
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-xl py-2 z-50"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  {section.dropdownItems.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full text-left px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-black/50 transition-all duration-200 ${
                        activeSection === item.id ? "text-yellow-400 bg-black/50" : ""
                      }`}
                      onClick={() => scrollToSectionWithService("services", item.serviceIndex)}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      );
    }

    if (section.isExternalRoute) {
      return (
        <Link to={section.path} key={section.id} className={isMobile ? "block" : ""}>
          <button
            className={`${baseClasses} ${
              activeSection === section.id ? activeClasses : ""
            } ${isMobile ? "font-medium" : ""}`}
          >
            {section.label}
          </button>
        </Link>
      );
    }

    return (
      <button
        key={section.id}
        className={`${baseClasses} ${
          activeSection === section.id ? activeClasses : ""
        } ${isMobile ? "font-medium" : ""}`}
        onClick={() => scrollToSectionWithService(section.id)}
      >
        {section.label}
        {!isMobile && activeSection === section.id && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"
          />
        )}
      </button>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-yellow-500/30 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <ConstructionBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          <nav className="hidden lg:flex items-center space-x-8 flex-1">
            {leftSections.map((section) => renderNavButton(section))}
          </nav>

          <div className="flex lg:hidden items-center gap-3">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSectionWithService("hero")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={logo}
                  alt="C&C Electrical"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-yellow-500/50 object-cover"
                  style={{
                    boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-yellow-500/50 text-black font-bold h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm"
                  style={{
                    boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                    display: 'none'
                  }}
                >
                  C&C
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                  C&C Electrical
                </h1>
                <p className="text-xs text-yellow-400/80 leading-tight">
                  Construction & Electrical
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
            onClick={() => scrollToSectionWithService("hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative flex-shrink-0">
              <img
                src={logo}
                alt="C&C Electrical"
                className={`
                  rounded-full border-2 border-yellow-500/50 object-cover transition-all duration-300
                  ${scrolled 
                    ? "h-12 w-12 lg:h-14 lg:w-14" 
                    : "h-14 w-14 lg:h-16 lg:w-16"
                  }
                `}
                style={{
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.3)",
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div 
                className={`
                  absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 
                  rounded-full border-2 border-yellow-500/50 text-black font-bold
                  ${scrolled 
                    ? "h-12 w-12 lg:h-14 lg:w-14 text-sm lg:text-base" 
                    : "h-14 w-14 lg:h-16 lg:w-16 text-base lg:text-xl"
                  }
                `}
                style={{
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.3)",
                  display: 'none'
                }}
              >
                C&C
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
            <nav className="flex items-center space-x-8">
              {rightSections.map((section) => renderNavButton(section))}
            </nav>
            
            <div className="flex items-center gap-3">
              <motion.a
                href="tel:7048794057"
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Call C&C Electrical"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="mailto:electricco.cnc@gmail.com"
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email C&C Electrical"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.a
              href="tel:7048794057"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Call C&C Electrical"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </motion.a>

            <motion.a
              href="mailto:electricco.cnc@gmail.com"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Email C&C Electrical"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.a>

            <motion.button
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-x-0 top-16 bg-black border-t border-yellow-500/30 shadow-xl"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <nav className="flex-1">
                {allSections.map((section) => renderNavButton(section, true))}
                
                {rightSections
                  .filter((item) => item.isExternalRoute)
                  .map((section) => renderNavButton(section, true))}

                <div>
                  <button
                    className={`block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 hover:bg-yellow-400/10 border-b border-gray-800 transition-all duration-300 flex items-center justify-between ${
                      isServicesActive() ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" : ""
                    }`}
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  >
                    <span
                      className="text-base font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSectionWithService("services");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Services
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        servicesDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-900/50"
                      >
                        <button
                          className={`block w-full text-left px-8 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 border-b border-gray-800/50 transition-all duration-200 ${
                            activeSection === "services" ? "text-yellow-400 bg-yellow-400/10" : ""
                          }`}
                          onClick={() => scrollToSectionWithService("services")}
                        >
                          All Services
                        </button>
                        {allServicesItems.map((item) => (
                          <button
                            key={item.id}
                            className={`block w-full text-left px-8 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 border-b border-gray-800/50 transition-all duration-200 ${
                              activeSection === item.id ? "text-yellow-400 bg-yellow-400/10" : ""
                            }`}
                            onClick={() => scrollToSectionWithService("services", item.serviceIndex)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              <div className="p-6 bg-gray-900/50 border-t border-yellow-500/30">
                <h3 className="text-yellow-400 font-semibold mb-4">Get Quick Access</h3>
                <div className="space-y-3">
                  <a
                    href="tel:7048794057"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Call Now: (704) 879-4057</span>
                  </a>
                  <a
                    href="mailto:electricco.cnc@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
