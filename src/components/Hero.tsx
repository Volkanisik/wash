
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
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
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <div 
            className="animate-on-scroll" 
            ref={el => elementsRef.current[0] = el}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-blue">Sparkling Clean</span> Cars, 
              <br />Wherever You Are
            </h1>
          </div>
          
          <div 
            className="animate-on-scroll" 
            ref={el => elementsRef.current[1] = el}
            style={{ animationDelay: '200ms' }}
          >
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg">
              Experience the convenience of professional car washing services that come to your doorstep. Eco-friendly, efficient, and exceptional results.
            </p>
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 animate-on-scroll" 
            ref={el => elementsRef.current[2] = el}
            style={{ animationDelay: '400ms' }}
          >
            <a href="#pricing" className="btn-primary">
              View Plans & Pricing
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
            </a>
          </div>
          
          <div 
            className="mt-8 flex items-center gap-4 animate-on-scroll" 
            ref={el => elementsRef.current[3] = el}
            style={{ animationDelay: '600ms' }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-blue-light flex items-center justify-center text-white font-semibold border-2 border-white"
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
            className="relative rounded-2xl overflow-hidden shadow-xl animate-on-scroll foam-bubbles" 
            ref={el => elementsRef.current[4] = el}
          >
            <img 
              src="https://images.unsplash.com/photo-1552849397-936edb7a0560?auto=format&fit=crop&q=80" 
              alt="Professional car washing"
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          <div 
            className={cn(
              "absolute -bottom-5 -left-5 md:bottom-8 md:left-8",
              "bg-white p-4 rounded-lg shadow-lg max-w-[200px]",
              "animate-on-scroll"
            )}
            ref={el => elementsRef.current[5] = el}
            style={{ animationDelay: '800ms' }}
          >
            <div className="text-green font-bold text-lg">15 min</div>
            <p className="text-sm text-gray-600">Average waiting time</p>
          </div>
          
          <div 
            className={cn(
              "absolute -top-5 -right-5 md:top-8 md:right-8",
              "bg-white p-4 rounded-lg shadow-lg",
              "animate-on-scroll"
            )}
            ref={el => elementsRef.current[6] = el}
            style={{ animationDelay: '1000ms' }}
          >
            <div className="flex items-center gap-2">
              <div className="text-blue font-bold text-lg">Eco-Friendly</div>
              <div className="w-4 h-4 rounded-full bg-green"></div>
            </div>
            <p className="text-sm text-gray-600">Water-saving technology</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
