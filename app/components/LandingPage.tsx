import React, { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav/nav";
import Hero from "./Hero/hero";

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
  skeletonHeight = "200px",
  shouldLoad = false,
  onMounted = () => {}
}) {
  const [ref, intersectionShouldLoad, forceLoad] = useIntersectionObserver();
  const { registerSection, pendingScroll } = React.useContext(ScrollContext);
  const [hasMounted, setHasMounted] = React.useState(false);

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

  // Handle mounting callback
  React.useEffect(() => {
    if (shouldLoad && !hasMounted) {
      setHasMounted(true);
      onMounted();
    }
  }, [shouldLoad, hasMounted, onMounted]);

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

function useSequentialLoading() {
  const [loadedSections, setLoadedSections] = React.useState({
    services: false,
    projects: false,
    testimonials: false,
    team: false,
    about: false,
    contact: false
  });

  const sectionOrder = ['services', 'projects', 'testimonials', 'team', 'about', 'contact'];

  React.useEffect(() => {
    // Start loading the first section immediately
    const timer = setTimeout(() => {
      setLoadedSections(prev => ({ ...prev, services: true }));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onSectionMounted = React.useCallback((sectionId) => {
    const currentIndex = sectionOrder.indexOf(sectionId);
    const nextSectionId = sectionOrder[currentIndex + 1];
    
    if (nextSectionId) {
      // Load the next section after a small delay to ensure smooth loading
      setTimeout(() => {
        setLoadedSections(prev => ({ ...prev, [nextSectionId]: true }));
      }, 300);
    }
  }, [sectionOrder]);

  return { loadedSections, onSectionMounted };
}

export function LandingPage() {
  const { registerSection, scrollToSection, pendingScroll } = useNavigationScroll();
  const { loadedSections, onSectionMounted } = useSequentialLoading();
  const [selectedService, setSelectedService] = useState(null);

  React.useEffect(() => {
    window.scrollToSection = scrollToSection;
  }, [scrollToSection]);

  return (
    <ScrollContext.Provider value={{ registerSection, pendingScroll }}>
      <div className="flex flex-col">
        <Nav scrollToSection={scrollToSection} setSelectedService={setSelectedService} />
        <Hero />
        
        <LazySection 
          sectionId="services" 
          skeletonHeight="300px"
          shouldLoad={loadedSections.services}
          onMounted={() => onSectionMounted('services')}
        >
          <Services initialServiceIndex={selectedService} />
        </LazySection>
        
        <LazySection 
          sectionId="projects" 
          skeletonHeight="400px"
          shouldLoad={loadedSections.projects}
          onMounted={() => onSectionMounted('projects')}
        >
          <Portfolio />
        </LazySection>
        
        <LazySection 
          sectionId="testimonials" 
          skeletonHeight="350px"
          shouldLoad={loadedSections.testimonials}
          onMounted={() => onSectionMounted('testimonials')}
        >
          <Testimonials />
        </LazySection>
        
        <LazySection 
          sectionId="team" 
          skeletonHeight="300px"
          shouldLoad={loadedSections.team}
          onMounted={() => onSectionMounted('team')}
        >
          <Team />
        </LazySection>
        
        <LazySection 
          sectionId="about" 
          skeletonHeight="250px"
          shouldLoad={loadedSections.about}
          onMounted={() => onSectionMounted('about')}
        >
          <About />
        </LazySection>
        
        <LazySection 
          sectionId="contact" 
          skeletonHeight="400px"
          shouldLoad={loadedSections.contact}
          onMounted={() => onSectionMounted('contact')}
        >
          <Contact />
        </LazySection>
        
        <footer className="bg-black p-4 text-center text-yellow-500">
          © {new Date().getFullYear()} C&C Electrical LLC. All rights reserved.
        </footer>
      </div>
    </ScrollContext.Provider>
  );
}