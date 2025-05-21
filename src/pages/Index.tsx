
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { FloatingElement, FoamBubbles, GlassPanel, ProgressiveBlur } from "@/components/ui/animations";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  const [visibleSection, setVisibleSection] = useState('');

  // Initialize intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-active');
            observer.unobserve(entry.target);
            
            // Set current visible section
            const id = entry.target.getAttribute('id');
            if (id) {
              setVisibleSection(id);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Target all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    // Observe sections for navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Scroll to top button visibility based on scroll position
    const handleScroll = () => {
      if (scrollButtonRef.current) {
        if (window.scrollY > 500) {
          scrollButtonRef.current.classList.remove('opacity-0', 'pointer-events-none');
          scrollButtonRef.current.classList.add('opacity-100');
        } else {
          scrollButtonRef.current.classList.add('opacity-0', 'pointer-events-none');
          scrollButtonRef.current.classList.remove('opacity-100');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Parallax effect for background elements
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Decorative background elements with parallax effect */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" 
        aria-hidden="true"
      >
        {/* Large circles with blur effect */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{ transform: `translateY(${offset * 0.2}px)` }}
        >
          <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
          <div className="absolute top-[35%] right-[5%] w-96 h-96 rounded-full bg-green-100/30 blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[20%] w-80 h-80 rounded-full bg-blue-200/20 blur-3xl"></div>
        </div>
        
        {/* Small floating elements */}
        <div className="absolute top-[25%] left-[25%]">
          <FoamBubbles color="blue" size="lg">
            <FloatingElement duration={12} distance="30px">
              <div className="w-12 h-12 rounded-full bg-blue-100/50 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        <div className="absolute top-[40%] right-[15%]">
          <FoamBubbles color="green" size="md">
            <FloatingElement duration={8} distance="20px" delay={2}>
              <div className="w-8 h-8 rounded-full bg-green-100/50 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        <div className="absolute bottom-[30%] right-[25%]">
          <FoamBubbles color="blue" size="sm">
            <FloatingElement duration={10} distance="25px" delay={1}>
              <div className="w-10 h-10 rounded-full bg-blue-100/50 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProgressiveBlur height="6rem" direction="bottom">
          <Services />
        </ProgressiveBlur>
        <ProgressiveBlur height="6rem" direction="top">
          <Pricing />
        </ProgressiveBlur>
        <Testimonials />
        <Contact />
        <Footer />
      </div>

      {/* Scroll to top button */}
      <GlassPanel
        className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-500 hover:scale-110 z-50"
        opacity={0.5}
        glowColor="rgba(59, 130, 246, 0.4)"
        glowIntensity="medium"
        ref={scrollButtonRef}
        onClick={scrollToTop}
      >
        <button
          className="w-full h-full flex items-center justify-center"
          aria-label="Rul til toppen"
        >
          <ArrowUp className="h-5 w-5 text-blue-dark" />
        </button>
      </GlassPanel>
    </div>
  );
};

export default Index;
