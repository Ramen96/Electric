import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImg from "~/assets/wire2.jpg";
import { pathDs } from "~/utils/pathData.js";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smoother parallax effect
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.1}px)`,
    transition: "transform 0.1s ease-out",
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 15px rgba(234, 179, 8, 0.3)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(234, 179, 8, 0.4)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.0 + custom * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        style={parallaxStyle}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroImg}
          alt="Close-up of industrial electrical wiring and conduits"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="electricity"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {pathDs.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="rgba(234, 179, 8, 0.6)"
                  strokeWidth="0.5"
                  fill="none"
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#electricity)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-16 lg:pt-0">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Logo */}
          <motion.div
            variants={textVariants}
            custom={0}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={textVariants}
            custom={1}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
          >
            Powering Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Electrical Services
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={textVariants}
            custom={2}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-3 sm:mb-4 max-w-3xl mx-auto px-2"
          >
            Leading Commercial & Industrial Electricians in North Carolina.
          </motion.p>

          <motion.p
            variants={textVariants}
            custom={2.5}
            className="text-sm sm:text-base md:text-lg text-yellow-200 mb-6 sm:mb-8 font-light"
          >
            Efficiency · Reliability · Innovation
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={textVariants}
            custom={3}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            {[
              { value: "200+", label: "Projects Completed" },
              { value: "15+", label: "Years Experience" },
              { value: "99.8%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={textVariants}
            custom={4}
            className="mb-6 sm:mb-8 md:mb-16"
          >
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 md:hidden"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request a Free Consultation
            </motion.button>
          </motion.div>

          {/* Mobile Info Cards */}
          <motion.div
            className="grid gap-3 sm:gap-4 max-w-md mx-auto md:hidden px-2"
            variants={textVariants}
            custom={5}
            initial="hidden"
            animate="visible"
          >
            {/* Location Card - Mobile */}
            <motion.div
              variants={cardVariants}
              custom={0}
              className="bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 sm:p-4 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-500/20 p-2 rounded-full flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-1 text-sm">Our Location</h4>
                  <address className="text-gray-300 not-italic text-xs">
                    510 West 1st Street<br />
                    Lowell, NC 28098<br />
                    <span className="text-yellow-300 font-medium">
                      (704) 879-4057
                    </span>
                  </address>
                </div>
              </div>
            </motion.div>

            {/* Business Hours Card - Mobile */}
            <motion.div
              variants={cardVariants}
              custom={1}
              className="bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 sm:p-4 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-500/20 p-2 rounded-full flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-1 text-sm">Business Hours</h4>
                  <div className="text-gray-300 text-xs">
                    Monday - Friday: 7AM - 3PM<br />
                    <span className="text-yellow-300 font-medium">
                      Weekends: Closed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Elements - Now positioned relative to the Hero section */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        {/* Container to match nav width */}
        <div className="mx-auto w-11/12 max-w-screen-2xl relative">
          {/* Location Card - Bottom Left */}
          <motion.div
            variants={cardVariants}
            custom={0}
            className="absolute bottom-8 left-4 lg:left-8 bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300 max-w-xs hidden md:block pointer-events-auto"
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-1 text-sm">Our Location</h4>
                <address className="text-gray-300 not-italic text-xs">
                  510 West 1st Street<br />
                  Lowell, NC 28098<br />
                  <span className="text-yellow-300 font-medium">
                    (704) 879-4057
                  </span>
                </address>
              </div>
            </div>
          </motion.div>

          {/* Business Hours Card - Bottom Right */}
          <motion.div
            variants={cardVariants}
            custom={1}
            className="absolute bottom-8 right-4 lg:right-8 bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300 max-w-xs hidden md:block pointer-events-auto"
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-1 text-sm">Business Hours</h4>
                <div className="text-gray-300 text-xs">
                  Monday - Friday: 7AM - 3PM<br />
                  <span className="text-yellow-300 font-medium">
                    Weekends: Closed
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button - Bottom Center */}
          <motion.div
            variants={textVariants}
            custom={4}
            className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden md:block pointer-events-auto"
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg text-base font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request a Free Consultation
            </motion.button>
          </motion.div>

          {/* Scroll Indicator - Below the CTA Button */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
