
import { useEffect, useRef } from 'react';

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
    <section id="services" className="bg-gray-50">
      <div className="container-custom">
        <div 
          className="text-center mb-12 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We offer a range of professional car washing services that come to your location.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="card animate-on-scroll"
              ref={el => elementsRef.current[index + 1] = el}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-4 text-4xl">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-blue-dark">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green mr-2"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-12 text-center animate-on-scroll"
          ref={el => elementsRef.current[4] = el}
          style={{ animationDelay: '600ms' }}
        >
          <a href="#pricing" className="btn-primary">
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
