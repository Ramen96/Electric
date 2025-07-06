import React, { useState, useEffect } from "react";
import type { LoaderFunction } from "@react-router/dev";
import ApplicationForm from "../ApplicationForm/applicationForm";
import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import logo from "public/images/cncelectricco-logo.png";

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

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/")
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-24">
            <button
              onClick={navigateHome}
              className="group relative p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 hover:from-yellow-500/30 hover:to-yellow-600/20 text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <Home className="w-6 h-6" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/0 to-yellow-600/0 group-hover:from-yellow-500/10 group-hover:to-yellow-600/5 transition-all duration-300"></div>
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-yellow-500/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src={logo} 
                    alt="C&C Electric Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-full blur opacity-75"></div>
              </div>
              <div className="relative">
                <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text tracking-wide">
                  Careers
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ApplicationForm />
    </>
  );
}

// SEO
export function meta() {
  return [
    { title: "Careers | C&C Electric" },
    { name: "description", content: "Join our team at C&C Electric. Explore electrician and electrical contractor career opportunities in North Carolina." },
    { name: "keywords", content: "electrical jobs, electrician careers, C&C Electric jobs, South Carolina electrical work" },
    { property: "og:title", content: "Careers | C&C Electric" },
    { property: "og:description", content: "Explore career opportunities at C&C Electric." },
    { property: "og:type", content: "website" },
  ];
}