// import React, { useState, useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// export default function About() {
//   const [isClient, setIsClient] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [counters, setCounters] = useState({ stat0: 0, stat1: 0, stat2: 0 });
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, margin: "-100px" });
  
//   // Parallax effect
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });
  
//   const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
//   const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

//   // Stats with animation
//   const stats = [
//     { value: 15, label: "Years Experience", icon: "🏆", key: "stat0" },
//     { value: 500, label: "Projects Completed", icon: "⚡", key: "stat1" },
//     { value: 99.8, label: "Client Satisfaction", unit: "%", icon: "❤️", key: "stat2" },
//   ];

//   // Experience timeline items
//   const milestones = [
//     { year: 2010, title: "Company Founded", description: "Started with just 3 electricians serving local businesses" },
//     { year: 2015, title: "Expansion", description: "Grew to 25 employees and expanded to statewide operations" },
//     { year: 2020, title: "Innovation", description: "Pioneered smart electrical systems for commercial spaces" },
//     { year: 2024, title: "National Recognition", description: "Recognized as industry leaders in electrical contracting" },
//   ];

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Counter animation effect - moved outside render function
//   useEffect(() => {
//     if (!isInView) return;
    
//     const duration = 2000;
//     const statValues = { stat0: 15, stat1: 500, stat2: 99.8 };
    
//     let startTime;
//     let animationFrameId;
    
//     const startAnimation = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / duration, 1);
      
//       setCounters({
//         stat0: Math.floor(percentage * statValues.stat0),
//         stat1: Math.floor(percentage * statValues.stat1),
//         stat2: Math.floor(percentage * statValues.stat2 * 10) / 10,
//       });
      
//       if (percentage < 1) {
//         animationFrameId = requestAnimationFrame(startAnimation);
//       }
//     };
    
//     animationFrameId = requestAnimationFrame(startAnimation);
    
//     return () => cancelAnimationFrame(animationFrameId);
//   }, [isInView]);

//   return (
//     <section
//       id="about"
//       ref={ref}
//       className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-24 overflow-hidden"
//     >
//       {/* Animated background elements */}
//       {isClient && (
//         <>
//           <div className="absolute inset-0 overflow-hidden">
//             {/* Animated grid background */}
//             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]" opacity={0.4} />
            
