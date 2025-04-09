import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "~/assets/cc-electric-high-resolution-logo.png";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState(0);
  
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
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

  // Handle body scroll locking with improved cleanup
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save the current scroll position
      const currentScrollY = window.scrollY;
      setSavedScrollY(currentScrollY);
      
      // Apply fixed positioning to body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore the scroll position only if we're not navigating to a section
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Only restore the saved scroll position if we're not navigating to a section
      // We'll check this in the scrollToSection function
    }
    
    return () => {
      // Cleanup in case component unmounts while menu is open
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

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

  // Improved scroll to section handler
  const scrollToSection = (id) => {
    const targetSection = document.getElementById(id);
    
    if (mobileMenuOpen) {
      // First close the mobile menu
      setMobileMenuOpen(false);
      
      // Then use a small timeout to allow the body styles to be reset before scrolling
      setTimeout(() => {
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 10);
    } else {
      // If menu is already closed, just scroll
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2" 
        : "bg-transparent py-4"
    }`}>
      <nav className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <motion.div 
          className="logo relative z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={logo}
              alt="Company Logo"
              className="h-12 w-auto"
            />
            
            {/* Animated energy bolt under logo */}
            <motion.div 
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-500 rounded-full ${
                scrolled ? "w-full" : "w-0"
              }`}
              animate={{ width: scrolled ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul 
          className="hidden md:flex gap-2 lg:gap-8 items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {sections.map((section, index) => (
            <motion.li 
              key={section.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <a
                href={`#${section.id}`}
                className={`relative px-3 py-2 text-lg font-medium transition-all duration-300 overflow-hidden group ${
                  scrolled 
                    ? (activeSection === section.id ? "text-green-600" : "text-gray-800 dark:text-gray-200") 
                    : (activeSection === section.id ? "text-green-400" : "text-white")
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                <span className="relative z-10">
                  {section.label}
                </span>
                
                {/* Background hover effect */}
                <motion.span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    activeSection === section.id 
                      ? "bg-green-500" 
                      : "bg-gray-300 dark:bg-gray-700 group-hover:bg-green-400"
                  } transform origin-left transition-all duration-300 ease-out`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === section.id ? 1 : 0 }}
                />
                
                {/* Active indicator dot */}
                {activeSection === section.id && (
                  <motion.span
                    className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-green-500 transform -translate-x-1/2 translate-y-0.5"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
          
          {/* CTA Button */}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`ml-4 px-5 py-2 rounded-full font-medium cursor-pointer ${
                scrolled 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md" 
                  : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              } transition-all duration-300`}
              onClick={() => scrollToSection("contact")}
            >
              Get Quote
            </motion.button>
          </motion.li>
        </motion.ul>

        {/* Mobile Menu Toggle */}
        <motion.div 
          className="md:hidden z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md focus:outline-none ${
              mobileMenuOpen ? "text-gray-800 dark:text-white" : 
              (scrolled ? "text-gray-800 dark:text-white" : "text-white")
            }`}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </motion.div>

        {/* Mobile Menu - Positioned as a fullscreen overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 w-full h-full bg-white dark:bg-gray-900 z-40 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen">
                <motion.ul 
                  className="flex flex-col items-center gap-6 py-16 px-4"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.1 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                  }}
                >
                  {sections.map((section) => (
                    <motion.li 
                      key={section.id}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 20 }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={`#${section.id}`}
                        className={`text-2xl font-medium ${
                          activeSection === section.id 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(section.id);
                        }}
                      >
                        {section.label}
                      </a>
                    </motion.li>
                  ))}
                  
                  <motion.li
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    className="mt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium shadow-md"
                      onClick={() => {
                        scrollToSection("contact");
                      }}
                    >
                      Request a Quote
                    </motion.button>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
