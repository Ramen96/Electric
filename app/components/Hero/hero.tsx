import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../wire2.jpg";

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

  // Parallax effect for background image
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.2}px)`,
    transition: "transform 0.1s ease-out"
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "2px solid rgba(255, 255, 255, 0.5)",
      boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)"
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 0 25px rgba(34, 197, 94, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 0 5px rgba(34, 197, 94, 0.6)"
    },
    pulse: {
      boxShadow: [
        "0 0 5px rgba(34, 197, 94, 0.4)",
        "0 0 15px rgba(34, 197, 94, 0.6)",
        "0 0 5px rgba(34, 197, 94, 0.4)"
      ],
      transition: {
        repeat: Infinity,
        duration: 2.5
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Overlay gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10" />
      
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
            <pattern id="electricity" width="100" height="100" patternUnits="userSpaceOnUse">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
                  stroke="rgba(100, 220, 255, 0.8)"
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

      {/* Hero background image with parallax */}
      <div style={parallaxStyle} className="absolute inset-0 h-full w-full">
        <img src={heroImg} alt="Electrical Solutions" className="w-full h-full object-cover" />
      </div>

      {/* Content container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between text-gray-100 p-8">
        <motion.div 
          className="flex flex-col items-center mt-16 md:mt-24"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Logo/brand section */}
          <motion.div 
            variants={textVariants}
            custom={0}
            className="mb-6"
          >
            <motion.div 
              className="h-16 w-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.6)",
                  "0 0 0 rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 3
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={textVariants}
            custom={1}
            className="text-4xl md:text-6xl font-bold text-center tracking-tight"
          >
            <span className="block">Powering Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">Business Future</span>
          </motion.h1>

          {/* Animated separator line */}
          <motion.div 
            className="h-1 w-24 my-6 rounded-full bg-gradient-to-r from-blue-400 to-green-500"
            variants={textVariants}
            custom={2}
            animate={{
              width: ["0%", "20%"],
              opacity: [0, 1]
            }}
            transition={{
              duration: 1.2,
              delay: 0.8
            }}
          />

          {/* Subheading */}
          <motion.p
            variants={textVariants}
            custom={3}
            className="text-xl md:text-2xl text-center max-w-lg font-light"
          >
            Expert electrical solutions for commercial & industrial projects
            <span className="block mt-2 text-lg text-blue-200 font-light">Efficiency. Reliability. Innovation.</span>
          </motion.p>

          {/* Stats counters */}
          <motion.div 
            className="grid grid-cols-3 gap-6 mt-12 text-center"
            variants={textVariants}
            custom={4}
          >
            {[
              { value: "500+", label: "Projects" },
              { value: "15+", label: "Years Experience" },
              { value: "100%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              >
                <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-300">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mb-16 md:mb-24"
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
            className="px-8 py-4 text-lg font-medium rounded-lg text-white backdrop-blur-sm relative overflow-hidden group"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="relative z-10">Request a Free Consultation</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div className="w-1 h-2 bg-white/80 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}