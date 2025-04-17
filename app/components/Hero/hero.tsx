// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import heroImg from "../wire2.jpg";
// import { pathDs } from "~/utils/pathData.js"; // Import the consistent path data

// export default function Hero() {
//   const [scrollY, setScrollY] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     setIsLoaded(true);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Parallax effect for background image
//   const parallaxStyle = {
//     transform: `translateY(${scrollY * 0.2}px)`,
//     transition: "transform 0.1s ease-out",
//   };

//   const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8 },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: (custom) => ({
//       opacity: 1,
//       transition: {
//         delay: custom * 0.2,
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const buttonVariants = {
//     rest: {
//       scale: 1,
//       backgroundColor: "rgba(0, 0, 0, 0.7)",
//       border: "2px solid rgba(234, 179, 8, 0.5)",
//       boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
//     },
//     hover: {
//       scale: 1.05,
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//       border: "2px solid rgba(234, 179, 8, 0.8)",
//       boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//       },
//     },
//     tap: {
//       scale: 0.98,
//       boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)",
//     },
//     pulse: {
//       boxShadow: [
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//         "0 0 15px rgba(234, 179, 8, 0.6)",
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//       ],
//       transition: {
//         repeat: Infinity,
//         duration: 2.5,
//       },
//     },
//   };

//   // Info container variants
//   const infoContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         delay: 1.5,
//         duration: 0.8 
//       }
//     }
//   };

//   return (
//     <section id="hero" className="relative h-screen overflow-hidden">
//       {/* Overlay gradient for better text contrast */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

//       {/* Animated electricity particles */}
//       <div className="absolute inset-0 z-10 opacity-30">
//         <svg className="h-full w-full">
//           <motion.rect
//             x="0"
//             y="0"
//             width="100%"
//             height="100%"
//             fill="url(#electricity)"
//             animate={{
//               opacity: [0.2, 0.5, 0.2],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 4,
//               ease: "easeInOut",
//             }}
//           />
//           <defs>
//             <pattern id="electricity" width="100" height="100" patternUnits="userSpaceOnUse">
//               {pathDs.map((d, i) => (
//                 <motion.path
//                   key={i}
//                   d={d} // Use the pre-generated path data
//                   stroke="rgba(234, 179, 8, 0.8)" // Gold color for electricity
//                   strokeWidth="0.5"
//                   fill="none"
//                   animate={{
//                     pathLength: [0, 1, 0],
//                     opacity: [0, 0.8, 0],
//                   }}
//                   transition={{
//                     duration: 2 + Math.random() * 3,
//                     repeat: Infinity,
//                     delay: Math.random() * 5,
//                   }}
//                 />
//               ))}
//             </pattern>
//           </defs>
//         </svg>
//       </div>

//       {/* Hero background image with parallax */}
//       <div style={parallaxStyle} className="absolute inset-0 h-full w-full">
//         <img src={heroImg} alt="Electrical Solutions" className="w-full h-full object-cover" />
//       </div>

//       {/* Content container */}
//       <div className="absolute inset-0 z-20 flex flex-col items-center justify-between text-gray-100 p-8">
//         <motion.div
//           className="flex flex-col items-center mt-16 md:mt-24"
//           initial="hidden"
//           animate={isLoaded ? "visible" : "hidden"}
//           variants={fadeIn}
//         >
//           {/* Logo/brand section */}
//           <motion.div variants={textVariants} custom={0} className="mb-6">
//             <motion.div
//               className="mt-6 h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
//               animate={{
//                 boxShadow: [
//                   "0 0 0 rgba(234, 179, 8, 0)",
//                   "0 0 20px rgba(234, 179, 8, 0.6)",
//                   "0 0 0 rgba(234, 179, 8, 0)",
//                 ],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 3,
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-black"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             </motion.div>
//           </motion.div>

//           {/* Main headline */}
//           <motion.h1
//             variants={textVariants}
//             custom={1}
//             className="text-4xl md:text-6xl font-bold text-center tracking-tight"
//           >
//             <span className="block">Powering Your</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
//               Business Future
//             </span>
//           </motion.h1>

//           {/* Animated separator line */}
//           <motion.div
//             className="h-1 w-24 my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
//             variants={textVariants}
//             custom={2}
//             animate={{
//               width: ["0%", "20%"],
//               opacity: [0, 1],
//             }}
//             transition={{
//               duration: 1.2,
//               delay: 0.8,
//             }}
//           />

//           {/* Subheading */}
//           <motion.p
//             variants={textVariants}
//             custom={3}
//             className="text-xl md:text-2xl text-center max-w-lg font-light"
//           >
//             Expert electrical solutions for commercial & industrial projects
//             <span className="block mt-2 text-lg text-yellow-200 font-light">
//               Efficiency. Reliability. Innovation.
//             </span>
//           </motion.p>

//           {/* Stats counters */}
//           <motion.div
//             className="grid grid-cols-3 gap-6 mt-12 text-center"
//             variants={textVariants}
//             custom={4}
//           >
//             {[
//               { value: "500+", label: "Projects" },
//               { value: "15+", label: "Years Experience" },
//               { value: "100%", label: "Satisfaction" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
//               >
//                 <span className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</span>
//                 <span className="text-sm text-gray-300">{stat.label}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* CTA Button */}
//         <motion.div
//           className="mb-16 md:mb-24"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.8, duration: 0.8 }}
//         >
//           <motion.button
//             variants={buttonVariants}
//             initial="rest"
//             whileHover="hover"
//             whileTap="tap"
//             animate={["rest", "pulse"]}
//             className="px-8 py-4 text-lg font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group"
//             onClick={() =>
//               document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             <span className="relative z-10 cursor-pointer">Request a Free Consultation</span>
//             <motion.span
//               className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100"
//               transition={{ duration: 0.3 }}
//             />
//             <motion.span
//               className="absolute inset-0 group-hover:text-black z-10 transition-colors duration-300"
//               transition={{ duration: 0.3 }}
//             />
//           </motion.button>
//         </motion.div>

//         {/* Address and Business Hours information */}
//         <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-12 w-full">
//           {/* Address - Bottom Left */}
//           <motion.div 
//             className="text-yellow-400 text-left"
//             initial="hidden"
//             animate="visible"
//             variants={infoContainerVariants}
//           >
//             <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//               <h4 className="text-sm md:text-base font-semibold mb-1">Our Location</h4>
//               <address className="text-xs md:text-sm not-italic">
//                 1234 Electric Avenue<br />
//                 Circuit City, CA 92123<br />
//                 <span className="text-yellow-300">Phone: (555) 123-4567</span>
//               </address>
//             </div>
//           </motion.div>

//           {/* Scroll indicator */}
//           <motion.div
//             className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2.2, duration: 1 }}
//           >
//             <motion.div
//               className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
//               animate={{ y: [0, 8, 0] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//               <motion.div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
//             </motion.div>
//           </motion.div>

//           {/* Business Hours - Bottom Right */}
//           <motion.div 
//             className="text-yellow-400 text-right"
//             initial="hidden"
//             animate="visible"
//             variants={infoContainerVariants}
//           >
//             <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//               <h4 className="text-sm md:text-base font-semibold mb-1">Business Hours</h4>
//               <div className="text-xs md:text-sm">
//                 Monday - Friday: 8AM - 6PM<br />
//                 Saturday: 9AM - 2PM<br />
//                 <span className="text-yellow-300">Sunday: Closed</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import heroImg from "../wire2.jpg";
// import { pathDs } from "~/utils/pathData.js"; // Import the consistent path data

// export default function Hero() {
//   const [scrollY, setScrollY] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     setIsLoaded(true);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Parallax effect for background image
//   const parallaxStyle = {
//     transform: `translateY(${scrollY * 0.2}px)`,
//     transition: "transform 0.1s ease-out",
//   };

//   const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8 },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: (custom) => ({
//       opacity: 1,
//       transition: {
//         delay: custom * 0.2,
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const buttonVariants = {
//     rest: {
//       scale: 1,
//       backgroundColor: "rgba(0, 0, 0, 0.7)",
//       border: "2px solid rgba(234, 179, 8, 0.5)",
//       boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
//     },
//     hover: {
//       scale: 1.05,
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//       border: "2px solid rgba(234, 179, 8, 0.8)",
//       boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//       },
//     },
//     tap: {
//       scale: 0.98,
//       boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)",
//     },
//     pulse: {
//       boxShadow: [
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//         "0 0 15px rgba(234, 179, 8, 0.6)",
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//       ],
//       transition: {
//         repeat: Infinity,
//         duration: 2.5,
//       },
//     },
//   };

//   // Info container variants
//   const infoContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         delay: 1.5,
//         duration: 0.8 
//       }
//     }
//   };

//   return (
//     <section id="hero" className="relative h-screen w-full overflow-hidden px-8 py-4 flex justify-center items-center">
//       {/* Main bordered container for the hero image */}
//       <div className="relative w-11/12 h-5/6 border border-yellow-500/20 rounded-lg overflow-hidden">
//         {/* Overlay gradient for better text contrast */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

//         {/* Animated electricity particles */}
//         <div className="absolute inset-0 z-10 opacity-30">
//           <svg className="h-full w-full">
//             <motion.rect
//               x="0"
//               y="0"
//               width="100%"
//               height="100%"
//               fill="url(#electricity)"
//               animate={{
//                 opacity: [0.2, 0.5, 0.2],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 4,
//                 ease: "easeInOut",
//               }}
//             />
//             <defs>
//               <pattern id="electricity" width="100" height="100" patternUnits="userSpaceOnUse">
//                 {pathDs.map((d, i) => (
//                   <motion.path
//                     key={i}
//                     d={d} // Use the pre-generated path data
//                     stroke="rgba(234, 179, 8, 0.8)" // Gold color for electricity
//                     strokeWidth="0.5"
//                     fill="none"
//                     animate={{
//                       pathLength: [0, 1, 0],
//                       opacity: [0, 0.8, 0],
//                     }}
//                     transition={{
//                       duration: 2 + Math.random() * 3,
//                       repeat: Infinity,
//                       delay: Math.random() * 5,
//                     }}
//                   />
//                 ))}
//               </pattern>
//             </defs>
//           </svg>
//         </div>

//         {/* Hero background image with parallax */}
//         <div style={parallaxStyle} className="absolute inset-0 h-full w-full">
//           <img src={heroImg} alt="Electrical Solutions" className="w-full h-full object-cover" />
//         </div>

//         {/* Content container */}
//         <div className="absolute inset-0 z-20 flex flex-col items-center justify-between text-gray-100 p-8">
//           <motion.div
//             className="flex flex-col items-center mt-8 md:mt-16"
//             initial="hidden"
//             animate={isLoaded ? "visible" : "hidden"}
//             variants={fadeIn}
//           >
//             {/* Logo/brand section */}
//             <motion.div variants={textVariants} custom={0} className="mb-6">
//               <motion.div
//                 className="mt-6 h-16 w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
//                 animate={{
//                   boxShadow: [
//                     "0 0 0 rgba(234, 179, 8, 0)",
//                     "0 0 20px rgba(234, 179, 8, 0.6)",
//                     "0 0 0 rgba(234, 179, 8, 0)",
//                   ],
//                 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 3,
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-black"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </motion.div>
//             </motion.div>

//             {/* Main headline */}
//             <motion.h1
//               variants={textVariants}
//               custom={1}
//               className="text-4xl md:text-6xl font-bold text-center tracking-tight"
//             >
//               <span className="block">Powering Your</span>
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
//                 Business Future
//               </span>
//             </motion.h1>

//             {/* Animated separator line */}
//             <motion.div
//               className="h-1 w-24 my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
//               variants={textVariants}
//               custom={2}
//               animate={{
//                 width: ["0%", "20%"],
//                 opacity: [0, 1],
//               }}
//               transition={{
//                 duration: 1.2,
//                 delay: 0.8,
//               }}
//             />

//             {/* Subheading */}
//             <motion.p
//               variants={textVariants}
//               custom={3}
//               className="text-xl md:text-2xl text-center max-w-lg font-light"
//             >
//               Expert electrical solutions for commercial & industrial projects
//               <span className="block mt-2 text-lg text-yellow-200 font-light">
//                 Efficiency. Reliability. Innovation.
//               </span>
//             </motion.p>

//             {/* Stats counters */}
//             <motion.div
//               className="grid grid-cols-3 gap-6 mt-12 text-center"
//               variants={textVariants}
//               custom={4}
//             >
//               {[
//                 { value: "500+", label: "Projects" },
//                 { value: "15+", label: "Years Experience" },
//                 { value: "100%", label: "Satisfaction" },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
//                 >
//                   <span className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</span>
//                   <span className="text-sm text-gray-300">{stat.label}</span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* CTA Button */}
//           <motion.div
//             className="mb-8 md:mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.8, duration: 0.8 }}
//           >
//             <motion.button
//               variants={buttonVariants}
//               initial="rest"
//               whileHover="hover"
//               whileTap="tap"
//               animate={["rest", "pulse"]}
//               className="px-8 py-4 text-lg font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group"
//               onClick={() =>
//                 document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               <span className="relative z-10 cursor-pointer">Request a Free Consultation</span>
//               <motion.span
//                 className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100"
//                 transition={{ duration: 0.3 }}
//               />
//               <motion.span
//                 className="absolute inset-0 group-hover:text-black z-10 transition-colors duration-300"
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.button>
//           </motion.div>

//           {/* Address and Business Hours information */}
//           <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-12 w-full">
//             {/* Address - Bottom Left */}
//             <motion.div 
//               className="text-yellow-400 text-left"
//               initial="hidden"
//               animate="visible"
//               variants={infoContainerVariants}
//             >
//               <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//                 <h4 className="text-sm md:text-base font-semibold mb-1">Our Location</h4>
//                 <address className="text-xs md:text-sm not-italic">
//                   1234 Electric Avenue<br />
//                   Circuit City, CA 92123<br />
//                   <span className="text-yellow-300">Phone: (555) 123-4567</span>
//                 </address>
//               </div>
//             </motion.div>

//             {/* Scroll indicator */}
//             <motion.div
//               className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2.2, duration: 1 }}
//             >
//               <motion.div
//                 className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//               >
//                 <motion.div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
//               </motion.div>
//             </motion.div>

//             {/* Business Hours - Bottom Right */}
//             <motion.div 
//               className="text-yellow-400 text-right"
//               initial="hidden"
//               animate="visible"
//               variants={infoContainerVariants}
//             >
//               <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//                 <h4 className="text-sm md:text-base font-semibold mb-1">Business Hours</h4>
//                 <div className="text-xs md:text-sm">
//                   Monday - Friday: 8AM - 6PM<br />
//                   Saturday: 9AM - 2PM<br />
//                   <span className="text-yellow-300">Sunday: Closed</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import heroImg from "../wire2.jpg";
// import { pathDs } from "~/utils/pathData.js"; // Import the consistent path data

// export default function Hero() {
//   const [scrollY, setScrollY] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     setIsLoaded(true);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Parallax effect for background image
//   const parallaxStyle = {
//     transform: `translateY(${scrollY * 0.2}px)`,
//     transition: "transform 0.1s ease-out",
//   };

//   const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8 },
//     },
//   };

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: (custom) => ({
//       opacity: 1,
//       transition: {
//         delay: custom * 0.2,
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const buttonVariants = {
//     rest: {
//       scale: 1,
//       backgroundColor: "rgba(0, 0, 0, 0.7)",
//       border: "2px solid rgba(234, 179, 8, 0.5)",
//       boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
//     },
//     hover: {
//       scale: 1.05,
//       backgroundColor: "rgba(0, 0, 0, 0.8)",
//       border: "2px solid rgba(234, 179, 8, 0.8)",
//       boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//       },
//     },
//     tap: {
//       scale: 0.98,
//       boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)",
//     },
//     pulse: {
//       boxShadow: [
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//         "0 0 15px rgba(234, 179, 8, 0.6)",
//         "0 0 5px rgba(234, 179, 8, 0.4)",
//       ],
//       transition: {
//         repeat: Infinity,
//         duration: 2.5,
//       },
//     },
//   };

//   // Info container variants
//   const infoContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         delay: 1.5,
//         duration: 0.8 
//       }
//     }
//   };

//   return (
//     <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
//       {/* Main section layout */}
//       <div className="w-11/12 flex flex-col items-center gap-4">
        
        
//         {/* Main bordered container for the hero image */}
//         <div className="relative w-full h-96 md:h-[500px] border border-yellow-500/20 rounded-lg overflow-hidden">
//           {/* Hero background image with parallax */}
//           <div style={parallaxStyle} className="absolute inset-0 h-full w-full">
//             <img src={heroImg} alt="Electrical Solutions" className="w-full h-full object-cover" />
//           </div>
          
//           {/* Overlay gradient for better text contrast */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

//           {/* Animated electricity particles */}
//           <div className="absolute inset-0 z-10 opacity-30">
//             <svg className="h-full w-full">
//               <motion.rect
//                 x="0"
//                 y="0"
//                 width="100%"
//                 height="100%"
//                 fill="url(#electricity)"
//                 animate={{
//                   opacity: [0.2, 0.5, 0.2],
//                 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 4,
//                   ease: "easeInOut",
//                 }}
//               />
//               <defs>
//                 <pattern id="electricity" width="100" height="100" patternUnits="userSpaceOnUse">
//                   {pathDs.map((d, i) => (
//                     <motion.path
//                       key={i}
//                       d={d} // Use the pre-generated path data
//                       stroke="rgba(234, 179, 8, 0.8)" // Gold color for electricity
//                       strokeWidth="0.5"
//                       fill="none"
//                       animate={{
//                         pathLength: [0, 1, 0],
//                         opacity: [0, 0.8, 0],
//                       }}
//                       transition={{
//                         duration: 2 + Math.random() * 3,
//                         repeat: Infinity,
//                         delay: Math.random() * 5,
//                       }}
//                     />
//                   ))}
//                 </pattern>
//               </defs>
//             </svg>
//           </div>

//           {/* Content container */}
//           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-gray-100 p-4 md:p-8">
//             <motion.div
//               className="flex flex-col items-center"
//               initial="hidden"
//               animate={isLoaded ? "visible" : "hidden"}
//               variants={fadeIn}
//             >
//               {/* Logo/brand section */}
//               <motion.div variants={textVariants} custom={0} className="mb-4">
//                 <motion.div
//                   className="h-14 w-14 md:h-16 md:w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
//                   animate={{
//                     boxShadow: [
//                       "0 0 0 rgba(234, 179, 8, 0)",
//                       "0 0 20px rgba(234, 179, 8, 0.6)",
//                       "0 0 0 rgba(234, 179, 8, 0)",
//                     ],
//                   }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 3,
//                   }}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-8 w-8 text-black"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                     />
//                   </svg>
//                 </motion.div>
//               </motion.div>

//               {/* Main headline */}
//               <motion.h1
//                 variants={textVariants}
//                 custom={1}
//                 className="text-3xl md:text-6xl font-bold text-center tracking-tight"
//               >
//                 <span className="block">Powering Your</span>
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
//                   Business Future
//                 </span>
//               </motion.h1>

//               {/* Animated separator line */}
//               <motion.div
//                 className="h-1 w-24 my-4 md:my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
//                 variants={textVariants}
//                 custom={2}
//                 animate={{
//                   width: ["0%", "20%"],
//                   opacity: [0, 1],
//                 }}
//                 transition={{
//                   duration: 1.2,
//                   delay: 0.8,
//                 }}
//               />

//               {/* Subheading */}
//               <motion.p
//                 variants={textVariants}
//                 custom={3}
//                 className="text-lg md:text-2xl text-center max-w-lg font-light"
//               >
//                 Expert electrical solutions for commercial & industrial projects
//                 <span className="block mt-2 text-sm md:text-lg text-yellow-200 font-light">
//                   Efficiency. Reliability. Innovation.
//                 </span>
//               </motion.p>

//               {/* Stats counters */}
//               <motion.div
//                 className="grid grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-8 text-center"
//                 variants={textVariants}
//                 custom={4}
//               >
//                 {[
//                   { value: "500+", label: "Projects" },
//                   { value: "15+", label: "Years Experience" },
//                   { value: "100%", label: "Satisfaction" },
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex flex-col"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
//                   >
//                     <span className="text-xl md:text-3xl font-bold text-yellow-400">{stat.value}</span>
//                     <span className="text-xs md:text-sm text-gray-300">{stat.label}</span>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>

            
//           </div>
//         </div>

//         {/* CTA Button - Now outside and below the main container */}
//         <motion.div
//           className="mt-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.8, duration: 0.8 }}
//         >
//           <motion.button
//             variants={buttonVariants}
//             initial="rest"
//             whileHover="hover"
//             whileTap="tap"
//             animate={["rest", "pulse"]}
//             className="px-8 py-4 text-lg font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group"
//             onClick={() =>
//               document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             <span className="relative z-10 cursor-pointer">Request a Free Consultation</span>
//             <motion.span
//               className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100"
//               transition={{ duration: 0.3 }}
//             />
//             <motion.span
//               className="absolute inset-0 group-hover:text-black z-10 transition-colors duration-300"
//               transition={{ duration: 0.3 }}
//             />
//           </motion.button>
//         </motion.div>


//         {/* Address information - Now outside and above the main container */}

//         <motion.div 
//           className="w-full flex justify-between"
//           initial="hidden"
//           animate="visible"
//           variants={infoContainerVariants}
//         >
//           <div className="text-yellow-400 text-left">
//             <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//               <h4 className="text-sm md:text-base font-semibold mb-1">Our Location</h4>
//               <address className="text-xs md:text-sm not-italic">
//                 1234 Electric Avenue<br />
//                 Circuit City, CA 92123<br />
//                 <span className="text-yellow-300">Phone: (555) 123-4567</span>
//               </address>
//             </div>
//           </div>
          
//           <div className="text-yellow-400 text-right">
//             <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
//               <h4 className="text-sm md:text-base font-semibold mb-1">Business Hours</h4>
//               <div className="text-xs md:text-sm">
//                 Monday - Friday: 8AM - 6PM<br />
//                 Saturday: 9AM - 2PM<br />
//                 <span className="text-yellow-300">Sunday: Closed</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

// {/* Scroll indicator */}
//             <motion.div
//               className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 2.2, duration: 1 }}
//             >
//               <motion.div
//                 className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//               >
//                 <motion.div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
//               </motion.div>
//             </motion.div>
//       </div>
//     </section>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../wire2.jpg";
import { pathDs } from "~/utils/pathData.js"; // Import the consistent path data

export default function Hero() {
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

  // Parallax effect for background image
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.2}px)`,
    transition: "transform 0.1s ease-out",
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      border: "2px solid rgba(234, 179, 8, 0.5)",
      boxShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "2px solid rgba(234, 179, 8, 0.8)",
      boxShadow: "0 0 25px rgba(234, 179, 8, 0.8)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 0 5px rgba(234, 179, 8, 0.6)",
    },
    pulse: {
      boxShadow: [
        "0 0 5px rgba(234, 179, 8, 0.4)",
        "0 0 15px rgba(234, 179, 8, 0.6)",
        "0 0 5px rgba(234, 179, 8, 0.4)",
      ],
      transition: {
        repeat: Infinity,
        duration: 2.5,
      },
    },
  };

  // Info container variants
  const infoContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 1.5,
        duration: 0.8 
      }
    }
  };

  return (
    <section id="hero" className="mt-3 relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      {/* Main section layout */}
      <div className="w-11/12 flex flex-col items-center gap-4">
        
        
        {/* Main bordered container for the hero image - INCREASED HEIGHT HERE */}
        <div className="relative w-full h-[70vh] md:h-[80vh] border border-yellow-500/20 rounded-lg overflow-hidden">
          {/* Hero background image with parallax */}
          <div style={parallaxStyle} className="absolute inset-0 h-full w-full">
            <img src={heroImg} alt="Electrical Solutions" className="w-full h-full object-cover" />
          </div>
          
          {/* Overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

          {/* Animated electricity particles */}
          <div className="absolute inset-0 z-10 opacity-30">
            <svg className="h-full w-full">
              <motion.rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#electricity)"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <pattern id="electricity" width="100" height="100" patternUnits="userSpaceOnUse">
                  {pathDs.map((d, i) => (
                    <motion.path
                      key={i}
                      d={d} // Use the pre-generated path data
                      stroke="rgba(234, 179, 8, 0.8)" // Gold color for electricity
                      strokeWidth="0.5"
                      fill="none"
                      animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </pattern>
              </defs>
            </svg>
          </div>

          {/* Content container */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-gray-100 p-4 md:p-8">
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
            >
              {/* Logo/brand section */}
              <motion.div variants={textVariants} custom={0} className="mb-4">
                <motion.div
                  className="h-14 w-14 md:h-16 md:w-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(234, 179, 8, 0)",
                      "0 0 20px rgba(234, 179, 8, 0.6)",
                      "0 0 0 rgba(234, 179, 8, 0)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={textVariants}
                custom={1}
                className="text-3xl md:text-6xl font-bold text-center tracking-tight"
              >
                <span className="block">Powering Your</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
                  Business Future
                </span>
              </motion.h1>

              {/* Animated separator line */}
              <motion.div
                className="h-1 w-24 my-4 md:my-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                variants={textVariants}
                custom={2}
                animate={{
                  width: ["0%", "20%"],
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                }}
              />

              {/* Subheading */}
              <motion.p
                variants={textVariants}
                custom={3}
                className="text-lg md:text-2xl text-center max-w-lg font-light"
              >
                Expert electrical solutions for commercial & industrial projects
                <span className="block mt-2 text-sm md:text-lg text-yellow-200 font-light">
                  Efficiency. Reliability. Innovation.
                </span>
              </motion.p>

              {/* Stats counters */}
              <motion.div
                className="grid grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-8 text-center"
                variants={textVariants}
                custom={4}
              >
                {[
                  { value: "500+", label: "Projects" },
                  { value: "15+", label: "Years Experience" },
                  { value: "100%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                  >
                    <span className="text-xl md:text-3xl font-bold text-yellow-400">{stat.value}</span>
                    <span className="text-xs md:text-sm text-gray-300">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            
          </div>
        </div>

        {/* CTA Button - Now outside and below the main container */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={["rest", "pulse"]}
            className="px-8 py-4 text-lg font-medium rounded-lg text-yellow-400 backdrop-blur-sm relative overflow-hidden group"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10 cursor-pointer">Request a Free Consultation</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute inset-0 group-hover:text-black z-10 transition-colors duration-300"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>


        {/* Address information - Now outside and above the main container */}

        <motion.div 
          className="w-full flex justify-between"
          initial="hidden"
          animate="visible"
          variants={infoContainerVariants}
        >
          <div className="text-yellow-400 text-left">
            <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
              <h4 className="text-sm md:text-base font-semibold mb-1">Our Location</h4>
              <address className="text-xs md:text-sm not-italic">
                1234 Electric Avenue<br />
                Circuit City, CA 92123<br />
                <span className="text-yellow-300">Phone: (555) 123-4567</span>
              </address>
            </div>
          </div>
          
          <div className="text-yellow-400 text-right">
            <div className="backdrop-blur-sm bg-black/40 p-3 md:p-4 rounded-lg">
              <h4 className="text-sm md:text-base font-semibold mb-1">Business Hours</h4>
              <div className="text-xs md:text-sm">
                Monday - Friday: 8AM - 6PM<br />
                Saturday: 9AM - 2PM<br />
                <span className="text-yellow-300">Sunday: Closed</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-yellow-500/50 flex items-start justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div className="w-1 h-2 bg-yellow-400/80 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}