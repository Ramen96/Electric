import React, { useState, useEffect } from "react";
import type { LoaderFunction } from "@react-router/dev";
import ApplicationForm from "../ApplicationForm/applicationForm";
import { motion } from "framer-motion";
import logo from "~/assets/cc-electrical.png";
import { Link } from "react-router";

// Loader
export const loader: LoaderFunction = async () => {
  return null;
};

// Component
export default function Careers() {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for dynamic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Button animation variants
  const buttonVariants = {
    initial: {
      boxShadow: "0 0 0 rgba(234, 179, 8, 0)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(234, 179, 8, 0.7)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
        boxShadow: {
          duration: 0.3,
        },
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(234, 179, 8, 0.9)",
    },
  };

  return (
    <>
      <header
        className={`border-yellow-500/25 border fixed top-6 left-0 right-0 mx-auto w-11/12 max-w-screen-2xl z-50 transition-all duration-300 rounded-xl ${
          scrolled
            ? "bg-black/90 backdrop-blur-md shadow-xl py-2"
            : "bg-black/80 backdrop-blur-sm shadow-2xl py-3"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Back to Home Button */}
            <Link to="/">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 text-lg font-bold bg-black/50 text-white hover:bg-yellow-500/80 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </motion.button>
            </Link>

            {/* Logo in center */}
            <Link to="/">
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block overflow-visible"
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -2, 0, 2, 0],
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 0.5,
                      },
                      scale: { duration: 0.3 },
                    },
                  }}
                >
                  <img
                    src={logo}
                    alt="C&C Electrical Logo"
                    className={`
                    transition-all duration-300 cursor-pointer rounded-full glow-yellow border-yellow-600 border-2
                    ${scrolled ? "h-20 w-auto" : "h-28 w-auto"}
                  `}
                    style={{
                      boxShadow: "0 0 20px rgba(234, 179, 8, 0.4)",
                    }}
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* Contact icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href="tel:7048794057"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
                aria-label="Call us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:info@ccelectrical.com"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="bg-black/50 p-2 rounded-full text-yellow-500 hover:bg-yellow-500/80 hover:text-black transition-all duration-300"
                aria-label="Email us"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </div>
          </nav>
        </div>
      </header>
      <ApplicationForm />
    </>
  );
}

// SEO
export function meta() {
  return [
    { title: "Careers | C&C Electric" },
    {
      name: "description",
      content: "Explore career opportunities at C&C Electric.",
    },
  ];
}
