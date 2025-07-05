import React, { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav/nav";
import Hero from "./Hero/hero";
import ConstructionBanner from "./ConstructionBanner/constructionBanner";

const About = lazy(() => import("./About/about"));
const Services = lazy(() => import("./Services/services"));
const Portfolio = lazy(() => import("./Portfolio/portfolio"));
const Testimonials = lazy(() => import("./Testimonials/testimonials"));
const Team = lazy(() => import("./Team/team"));
const Contact = lazy(() => import("./Contact/contact"));

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);
  const [shouldForceLoad, setShouldForceLoad] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasBeenVisible]);

  const forceLoad = React.useCallback(() => {
    setShouldForceLoad(true);
    setHasBeenVisible(true);
  }, []);

  return [elementRef, hasBeenVisible || shouldForceLoad, forceLoad];
}

function LazySection({ 
  children, 
  sectionId,
  fallback = null, 
  className = "",
  skeletonHeight = "200px" 
}) {
  const [ref, shouldLoad, forceLoad] = useIntersectionObserver();
  const { registerSection, pendingScroll } = React.useContext(ScrollContext);

  React.useEffect(() => {
    if (registerSection && sectionId) {
      registerSection(sectionId, forceLoad);
    }
  }, [registerSection, sectionId, forceLoad]);

  React.useEffect(() => {
    if (pendingScroll === sectionId && !shouldLoad) {
      forceLoad();
    }
  }, [pendingScroll, sectionId, shouldLoad, forceLoad]);

  const defaultFallback = (
    <div 
      style={{ minHeight: skeletonHeight }} 
      className="flex items-center justify-center animate-pulse"
    >
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-full h-full rounded-lg bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
    </div>
  );

  return (
    <div ref={ref} className={className} id={sectionId}>
      {shouldLoad ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}

const ScrollContext = React.createContext({});

function useNavigationScroll() {
  const [sectionLoaders, setSectionLoaders] = React.useState({});
  const [pendingScroll, setPendingScroll] = React.useState(null);

  const registerSection = React.useCallback((sectionId, forceLoad) => {
    setSectionLoaders(prev => ({
      ...prev,
      [sectionId]: forceLoad
    }));
  }, []);

  const scrollToSection = React.useCallback(async (sectionId) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      setPendingScroll(sectionId);
      
      if (sectionLoaders[sectionId]) {
        sectionLoaders[sectionId]();
        
        setTimeout(() => {
          const loadedElement = document.getElementById(sectionId);
          if (loadedElement) {
            loadedElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          setPendingScroll(null);
        }, 100);
      }
    }
  }, [sectionLoaders]);

  return {
    registerSection,
    scrollToSection,
    pendingScroll
  };
}

export function LandingPage() {
  const { registerSection, scrollToSection, pendingScroll } = useNavigationScroll();
  const [selectedService, setSelectedService] = useState(null);

  React.useEffect(() => {
    const preloadComponents = () => {
      import("./About/about");
      import("./Services/services");
      import("./Portfolio/portfolio");
      import("./Testimonials/testimonials");
      import("./Team/team");
      import("./Contact/contact");
    };

    const handleUserInteraction = () => {
      preloadComponents();
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };

    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('mousemove', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    const timeout = setTimeout(preloadComponents, 3000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  React.useEffect(() => {
    window.scrollToSection = scrollToSection;
  }, [scrollToSection]);

  return (
    <ScrollContext.Provider value={{ registerSection, pendingScroll }}>
      <div className="flex flex-col">
        <Nav scrollToSection={scrollToSection} setSelectedService={setSelectedService} />
        <Hero />
        
        <LazySection sectionId="services" skeletonHeight="300px">
          <Services initialServiceIndex={selectedService} />
        </LazySection>
        
        <LazySection sectionId="projects" skeletonHeight="400px">
          <Portfolio />
        </LazySection>
        
        <LazySection sectionId="testimonials" skeletonHeight="350px">
          <Testimonials />
        </LazySection>
        
        <LazySection sectionId="team" skeletonHeight="300px">
          <Team />
        </LazySection>
        
        <LazySection sectionId="about" skeletonHeight="250px">
          <About />
        </LazySection>
        
        <LazySection sectionId="contact" skeletonHeight="400px">
          <Contact />
        </LazySection>
        
        <footer className="bg-black p-4 text-center text-yellow-500">
          © {new Date().getFullYear()} C&C Electrical LLC. All rights reserved.
        </footer>
      </div>
    </ScrollContext.Provider>
  );
}