
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';
import { Car } from 'lucide-react';

const services = [
  {
    title: "Ekspres Vask",
    description: "Hurtig udvendig vask og håndtørring for en skinnende ren bil på kun 20 minutter.",
    icon: "🚿",
    features: ["Udvendig Vask", "Hjul Rengøring", "Håndtørring", "Vinduespudsning"],
    glowColor: "rgba(59, 130, 246, 0.3)" // blue glow
  },
  {
    title: "Premium Vask",
    description: "Komplet indvendig og udvendig rengøring for et udstillingskvalitets-finish.",
    icon: "✨",
    features: ["Ekspres Vask +", "Indvendig Rengøring", "Støvsugning", "Dørkarme Rengøring"],
    glowColor: "rgba(74, 222, 128, 0.3)" // green glow
  },
  {
    title: "Deluxe Detalje",
    description: "Vores omfattende pakke med voksbehandling og premium indvendig behandling.",
    icon: "🌟",
    features: ["Premium Vask +", "Håndvoksning", "Læderbehandling", "Indvendig Detaljering"],
    glowColor: "rgba(139, 92, 246, 0.3)" // purple glow
  }
];

const Services = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(-1);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
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
    <section id="services" className="relative py-20 md:py-[40px]">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-on-scroll" ref={el => elementsRef.current[0] = el}>
          <h2 className="section-title">Vores Services</h2>
          <p className="section-subtitle">Vi tilbyder en række professionelle bilvaskservices for at holde din bil skinnende.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="animate-on-scroll" 
              ref={el => elementsRef.current[index + 1] = el} 
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(-1)}
            >
              <GlassPanel 
                opacity={0.05} 
                blur="10px" 
                glowColor={service.glowColor}
                glowIntensity={activeCard === index ? "high" : "low"}
                className={cn(
                  "h-full p-6 transition-all duration-300",
                  activeCard === index ? "scale-105" : ""
                )}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <p className="mt-3 mb-6 text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-5 h-5 mr-2 text-green flex items-center justify-center">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a 
                    href="#contact" 
                    className="block w-full text-center py-2 px-4 bg-blue/10 hover:bg-blue/20 text-blue font-medium rounded-md transition-all duration-300"
                  >
                    Book denne service
                  </a>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
