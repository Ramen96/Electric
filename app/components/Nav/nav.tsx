import React, { useState, useEffect } from "react";
import logo from "../logo.png";

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sectionElements = sections.map((section) =>
      document.getElementById(section.id)
    );
    sectionElements.forEach((el) => el && observer.observe(el));

    return () => {
      sectionElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [sections]);

  return (
    <header className="fixed top-0 w-full bg-gray-100/70 backdrop-blur-md shadow-md z-10">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="logo">
          <img
            src={logo}
            alt="Company Logo"
            className="h-16 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
        <ul className="flex gap-6">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`px-4 py-2 relative text-slate-800 hover:text-slate-900 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-slate-800 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  activeSection === section.id
                    ? "text-slate-900 after:scale-x-100"
                    : "after:scale-x-0"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
