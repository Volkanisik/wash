
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tesla Model 3 Ejer",
    quote: "SparkleWash har fuldstændigt ændret måden, jeg vedligeholder min bil på. Deres team er professionelt, effektivt, og resultaterne er fantastiske. Jeg elsker ikke længere at skulle køre til en bilvask!",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "Michael Chen",
    role: "BMW X5 Ejer",
    quote: "Jeg har prøvet flere mobile bilvaskservices, men SparkleWash skiller sig ud ved deres fokus på detaljer. Min bil ser bedre ud end da jeg købte den, hver eneste gang.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Audi Q7 Ejer",
    quote: "Som travl professionel er tid værdifuld. SparkleWash sparer mig timer hver måned, mens de holder min bil i perfekt stand. Deres abonnementsplan er et oplagt valg!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "David Thompson",
    role: "Ford F-150 Ejer",
    quote: "Min truck gennemgår meget slid på byggepladser, men disse fyre får den til at se udstillingsflot ud hver gang. Teamet er altid til tiden, og deres miljøvenlige tilgang er et kæmpe plus.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
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
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="bg-gray-50/50 py-24 relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-blue/10 filter blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-green/10 filter blur-3xl"></div>
      
      <div className="container-custom relative">
        <div 
          className="text-center mb-16 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-blue to-blue-dark text-transparent bg-clip-text">Hvad Vores Kunder Siger</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue to-blue-dark rounded-full transform scale-x-50 origin-center"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Tag ikke bare vores ord for det. Her er hvad vores tilfredse kunder har at sige.
          </p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto animate-on-scroll relative"
          ref={el => elementsRef.current[1] = el}
        >
          <div ref={carouselRef} className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={cn(
                  "bg-white rounded-2xl shadow-lg transition-all duration-700 p-8",
                  "backdrop-blur-lg bg-white/90",
                  index === activeIndex ? "opacity-100 transform scale-100" : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                      />
                    </div>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div>
                    <blockquote className="text-gray-700 italic mb-6 text-lg">"{testimonial.quote}"</blockquote>
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-blue-dark text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:bg-blue hover:text-white transition-colors duration-300"
              aria-label="Forrige anbefaling"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-10 h-1 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-blue scale-y-150" : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Se anbefaling ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:bg-blue hover:text-white transition-colors duration-300"
              aria-label="Næste anbefaling"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
