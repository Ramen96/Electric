import React from "react";
import { motion } from "framer-motion";
import heroImg from "../wire2.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-between text-gray-100 p-8">
          <div className="flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-4xl font-bold mt-20"
            >
              Powering Your Business
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="text-xl text-center max-w-md mt-4"
            >
              Expert electrical solutions for commercial & industrial projects
            </motion.p>
          </div>
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: 5,
              backgroundColor: "#22c55e",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)", // Stronger glow
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            }}
            whileTap={{ scale: 0.95 }} // Scale down on click for feedback
            animate={{
              boxShadow: [
                "0 0 10px rgba(34, 197, 94, 0.5)", // Softer glow
                "0 0 20px rgba(34, 197, 94, 0.8)", // Stronger glow
                "0 0 10px rgba(34, 197, 94, 0.5)", // Back to softer
              ],
              transition: {
                repeat: Infinity,
                duration: 2, // Smooth pulse speed
              },
            }}
            className="px-6 py-3 bg-white/50 dark:bg-gray-800/50 shadow z-10 border-white/50 border-2 rounded-lg text-white mb-16 cursor-pointer"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Request a Quote
          </motion.button>
        </div>
      </section>
  );
}