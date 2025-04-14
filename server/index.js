import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { createElement, useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import seedrandom from "seedrandom";
import { BoltIcon, Battery100Icon, LightBulbIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/Electric/assets/cc-electric-high-resolution-logo-CPvV7lEq.png";
function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" }
  ];
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2) => {
          if (entry2.isIntersecting) {
            setActiveSection(entry2.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    const sectionElements = sections.map(
      (section) => document.getElementById(section.id)
    );
    sectionElements.forEach((el) => el && observer.observe(el));
    return () => {
      sectionElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [sections]);
  const scrollToSection = (id) => {
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: `fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md shadow-lg py-2" : "bg-black/70 py-4"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex justify-end items-center text-yellow-400 py-1 space-x-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx("a", { href: "mailto:info@ccelectrical.com", className: "text-sm font-medium hover:text-yellow-300 transition-colors", children: "info@ccelectrical.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
          /* @__PURE__ */ jsx("a", { href: "tel:5551234567", className: "text-sm font-medium hover:text-yellow-300 transition-colors", children: "(555) 123-4567" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex justify-between items-center py-2", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "flex items-center space-x-3",
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: logo,
                  alt: "C&C Electrical Logo",
                  className: `transition-all duration-300 ${scrolled ? "h-12 w-auto" : "h-16 w-auto"}`
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-bold text-lg md:text-xl", children: "C&C Electrical" }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-xs hidden sm:block", children: "Quality Electrical Services" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-8", children: [
          sections.map((section) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${section.id}`,
              className: `relative group ${activeSection === section.id ? "text-yellow-400" : "text-gray-200 hover:text-yellow-300"}`,
              onClick: (e) => {
                e.preventDefault();
                scrollToSection(section.id);
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: section.label }),
                /* @__PURE__ */ jsx("span", { className: `absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${activeSection === section.id ? "w-full" : ""}` })
              ]
            },
            section.id
          )),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "px-4 py-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-black text-sm font-bold transition-all",
              onClick: () => scrollToSection("contact"),
              children: "Get Estimate"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 lg:hidden", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:info@ccelectrical.com",
              className: "p-2 text-yellow-400 hover:text-yellow-300",
              "aria-label": "Email us",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "tel:5551234567",
              className: "p-2 text-yellow-400 hover:text-yellow-300",
              "aria-label": "Call us",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMobileMenuOpen(!mobileMenuOpen),
              className: "p-2 rounded-md text-yellow-500 hover:text-yellow-300 focus:outline-none",
              "aria-label": "Toggle menu",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: mobileMenuOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `lg:hidden bg-black/95 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-screen py-4" : "max-h-0"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3 py-3 border-b border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-yellow-400", children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx("a", { href: "mailto:info@ccelectrical.com", className: "text-sm font-medium", children: "info@ccelectrical.com" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-yellow-400", children: [
              /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
              /* @__PURE__ */ jsx("a", { href: "tel:5551234567", className: "text-sm font-medium", children: "(555) 123-4567" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "py-4 space-y-4", children: sections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: `#${section.id}`,
              className: `block py-2 px-4 border-l-2 ${activeSection === section.id ? "border-yellow-400 text-yellow-400" : "border-transparent text-gray-300 hover:text-yellow-300"}`,
              onClick: (e) => {
                e.preventDefault();
                scrollToSection(section.id);
              },
              children: section.label
            }
          ) }, section.id)) }),
          /* @__PURE__ */ jsx("div", { className: "py-4 flex justify-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "w-full py-3 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold text-sm",
              onClick: () => scrollToSection("contact"),
              children: "Request an Estimate"
            }
          ) })
        ] })
      }
    )
  ] });
}
const heroImg = "/Electric/assets/wire2-CV3GtddK.jpg";
const rng = seedrandom("fixed-seed");
const pathDs = Array.from({ length: 20 }, () => {
  const x1 = rng() * 100;
  const y1 = rng() * 100;
  const x2 = rng() * 100;
  const y2 = rng() * 100;
  const x3 = rng() * 100;
  const y3 = rng() * 100;
  return `M${x1},${y1} Q${x2},${y2} ${x3},${y3}`;
});
function Hero() {
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
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      border: "2px solid rgba(234, 179, 8, 0.5)",
      boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)"
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "2px solid rgba(234, 179, 8, 0.8)",
      boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)"
    },
    pulse: {
      boxShadow: [
        "0 0 5px rgba(234, 179, 8, 0.4)",
        "0 0 15px rgba(234, 179, 8, 0.6)",
        "0 0 5px rgba(234, 179, 8, 0.4)"
      ],
      transition: {
        repeat: Infinity,
        duration: 2.5
      }
    }
  };
  return /* @__PURE__ */ jsxs("section", { id: "hero", className: "relative h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 opacity-30", children: /* @__PURE__ */ jsxs("svg", { className: "h-full w-full", children: [
      /* @__PURE__ */ jsx(
        motion.rect,
        {
          x: "0",
          y: "0",
          width: "100%",
          height: "100%",
          fill: "url(#electricity)",
          animate: {
            opacity: [0.2, 0.5, 0.2]
          },
          transition: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }
        }
      ),
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: "electricity", width: "100", height: "100", patternUnits: "userSpaceOnUse", children: pathDs.map((d, i) => /* @__PURE__ */ jsx(
        motion.path,
        {
          d,
          stroke: "rgba(234, 179, 8, 0.8)",
          strokeWidth: "0.5",
          fill: "none",
          animate: {
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0]
          },
          transition: {
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }
        },
        i
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { style: parallaxStyle, className: "absolute inset-0 h-full w-full", children: /* @__PURE__ */ jsx("img", { src: heroImg, alt: "Electrical Solutions", className: "w-full h-full object-cover" }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-20 flex flex-col items-center justify-between text-gray-100 p-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex flex-col items-center mt-16 md:mt-24",
          initial: "hidden",
          animate: isLoaded ? "visible" : "hidden",
          variants: fadeIn,
          children: [
            /* @__PURE__ */ jsx(motion.div, { variants: textVariants, custom: 0, className: "mb-6", children: /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "mt-6 h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center",
                animate: {
                  boxShadow: [
                    "0 0 0 rgba(234, 179, 8, 0)",
                    "0 0 20px rgba(234, 179, 8, 0.6)",
                    "0 0 0 rgba(234, 179, 8, 0)"
                  ]
                },
                transition: {
                  repeat: Infinity,
                  duration: 3
                },
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-8 w-8 text-black",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M13 10V3L4 14h7v7l9-11h-7z"
                      }
                    )
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxs(
              motion.h1,
              {
                variants: textVariants,
                custom: 1,
                className: "text-4xl md:text-6xl font-bold text-center tracking-tight",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "block", children: "Powering Your" }),
                  /* @__PURE__ */ jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600", children: "Business Future" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "h-1 w-24 my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600",
                variants: textVariants,
                custom: 2,
                animate: {
                  width: ["0%", "20%"],
                  opacity: [0, 1]
                },
                transition: {
                  duration: 1.2,
                  delay: 0.8
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.p,
              {
                variants: textVariants,
                custom: 3,
                className: "text-xl md:text-2xl text-center max-w-lg font-light",
                children: [
                  "Expert electrical solutions for commercial & industrial projects",
                  /* @__PURE__ */ jsx("span", { className: "block mt-2 text-lg text-yellow-200 font-light", children: "Efficiency. Reliability. Innovation." })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "grid grid-cols-3 gap-6 mt-12 text-center",
                variants: textVariants,
                custom: 4,
                children: [
                  { value: "500+", label: "Projects" },
                  { value: "15+", label: "Years Experience" },
                  { value: "100%", label: "Satisfaction" }
                ].map((stat, index) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "flex flex-col",
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 1.2 + index * 0.2, duration: 0.6 },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-2xl md:text-3xl font-bold text-yellow-400", children: stat.value }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300", children: stat.label })
                    ]
                  },
                  index
                ))
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mb-16 md:mb-24",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 1.8, duration: 0.8 },
          children: /* @__PURE__ */ jsxs(
            motion.button,
            {
              variants: buttonVariants,
              initial: "rest",
              whileHover: "hover",
              whileTap: "tap",
              animate: ["rest", "pulse"],
              className: "px-8 py-4 text-lg font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group",
              onClick: () => {
                var _a;
                return (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "relative z-10 cursor-pointer", children: "Request a Free Consultation" }),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100",
                    transition: { duration: 0.3 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "absolute inset-0 group-hover:text-black z-10 transition-colors duration-300",
                    transition: { duration: 0.3 }
                  }
                )
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute bottom-8 left-1/2 transform -translate-x-1/2",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 2.2, duration: 1 },
          children: /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center",
              animate: { y: [0, 8, 0] },
              transition: { repeat: Infinity, duration: 1.5 },
              children: /* @__PURE__ */ jsx(motion.div, { className: "w-1 h-2 bg-yellow-400/80 rounded-full mt-2" })
            }
          )
        }
      )
    ] })
  ] });
}
function About() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [counters, setCounters] = useState({ stat0: 0, stat1: 0, stat2: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const stats = [
    { value: 15, label: "Years Experience", icon: "🏆", key: "stat0" },
    { value: 500, label: "Projects Completed", icon: "⚡", key: "stat1" },
    { value: 99.8, label: "Client Satisfaction", unit: "%", icon: "❤️", key: "stat2" }
  ];
  const milestones = [
    { year: 2010, title: "Company Founded", description: "Started with just 3 electricians serving local businesses" },
    { year: 2015, title: "Expansion", description: "Grew to 25 employees and expanded to statewide operations" },
    { year: 2020, title: "Innovation", description: "Pioneered smart electrical systems for commercial spaces" },
    { year: 2024, title: "National Recognition", description: "Recognized as industry leaders in electrical contracting" }
  ];
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2e3;
    const statValues = { stat0: 15, stat1: 500, stat2: 99.8 };
    let startTime;
    let animationFrameId;
    const startAnimation = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCounters({
        stat0: Math.floor(percentage * statValues.stat0),
        stat1: Math.floor(percentage * statValues.stat1),
        stat2: Math.floor(percentage * statValues.stat2 * 10) / 10
      });
      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(startAnimation);
      }
    };
    animationFrameId = requestAnimationFrame(startAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "about",
      ref,
      className: "relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden",
      children: [
        isClient && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]",
              opacity: 0.4
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl",
              animate: {
                y: [0, 40, 0],
                x: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              },
              transition: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute top-40 -right-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl",
              animate: {
                y: [0, -60, 0],
                x: [0, 30, 0],
                opacity: [0.2, 0.5, 0.2]
              },
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            style: { y: smoothY, opacity },
            className: "max-w-6xl mx-auto",
            children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -30 },
                  animate: isInView ? { opacity: 1, x: 0 } : {},
                  transition: { duration: 0.8, ease: "easeOut" },
                  className: "text-left",
                  children: [
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: isInView ? { opacity: 1, scale: 1 } : {},
                        transition: { duration: 0.4 },
                        className: "inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6",
                        children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-medium", children: "Our Story" })
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.h2,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                        transition: { duration: 0.6, delay: 0.2 },
                        className: "text-5xl font-extrabold mb-8 leading-tight",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text", children: "Powering Innovation" }),
                          /* @__PURE__ */ jsx("span", { className: "block text-white mt-2", children: "For Over 15 Years" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                        transition: { duration: 0.6, delay: 0.4 },
                        children: [
                          /* @__PURE__ */ jsxs("p", { className: "text-xl leading-relaxed text-gray-300 mb-6", children: [
                            "We specialize in providing",
                            " ",
                            /* @__PURE__ */ jsx("span", { className: "font-semibold text-yellow-400", children: "cutting-edge electrical solutions" }),
                            " ",
                            "for commercial and industrial properties across the nation."
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed mb-8", children: "Our team of certified experts brings decades of combined experience to every project, ensuring flawless execution from concept to completion. We've built our reputation on technical excellence, innovative approaches, and an unwavering commitment to client satisfaction." })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                        transition: { duration: 0.6, delay: 0.6 },
                        children: /* @__PURE__ */ jsxs(
                          motion.button,
                          {
                            whileHover: { scale: 1.05 },
                            whileTap: { scale: 0.98 },
                            onHoverStart: () => setIsHovered(true),
                            onHoverEnd: () => setIsHovered(false),
                            className: "cursor-pointer group relative overflow-hidden px-8 py-4 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20",
                            onClick: () => {
                              var _a;
                              (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                            },
                            children: [
                              /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center", children: [
                                "Learn More About Us",
                                /* @__PURE__ */ jsx(
                                  "svg",
                                  {
                                    className: "w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /* @__PURE__ */ jsx(
                                      "path",
                                      {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                      }
                                    )
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsx(
                                motion.div,
                                {
                                  className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                                  initial: { x: "100%" },
                                  animate: { x: isHovered ? "0%" : "-100%" },
                                  transition: { duration: 0.4 }
                                }
                              )
                            ]
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 30 },
                  animate: isInView ? { opacity: 1, x: 0 } : {},
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                  className: "space-y-12",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4", children: stats.map((stat, index) => /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                        transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
                        whileHover: { y: -5, transition: { duration: 0.2 } },
                        className: "bg-black/60 backdrop-blur-lg border border-yellow-500/20 p-6 rounded-xl text-center",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "text-2xl mb-2", children: stat.icon }),
                          /* @__PURE__ */ jsxs("div", { className: "text-3xl font-bold text-yellow-400", children: [
                            counters[stat.key],
                            stat.unit || ""
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm mt-1", children: stat.label })
                        ]
                      },
                      stat.label
                    )) }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-black/60 backdrop-blur-lg border border-yellow-500/20 p-6 rounded-xl", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-6", children: "Our Journey" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-yellow-400 to-yellow-600 z-0" }),
                        milestones.map((milestone, index) => /* @__PURE__ */ jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, x: 20 },
                            animate: isInView ? { opacity: 1, x: 0 } : {},
                            transition: { duration: 0.6, delay: 0.4 + index * 0.1 },
                            className: "relative flex items-start mb-8 last:mb-0",
                            children: [
                              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20", children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-black flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600" }) }) }) }),
                              /* @__PURE__ */ jsxs("div", { className: "ml-6", children: [
                                /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-white", children: milestone.year }),
                                /* @__PURE__ */ jsx("div", { className: "text-yellow-400 font-medium", children: milestone.title }),
                                /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm mt-1", children: milestone.description })
                              ] })
                            ]
                          },
                          milestone.year
                        ))
                      ] })
                    ] })
                  ]
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const services = [
    {
      title: "High-Voltage Systems",
      description: "Expert installation, maintenance, and upgrades for commercial and industrial electrical systems.",
      icon: /* @__PURE__ */ jsx(BoltIcon, { className: "w-12 h-12" }),
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20"
    },
    {
      title: "Backup Power Solutions",
      description: "Custom design and installation of reliable backup generators and power systems.",
      icon: /* @__PURE__ */ jsx(Battery100Icon, { className: "w-12 h-12" }),
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20"
    },
    {
      title: "LED Retrofitting",
      description: "Energy-efficient lighting solutions that reduce costs and enhance workspace atmosphere.",
      icon: /* @__PURE__ */ jsx(LightBulbIcon, { className: "w-12 h-12" }),
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "services",
      className: "min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden relative",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden opacity-40", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute -left-20 -top-20 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl",
              animate: {
                x: [0, 100, 0],
                y: [0, 50, 0],
                opacity: [0.3, 0.6, 0.3]
              },
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute right-20 bottom-40 w-80 h-80 rounded-full bg-yellow-600/10 blur-3xl",
              animate: {
                x: [0, -70, 0],
                y: [0, 100, 0],
                opacity: [0.2, 0.5, 0.2]
              },
              transition: {
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute left-1/2 top-1/3 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl",
              animate: {
                x: [0, 80, 0],
                y: [0, -60, 0],
                opacity: [0.2, 0.5, 0.2]
              },
              transition: {
                duration: 30,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-16", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                transition: { duration: 0.6 },
                className: "inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-4",
                children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-medium", children: "What We Offer" })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.h2,
              {
                initial: { opacity: 0, y: -20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2 },
                className: "text-5xl font-bold mb-4 text-center",
                children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text", children: "Our Expert Services" })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, width: 0 },
                whileInView: { opacity: 1, width: "80px" },
                transition: { duration: 0.7, delay: 0.4 },
                className: "h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.6 },
                className: "text-gray-300 text-center max-w-xl",
                children: "Discover our comprehensive range of electrical services designed to meet your specific needs with professionalism and expertise."
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-100px" },
              variants: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              },
              children: services.map((service, index) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  variants: {
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  },
                  transition: {
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  },
                  whileHover: {
                    y: -10,
                    transition: { duration: 0.3 }
                  },
                  onMouseEnter: () => setHoveredCard(index),
                  onMouseLeave: () => setHoveredCard(null),
                  className: "group relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-500/20 shadow-xl shadow-yellow-600/10",
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `absolute inset-0 bg-black/60 backdrop-blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        className: `absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`,
                        initial: { opacity: 0 },
                        animate: { opacity: hoveredCard === index ? 0.15 : 0 },
                        transition: { duration: 0.3 }
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "flex justify-center mb-6",
                          whileHover: { rotate: [0, -5, 5, -5, 0] },
                          transition: { duration: 0.5 },
                          children: /* @__PURE__ */ jsx(
                            motion.div,
                            {
                              className: `p-4 rounded-2xl ${service.bgLight} border border-yellow-500/20 shadow-lg shadow-yellow-600/10`,
                              whileHover: { scale: 1.1 },
                              transition: { type: "spring", stiffness: 400, damping: 10 },
                              children: /* @__PURE__ */ jsx(
                                motion.div,
                                {
                                  className: `${service.textColor}`,
                                  initial: { rotate: 0 },
                                  whileHover: { rotate: 360 },
                                  transition: { duration: 0.6 },
                                  children: service.icon
                                }
                              )
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-3 text-center text-yellow-400 transition-colors duration-300`, children: service.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-center leading-relaxed", children: service.description }),
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "mt-6 flex justify-center",
                          initial: { opacity: 0, y: 10 },
                          animate: {
                            opacity: hoveredCard === index ? 1 : 0,
                            y: hoveredCard === index ? 0 : 10
                          },
                          transition: { duration: 0.3 },
                          children: /* @__PURE__ */ jsxs("button", { className: "relative overflow-hidden cursor-pointer group px-6 py-2 rounded-full bg-black text-yellow-400 font-medium text-sm flex items-center border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20", children: [
                            /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Learn More" }),
                            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "relative z-10 h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
                            /* @__PURE__ */ jsx(
                              motion.div,
                              {
                                className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                                initial: { x: "-100%" },
                                whileHover: { x: "0%" },
                                transition: { duration: 0.4 }
                              }
                            )
                          ] })
                        }
                      )
                    ] })
                  ]
                },
                service.title
              ))
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.6 },
              className: "mt-16 text-center",
              children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    var _a;
                    (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                  },
                  className: "relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300",
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center", children: [
                      "Get an Estimate",
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                    ] }),
                    /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                        initial: { x: "-100%" },
                        whileHover: { x: "0%" },
                        transition: { duration: 0.4 }
                      }
                    )
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
const warehouseImg = "/Electric/assets/warehouse-DL0h7ntM.jpg";
const officeImg = "/Electric/assets/office-Dbhkk6od.jpg";
const mfgImg = "/Electric/assets/manufacturing-BHrSPJwX.jpg";
const retailImg = "/Electric/assets/retail-CGGhgSun.jpg";
function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const projects = [
    {
      title: "Commercial Warehouse Rewiring",
      description: "Complete electrical system overhaul for a 50,000 sq ft distribution center. Implemented energy-efficient lighting and updated all safety systems.",
      image: warehouseImg,
      tags: ["Industrial", "Energy-Efficient", "Safety Compliance"],
      duration: "3 weeks",
      client: "Global Distribution Co."
    },
    {
      title: "Office Building Lighting Upgrade",
      description: "Retrofitted a 12-story office complex with smart LED lighting solutions, reducing energy consumption by 65% and improving workplace illumination.",
      image: officeImg,
      tags: ["Commercial", "Smart Systems", "LED Technology"],
      duration: "5 weeks",
      client: "Metro Business Center"
    },
    {
      title: "Manufacturing Plant Power Systems",
      description: "Designed and installed high-capacity electrical systems for heavy machinery with built-in redundancies to prevent costly downtime.",
      image: mfgImg,
      tags: ["Industrial", "High-Capacity", "Redundant Systems"],
      duration: "8 weeks",
      client: "Precision Manufacturing Inc."
    },
    {
      title: "Retail Complex Electrical Renovation",
      description: "Modernized electrical infrastructure for a shopping center with 24 storefronts, updating to code while maintaining business operations.",
      image: retailImg,
      tags: ["Retail", "Code Compliance", "Minimal Disruption"],
      duration: "6 weeks",
      client: "Westside Shopping Plaza"
    }
  ];
  const nextProject = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };
  const prevProject = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextProject();
    }, 5e3);
    return () => clearInterval(interval);
  }, [isHovered]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "projects",
      ref: containerRef,
      className: "relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: projects.map((project, index) => /* @__PURE__ */ jsx("img", { src: project.image, alt: "" }, index)) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]", opacity: 0.4 }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute -top-20 right-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl",
              animate: isTransitioning ? {} : {
                y: [0, 40, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3]
              },
              transition: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl",
              animate: isTransitioning ? {} : {
                y: [0, -60, 0],
                x: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2]
              },
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(motion.div, { style: { y, opacity }, className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-12", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                transition: { duration: 0.4 },
                className: "inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6",
                children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-medium", children: "Our Portfolio" })
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.h2,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "text-5xl font-extrabold mb-8 text-center leading-tight",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text", children: "Featured Projects" }),
                  /* @__PURE__ */ jsx("span", { className: "block text-white mt-2", children: "That Showcase Our Expertise" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, width: 0 },
                whileInView: { opacity: 1, width: "80px" },
                transition: { duration: 0.7, delay: 0.3 },
                className: "h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                className: "text-xl leading-relaxed text-gray-300 mb-8 text-center max-w-xl",
                children: "Explore our recent electrical projects that demonstrate our commitment to quality, safety, and cutting-edge solutions."
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "relative overflow-hidden rounded-2xl border border-yellow-500/20 shadow-2xl shadow-yellow-600/10",
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.8 },
              children: [
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.3, ease: "easeInOut" },
                    className: "grid grid-cols-1 lg:grid-cols-2",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative h-72 lg:h-auto", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: projects[currentIndex].image,
                            alt: projects[currentIndex].title,
                            className: "w-full h-full object-cover"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent lg:hidden", children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white", children: projects[currentIndex].title }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-8 bg-black/60 backdrop-blur-lg", children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-white mb-3 hidden lg:block", children: projects[currentIndex].title }),
                        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: projects[currentIndex].tags.map((tag, index) => /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
                            children: tag
                          },
                          index
                        )) }),
                        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-6 leading-relaxed", children: projects[currentIndex].description }),
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("h4", { className: "text-yellow-400 font-medium mb-1", children: "Duration" }),
                            /* @__PURE__ */ jsx("p", { className: "text-white", children: projects[currentIndex].duration })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("h4", { className: "text-yellow-400 font-medium mb-1", children: "Client" }),
                            /* @__PURE__ */ jsx("p", { className: "text-white", children: projects[currentIndex].client })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs(
                          motion.button,
                          {
                            whileHover: { scale: 1.05 },
                            whileTap: { scale: 0.98 },
                            className: "group relative overflow-hidden px-8 py-3 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20",
                            onClick: () => {
                              var _a;
                              (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                            },
                            children: [
                              /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center", children: [
                                "Discuss Your Project",
                                /* @__PURE__ */ jsx(
                                  "svg",
                                  {
                                    className: "w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /* @__PURE__ */ jsx(
                                      "path",
                                      {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                      }
                                    )
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsx(
                                motion.div,
                                {
                                  className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                                  initial: { x: "-100%" },
                                  whileHover: { x: "0%" },
                                  transition: { duration: 0.4 }
                                }
                              )
                            ]
                          }
                        )
                      ] })
                    ]
                  },
                  currentIndex
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 right-4 flex space-x-2 z-20 lg:bottom-8 lg:right-8", children: [
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      className: "w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors",
                      onClick: prevProject,
                      children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      className: "w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors",
                      onClick: nextProject,
                      children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-5 h-5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 flex space-x-2 z-20 lg:bottom-8 lg:left-8", children: projects.map((_, index) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentIndex(index),
                    className: `w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-yellow-500" : "bg-white/30 hover:bg-yellow-400/50"}`,
                    "aria-label": `Go to slide ${index + 1}`
                  },
                  index
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.6 },
              className: "mt-16 text-center",
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 mb-6", children: "Ready to transform your commercial or industrial electrical systems?" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      var _a;
                      (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center", children: [
                        "Start Your Project",
                        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                      ] }),
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                          initial: { x: "-100%" },
                          whileHover: { x: "0%" },
                          transition: { duration: 0.4 }
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
const avatarImg1 = "/Electric/assets/avatar1-BLryAb-3.jpg";
const avatarImg2 = "/Electric/assets/avatar2-CNE0vwU3.jpg";
const avatarImg3 = "/Electric/assets/avatar3-rzZen0MW.jpg";
const avatarImg4 = "/Electric/assets/avatar4-D0gb320Z.jpg";
function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Facilities Manager",
      company: "Metro Business Center",
      image: avatarImg1,
      quote: "The office lighting upgrade transformed our workplace. Energy costs are down by 65%, and employee satisfaction has increased significantly. C&C Electrical' team was professional from start to finish.",
      rating: 5,
      project: "Office Building Lighting Upgrade"
    },
    {
      name: "Michael Rodriguez",
      position: "Operations Director",
      company: "Global Distribution Co.",
      image: avatarImg2,
      quote: "When our warehouse needed a complete electrical overhaul, C&C Electrical delivered beyond expectations. Their team worked efficiently with minimal disruption to our operations, and the new safety systems give us peace of mind.",
      rating: 5,
      project: "Commercial Warehouse Rewiring"
    },
    {
      name: "Jennifer Park",
      position: "Plant Manager",
      company: "Precision Manufacturing Inc.",
      image: avatarImg3,
      quote: "The redundant power systems C&C Electrical installed have eliminated our production downtime issues completely. Their understanding of industrial electrical needs is unmatched in the industry.",
      rating: 5,
      project: "Manufacturing Plant Power Systems"
    },
    {
      name: "David Thompson",
      position: "Property Manager",
      company: "Westside Shopping Plaza",
      image: avatarImg4,
      quote: "Renovating a busy shopping center without disrupting business seemed impossible, but C&C Electrical made it happen. All 24 stores remained operational during the upgrade, and the new electrical infrastructure is both code-compliant and energy-efficient.",
      rating: 5,
      project: "Retail Complex Electrical Renovation"
    }
  ];
  const nextTestimonial = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };
  const prevTestimonial = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6e3);
    return () => clearInterval(interval);
  }, [isHovered]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "testimonials",
      ref: containerRef,
      className: "relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: testimonials.map((testimonial, index) => /* @__PURE__ */ jsx("img", { src: testimonial.image, alt: "" }, index)) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]", opacity: 0.4 }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl",
              animate: isTransitioning ? {} : {
                y: [0, 40, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3]
              },
              transition: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl",
              animate: isTransitioning ? {} : {
                y: [0, -60, 0],
                x: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2]
              },
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs(motion.div, { style: { y, opacity }, className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-12", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                transition: { duration: 0.4 },
                className: "inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6",
                children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-medium", children: "Client Success" })
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.h2,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "text-5xl font-extrabold mb-8 text-center leading-tight",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text", children: "What Our Clients Say" }),
                  /* @__PURE__ */ jsx("span", { className: "block text-white mt-2", children: "About Our Services" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, width: 0 },
                whileInView: { opacity: 1, width: "80px" },
                transition: { duration: 0.7, delay: 0.3 },
                className: "h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                className: "text-xl leading-relaxed text-gray-300 mb-8 text-center max-w-xl",
                children: "Hear directly from our valued clients about their experience working with our team of electrical experts."
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "relative overflow-hidden rounded-2xl border border-yellow-500/20 shadow-2xl shadow-yellow-600/10",
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.8 },
              children: [
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.3, ease: "easeInOut" },
                    className: "bg-black/60 backdrop-blur-lg p-8 md:p-12",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 text-yellow-500/20 text-9xl font-serif", children: '"' }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10", children: [
                        /* @__PURE__ */ jsxs("div", { className: "md:col-span-4 flex flex-col items-center md:items-start", children: [
                          /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/30", children: /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: testimonials[currentIndex].image,
                                alt: testimonials[currentIndex].name,
                                className: "w-full h-full object-cover"
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              motion.div,
                              {
                                className: "absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5 shadow-md",
                                initial: { rotate: 0 },
                                animate: { rotate: [0, 10, 0, -10, 0] },
                                transition: { duration: 0.5, delay: 0.5 },
                                children: /* @__PURE__ */ jsx(StarIcon, { className: "w-4 h-4 text-black" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-1 text-center md:text-left", children: testimonials[currentIndex].name }),
                          /* @__PURE__ */ jsx("p", { className: "text-yellow-400 font-medium mb-2 text-center md:text-left", children: testimonials[currentIndex].position }),
                          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm mb-4 text-center md:text-left", children: testimonials[currentIndex].company }),
                          /* @__PURE__ */ jsx("div", { className: "flex items-center mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                            StarIcon,
                            {
                              className: `w-5 h-5 ${i < testimonials[currentIndex].rating ? "text-yellow-400" : "text-gray-600"}`
                            },
                            i
                          )) }),
                          /* @__PURE__ */ jsx("div", { className: "px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30", children: testimonials[currentIndex].project })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "md:col-span-8 flex flex-col justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg md:text-xl italic leading-relaxed", children: testimonials[currentIndex].quote }) })
                      ] })
                    ]
                  },
                  currentIndex
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 right-4 flex space-x-2 z-20 md:bottom-8 md:right-8", children: [
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      className: "w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors",
                      onClick: prevTestimonial,
                      children: /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.1 },
                      whileTap: { scale: 0.9 },
                      className: "w-10 h-10 rounded-full bg-black/30 border border-yellow-500/20 flex items-center justify-center text-white hover:bg-yellow-600/50 transition-colors",
                      onClick: nextTestimonial,
                      children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "w-5 h-5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 flex space-x-2 z-20 md:bottom-8 md:left-8", children: testimonials.map((_, index) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentIndex(index),
                    className: `w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-yellow-500" : "bg-white/30 hover:bg-yellow-400/50"}`,
                    "aria-label": `Go to testimonial ${index + 1}`
                  },
                  index
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.6 },
              className: "mt-16 text-center",
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 mb-6", children: "Join our growing list of satisfied commercial and industrial clients" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      var _a;
                      (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center", children: [
                        "Get an Estimate",
                        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                      ] }),
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          className: "absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500",
                          initial: { x: "-100%" },
                          whileHover: { x: "0%" },
                          transition: { duration: 0.4 }
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
const MapComponent = lazy(() => import("./assets/mapComponent-ClVToc04.js"));
function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
    submitted: false,
    loading: false
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        submitted: true
      }));
    }, 1500);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  const contactOptions = [
    {
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-6 w-6",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            }
          )
        }
      ),
      title: "Call Us",
      content: "(555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-6 w-6",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            }
          )
        }
      ),
      title: "Email Us",
      content: "info@yourcompany.com",
      action: "mailto:info@yourcompany.com"
    },
    {
      icon: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "h-6 w-6",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              }
            )
          ]
        }
      ),
      title: "Visit Us",
      content: "510 W 1st St, Lowell, NC",
      action: "https://www.google.com/maps/place/510+W+1st+St,+Lowell,+NC+28098"
    }
  ];
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "contact",
      className: "relative py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
            "pattern",
            {
              id: "circuit-pattern",
              patternUnits: "userSpaceOnUse",
              width: "100",
              height: "100",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M10,90 L90,90 L90,10",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "90", cy: "10", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M10,50 L50,50 L50,10",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "50", cy: "10", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M50,90 L50,70 L90,70",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "90", cy: "70", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M30,10 L30,30 L10,30",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "10", cy: "30", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M10,70 L30,70 L30,50",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "30", cy: "50", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M70,10 L70,30 L90,30",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "90", cy: "30", r: "2", fill: "#E3B341" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M90,50 L70,50 L70,90",
                    fill: "none",
                    stroke: "#E3B341",
                    strokeWidth: "0.5"
                  }
                ),
                /* @__PURE__ */ jsx("circle", { cx: "70", cy: "90", r: "2", fill: "#E3B341" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#circuit-pattern)" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "text-center mb-14",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
              children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "inline-block px-3 py-1 text-sm font-medium text-yellow-400 bg-yellow-900/30 rounded-full mb-4",
                    initial: { opacity: 0, scale: 0.8 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { delay: 0.2, duration: 0.5 },
                    children: "Get In Touch"
                  }
                ),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Let's Power Your Next Project" }),
                /* @__PURE__ */ jsx("p", { className: "max-w-2xl mx-auto text-lg text-gray-300", children: "Ready to discuss your electrical needs? Contact our team of experts for a consultation and free quote." })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "lg:col-span-2",
                variants: containerVariants,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true },
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-6 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg mb-8", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-6 text-white", children: "Contact Information" }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: contactOptions.map((option, index) => /* @__PURE__ */ jsxs(
                      motion.a,
                      {
                        href: option.action,
                        className: "flex items-center p-4 rounded-lg transition-all hover:bg-gray-900",
                        variants: itemVariants,
                        whileHover: { x: 5 },
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-400 mr-4", children: option.icon }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("h4", { className: "font-medium text-white", children: option.title }),
                            /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: option.content })
                          ] })
                        ]
                      },
                      index
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "p-6 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg overflow-hidden relative",
                      variants: itemVariants,
                      children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4 text-white", children: "Service Area" }),
                        /* @__PURE__ */ jsx(Fragment, { children: isClient ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg overflow-hidden relative", children: /* @__PURE__ */ jsx(
                            Suspense,
                            {
                              fallback: /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: "Loading map..." }),
                              children: /* @__PURE__ */ jsx(MapComponent, {})
                            }
                          ) }),
                          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Charlotte" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Huntersville" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Matthews" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Concord" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Gastonia" })
                          ] })
                        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("div", { className: "aspect-video bg-gray-800 rounded-lg overflow-hidden relative", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx("span", { children: "Service area map" }) }) }),
                          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Charlotte" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Huntersville" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Matthews" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Concord" }),
                            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium", children: "Gastonia" })
                          ] }) })
                        ] }) })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                className: "lg:col-span-3 bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-lg overflow-hidden",
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.8, delay: 0.3 },
                children: formState.submitted ? /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "p-10 flex flex-col items-center justify-center min-h-[500px] text-center",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.5 },
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          className: "h-8 w-8 text-yellow-500",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M5 13l4 4L19 7"
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Thank You!" }),
                      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-300 mb-8", children: "Your message has been sent successfully. We'll get back to you shortly." }),
                      /* @__PURE__ */ jsx(
                        motion.button,
                        {
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          className: "px-6 py-3 bg-black text-yellow-400 border-2 border-yellow-500/50 rounded-lg font-medium transition-all",
                          onClick: () => setFormState((prev) => ({ ...prev, submitted: false })),
                          children: "Send Another Message"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-6 text-white", children: "Send Us a Message" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: itemVariants,
                        initial: "hidden",
                        whileInView: "visible",
                        viewport: { once: true },
                        children: [
                          /* @__PURE__ */ jsxs(
                            "label",
                            {
                              htmlFor: "name",
                              className: "block text-sm font-medium text-gray-300 mb-2",
                              children: [
                                "Full Name ",
                                /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                              "svg",
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5 text-gray-400",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                id: "name",
                                type: "text",
                                value: formState.name,
                                onChange: handleChange,
                                required: true,
                                className: "block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all",
                                placeholder: "John Smith"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: itemVariants,
                        initial: "hidden",
                        whileInView: "visible",
                        viewport: { once: true },
                        children: [
                          /* @__PURE__ */ jsxs(
                            "label",
                            {
                              htmlFor: "email",
                              className: "block text-sm font-medium text-gray-300 mb-2",
                              children: [
                                "Email Address ",
                                /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                              "svg",
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5 text-gray-400",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                id: "email",
                                type: "email",
                                value: formState.email,
                                onChange: handleChange,
                                required: true,
                                className: "block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all",
                                placeholder: "john@company.com"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: itemVariants,
                        initial: "hidden",
                        whileInView: "visible",
                        viewport: { once: true },
                        children: [
                          /* @__PURE__ */ jsxs(
                            "label",
                            {
                              htmlFor: "phone",
                              className: "block text-sm font-medium text-gray-300 mb-2",
                              children: [
                                "Phone Number ",
                                /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                              "svg",
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5 text-gray-400",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                id: "phone",
                                required: true,
                                type: "tel",
                                value: formState.phone,
                                onChange: handleChange,
                                className: "block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all",
                                placeholder: "(555) 123-4567"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        variants: itemVariants,
                        initial: "hidden",
                        whileInView: "visible",
                        viewport: { once: true },
                        children: [
                          /* @__PURE__ */ jsxs(
                            "label",
                            {
                              htmlFor: "company",
                              className: "block text-sm font-medium text-gray-300 mb-2",
                              children: [
                                "Company Name ",
                                /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                              "svg",
                              {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-5 w-5 text-gray-400",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                required: true,
                                id: "company",
                                type: "text",
                                value: formState.company,
                                onChange: handleChange,
                                className: "block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all",
                                placeholder: "Company Inc."
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: itemVariants,
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      children: [
                        /* @__PURE__ */ jsxs(
                          "label",
                          {
                            htmlFor: "projectType",
                            className: "block text-sm font-medium text-gray-300 mb-2",
                            children: [
                              "Project Type ",
                              /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              xmlns: "http://www.w3.org/2000/svg",
                              className: "h-5 w-5 text-gray-400",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              children: /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                }
                              )
                            }
                          ) }),
                          /* @__PURE__ */ jsxs(
                            "select",
                            {
                              id: "projectType",
                              required: true,
                              value: formState.projectType,
                              onChange: handleChange,
                              className: "block w-full pl-10 pr-10 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all appearance-none",
                              children: [
                                /* @__PURE__ */ jsx("option", { value: "", children: "Select project type" }),
                                /* @__PURE__ */ jsx("option", { value: "Commercial", children: "Commercial" }),
                                /* @__PURE__ */ jsx("option", { value: "Industrial", children: "Industrial" }),
                                /* @__PURE__ */ jsx("option", { value: "Maintenance", children: "Maintenance" }),
                                /* @__PURE__ */ jsx("option", { value: "Emergency", children: "Emergency Service" }),
                                /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                            "svg",
                            {
                              xmlns: "http://www.w3.org/2000/svg",
                              className: "h-5 w-5 text-gray-400",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              stroke: "currentColor",
                              children: /* @__PURE__ */ jsx(
                                "path",
                                {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: 2,
                                  d: "M19 9l-7 7-7-7"
                                }
                              )
                            }
                          ) })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: itemVariants,
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      children: [
                        /* @__PURE__ */ jsxs(
                          "label",
                          {
                            htmlFor: "message",
                            className: "block text-sm font-medium text-gray-300 mb-2",
                            children: [
                              "Project Details ",
                              /* @__PURE__ */ jsx("span", { className: "text-yellow-500", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            id: "message",
                            value: formState.message,
                            onChange: handleChange,
                            required: true,
                            rows: 5,
                            className: "block w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none",
                            placeholder: "Tell us about your project requirements..."
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: itemVariants,
                      initial: "hidden",
                      whileInView: "visible",
                      viewport: { once: true },
                      className: "flex items-center justify-between pt-4",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                          /* @__PURE__ */ jsx("div", { className: "flex items-center h-5", children: /* @__PURE__ */ jsx(
                            "input",
                            {
                              id: "newsletter",
                              type: "checkbox",
                              className: "w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-yellow-500"
                            }
                          ) }),
                          /* @__PURE__ */ jsx("div", { className: "ml-3 text-sm", children: /* @__PURE__ */ jsx("label", { htmlFor: "newsletter", className: "text-gray-300", children: "Subscribe to newsletter for industry updates" }) })
                        ] }),
                        /* @__PURE__ */ jsx(
                          motion.button,
                          {
                            type: "submit",
                            whileHover: { scale: 1.03 },
                            whileTap: { scale: 0.97 },
                            className: "px-8 py-3 bg-black text-yellow-400 font-medium rounded-lg border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 transition-all flex items-center",
                            disabled: formState.loading,
                            children: formState.loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsxs(
                                "svg",
                                {
                                  className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  children: [
                                    /* @__PURE__ */ jsx(
                                      "circle",
                                      {
                                        className: "opacity-25",
                                        cx: "12",
                                        cy: "12",
                                        r: "10",
                                        stroke: "currentColor",
                                        strokeWidth: "4"
                                      }
                                    ),
                                    /* @__PURE__ */ jsx(
                                      "path",
                                      {
                                        className: "opacity-75",
                                        fill: "currentColor",
                                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      }
                                    )
                                  ]
                                }
                              ),
                              "Processing..."
                            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                              "Send Message",
                              /* @__PURE__ */ jsx(
                                "svg",
                                {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  className: "h-5 w-5 ml-2",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  stroke: "currentColor",
                                  children: /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: 2,
                                      d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                    }
                                  )
                                }
                              )
                            ] })
                          }
                        )
                      ]
                    }
                  )
                ] }) })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function LandingPage() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(About, {}),
    /* @__PURE__ */ jsx(Services, {}),
    /* @__PURE__ */ jsx(Projects, {}),
    /* @__PURE__ */ jsx(Testimonials, {}),
    /* @__PURE__ */ jsx(Contact, {}),
    /* @__PURE__ */ jsxs("footer", { className: "bg-black p-4 text-center text-yellow-500", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " C&C Electrical LLC. All rights reserved."
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "C&C Electric"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return (
    // <BrowserRouter basename="/Electric">
    /* @__PURE__ */ jsx(LandingPage, {})
  );
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/Electricassets/entry.client-Dl9XwLR0.js", "imports": ["/Electricassets/chunk-XJI4KG32-DlLTM9Dl.js", "/Electricassets/index-CHwLTD1X.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/Electricassets/root-tmiqCJjZ.js", "imports": ["/Electricassets/chunk-XJI4KG32-DlLTM9Dl.js", "/Electricassets/index-CHwLTD1X.js", "/Electricassets/with-props-BBAZrA0c.js"], "css": ["/Electricassets/root-CwYr8IVC.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/Electricassets/home-D1liYdZm.js", "imports": ["/Electricassets/with-props-BBAZrA0c.js", "/Electricassets/chunk-XJI4KG32-DlLTM9Dl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/Electricassets/manifest-42b19206.js", "version": "42b19206" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/Electric";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
