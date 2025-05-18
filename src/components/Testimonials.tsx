
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tesla Model 3 Owner",
    quote: "SparkleWash has completely changed how I maintain my car. Their team is professional, efficient, and the results are amazing. I love not having to drive to a car wash anymore!",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "Michael Chen",
    role: "BMW X5 Owner",
    quote: "I've tried multiple mobile car wash services, but SparkleWash stands out for their attention to detail. My car looks better than when I bought it, every single time.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Emily Rodriguez",
    role: "Audi Q7 Owner",
    quote: "As a busy professional, time is precious. SparkleWash saves me hours every month while keeping my car in pristine condition. Their subscription plan is a no-brainer!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "David Thompson",
    role: "Ford F-150 Owner",
    quote: "My truck takes a beating on job sites, but these guys make it look showroom-ready every time. The team is always on time and their eco-friendly approach is a huge plus.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="bg-gray-50">
      <div className="container-custom">
        <div 
          className="text-center mb-12 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our happy customers have to say.
          </p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto animate-on-scroll"
          ref={el => elementsRef.current[1] = el}
        >
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={cn(
                  "bg-white p-8 rounded-2xl shadow-md transition-all duration-500",
                  index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-0"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
                    <div>
                      <h4 className="font-bold text-blue-dark">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-blue-dark scale-125" : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
