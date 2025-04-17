import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import warehouseImg from "~/assets/warehouse.jpg";
import officeImg from "~/assets/office.jpg";
import mfgImg from "~/assets/manufacturing.jpg";
import retailImg from "~/assets/retail.jpg";

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Example projects with detailed information
  const projects = [
    {
      title: "Commercial Warehouse Rewiring",
      description:
        "Complete electrical system overhaul for a 50,000 sq ft distribution center. Implemented energy-efficient lighting and updated all safety systems.",
      image: warehouseImg,
      tags: ["Industrial", "Energy-Efficient", "Safety Compliance"],
      duration: "3 weeks",
      client: "Global Distribution Co.",
    },
    {
      title: "Office Building Lighting Upgrade",
      description:
        "Retrofitted a 12-story office complex with smart LED lighting solutions, reducing energy consumption by 65% and improving workplace illumination.",
      image: officeImg,
      tags: ["Commercial", "Smart Systems", "LED Technology"],
      duration: "5 weeks",
      client: "Metro Business Center",
    },
    {
      title: "Manufacturing Plant Power Systems",
      description:
        "Designed and installed high-capacity electrical systems for heavy machinery with built-in redundancies to prevent costly downtime.",
      image: mfgImg,
      tags: ["Industrial", "High-Capacity", "Redundant Systems"],
      duration: "8 weeks",
      client: "Precision Manufacturing Inc.",
    },
    {
      title: "Retail Complex Electrical Renovation",
      description:
        "Modernized electrical infrastructure for a shopping center with 24 storefronts, updating to code while maintaining business operations.",
      image: retailImg,
      tags: ["Retail", "Code Compliance", "Minimal Disruption"],
      duration: "6 weeks",
      client: "Westside Shopping Plaza",
    },
  ];

  // Navigation controls for carousel
  const nextProject = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300); // Match transition duration
  };

  const prevProject = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-scroll carousel with pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextProject();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preload images */}
      <div style={{ display: "none" }}>
        {projects.map((project, index) => (
          <img key={index} src={project.image} alt="" />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]" opacity={0.4} />

        {/* Floating orbs with conditional animation - now in gold/yellow */}
        <motion.div
          className="absolute -top-20 right-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
          animate={isTransitioning ? {} : {
            y: [0, 40, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl"
          animate={isTransitioning ? {} : {
            y: [0, -60, 0],
            x: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6"
            >
              <span className="text-yellow-400 font-medium">Our Portfolio</span>
            </motion.div>

            {/* Heading with gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-extrabold mb-8 text-center leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                Featured Projects
              </span>
              <span className="block text-white mt-2">That Showcase Our Expertise</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "80px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl leading-relaxed text-gray-300 mb-8 text-center max-w-xl"
            >
              Explore our recent electrical projects that demonstrate our commitment to quality, safety, and cutting-edge solutions.
            </motion.p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-yellow-500/20 shadow-2xl shadow-yellow-600/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2"
                >
                  {/* Image section */}
                  <div className="relative h-72 lg:h-auto">
                    <img
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent lg:hidden">
                      <h3 className="text-xl font-bold text-white">{projects[currentIndex].title}</h3>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-8 bg-black/60 backdrop-blur-lg">
                    <h3 className="text-3xl font-bold text-white mb-3 hidden lg:block">{projects[currentIndex].title}</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects[currentIndex].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {projects[currentIndex].description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-1">Duration</h4>
                        <p className="text-white">{projects[currentIndex].duration}</p>
                      </div>
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-1">Client</h4>
                        <p className="text-white">{projects[currentIndex].client}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20"
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Discuss Your Project
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      
                      {/* Animated background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2 z-20 lg:bottom-8 lg:right-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors"
                  onClick={prevProject}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors"
                  onClick={nextProject}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-4 left-4 flex space-x-2 z-20 lg:bottom-8 lg:left-8">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "w-8 bg-yellow-500" : "bg-white/30 hover:bg-yellow-400/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-xl text-gray-300 mb-6">
              Ready to transform your commercial or industrial electrical systems?
            </p>
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>

              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
