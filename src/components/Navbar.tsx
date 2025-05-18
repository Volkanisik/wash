import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
  return <nav className={cn("fixed w-full top-0 z-50 transition-all duration-300 py-4", scrolled ? "bg-white shadow-md py-3" : "bg-transparent")}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <a href="#home" className="text-blue-dark font-montserrat text-2xl font-bold">
            <span className="text-blue">Sparkle</span>Wash
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map(item => {})}
        </div>

        <div className="hidden md:flex">
          <a href="#contact" className="btn-primary">
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed top-[72px] left-0 w-full bg-white shadow-md transition-transform duration-300 md:hidden", isMenuOpen ? "translate-y-0" : "-translate-y-full")}>
        <div className="container-custom py-4 flex flex-col space-y-4">
          {navItems.map(item => <a key={item.name} href={item.href} className="text-gray-700 hover:text-blue py-2 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </a>)}
          <a href="#contact" className="btn-primary w-full" onClick={() => setIsMenuOpen(false)}>
            Book Now
          </a>
        </div>
      </div>
    </nav>;
};
export default Navbar;