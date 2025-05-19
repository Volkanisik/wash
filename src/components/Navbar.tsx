
import { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/ui/animations';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background based on scroll position
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress for the progress line
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-4"
      )}>
        <GlassPanel 
          opacity={scrolled ? 0.7 : 0.3} 
          blur={scrolled ? "12px" : "4px"}
          className="container-custom flex items-center justify-between py-2 px-4 md:px-8"
        >
          <div className="flex items-center">
            <a href="#home" className="text-blue-dark font-montserrat text-2xl font-bold">
              <span className="text-blue">Sparkle</span>Wash
            </a>
          </div>

          <div className="flex">
            <a 
              href="#contact" 
              className="relative overflow-hidden rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm bg-blue/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>
        </GlassPanel>
      </nav>
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-blue-light via-blue to-green transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;
