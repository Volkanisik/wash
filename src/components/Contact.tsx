
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Express Wash',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="bg-blue-dark text-white">
      <div className="container-custom">
        <div 
          className="text-center mb-12 animate-on-scroll"
          ref={el => elementsRef.current[0] = el}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Book Your Wash</h2>
          <p className="text-lg mb-12 text-blue-100 max-w-2xl mx-auto">
            Ready for a spotless car? Schedule your appointment and we'll come to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="animate-on-scroll order-2 lg:order-1"
            ref={el => elementsRef.current[1] = el}
          >
            {submitted ? (
              <div className="bg-green-dark/20 p-8 rounded-xl border border-green-light/30 text-center">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-blue-100">
                  We've received your request and will get back to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-100">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-100">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-blue-100">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block mb-2 text-sm font-medium text-blue-100">Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white"
                      required
                    >
                      <option value="Express Wash">Express Wash</option>
                      <option value="Premium Wash">Premium Wash</option>
                      <option value="Deluxe Detail">Deluxe Detail</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-blue-100">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 bg-blue-900/50 rounded-md border border-blue-700 text-white placeholder:text-blue-300"
                    placeholder="Tell us about your car and preferred time for service"
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-secondary">
                  Book Now
                </button>
              </form>
            )}
          </div>
          
          <div 
            className="lg:order-2 animate-on-scroll"
            ref={el => elementsRef.current[2] = el}
          >
            <div className="bg-blue-800/30 p-8 rounded-xl border border-blue-700/50">
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Book</h4>
                    <p className="text-blue-100">Schedule your wash through our form or mobile app.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">We Come to You</h4>
                    <p className="text-blue-100">Our mobile team arrives at your location with all equipment.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-lg">Enjoy</h4>
                    <p className="text-blue-100">Sit back while we transform your car to a spotless finish.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-700/50">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Need immediate assistance?</p>
                    <a href="tel:+1234567890" className="text-lg font-bold text-white hover:underline">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
