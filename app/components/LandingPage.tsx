import React from "react";
import { motion } from "framer-motion";
import Nav from "./Nav/nav";
import Hero from "./Hero/hero";
import About from "./About/about";
import Services from "./Services/services";
import Portfolio from "./Portfolio/portfolio";
import Testimonials from "./Testimonials/testimonials";
import Contact from "./Contact/contact";

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      {/* Add Team here */}
      <About />
      <Contact />
      <footer className="bg-black p-4 text-center text-yellow-500">
        © {new Date().getFullYear()} C&C Electrical LLC. All rights reserved.
      </footer>
    </div>
  );
}
