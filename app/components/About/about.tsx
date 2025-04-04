import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-blue-50 pt-24"
    >
      <div className="container mx-auto p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Decorative Icon */}
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-blue-600 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>

          {/* Heading with Gradient Text */}
          <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
            About Us
          </h2>

          {/* Paragraph with Enhanced Styling */}
          <p className="text-xl leading-relaxed text-gray-700 font-sans max-w-2xl mx-auto">
            We specialize in providing <span className="font-semibold text-blue-600">top-notch electrical solutions</span> for
            commercial and industrial properties. Our experienced team ensures every project meets the highest standards of
            safety and efficiency, delivering results that power your success.
          </p>

          {/* Call-to-Action Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
