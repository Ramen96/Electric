import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

export default function Team() {
  const [isClient, setIsClient] = useState(false);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Chad",
      role: "Chief Executive Officer",
      description: "With over 20 years in electrical engineering, Chad has led our company to national recognition through his innovative vision and technical expertise.",
      image: "/api/placeholder/300/300",
      specialties: ["Strategic Planning", "Business Development", "Electrical Engineering"]
    },
    {
      id: 2,
      name: "Marcus",
      role: "Technical Director",
      description: "Marcus brings 15+ years of experience in complex electrical systems and has pioneered many of our smart electrical solutions for commercial spaces.",
      image: "/api/placeholder/300/300",
      specialties: ["System Design", "Smart Buildings", "Quality Assurance"]
    },
    {
      id: 3,
      name: "Johnathan",
      role: "Operations Manager",
      description: "Johnathan ensures our day-to-day operations run flawlessly while maintaining our high standards of safety and client satisfaction.",
      image: "/api/placeholder/300/300",
      specialties: ["Project Management", "Team Leadership", "Process Optimization"]
    },
    {
      id: 4,
      name: "James",
      role: "Lead Electrician",
      description: "James has completed over 200 major installations and mentors our team of electricians to deliver precision work on every project.",
      image: "/api/placeholder/300/300",
      specialties: ["Industrial Installations", "Troubleshooting", "Team Training"]
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      id="team"
      ref={ref}
      className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      {isClient && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated grid background */}
            <div
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNDAgNDAiPgogIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIC8+Cjwvc2F0dGVybj4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')]"
              opacity={0.4}
            />

            {/* Floating orbs */}
            <motion.div
              className="absolute -top-20 right-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
              animate={{
                y: [0, 40, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-yellow-600/10 blur-3xl"
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
          {/* Section header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-6"
            >
              <span className="text-yellow-400 font-medium">Our Experts</span>
            </motion.div>

            {/* Heading with gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                Meet The Team
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our exceptional team of electrical experts brings passion, precision, and decades of experience to every project we undertake.
            </motion.p>
          </div>

          {/* Team members grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
                onMouseEnter={() => setActiveTeamMember(member.id)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="bg-black/60 backdrop-blur-lg border border-yellow-500/20 rounded-xl overflow-hidden transition-all duration-300 h-full">
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Yellow glow overlay effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-yellow-400 font-medium mb-4">{member.role}</p>
                    
                    {/* Description - only shown when active/hovered */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={activeTeamMember === member.id ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 mb-4">{member.description}</p>
                      
                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {member.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Connect button - only shown when active/hovered */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={activeTeamMember === member.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-medium rounded-lg flex items-center justify-center"
                    >
                      <span>Connect</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-black/60 backdrop-blur-lg border border-yellow-500/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Growing Team</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're always looking for talented electricians and engineers to join our mission of delivering excellence in electrical solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer relative overflow-hidden px-8 py-4 bg-black text-yellow-400 font-semibold rounded-xl border-2 border-yellow-500/50 shadow-lg shadow-yellow-600/20 inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  View Open Positions
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                
                {/* Button hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
