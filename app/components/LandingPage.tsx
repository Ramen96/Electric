import React from "react";
import { motion } from "framer-motion";
import heroImg from "./wire2.jpg";
import logo from "./logo.png";

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Navigation Header */}
      <header className="fixed top-0 w-full bg-white/50 backdrop-blur-md dark:bg-gray-800/50 shadow z-10">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="logo">
            <img src={logo} alt="Company Logo" className="h-16 w-auto" />
          </div>
          <ul className="flex gap-4">
            <li>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("hero")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Home
              </div>
            </li>
            <li>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </div>
            </li>
            <li>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Services
              </div>
            </li>
            <li>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Projects
              </div>
            </li>
            <li>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-between text-white p-8">
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

      {/* About Section */}
      <section id="about" className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p>
          We specialize in providing top-notch electrical solutions for
          commercial and industrial properties. Our experienced team ensures
          every project meets the highest standards of safety and efficiency.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">High-Voltage Systems</h3>
            <p>Installation, maintenance, and upgrades.</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">Backup Power Solutions</h3>
            <p>Design and installation of backup generators.</p>
          </div>
          <div className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">LED Retrofitting</h3>
            <p>Energy-efficient lighting solutions for your business.</p>
          </div>
        </div>
      </section>

      {/* Past Projects Section */}
      <section id="projects" className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Past Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <img
              src={heroImg}
              alt="Project 1"
              className="w-full h-48 object-cover"
            />
            <p className="mt-2">Warehouse Rewire – Completed in 3 weeks</p>
          </div>
          <div className="p-4 border rounded">
            <img
              src={heroImg}
              alt="Project 2"
              className="w-full h-48 object-cover"
            />
            <p className="mt-2">
              Office Lighting Upgrade – Energy Efficient Solutions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-2 border rounded"
              placeholder="Tell us about your project"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-4 text-center">
        © {new Date().getFullYear()} Power Solutions Inc. All rights reserved.
      </footer>
    </div>
  );
}
