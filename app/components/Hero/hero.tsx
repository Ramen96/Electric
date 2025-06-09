import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../wire2.jpg";
import { pathDs } from "~/utils/pathData.js"; // Import the consistent path data

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

  // Parallax effect for background image - smoother with easing
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.15}px)`,
    transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      border: "2px solid rgba(234, 179, 8, 0.6)",
      boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "2px solid rgba(234, 179, 8, 0.9)",
      boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)",
    },
    pulse: {
      boxShadow: [
        "0 0 5px rgba(234, 179, 8, 0.4)",
        "0 0 15px rgba(234, 179, 8, 0.6)",
        "0 0 5px rgba(234, 179, 8, 0.4)",
      ],
      transition: {
        repeat: Infinity,
        duration: 2.5,
      },
    },
  };

  // Info card variants
  const infoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2 + custom * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="mt-20 relative w-full overflow-hidden flex flex-col justify-center items-center min-h-screen"
    >
      <div className="w-11/12 flex flex-col items-center gap-6 max-w-screen-2xl mx-auto">
        {/* Main bordered container for the hero image */}
        <div className="relative w-full h-[65vh] md:h-[70vh] border border-yellow-500/20 rounded-xl overflow-hidden shadow-2xl">
          {/* Hero background image with parallax */}
          <div
            style={parallaxStyle}
            className="absolute inset-0 h-[110%] w-full"
          >
            <img
              src={heroImg}
              alt="Electrical Solutions"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10" />

          {/* Animated electricity particles */}
          <div className="absolute inset-0 z-10 opacity-30">
            <svg className="h-full w-full">
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#electricity)"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
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
                      d={d} // Use the pre-generated path data
                      stroke="rgba(234, 179, 8, 0.8)" // Gold color for electricity
                      strokeWidth="0.5"
                      fill="none"
                      animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </pattern>
              </defs>
            </svg>
          </div>

          {/* Content container */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-gray-100 p-4 md:p-8">
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
            >
              {/* Logo/brand section with improved animation */}
              <motion.div
                variants={textVariants}
                custom={0}
                className="mb-6"
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
              >
                <motion.div
                  className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(234, 179, 8, 0)",
                      "0 0 30px rgba(234, 179, 8, 0.8)",
                      "0 0 0 rgba(234, 179, 8, 0)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 md:h-12 md:w-12 text-black"
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
                </motion.div>
              </motion.div>

              {/* Main headline with improved typography */}
              <motion.h1
                variants={textVariants}
                custom={1}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-tight mb-2"
              >
                <span className="block mb-1">Powering Your</span>
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Business Future
                </motion.span>
              </motion.h1>

              {/* Animated separator line with improved animation */}
              <motion.div
                className="h-1 w-24 my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                variants={textVariants}
                custom={2}
                animate={{
                  width: ["0%", "30%", "20%"],
                  opacity: [0, 1, 1],
                  boxShadow: [
                    "0 0 0px rgba(234, 179, 8, 0.4)",
                    "0 0 20px rgba(234, 179, 8, 0.8)",
                    "0 0 10px rgba(234, 179, 8, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.7, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 5,
                }}
              />

              {/* Subheading with improved styling */}
              <motion.p
                variants={textVariants}
                custom={3}
                className="text-xl md:text-2xl lg:text-3xl text-center max-w-2xl font-light"
              >
                Expert electrical solutions for commercial & industrial projects
                <span className="block mt-3 text-base md:text-xl text-yellow-200 font-light tracking-wider">
                  Efficiency · Reliability · Innovation
                </span>
              </motion.p>

              {/* Stats counters with improved animations */}
              <motion.div
                className="grid grid-cols-3 gap-6 md:gap-10 mt-8 md:mt-10 text-center"
                variants={textVariants}
                custom={4}
              >
                {[
                  { value: "200+", label: "Projects Completed" },
                  { value: "15+", label: "Years Experience" },
                  { value: "99.8%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.span
                      className="text-2xl md:text-4xl font-bold text-yellow-400"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(234, 179, 8, 0.3)",
                          "0 0 15px rgba(234, 179, 8, 0.7)",
                          "0 0 5px rgba(234, 179, 8, 0.3)",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: index * 0.5,
                      }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm md:text-base text-gray-300 mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Rearranged layout for CTA button and cards */}
        <div className="w-full flex flex-col md:flex-row items-stretch mt-2 md:mt-4 gap-3 md:gap-4">
          {/* Location Card - Left */}
          <motion.div
            className="backdrop-blur-sm bg-black/70 p-4 rounded-lg border border-yellow-600/30 flex-1 h-full"
            variants={infoCardVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            whileHover={{
              boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
              borderColor: "rgba(234, 179, 8, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex items-center h-full">
              <div className="mr-3 bg-yellow-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
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
              <div className="text-yellow-400">
                <h4 className="text-sm font-semibold mb-1">Our Location</h4>
                <address className="text-sm not-italic text-gray-200">
                  510 West 1st Street.
                  <br />
                  Lowell, NC 28098
                  <br />
                  <span className="text-yellow-300 font-medium">
                    Phone: (704) 879-4057
                  </span>
                </address>
              </div>
            </div>
          </motion.div>

          {/* CTA Button - Center */}
          <motion.div
            className="flex-1 flex justify-center items-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={["rest", "pulse"]}
              className="px-6 py-3 md:px-8 md:py-4 text-base md:text-xl font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group w-full md:w-auto"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 cursor-pointer">
                Request a Free Consultation
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 group-hover:text-black z-10 transition-colors duration-300" />
            </motion.button>
          </motion.div>

          {/* Business Hours Card - Right */}
          <motion.div
            className="backdrop-blur-sm bg-black/70 p-4 rounded-lg border border-yellow-600/30 flex-1 h-full"
            variants={infoCardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            whileHover={{
              boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
              borderColor: "rgba(234, 179, 8, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex items-center h-full">
              <div className="mr-3 bg-yellow-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
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
              <div className="text-yellow-400">
                <h4 className="text-sm font-semibold mb-1">Business Hours</h4>
                <div className="text-sm text-gray-200">
                  Monday - Friday: 7AM - 3PM
                  <br />
                  <span className="text-yellow-300 font-medium">
                    Weekends: Closed
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator hidden on small screens, visible on md and up */}
        <motion.div
          className="absolute hidden md:flex bottom-24 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
