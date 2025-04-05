import React from "react";
import { motion } from "framer-motion";
import Nav from "./Nav/nav";
import Hero from "./Hero/hero";
import About from "./About/about";
import Services from "./Services/services";
import Projects from "./Projects/projects";
import Contact from "./Contact/contact";

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <footer className="bg-gray-900 p-4 text-center">
        © {new Date().getFullYear()} Power Solutions Inc. All rights reserved.
      </footer>
    </div>
  );
}
