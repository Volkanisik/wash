
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: "Express Wash",
    description: "Quick exterior wash and hand-dry for a sparkling clean in just 20 minutes.",
    icon: "🚿",
    features: ["Exterior Wash", "Wheel Cleaning", "Hand Drying", "Windows Cleaning"]
  },
  {
    title: "Premium Wash",
    description: "Complete interior and exterior cleaning for a showroom-quality finish.",
    icon: "✨",
    features: ["Express Wash +", "Interior Vacuuming", "Dashboard Cleaning", "Door Jamb Cleaning"]
  },
  {
    title: "Deluxe Detail",
    description: "Our comprehensive package with waxing and premium interior treatment.",
    icon: "🌟",
    features: ["Premium Wash +", "Hand Waxing", "Leather Treatment", "Interior Detailing"]
  }
];

const Services = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(-1);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsRef.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elementsRef.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="services" className="bg-gray-50 py-24">
      <div className="container-custom">
        <div 
          className="text-center mb-16 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue to-blue-dark text-transparent bg-clip-text">Our Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue to-blue-dark rounded-full transform scale-x-50 origin-center"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            We offer a range of professional car washing services that come to your location.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={cn(
                "rounded-2xl p-6 transition-all duration-500 animate-on-scroll cursor-pointer",
                "bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
                "transform hover:-translate-y-2",
                activeCard === index ? "ring-2 ring-blue" : ""
              )}
              ref={el => elementsRef.current[index + 1] = el}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(-1)}
            >
              <div className="mb-6 text-5xl transform transition-transform duration-500 hover:scale-110">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-blue-dark">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green to-green-dark mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-16 text-center animate-on-scroll"
          ref={el => elementsRef.current[4] = el}
        >
          <a 
            href="#pricing" 
            className="relative overflow-hidden rounded-md px-8 py-3 text-sm font-semibold text-white shadow-sm bg-blue transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center group inline-flex items-center"
          >
            <span className="relative z-10">View Pricing</span>
            <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
