
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingElement, GlassPanel } from '@/components/ui/animations';

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
    features: ["Ekspres Vask +", "Indvendig Støvsugning", "Instrumentbræt Rengøring", "Dørkarme Rengøring"],
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
    <section id="services" className="relative bg-gradient-to-br from-blue-50/80 to-gray-50/80 py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-blue-50/10 backdrop-blur-[2px]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-50">
        <FloatingElement duration={8} distance="15px">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200/30 to-blue-100/10 backdrop-blur-sm"></div>
        </FloatingElement>
      </div>
      <div className="absolute bottom-20 right-10 opacity-50">
        <FloatingElement duration={10} distance="20px" delay={2}>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-200/20 to-blue-100/10 backdrop-blur-sm"></div>
        </FloatingElement>
      </div>

      <div className="container-custom relative z-10">
        <div 
          className="text-center mb-16 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue to-blue-dark text-transparent bg-clip-text">Vores Services</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue to-blue-dark rounded-full transform scale-x-50 origin-center"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Vi tilbyder en række professionelle bilvasktjenester, der kommer til din lokation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FloatingElement 
              key={service.title} 
              duration={6} 
              delay={index * 0.5} 
              distance="8px"
              className="h-full"
            >
              <GlassPanel
                opacity={0.6}
                blur="8px"
                glowColor={service.glowColor}
                glowIntensity={activeCard === index ? "strong" : "light"}
                className={cn(
                  "h-full p-6 transition-all duration-500 animate-on-scroll cursor-pointer z-10",
                  "border border-white/30 shadow-lg",
                  "transform hover:-translate-y-1",
                  activeCard === index ? "ring-2 ring-blue scale-[1.02]" : ""
                )}
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
              </GlassPanel>
            </FloatingElement>
          ))}
        </div>
        
        <div 
          className="mt-16 text-center animate-on-scroll"
          ref={el => elementsRef.current[4] = el}
        >
          <a 
            href="#pricing" 
            className="relative overflow-hidden rounded-md px-8 py-3 text-sm font-semibold text-white shadow-sm bg-blue/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:bg-blue active:scale-95 text-center group inline-flex items-center"
          >
            <span className="relative z-10">Se Priser</span>
            <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
