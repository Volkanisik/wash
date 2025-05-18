
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  
  const navItems = [{
    name: "Home",
    href: "#home"
  }, {
    name: "Services",
    href: "#services"
  }, {
    name: "Pricing",
    href: "#pricing"
  }, {
    name: "Testimonials",
    href: "#testimonials"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  
  return (
    <>
      <nav className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-4"
      )}>
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center">
            <a href="#home" className="text-blue-dark font-montserrat text-2xl font-bold">
              <span className="text-blue">Sparkle</span>Wash
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <a 
                key={item.name} 
                href={item.href}
                className="relative font-medium text-gray-700 hover:text-blue transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex">
            <a 
              href="#contact" 
              className="relative overflow-hidden rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm bg-blue transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 bg-white/10 backdrop-blur-sm p-2 rounded-md hover:bg-white/20 transition-colors duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "fixed top-[72px] left-0 w-full bg-white/90 backdrop-blur-md shadow-lg transition-transform duration-500 ease-in-out md:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navItems.map(item => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-gray-700 hover:text-blue py-2 transition-colors duration-300 font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="relative overflow-hidden rounded-md px-6 py-2.5 font-semibold text-white shadow-sm bg-blue transition-all duration-300 hover:shadow-lg active:scale-95 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
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
