
import { cn } from '@/lib/utils';
import { GlassText } from '@/components/ui/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press", href: "#press" },
        { name: "Blog", href: "#blog" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Express Wash", href: "#services" },
        { name: "Premium Wash", href: "#services" },
        { name: "Deluxe Detail", href: "#services" },
        { name: "Commercial", href: "#commercial" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Contact Us", href: "#contact" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
      ]
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-green-500/10 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <GlassText opacity={0.1} blur="10px" className="mb-6">
              <a href="#home" className="text-2xl font-montserrat font-bold">
                <span className="text-blue">Sparkle</span>Wash
              </a>
            </GlassText>
            <GlassText opacity={0.05} blur="5px" className="mb-4">
              <p className="text-gray-400 mb-4 max-w-xs">
                Professional mobile car washing service that brings the highest quality clean to your doorstep.
              </p>
            </GlassText>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue transition-colors duration-300 backdrop-blur-sm shadow-lg hover:shadow-blue/30"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-lg">{social === "facebook" ? "f" : social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <GlassText opacity={0.1} blur="8px" className="mb-4">
                <h3 className="font-bold text-lg">{section.title}</h3>
              </GlassText>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <GlassText opacity={0.05} blur="5px" className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} SparkleWash. All rights reserved.
            </p>
          </GlassText>
          <div className="flex space-x-4">
            <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy</a>
            <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms</a>
            <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
