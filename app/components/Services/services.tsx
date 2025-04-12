// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { BoltIcon, Battery100Icon, LightBulbIcon } from "@heroicons/react/24/outline";

// export default function Services() {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const services = [
//     {
//       title: "High-Voltage Systems",
//       description: "Expert installation, maintenance, and upgrades for commercial and industrial electrical systems.",
//       icon: <BoltIcon className="w-12 h-12" />,
//       color: "from-blue-500 to-teal-400",
//       textColor: "text-blue-300",
//       bgLight: "bg-blue-400/10",
//       bgDark: "bg-blue-900/20",
//     },
//     {
//       title: "Backup Power Solutions",
//       description: "Custom design and installation of reliable backup generators and power systems.",
//       icon: <Battery100Icon className="w-12 h-12" />,
//       color: "from-teal-400 to-emerald-500",
//       textColor: "text-teal-300",
//       bgLight: "bg-teal-400/10",
//       bgDark: "bg-teal-900/20",
//     },
//     {
//       title: "LED Retrofitting",
//       description: "Energy-efficient lighting solutions that reduce costs and enhance workspace atmosphere.",
//       icon: <LightBulbIcon className="w-12 h-12" />,
//       color: "from-amber-400 to-orange-500",
//       textColor: "text-amber-300",
//       bgLight: "bg-amber-400/10",
//       bgDark: "bg-amber-900/20",
//     },
//   ];

//   return (
//     <section
//       id="services"
//       className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-24 overflow-hidden relative"
//     >
//       <div className="absolute inset-0 overflow-hidden opacity-20">
//         <motion.div
//           className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-700/20 blur-3xl"
//           animate={{
//             x: [0, 100, 0],
//             y: [0, 50, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//         <motion.div
//           className="absolute right-20 bottom-40 w-80 h-80 rounded-full bg-teal-700/20 blur-3xl"
//           animate={{
//             x: [0, -70, 0],
//             y: [0, 100, 0],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//         <motion.div
//           className="absolute left-1/2 top-1/3 w-72 h-72 rounded-full bg-purple-700/20 blur-3xl"
//           animate={{
//             x: [0, 80, 0],
//             y: [0, -60, 0],
//           }}
//           transition={{
//             duration: 30,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="flex flex-col items-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             className="inline-block px-4 py-1 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 mb-4"
//           >
//             <span className="text-teal-400 font-medium">What We Offer</span>
//           </motion.div>
          
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="text-5xl font-bold mb-4 text-center text-white"
//           >
//             Our Expert Services
//           </motion.h2>
          
//           <motion.div
//             initial={{ opacity: 0, width: 0 }}
//             whileInView={{ opacity: 1, width: "80px" }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded mb-6"
//           />
          
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//             className="text-gray-300 text-center max-w-xl"
//           >
//             Discover our comprehensive range of electrical services designed to meet your specific needs with professionalism and expertise.
//           </motion.p>
//         </div>
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={{
//             hidden: { opacity: 0 },
//             visible: {
//               opacity: 1,
//               transition: {
//                 staggerChildren: 0.2,
//               },
//             },
//           }}
//         >
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               transition={{ 
//                 duration: 0.6,
//                 type: "spring",
//                 stiffness: 100 
//               }}
//               whileHover={{ 
//                 y: -10,
//                 transition: { duration: 0.3 } 
//               }}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               className="group relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800 shadow-xl"
//             >
//               <div 
//                 className={`absolute inset-0 ${service.bgDark} opacity-80 backdrop-blur-xl group-hover:opacity-100 transition-opacity duration-300`}
//               />
//               <motion.div 
//                 className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: hoveredCard === index ? 0.15 : 0 }}
//                 transition={{ duration: 0.3 }}
//               />

//               <div className="relative z-10">
//                 <motion.div 
//                   className="flex justify-center mb-6"
//                   whileHover={{ rotate: [0, -5, 5, -5, 0] }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <motion.div 
//                     className={`p-4 rounded-2xl ${service.bgLight} border border-gray-700/30 shadow-lg`}
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     <motion.div
//                       className={`${service.textColor}`}
//                       initial={{ rotate: 0 }}
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       {service.icon}
//                     </motion.div>
//                   </motion.div>
//                 </motion.div>

//                 <h3 className={`text-2xl font-bold mb-3 text-center group-hover:${service.textColor} transition-colors duration-300 text-white`}>
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-300 text-center leading-relaxed">
//                   {service.description}
//                 </p>
//                 <motion.div 
//                   className="mt-6 flex justify-center"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ 
//                     opacity: hoveredCard === index ? 1 : 0,
//                     y: hoveredCard === index ? 0 : 10 
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <button className={`px-6 py-2 rounded-full bg-gradient-to-r ${service.color} text-white font-medium text-sm flex items-center group/btn`}>
//                     <span>Learn More</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="mt-16 text-center"
//         >
//           <button onClick={() => {
//             document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//           }} 
//             className=" cursor-pointer inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-1">
//             Get a Free Consultation
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



import React, { useState } from "react";
import { motion } from "framer-motion";
import { BoltIcon, Battery100Icon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "High-Voltage Systems",
      description: "Expert installation, maintenance, and upgrades for commercial and industrial electrical systems.",
      icon: <BoltIcon className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
    {
      title: "Backup Power Solutions",
      description: "Custom design and installation of reliable backup generators and power systems.",
      icon: <Battery100Icon className="w-12 h-12" />,
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
    {
      title: "LED Retrofitting",
      description: "Energy-efficient lighting solutions that reduce costs and enhance workspace atmosphere.",
      icon: <LightBulbIcon className="w-12 h-12" />,
      color: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-400",
      bgLight: "bg-yellow-500/10",
      bgDark: "bg-yellow-900/20",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden relative"
    >
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Animated grid background similar to about.tsx */}
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]"
        />
        
        {/* Floating orbs with gold color */}
        <motion.div
          className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute right-20 bottom-40 w-80 h-80 rounded-full bg-yellow-600/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-4"
          >
            <span className="text-yellow-400 font-medium">What We Offer</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl font-bold mb-4 text-center"
          >
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
              Our Expert Services
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-gray-300 text-center max-w-xl"
          >
            Discover our comprehensive range of electrical services designed to meet your specific needs with professionalism and expertise.
          </motion.p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 } 
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-500/20 shadow-xl shadow-yellow-600/10"
            >
              <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === index ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className={`p-4 rounded-2xl ${service.bgLight} border border-yellow-500/20 shadow-lg shadow-yellow-600/10`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className={`${service.textColor}`}
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <h3 className={`text-2xl font-bold mb-3 text-center text-yellow-400 transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {service.description}
                </p>
                <motion.div 
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredCard === index ? 1 : 0,
                    y: hoveredCard === index ? 0 : 10 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="relative overflow-hidden cursor-pointer group px-6 py-2 rounded-full bg-black text-yellow-400 font-medium text-sm flex items-center border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20">
                    <span className="relative z-10">Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }} 
            className="relative overflow-hidden cursor-pointer group px-8 py-4 rounded-xl bg-black text-yellow-400 font-semibold border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center hover:-translate-y-1 transition-transform duration-300">
            <span className="relative z-10 flex items-center">
              Get a Free Consultation
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
