// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import logo from "~/assets/cc-electric-high-resolution-logo.png";

// export default function Nav() {
//   const [activeSection, setActiveSection] = useState("hero");
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [savedScrollY, setSavedScrollY] = useState(0);
  
//   const sections = [
//     { id: "hero", label: "Home" },
//     { id: "about", label: "About" },
//     { id: "services", label: "Services" },
//     { id: "projects", label: "Projects" },
//     { id: "contact", label: "Contact" },
//   ];

//   // Track scroll position for dynamic navbar styling
//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       if (offset > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Handle body scroll locking with improved cleanup
//   useEffect(() => {
//     if (menuOpen) {
//       // Save the current scroll position
//       const currentScrollY = window.scrollY;
//       setSavedScrollY(currentScrollY);
      
//       // Apply fixed positioning to body
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${currentScrollY}px`;
//       document.body.style.width = '100%';
//     } else {
//       // Restore the scroll position only if we're not navigating to a section
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//     }
    
//     return () => {
//       // Cleanup in case component unmounts while menu is open
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//     };
//   }, [menuOpen]);

//   // Intersection Observer for active section highlighting
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );
    
//     const sectionElements = sections.map((section) =>
//       document.getElementById(section.id)
//     );
    
//     sectionElements.forEach((el) => el && observer.observe(el));
    
//     return () => {
//       sectionElements.forEach((el) => el && observer.unobserve(el));
//     };
//   }, [sections]);

//   // Improved scroll to section handler
//   const scrollToSection = (id) => {
//     const targetSection = document.getElementById(id);
    
//     if (menuOpen) {
//       // First close the menu
//       setMenuOpen(false);
      
//       // Then use a small timeout to allow the body styles to be reset before scrolling
//       setTimeout(() => {
//         if (targetSection) {
//           targetSection.scrollIntoView({ behavior: "smooth" });
//         }
//       }, 10);
//     } else {
//       // If menu is already closed, just scroll
//       if (targetSection) {
//         targetSection.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//       scrolled 
//         ? "bg-black/90 backdrop-blur-md shadow-lg py-2" 
//         : "bg-black/70 py-4"
//     }`}>
//       <nav className="container mx-auto flex justify-between items-center px-6">
//         {/* Logo Section */}
//         <motion.div 
//           className="logo relative z-10"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <img
//               src={logo}
//               alt="Company Logo"
//               className="h-12 w-auto"
//             />
            
//             {/* Animated energy bolt under logo */}
//             <motion.div 
//               className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full ${
//                 scrolled ? "w-full" : "w-0"
//               }`}
//               animate={{ width: scrolled ? "100%" : "0%" }}
//               transition={{ duration: 0.6, ease: "easeInOut" }}
//             />
//           </motion.div>
//         </motion.div>

//         {/* Hamburger Menu Button - Always visible */}
//         <motion.div 
//           className="z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-md focus:outline-none text-yellow-500 hover:text-yellow-300 transition-colors"
//             aria-label="Toggle menu"
//           >
//             <div className="flex items-center gap-2">
//               {!menuOpen && (
//                 <span className="text-sm font-medium hidden sm:inline">MENU</span>
//               )}
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 {menuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </div>
//           </motion.button>
//         </motion.div>

//         {/* Menu Overlay - Full screen for all devices */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed left-0 top-0 w-full h-full bg-black/95 z-40 overflow-y-auto"
//             >
//               <div className="flex items-center justify-center min-h-screen">
//                 <motion.ul 
//                   className="flex flex-col items-center gap-6 py-16 px-4"
//                   initial="closed"
//                   animate="open"
//                   exit="closed"
//                   variants={{
//                     open: { transition: { staggerChildren: 0.1 } },
//                     closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
//                   }}
//                 >
//                   {sections.map((section) => (
//                     <motion.li 
//                       key={section.id}
//                       variants={{
//                         open: { opacity: 1, y: 0 },
//                         closed: { opacity: 0, y: 20 }
//                       }}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <a
//                         href={`#${section.id}`}
//                         className={`text-2xl font-medium relative group ${
//                           activeSection === section.id 
//                             ? "text-yellow-400" 
//                             : "text-gray-200 hover:text-yellow-300"
//                         }`}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           scrollToSection(section.id);
//                         }}
//                       >
//                         {section.label}
                        
//                         {/* Line animation on hover */}
//                         <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
//                           activeSection === section.id ? "w-full" : ""
//                         }`}></span>
//                       </a>
//                     </motion.li>
//                   ))}
                  
//                   <motion.li
//                     variants={{
//                       open: { opacity: 1, y: 0 },
//                       closed: { opacity: 0, y: 20 }
//                     }}
//                     className="mt-8"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold shadow-md border border-yellow-300"
//                       onClick={() => {
//                         scrollToSection("contact");
//                       }}
//                     >
//                       Request an Estimate
//                     </motion.button>
//                   </motion.li>
//                 </motion.ul>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </header>
//   );
// }




import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "~/assets/cc-electric-high-resolution-logo.png";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (menuOpen) {
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
    }
    
    return () => {
      // Cleanup in case component unmounts while menu is open
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

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
    
    if (menuOpen) {
      // First close the menu
      setMenuOpen(false);
      
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
        ? "bg-black/90 backdrop-blur-md shadow-lg py-2" 
        : "bg-black/70 py-4"
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
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Company Logo"
              className={`transition-all duration-300 ${
                scrolled ? "h-16 w-auto" : "h-20 w-auto"
              }`}
            />
            
            {/* Animated energy bolt under logo */}
            <motion.div 
              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full ${
                scrolled ? "w-full" : "w-0"
              }`}
              animate={{ width: scrolled ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Hamburger Menu Button - Always visible */}
        <motion.div 
          className="z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none text-yellow-500 hover:text-yellow-300 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex items-center gap-2">
              {!menuOpen && (
                <span className="text-sm font-medium hidden sm:inline">MENU</span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </div>
          </motion.button>
        </motion.div>

        {/* Menu Overlay - Full screen for all devices */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 w-full h-full bg-black/95 z-40 overflow-y-auto"
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
                        className={`text-2xl font-medium relative group ${
                          activeSection === section.id 
                            ? "text-yellow-400" 
                            : "text-gray-200 hover:text-yellow-300"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(section.id);
                        }}
                      >
                        {section.label}
                        
                        {/* Line animation on hover */}
                        <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                          activeSection === section.id ? "w-full" : ""
                        }`}></span>
                      </a>
                    </motion.li>
                  ))}
                  
                  <motion.li
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    className="mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold shadow-md border border-yellow-300"
                      onClick={() => {
                        scrollToSection("contact");
                      }}
                    >
                      Request an Estimate
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


