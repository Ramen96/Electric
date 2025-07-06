import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, Zap, CheckCircle, Award } from "lucide-react";

export default function BlackGoldTestimonialsLayout() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const testimonials = [
    {
      rating: 5,
      title: "Top-notch service from start to finish!",
      content: "C&C Construction and Electrical exceeded our expectations on a commercial renovation project. Their team was punctual and professional every step of the way. The electrical work was clean, up to code, and finished ahead of schedule. I highly recommend them for any business in need of dependable contractors.",
      icon: CheckCircle,
      gradient: "from-yellow-400 via-amber-500 to-yellow-600",
      accentColor: "gold"
    },
    {
      rating: 5,
      title: "Honest, reliable, and efficient.",
      content: "We've worked with a lot of subcontractors over the years, and C&C stands out. They were transparent with their pricing, stuck to the agreed timeline, and took pride in their work. We'll definitely be partnering with them again.",
      icon: Award,
      gradient: "from-amber-400 via-yellow-500 to-orange-500",
      accentColor: "gold"
    },
    {
      rating: 5,
      title: "Our go-to for electrical work!",
      content: "C&C has helped us on several residential and light commercial projects, and they always deliver. Their crew is professional and easy to work with, plus they keep the job site clean. Great communication and trustworthy leadership. You can tell they care about doing it right.",
      icon: Zap,
      gradient: "from-yellow-500 via-amber-500 to-yellow-400",
      accentColor: "gold"
    }
  ];

  const getAccentClasses = () => {
    return {
      border: "border-yellow-500/40",
      bg: "from-yellow-500/10 to-amber-600/15",
      text: "text-yellow-400",
      icon: "text-yellow-400",
      shadow: "shadow-yellow-500/25",
      glow: "0 0 40px rgba(251, 191, 36, 0.4)"
    };
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-24 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1MSwgMTkxLCAzNiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-60" />
        
        {/* Floating golden orbs */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 backdrop-blur-sm border border-yellow-500/30 mb-8"
            >
              <Quote className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-100 font-semibold">Client Testimonials</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-7xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-white via-gray-100 to-white text-transparent bg-clip-text">
                What Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-transparent bg-clip-text">
                Clients Say
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Real feedback from real clients who trust C&C Construction and Electrical
            </motion.p>
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => {
              const IconComponent = testimonial.icon;
              const accentClasses = getAccentClasses();
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                  className={`group relative ${index % 2 === 0 ? 'md:mr-20' : 'md:ml-20'}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <motion.div
                    className={`relative p-10 rounded-3xl border-2 backdrop-blur-sm transition-all duration-700 ${
                      accentClasses.border
                    } bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 hover:shadow-2xl ${accentClasses.shadow}`}
                    whileHover={{ 
                      y: -12,
                      scale: 1.03,
                    }}
                    animate={activeIndex === index ? {
                      boxShadow: [
                        `0 15px 40px rgba(0, 0, 0, 0.4)`,
                        accentClasses.glow,
                        `0 15px 40px rgba(0, 0, 0, 0.4)`,
                      ]
                    } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {/* Decorative corner elements */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        animate={activeIndex === index ? {
                          rotate: [0, 360],
                          scale: [1, 1.3, 1],
                        } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 3, repeat: activeIndex === index ? Infinity : 0 }}
                      >
                        <IconComponent className={`w-7 h-7 ${accentClasses.icon}`} />
                      </motion.div>
                    </div>

                    {/* Quote icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${testimonial.gradient} mb-8 shadow-lg`}
                      animate={activeIndex === index ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 2.5, repeat: activeIndex === index ? Infinity : 0 }}
                    >
                      <Quote className="w-8 h-8 text-black font-bold" />
                    </motion.div>

                    {/* Stars */}
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={activeIndex === index ? {
                            scale: [1, 1.4, 1],
                            rotate: [0, 180, 360],
                          } : {}}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.15,
                            repeat: activeIndex === index ? Infinity : 0,
                          }}
                        >
                          <Star className={`w-6 h-6 fill-current ${accentClasses.text}`} />
                        </motion.div>
                      ))}
                    </div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl font-bold text-white mb-6 leading-tight"
                      animate={activeIndex === index ? {
                        color: [
                          "rgb(255, 255, 255)",
                          "rgb(251, 191, 36)",
                          "rgb(255, 255, 255)"
                        ]
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      {testimonial.title}
                    </motion.h3>

                    {/* Content */}
                    <motion.p
                      className="text-gray-200 text-lg leading-relaxed"
                      animate={activeIndex === index ? {
                        color: ["rgb(229, 231, 235)", "rgb(255, 255, 255)", "rgb(229, 231, 235)"]
                      } : {}}
                      transition={{ duration: 3.5, repeat: Infinity }}
                    >
                      {testimonial.content}
                    </motion.p>

                    {/* Animated border */}
                    {activeIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-3xl border-2"
                          animate={{
                            borderColor: [
                              "rgba(251, 191, 36, 0.4)",
                              "rgba(251, 191, 36, 0.9)",
                              "rgba(251, 191, 36, 0.4)",
                            ]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center mt-24"
          >
            <motion.p
              className="text-2xl text-gray-200 mb-10"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to join our satisfied clients?
            </motion.p>

            <motion.button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative px-12 py-5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black font-bold text-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-400/30"
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 30px 60px rgba(251, 191, 36, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center font-bold">
                Get an Estimate 
                <motion.span
                  className="ml-4 text-2xl"
                  animate={{
                    x: [0, 8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </span>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
