import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import logo from "~/assets/cncelectricco-logo.png";

export default function Nav({ scrollToSection, setSelectedService }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState({ phone: false, email: false });

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback({ ...copyFeedback, [type]: true });
      setTimeout(() => setCopyFeedback({ ...copyFeedback, [type]: false }), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const socialMediaLinks = [
    {
      id: "facebook",
      name: "Facebook",
      url: "https://www.facebook.com/people/CnC/61578106953385/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.647.001 12.017.001zM8.449 20.312c-2.154 0-3.895-1.741-3.895-3.895V7.584c0-2.154 1.741-3.896 3.895-3.896h7.103c2.154 0 3.895 1.742 3.895 3.896v8.833c0 2.154-1.741 3.895-3.895 3.895H8.449z" />
          <path d="M12.017 7.056c-2.732 0-4.944 2.211-4.944 4.944 0 2.732 2.212 4.944 4.944 4.944 2.732 0 4.944-2.212 4.944-4.944 0-2.732-2.212-4.944-4.944-4.944zm0 8.167c-1.779 0-3.223-1.444-3.223-3.223s1.444-3.223 3.223-3.223 3.223 1.444 3.223 3.223-1.444 3.223-3.223 3.223z" />
          <circle cx="17.406" cy="6.594" r="1.188" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/company",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const navSections = [
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
    // { id: "team", label: "Team" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "careers", label: "Careers", isExternalRoute: true, path: "/careers" },
  ];

  const allServicesItems = navSections.find((item) => item.id === "services")?.dropdownItems || [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      let currentSection = "hero";

      const sectionIds = navSections.flatMap(s =>
        s.hasDropdown ? [s.id, ...s.dropdownItems.map(d => d.id)] : [s.id]
      );

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
      if (window.scrollY < 100) currentSection = "hero";
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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const scrollToSectionWithService = (id, serviceIndex = null) => {
    setSelectedService(serviceIndex);
    setMobileMenuOpen(false);
    setTimeout(() => scrollToSection(id), 100);
  };

  const isServicesActive = () => {
    return activeSection === "services" || allServicesItems.some((item) => item.id === activeSection);
  };

  const HoverCard = ({ children, visible, onEnter, onLeave }) => (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-md rounded-xl border border-yellow-500/30 shadow-xl p-4 z-50"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-yellow-500/30 shadow-2xl" : "bg-transparent"
        }`}
    >
      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center justify-between h-20 px-8">
        {/* Left: Social Media */}
        <div className="flex items-center gap-3">
          {socialMediaLinks.map((social) => (
            <div key={social.id} className="relative">
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setSocialHovered(social.id)}
                onMouseLeave={() => setSocialHovered(null)}
              >
                {social.icon}
              </motion.a>
              <HoverCard
                visible={socialHovered === social.id}
                onEnter={() => setSocialHovered(social.id)}
                onLeave={() => setSocialHovered(null)}
              >
                <p className="text-yellow-400 font-semibold text-sm">Follow us on</p>
                <p className="text-white text-sm">{social.name}</p>
              </HoverCard>
            </div>
          ))}
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center space-x-8">
          {navSections.map((section) => {
            if (section.isExternalRoute) {
              return (
                <Link to={section.path} key={section.id}>
                  <button className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all">
                    {section.label}
                  </button>
                </Link>
              );
            }

            return (
              <button
                key={section.id}
                className={`px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all relative ${activeSection === section.id ? "text-yellow-400" : ""
                  }`}
                onClick={() => scrollToSectionWithService(section.id)}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Contact + Logo */}
        <div className="flex items-center gap-3">
          {/* Phone */}
          <div className="relative">
            <motion.a
              href="tel:7048794057"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.a>
            <HoverCard
              visible={phoneHovered}
              onEnter={() => setPhoneHovered(true)}
              onLeave={() => setPhoneHovered(false)}
            >
              <div className="flex items-center gap-3 min-w-[200px]">
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">Call Now</p>
                  <p className="text-white text-sm">(704) 879-4057</p>
                </div>
                <motion.button
                  onClick={(e) => { e.preventDefault(); copyToClipboard("7048794057", "phone"); }}
                  className="p-2 text-gray-400 hover:text-yellow-400 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {copyFeedback.phone ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </HoverCard>
          </div>

          {/* Email */}
          <div className="relative">
            <motion.a
              href="mailto:electricco.cnc@gmail.com"
              className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
            <HoverCard
              visible={emailHovered}
              onEnter={() => setEmailHovered(true)}
              onLeave={() => setEmailHovered(false)}
            >
              <div className="flex items-center gap-3 min-w-[280px]">
                <div className="flex-1">
                  <p className="text-yellow-400 font-semibold text-sm">Send Email</p>
                  <p className="text-white text-sm break-all">electricco.cnc@gmail.com</p>
                </div>
                <motion.button
                  onClick={(e) => { e.preventDefault(); copyToClipboard("electricco.cnc@gmail.com", "email"); }}
                  className="p-2 text-gray-400 hover:text-yellow-400 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {copyFeedback.email ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </HoverCard>
          </div>

          {/* Logo */}
          <motion.div
            className="cursor-pointer ml-2"
            onClick={() => scrollToSectionWithService("hero")}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={logo}
              alt="C&C Electrical"
              className={`rounded-full border-2 border-yellow-500/50 object-cover transition-all ${scrolled ? "h-10 w-10" : "h-14 w-14"
                }`}
              style={{ boxShadow: "0 0 15px rgba(234, 179, 8, 0.3)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden flex items-center justify-between h-16 px-4">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSectionWithService("hero")}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={logo}
            alt="C&C Electrical"
            className="h-10 w-10 rounded-full border-2 border-yellow-500/50"
            style={{ boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)" }}
          />
          <div>
            <h1 className="text-base font-bold text-white">C&C Electrical</h1>
            <p className="text-xs text-yellow-400/80">Construction & Electrical</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.a href="tel:7048794057" className="p-2 text-gray-400 hover:text-yellow-400" whileHover={{ scale: 1.1 }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.a>
          <motion.a href="mailto:electricco.cnc@gmail.com" className="p-2 text-gray-400 hover:text-yellow-400" whileHover={{ scale: 1.1 }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
          <motion.button
            className="p-2 text-gray-400 hover:text-yellow-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden fixed inset-x-0 top-16 bg-black border-t border-yellow-500/30"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <nav className="overflow-y-auto h-full">
              {navSections.filter(s => !s.hasDropdown && !s.isExternalRoute).map((section) => (
                <button
                  key={section.id}
                  className={`block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 border-b border-gray-800 ${activeSection === section.id ? "text-yellow-400 bg-yellow-400/10" : ""
                    }`}
                  onClick={() => scrollToSectionWithService(section.id)}
                >
                  {section.label}
                </button>
              ))}

              <button
                className={`block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 border-b border-gray-800 flex justify-between ${isServicesActive() ? "text-yellow-400 bg-yellow-400/10" : ""
                  }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                Services
                <svg className={`w-5 h-5 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="bg-gray-900/50 overflow-hidden"
                  >
                    {allServicesItems.map((item) => (
                      <button
                        key={item.id}
                        className={`block w-full text-left px-8 py-3 text-gray-300 hover:text-yellow-400 border-b border-gray-800/50 ${activeSection === item.id ? "text-yellow-400 bg-yellow-400/10" : ""
                          }`}
                        onClick={() => scrollToSectionWithService("services", item.serviceIndex)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/careers">
                <button className="block w-full text-left px-6 py-4 text-gray-200 hover:text-yellow-400 border-b border-gray-800">
                  Careers
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
