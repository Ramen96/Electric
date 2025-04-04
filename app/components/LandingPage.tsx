import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Nav  from "./Nav/nav";
import Hero from "./Hero/hero";
import About from "./About/about";
import heroImg from "./wire2.jpg";

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <Hero />
      <About /> 
      {/* Services Section */}
      <section id="services" className="container mx-auto p-8 h-screen">
        <h2 className="text-2xl font-bold mb-4 mt-20">Services</h2>
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
      <section id="projects" className="container mx-auto p-8 h-screen">
        <h2 className="text-2xl font-bold mb-4 mt-20">Past Projects</h2>
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
      <section id="contact" className="container mx-auto p-8 h-screen">
        <h2 className="text-2xl font-bold mb-4 mt-20">Contact Us</h2>
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