//             {/* Floating orbs */}
//             <motion.div
//               className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
//               animate={{
//                 y: [0, 40, 0],
//                 x: [0, -20, 0],
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{
//                 duration: 15,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//             <motion.div
//               className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"
//               animate={{
//                 y: [0, -60, 0],
//                 x: [0, 30, 0],
//                 opacity: [0.2, 0.5, 0.2],
//               }}
//               transition={{
//                 duration: 25,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </div>
//         </>
//       )}

//       <div className="container mx-auto px-6 relative z-10">
//         <motion.div
//           style={{ y: smoothY, opacity }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* Two column layout for desktop */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Left side - About content */}
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               animate={isInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="text-left"
//             >
//               {/* Badge */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.4 }}
//                 className="inline-block px-4 py-1 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 mb-6"
//               >
//                 <span className="text-blue-400 font-medium">Our Story</span>
//               </motion.div>
              
//               {/* Heading with more dramatic gradient */}
//               <motion.h2 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="text-5xl font-extrabold mb-8 leading-tight"
//               >
//                 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-500 text-transparent bg-clip-text">
//                   Powering Innovation
//                 </span>
//                 <span className="block text-white mt-2">For Over 15 Years</span>
//               </motion.h2>
              
//               {/* Description with enhanced styling */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <p className="text-xl leading-relaxed text-gray-300 mb-6">
//                   We specialize in providing <span className="font-semibold text-blue-400">cutting-edge electrical solutions</span> for
//                   commercial and industrial properties across the nation.
//                 </p>
//                 <p className="text-gray-400 leading-relaxed mb-8">
//                   Our team of certified experts brings decades of combined experience to every project, ensuring flawless execution from concept to completion. We've built our reputation on technical excellence, innovative approaches, and an unwavering commitment to client satisfaction.
//                 </p>
//               </motion.div>
              
//               {/* Interactive button with hover effects */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                   onHoverStart={() => setIsHovered(true)}
//                   onHoverEnd={() => setIsHovered(false)}
//                   className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20"
//                   onClick={() => {
//                     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//                   }}
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Learn More About Us
//                     <svg 
//                       className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24" 
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//                     </svg>
//                   </span>
                  
//                   {/* Animated background effect */}
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600"
//                     initial={{ x: "100%" }}
//                     animate={{ x: isHovered ? "0%" : "100%" }}
//                     transition={{ duration: 0.4 }}
//                   />
//                 </motion.button>
//               </motion.div>
//             </motion.div>
            
//             {/* Right side - Stats and Timeline */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={isInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//               className="space-y-12"
//             >
//               {/* Stats cards */}
//               <div className="grid grid-cols-3 gap-4">
//                 {stats.map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
//                     whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                     className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl text-center"
//                   >
//                     <div className="text-2xl mb-2">{stat.icon}</div>
//                     <div className="text-3xl font-bold text-blue-400">
//                       {counters[stat.key]}{stat.unit || ""}
//                     </div>
//                     <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
//                   </motion.div>
//                 ))}
//               </div>
              
//               {/* Timeline */}
//               <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
//                 <h3 className="text-xl font-semibold text-white mb-6">Our Journey</h3>
//                 <div className="relative">
//                   {/* Timeline line */}
//                   <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 to-teal-500 z-0"></div>
                  
//                   {/* Timeline items */}
//                   {milestones.map((milestone, index) => (
//                     <motion.div
//                       key={milestone.year}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={isInView ? { opacity: 1, x: 0 } : {}}
//                       transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
//                       className="relative flex items-start mb-8 last:mb-0"
//                     >
//                       <div className="flex-shrink-0 relative z-10">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
//                           <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
//                             <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500"></div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="ml-6">
//                         <div className="text-lg font-semibold text-white">{milestone.year}</div>
//                         <div className="text-blue-400 font-medium">{milestone.title}</div>
//                         <div className="text-gray-400 text-sm mt-1">{milestone.description}</div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

export default function About() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [counters, setCounters] = useState({ stat0: 0, stat1: 0, stat2: 0 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Stats with animation
  const stats = [
    { value: 15, label: "Years Experience", icon: "🏆", key: "stat0" },
    { value: 500, label: "Projects Completed", icon: "⚡", key: "stat1" },
    { value: 99.8, label: "Client Satisfaction", unit: "%", icon: "❤️", key: "stat2" },
  ];

  // Experience timeline items
  const milestones = [
    { year: 2010, title: "Company Founded", description: "Started with just 3 electricians serving local businesses" },
    { year: 2015, title: "Expansion", description: "Grew to 25 employees and expanded to statewide operations" },
    { year: 2020, title: "Innovation", description: "Pioneered smart electrical systems for commercial spaces" },
    { year: 2024, title: "National Recognition", description: "Recognized as industry leaders in electrical contracting" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Counter animation effect - moved outside render function
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
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
        stat2: Math.floor(percentage * statValues.stat2 * 10) / 10,
      });
      
      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(startAnimation);
      }
    };
    
    animationFrameId = requestAnimationFrame(startAnimation);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      {isClient && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]" opacity={0.4} />
            
            {/* Floating orbs */}
            <motion.div
              className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
              animate={{
                y: [0, 40, 0],
                x: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl"
              animate={{
                y: [0, -60, 0],
                x: [0, 30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: smoothY, opacity }}
          className="max-w-6xl mx-auto"
        >
          {/* Two column layout for desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - About content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6"
              >
                <span className="text-yellow-400 font-medium">Our Story</span>
              </motion.div>
              
              {/* Heading with more dramatic gradient */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-extrabold mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                  Powering Innovation
                </span>
                <span className="block text-white mt-2">For Over 15 Years</span>
              </motion.h2>
              
              {/* Description with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-xl leading-relaxed text-gray-300 mb-6">
                  We specialize in providing <span className="font-semibold text-yellow-400">cutting-edge electrical solutions</span> for
                  commercial and industrial properties across the nation.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Our team of certified experts brings decades of combined experience to every project, ensuring flawless execution from concept to completion. We've built our reputation on technical excellence, innovative approaches, and an unwavering commitment to client satisfaction.
                </p>
              </motion.div>
              
              {/* Interactive button with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative overflow-hidden px-8 py-4 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Learn More About Us
                    <svg 
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  
                  {/* Animated background effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
                    initial={{ x: "100%" }}
                    animate={{ x: isHovered ? "0%" : "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right side - Stats and Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-12"
            >
              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-black/60 backdrop-blur-lg border border-yellow-500/20 p-6 rounded-xl text-center"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-yellow-400">
                      {counters[stat.key]}{stat.unit || ""}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Timeline */}
              <div className="bg-black/60 backdrop-blur-lg border border-yellow-500/20 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Our Journey</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-yellow-400 to-yellow-600 z-0"></div>
                  
                  {/* Timeline items */}
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="relative flex items-start mb-8 last:mb-0"
                    >
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className="text-lg font-semibold text-white">{milestone.year}</div>
                        <div className="text-yellow-400 font-medium">{milestone.title}</div>
                        <div className="text-gray-400 text-sm mt-1">{milestone.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}