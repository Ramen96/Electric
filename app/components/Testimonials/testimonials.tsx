import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import avatarImg1 from "~/assets/avatar1.jpg";
import avatarImg2 from "~/assets/avatar2.jpg";
import avatarImg3 from "~/assets/avatar3.jpg";
import avatarImg4 from "~/assets/avatar4.jpg";

export default function Testimonials() {
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

  // Example testimonials with detailed information
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Facilities Manager",
      company: "Metro Business Center",
      image: avatarImg1,
      quote: "The office lighting upgrade transformed our workplace. Energy costs are down by 65%, and employee satisfaction has increased significantly. C&C Electrical' team was professional from start to finish.",
      rating: 5,
      project: "Office Building Lighting Upgrade",
    },
    {
      name: "Michael Rodriguez",
      position: "Operations Director",
      company: "Global Distribution Co.",
      image: avatarImg2,
      quote: "When our warehouse needed a complete electrical overhaul, C&C Electrical delivered beyond expectations. Their team worked efficiently with minimal disruption to our operations, and the new safety systems give us peace of mind.",
      rating: 5,
      project: "Commercial Warehouse Rewiring",
    },
    {
      name: "Jennifer Park",
      position: "Plant Manager",
      company: "Precision Manufacturing Inc.",
      image: avatarImg3,
      quote: "The redundant power systems C&C Electrical installed have eliminated our production downtime issues completely. Their understanding of industrial electrical needs is unmatched in the industry.",
      rating: 5,
      project: "Manufacturing Plant Power Systems",
    },
    {
      name: "David Thompson",
      position: "Property Manager",
      company: "Westside Shopping Plaza",
      image: avatarImg4,
      quote: "Renovating a busy shopping center without disrupting business seemed impossible, but C&C Electrical made it happen. All 24 stores remained operational during the upgrade, and the new electrical infrastructure is both code-compliant and energy-efficient.",
      rating: 5,
      project: "Retail Complex Electrical Renovation",
    },
  ];

  // Navigation controls for carousel
  const nextTestimonial = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevTestimonial = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-scroll carousel with pause on hover
  React.useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preload images */}
      <div style={{ display: "none" }}>
        {testimonials.map((testimonial, index) => (
          <img key={index} src={testimonial.image} alt="" />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]" opacity={0.4} />

        {/* Floating orbs with conditional animation - in gold/yellow */}
        <motion.div
          className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
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
          className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl"
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
              <span className="text-yellow-400 font-medium">Client Success</span>
            </motion.div>

            {/* Heading with gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-extrabold mb-8 text-center leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                What Our Clients Say
              </span>
              <span className="block text-white mt-2">About Our Services</span>
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
              Hear directly from our valued clients about their experience working with our team of electrical experts.
            </motion.p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-5xl mx-auto">
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
                  className="bg-black/60 backdrop-blur-lg p-8 md:p-12"
                >
                  {/* Quotation mark decoration */}
                  <div className="absolute top-8 left-8 text-yellow-500/20 text-9xl font-serif">
                    "
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                    {/* Avatar and info section */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/30">
                          <img 
                            src={testimonials[currentIndex].image} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <motion.div 
                          className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5 shadow-md"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 10, 0, -10, 0] }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          <StarIcon className="w-4 h-4 text-black" />
                        </motion.div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1 text-center md:text-left">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-yellow-400 font-medium mb-2 text-center md:text-left">
                        {testimonials[currentIndex].position}
                      </p>
                      <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
                        {testimonials[currentIndex].company}
                      </p>

                      {/* Rating stars */}
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < testimonials[currentIndex].rating 
                                ? "text-yellow-400" 
                                : "text-gray-600"
                            }`} 
                          />
                        ))}
                      </div>
                      
                      <div className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        {testimonials[currentIndex].project}
                      </div>
                    </div>

                    {/* Quote section */}
                    <div className="md:col-span-8 flex flex-col justify-center">
                      <p className="text-gray-300 text-lg md:text-xl italic leading-relaxed">
                        {testimonials[currentIndex].quote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2 z-20 md:bottom-8 md:right-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors"
                  onClick={prevTestimonial}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors"
                  onClick={nextTestimonial}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-4 left-4 flex space-x-2 z-20 md:bottom-8 md:left-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "w-8 bg-yellow-500" : "bg-white/30 hover:bg-yellow-400/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
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
              Join our growing list of satisfied commercial and industrial clients
            </p>
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get an Estimate
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
