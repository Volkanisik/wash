
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';
import { Car } from 'lucide-react';

const services = [{
  title: "Ekspres Vask",
  description: "Hurtig udvendig vask og håndtørring for en skinnende ren bil på kun 20 minutter.",
  icon: "🚿",
  features: ["Udvendig Vask", "Hjul Rengøring", "Håndtørring", "Vinduespudsning"],
  glowColor: "rgba(59, 130, 246, 0.3)" // blue glow
}, {
  title: "Premium Vask",
  description: "Komplet indvendig og udvendig rengøring for et udstillingskvalitets-finish.",
  icon: "✨",
  features: ["Ekspres Vask +", "Indvendig Støvsugning", "Instrumentbræt Rengøring", "Dørkarme Rengøring"],
  glowColor: "rgba(74, 222, 128, 0.3)" // green glow
}, {
  title: "Deluxe Detalje",
  description: "Vores omfattende pakke med voksbehandling og premium indvendig behandling.",
  icon: "🌟",
  features: ["Premium Vask +", "Håndvoksning", "Læderbehandling", "Indvendig Detaljering"],
  glowColor: "rgba(139, 92, 246, 0.3)" // purple glow
}];

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
    <section id="services" className="relative py-20 md:py-32">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll" ref={el => elementsRef.current[0] = el}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue to-blue-dark text-transparent bg-clip-text">Vores Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue to-blue-dark rounded-full transform scale-x-50 origin-center"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Vi tilbyder en række professionelle bilplejeservices, der er designet til at holde din bil i topstand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassPanel 
              key={service.title} 
              className={cn(
                "p-6 rounded-xl transform transition-all duration-500 animate-on-scroll",
                "hover:-translate-y-2",
                activeCard === index ? "scale-105" : ""
              )} 
              ref={el => elementsRef.current[index + 1] = el}
              style={{ animationDelay: `${index * 200}ms` }}
              glowColor={service.glowColor}
              glowIntensity={activeCard === index ? "medium" : "light"}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(-1)}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-blue mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <a href="#pricing" className="inline-flex items-center text-blue font-medium hover:text-blue-dark transition-colors">
                    <span>Se priser</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
