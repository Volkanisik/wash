
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
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

  // Images that work reliably
  const heroImage = "https://images.unsplash.com/photo-1605231100267-5a61d8503a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80";
  
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <div 
            className={cn(
              "opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000"
            )}
            ref={el => elementsRef.current[0] = el}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue to-blue-light text-transparent bg-clip-text">Sparkling Clean</span> Cars, 
              <br />Wherever You Are
            </h1>
          </div>
          
          <div 
            className={cn(
              "opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-200"
            )}
            ref={el => elementsRef.current[1] = el}
          >
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg">
              Experience the convenience of professional car washing services that come to your doorstep. Eco-friendly, efficient, and exceptional results.
            </p>
          </div>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-400"
            )}
            ref={el => elementsRef.current[2] = el}
          >
            <a 
              href="#pricing" 
              className="relative overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm bg-blue transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center group"
            >
              <span className="relative z-10">View Plans & Pricing</span>
              <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a 
              href="#services" 
              className="relative overflow-hidden rounded-md px-6 py-3 text-sm font-semibold border-2 border-blue text-blue hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center group"
            >
              <span className="relative z-10">Explore Services</span>
              <span className="absolute inset-0 bg-blue transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>
          
          <div 
            className={cn(
              "mt-8 flex items-center gap-4 opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-600"
            )}
            ref={el => elementsRef.current[3] = el}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-light to-blue flex items-center justify-center text-white font-semibold border-2 border-white"
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">4.9/5</span> from over 2,000 happy customers
            </p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <div 
            className={cn(
              "relative rounded-2xl overflow-hidden shadow-2xl opacity-0 transform translate-y-8 foam-bubbles",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-300"
            )}
            ref={el => elementsRef.current[4] = el}
          >
            <img 
              src={heroImage}
              alt="Professional car washing"
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          <div 
            className={cn(
              "absolute -bottom-5 -left-5 md:bottom-8 md:left-8",
              "bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl max-w-[200px]",
              "opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-800"
            )}
            ref={el => elementsRef.current[5] = el}
          >
            <div className="text-green font-bold text-lg">15 min</div>
            <p className="text-sm text-gray-600">Average waiting time</p>
          </div>
          
          <div 
            className={cn(
              "absolute -top-5 -right-5 md:top-8 md:right-8",
              "bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-xl",
              "opacity-0 transform translate-y-8",
              isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-1000"
            )}
            ref={el => elementsRef.current[6] = el}
          >
            <div className="flex items-center gap-2">
              <div className="text-blue font-bold text-lg">Eco-Friendly</div>
              <div className="w-4 h-4 rounded-full bg-green"></div>
            </div>
            <p className="text-sm text-gray-600">Water-saving technology</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white/80 transition-colors duration-300">
          <ChevronDown className="text-blue" size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
