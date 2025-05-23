
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Car } from 'lucide-react';
import { GlassPanel, FloatingElement, FoamBubbles } from '@/components/ui/animations';

const Hero = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
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

  // More reliable image URLs for car wash service
  const heroImage = "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80";
  const fallbackImage = "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80";
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
    console.log("Error loading hero image, using fallback");
  };
  
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-16 overflow-hidden">
      {/* Water droplets and bubbles animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating bubbles */}
        <div className="absolute top-[5%] left-[10%]">
          <FoamBubbles color="blue" size="lg">
            <FloatingElement duration={8} distance="20px">
              <div className="w-10 h-10 rounded-full bg-blue-100/60 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        <div className="absolute top-[15%] right-[15%]">
          <FoamBubbles color="blue" size="md">
            <FloatingElement duration={10} distance="25px" delay={1}>
              <div className="w-8 h-8 rounded-full bg-blue-100/60 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        <div className="absolute bottom-[25%] left-[20%]">
          <FoamBubbles color="green" size="lg">
            <FloatingElement duration={12} distance="30px" delay={2}>
              <div className="w-12 h-12 rounded-full bg-green-100/50 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        <div className="absolute bottom-[10%] right-[25%]">
          <FoamBubbles color="white" size="md">
            <FloatingElement duration={9} distance="22px" delay={3}>
              <div className="w-6 h-6 rounded-full bg-white/70 backdrop-blur-sm"></div>
            </FloatingElement>
          </FoamBubbles>
        </div>
        
        {/* Water streaks */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-[20%] w-1 h-[30vh] bg-gradient-to-b from-blue-100/0 via-blue-100/80 to-blue-100/0 animate-foam"></div>
          <div className="absolute top-[10%] left-[40%] w-0.5 h-[20vh] bg-gradient-to-b from-blue-100/0 via-blue-100/80 to-blue-100/0 animate-foam" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
          <div className="absolute top-[5%] right-[30%] w-0.5 h-[25vh] bg-gradient-to-b from-blue-100/0 via-blue-100/80 to-blue-100/0 animate-foam" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        </div>
      </div>
      
      {/* Full-width car image section */}
      <div className="absolute top-0 left-0 w-full h-[65vh] overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 z-10"></div>
        <img 
          src={imageError ? fallbackImage : heroImage} 
          alt="Professionel bilvask i aktion" 
          className="w-full h-full object-cover"
          onLoad={handleImageLoad} 
          onError={handleImageError}
        />
      </div>
      
      {/* Content section - positioned below the car image */}
      <div className="container-custom relative z-10 mt-[40vh] pt-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
          <div className={cn("opacity-0 transform translate-y-8", isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000")} ref={el => elementsRef.current[0] = el}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue to-blue-light text-transparent bg-clip-text">Skinnende Rene</span> Biler, 
              <br />Hvor End Du Er
            </h1>
          </div>
          
          <div className={cn("opacity-0 transform translate-y-8", isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-200")} ref={el => elementsRef.current[1] = el}>
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg">
              Oplev bekvemmeligheden ved professionel bilvask, der kommer til din dør. Miljøvenlig, effektiv og med enestående resultater.
            </p>
          </div>
          
          <div className={cn("flex flex-col sm:flex-row gap-4 opacity-0 transform translate-y-8", isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-400")} ref={el => elementsRef.current[2] = el}>
            <a href="#pricing" className="relative overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm bg-blue transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center group">
              <span className="relative z-10">Se Planer & Priser</span>
              <span className="absolute inset-0 bg-blue-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
            <a href="#services" className="relative overflow-hidden rounded-md px-6 py-3 text-sm font-semibold border-2 border-blue text-blue hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center group">
              <span className="relative z-10">Udforsk Services</span>
              <span className="absolute inset-0 bg-blue transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          </div>
          
          <div className={cn("mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 transform translate-y-8", isVisible && "animate-fade-in opacity-100 translate-y-0 transition-all duration-1000 delay-600")} ref={el => elementsRef.current[3] = el}>
            <GlassPanel glowColor="rgba(74, 222, 128, 0.3)" glowIntensity="medium" className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-green font-bold text-lg">15 min</div>
                <div className="h-6 w-px bg-gray-300"></div>
                <p className="text-sm text-gray-600">Gennemsnitlig ventetid</p>
              </div>
            </GlassPanel>
            
            <GlassPanel glowColor="rgba(59, 130, 246, 0.3)" glowIntensity="medium" className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-blue font-bold text-lg">Miljøvenlig</div>
                <div className="h-6 w-px bg-gray-300"></div>
                <p className="text-sm text-gray-600">Vandbesparende teknologi</p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#services" className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white/80 transition-colors duration-300">
          <ChevronDown className="text-blue" size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
